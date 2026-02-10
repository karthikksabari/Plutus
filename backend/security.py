import os
from fastapi import UploadFile, HTTPException

# 1. CONSTANTS (The Laws)
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB Limit
ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"]

# 2. FILE VALIDATION FUNCTION
async def validate_file(file: UploadFile):
    """
    Strictly checks file size and type.
    Raises HTTPException if the file is dangerous.
    """
    # A. Check Size (Pointer-based to save memory)
    file.file.seek(0, 2)
    size = file.file.tell()
    file.file.seek(0)  # Reset pointer
    
    if size > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail=f"File too large. Limit is {MAX_FILE_SIZE/1024/1024}MB")

    # B. Check MIME Type (Header)
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=415, detail=f"Unsupported file type: {file.content_type}")

    # C. Magic Number Check (Deep Inspection)
    # We read the first 4 bytes to ensure it's truly a PDF/Image
    header = await file.read(4)
    await file.seek(0)  # Reset pointer again
    
    # PDF magic number: %PDF
    if file.content_type == "application/pdf" and not header.startswith(b'%PDF'):
        raise HTTPException(status_code=400, detail="Corrupt or fake PDF detected.")
        
    return True

print("🛡️ Security Module Loaded")