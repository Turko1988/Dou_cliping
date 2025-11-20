from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel
from backend.services.dou import dou_service

router = APIRouter()

class SearchRequest(BaseModel):
    terms: List[str]

@router.get("/search/dou")
async def search_dou(q: str = Query(..., description="Termo de busca")):
    """
    Busca por um termo no Diário Oficial da União via DOUSearcher.
    """
    try:
        # O DOUSearcher espera uma lista de termos
        results = dou_service.search(terms=[q])
        
        # Transforma o resultado para um formato mais amigável para o frontend se necessário
        # O retorno original é agrupado por termo. Vamos simplificar para uma lista plana.
        flat_results = []
        if results and q in results:
            flat_results = results[q]
            
        return {"data": flat_results, "count": len(flat_results)}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    return {"status": "ok"}
