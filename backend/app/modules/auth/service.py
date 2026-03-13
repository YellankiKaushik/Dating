"""
service.py – password hashing using bcrypt directly (no passlib),
and JWT token creation/decoding using python-jose.
"""
import bcrypt
from jose import jwt
from datetime import datetime, timedelta
from app.core.config import settings


def hash_password(password: str) -> str:
    """Hash a plain-text password using bcrypt."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(password: str, hashed_password: str) -> bool:
    """Verify a plain-text password against its bcrypt hash."""
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))


def create_access_token(user_id: int) -> str:
    """Create a signed JWT access token that expires in 1 hour."""
    expire = datetime.utcnow() + timedelta(hours=1)
    payload = {"sub": str(user_id), "exp": expire}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")


def decode_access_token(token: str) -> dict:
    """Decode and validate a JWT access token."""
    return jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
