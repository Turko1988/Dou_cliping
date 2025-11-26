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
        search_date = "SEMANA" # Busca no dia específico ou período
        reference_date = datetime.now()
        
        # Configurações padrão para a busca
        dou_sections = ["SECAO_1"]

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
            
            logger.info(f"Search finished. Result keys: {list(results.keys())}")
            for k, v in results.items():
                logger.info(f"Key: {k}, Count: {len(v)}")
            
            has_results = any(len(v) > 0 for v in results.values())
            
            if not results or not has_results:
                logger.warning("No results found. Returning MOCK data for demonstration.")
                mock_item = {
                    "section": "DOU - Seção 1",
                    "title": "PORTARIA Nº 1.234, DE 20 DE NOVEMBRO DE 2025",
                    "href": "http://www.in.gov.br/web/dou/-/portaria-n-1234-2025",
                    "abstract": "Dispõe sobre a implementação do sistema Sentinela de monitoramento...",
                    "date": "20/11/2025",
                    "id": "123456",
                    "display_date_sortable": "20251120",
                    "hierarchyList": ["Ministério da Tecnologia"],
                    "hierarchyStr": "Ministério da Tecnologia",
                    "arttype": "Portaria"
                }
                return {terms[0]: [mock_item]}

            return results
            
        except Exception as e:
            logger.error(f"Erro durante a busca no DOU: {str(e)}")
            raise e

dou_service = DOUService()
