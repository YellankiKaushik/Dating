"""
core/security.py  –  thin wrappers kept for future cross-module use.
Uses bcrypt directly (passlib is not used here to avoid version conflicts).
"""
import bcrypt
from jose import jwt
from datetime import datetime, timedelta
from app.core.config import settings


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=1)) -> str:
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + expires_delta
    return jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")
