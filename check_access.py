import requests
from bs4 import BeautifulSoup

url = "http://www.in.gov.br/consulta/-/buscar/dou"
params = {
    "q": '"portaria"',
    "s": "do1",
    "exactDate": "dia",
    "sortType": "0"
}

try:
    print(f"Requesting {url}...")
    response = requests.get(url, params=params, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"URL: {response.url}")
    
    soup = BeautifulSoup(response.content, "html.parser")
    title = soup.title.string if soup.title else "No title"
    print(f"Page Title: {title}")
    
    # Check for pagination or results
    pagination = soup.find('button', id='lastPage')
    if pagination:
        print(f"Pagination found: {pagination.text.strip()}")
    else:
        print("Pagination NOT found")
        
    # Check for specific error text
    if "Não foi possível realizar a consulta" in response.text:
        print("Error message found in page")
        
    # Print snippet
    print("Page snippet:")
    print(response.text[:500])
    
except Exception as e:
    print(f"Error: {e}")
