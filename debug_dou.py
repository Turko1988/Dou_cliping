import sys
import os
import logging
from datetime import datetime

# Add project root to path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    from backend.services.dou import DOUService
except ImportError as e:
    logger.error(f"Import error: {e}")
    sys.exit(1)

def debug_search():
    service = DOUService()
    
    terms = ["portaria"]
    print(f"Searching for: {terms}")
    
    try:
        results = service.search(terms=terms)
        
        print(f"Results found: {len(results)}")
        if results:
            first_key = list(results.keys())[0]
            print(f"First key: {first_key}")
            print(f"Count for {first_key}: {len(results[first_key])}")
        
    except Exception as e:
        logger.exception("Search failed")

if __name__ == "__main__":
    debug_search()
