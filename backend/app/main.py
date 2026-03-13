from fastapi import FastAPI

# ── IMPORTANT: import all models BEFORE create_all so SQLAlchemy
# knows which tables to create. ─────────────────────────────────
from app.core.database import engine, Base
import app.modules.auth.models  # noqa: F401 – registers User with Base

from app.modules.auth.router import router as auth_router

# Create database tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="PsyMatch API", docs_url="/docs", redoc_url="/redoc")

# ── Routers ────────────────────────────────────────────────────
app.include_router(auth_router)


@app.get("/")
def read_root():
    return {"message": "PsyMatch backend is running"}
