import logging
from datetime import datetime, timedelta
from typing import List, Dict, Any
from src.searchers import DOUSearcher

# Configuração básica de log
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DOUService:
    def __init__(self):
        self.searcher = DOUSearcher()

    def search(self, terms: List[str], days_back: int = 1) -> Dict[str, Any]:
        """
        Realiza uma busca no DOU usando o DOUSearcher existente.
        """
        search_date = "DIA" # Busca no dia específico ou período
        reference_date = datetime.now()
        
        # Configurações padrão para a busca
        dou_sections = ["SECAO_1", "SECAO_2", "SECAO_3", "EDICAO_EXTRA"]

        field = "TUDO"
        is_exact_search = False
        ignore_signature_match = False
        force_rematch = False
        department = []
        department_ignore = []
        pubtype = []

        try:
            logger.info(f"Iniciando busca para os termos: {terms}")
            
            # Executa a busca usando a lógica existente
            # Nota: A implementação original do DOUSearcher espera listas e parâmetros específicos
            results = self.searcher.exec_search(
                term_list=terms,
                dou_sections=dou_sections,
                search_date=search_date,
                field=field,
                is_exact_search=is_exact_search,
                ignore_signature_match=ignore_signature_match,
                force_rematch=force_rematch,
                department=department,
                department_ignore=department_ignore,
                pubtype=pubtype,
                reference_date=reference_date
            )
            
            return results
            
        except Exception as e:
            logger.error(f"Erro durante a busca no DOU: {str(e)}")
            raise e

dou_service = DOUService()
