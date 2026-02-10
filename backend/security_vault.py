import re
import json
import hashlib
from typing import Dict, Any, Union
from fastapi import UploadFile, HTTPException

class SecurityVault:
    """
    GOD-TIER SECURITY LAYER
    -----------------------
    This module acts as the 'Air Gap' between raw AI output and persistent storage.
    It enforces strict PII redaction, file integrity checks, and user anonymization.
    """

    # Magic Bytes signatures for file validation
    ALLOWED_MAGIC_BYTES = {
        b'%PDF': 'application/pdf',
        b'\xff\xd8\xff': 'image/jpeg',
        b'\x89PNG\r\n\x1a\n': 'image/png',
        b'PK\x03\x04': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }

    @staticmethod
    async def validate_file_integrity(file: UploadFile):
        """
        Prevents 'Extension Spoofing' attacks.
        Reads the actual binary header (Magic Bytes) of the file to confirm its type.
        """
        header = await file.read(2048)
        await file.seek(0)

        is_valid = False
        for signature, mime in SecurityVault.ALLOWED_MAGIC_BYTES.items():
            if header.startswith(signature):
                is_valid = True
                break
        
        if not is_valid:
            raise HTTPException(
                status_code=415, 
                detail="SECURITY ALERT: File header mismatch. Potential malware attempt."
            )
        return True

    @staticmethod
    def redact_pii(text_data: str) -> str:
        """
        The 'Guillotine' Logic.
        Aggressively scrubs sensitive patterns from text before storage.
        """
        if not text_data:
            return ""
        
        # 1. Email Redaction
        text_data = re.sub(r'[\w\.-]+@[\w\.-]+\.\w+', '[EMAIL_REDACTED]', text_data)
        
        # 2. Phone Number Redaction
        text_data = re.sub(r'(?:\+91[\-\s]?)?(?:0[\-\s]?)?[6-9]\d{4}[\-\s]?\d{5}', '[PHONE_REDACTED]', text_data)
        
        # 3. Aadhaar Number Redaction
        text_data = re.sub(r'\b\d{4}[\-\s]\d{4}[\-\s]\d{4}\b', '[UID_REDACTED]', text_data)
        
        # 4. PAN Card Redaction
        text_data = re.sub(r'\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b', '[PAN_REDACTED]', text_data)
        
        return text_data

    @staticmethod
    def sanitize_knowledge_graph(data: Union[Dict, list]) -> Union[Dict, list]:
        """
        Recursively traverses the entire Knowledge Graph (JSON) to scrub PII
        from every node, leaf, and list item.
        """
        if isinstance(data, dict):
            return {k: SecurityVault.sanitize_knowledge_graph(v) for k, v in data.items()}
        elif isinstance(data, list):
            return [SecurityVault.sanitize_knowledge_graph(item) for item in data]
        elif isinstance(data, str):
            return SecurityVault.redact_pii(data)
        else:
            return data

    @staticmethod
    def hash_user_identifier(user_id: str) -> str:
        """
        Database Privacy: Stores SHA-256 hash of User IDs.
        """
        if not user_id:
            return "anon"
        return hashlib.sha256(user_id.encode()).hexdigest()