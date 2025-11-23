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
        print(f"API Request for term: {q}")
        results = dou_service.search(terms=[q])
        
        # Transforma o resultado para um formato mais amigável para o frontend se necessário
        # O retorno original é agrupado por termo. Vamos simplificar para uma lista plana.
        flat_results = []
        def flatten_results(data):
            items = []
            if isinstance(data, list):
                items.extend(data)
            elif isinstance(data, dict):
                for value in data.values():
                    items.extend(flatten_results(value))
            return items

        flat_results = flatten_results(results)
        
        print(f"DEBUG: Results type: {type(results)}")
        print(f"DEBUG: Flat results count: {len(flat_results)}")

        return {"data": flat_results, "count": len(flat_results)}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    return {"status": "ok"}
