import os
import httpx
from dotenv import load_dotenv

load_dotenv()
BACKBOARD_API_KEY = os.getenv("BACKBOARD_API_KEY")
BASE_URL = "https://app.backboard.io/api"

headers = {"X-API-Key": BACKBOARD_API_KEY}

async def create_thread(assistant_id):
    """Creates a fresh memory thread."""
    url = f"{BASE_URL}/assistants/{assistant_id}/threads"
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json={}, headers={"X-API-Key": BACKBOARD_API_KEY, "Content-Type": "application/json"})
        return response.json().get("threadId") if response.status_code == 200 else None

async def inject_audit_memory(thread_id, audit_summary: str):
    """Stores a fact in Backboard memory."""
    url = f"{BASE_URL}/threads/{thread_id}/messages"
    payload = {"content": f"AUDIT_RECORD: {audit_summary}", "stream": "false", "memory": "Auto"}
    async with httpx.AsyncClient() as client:
        await client.post(url, data=payload, headers=headers)

async def chat_with_backboard(thread_id, user_message):
    """Retrieves AI response with memory context."""
    url = f"{BASE_URL}/threads/{thread_id}/messages"
    payload = {"content": user_message, "stream": "false", "memory": "Auto"}
    async with httpx.AsyncClient() as client:
        response = await client.post(url, data=payload, headers=headers)
        return response.json().get("content") if response.status_code == 200 else "Error"