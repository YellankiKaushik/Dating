from fastapi import FastAPI

app = FastAPI(title="PsyMatch API")

@app.get("/")
def read_root():
    return {"message": "PsyMatch backend is running"}
