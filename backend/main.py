from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.routes import router as api_router
import sys
import os

# Adiciona o diretório raiz ao sys.path para importar módulos de 'src'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

app = FastAPI(
    title="Sentinela API",
    description="API para monitoramento do Diário Oficial e outras fontes",
    version="1.0.0"
)

# Configuração CORS para permitir requisições do Frontend (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Sentinela API operante"}
