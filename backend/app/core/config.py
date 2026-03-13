import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./psymatch.db")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "change_this_secret")

settings = Settings()
