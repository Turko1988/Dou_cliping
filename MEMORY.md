# 🧠 MEMORY - Instruções para IAs Desenvolvedoras

**Objetivo**: Este documento contém TODO o contexto técnico necessário para que IAs (Claude, GPT-4, Cursor, etc) desenvolvam o projeto SENTINELA com qualidade e consistência.

**Como usar**: Ao iniciar uma sessão de desenvolvimento com IA, cole este documento inteiro no prompt inicial para dar contexto completo.

---

## 📋 CONTEXTO DO PROJETO

### Visão de Alto Nível
**SENTINELA** é uma plataforma SaaS B2G/B2B de monitoramento reputacional para o mercado político brasileiro. Agrega múltiplas fontes de dados (notícias, redes sociais, Diário Oficial) em um dashboard unificado com IA para análise de sentimento e alertas em tempo real.

### Proposta de Valor Única
1. **NÃO reinventamos a roda**: Agregamos APIs existentes (Firecrawl, Bright Data, Ro-DOU)
2. **UX político**: Interface simplificada para não-técnicos (políticos/assessores)
3. **Distribuição via lobistas**: Canal de vendas com 30-40% comissão recorrente
4. **Timing perfeito**: Eleições 2026-2027 = 2 anos de boom

### Usuários Finais
- Políticos (Deputados, Senadores, Prefeitos, Secretários)
- Assessores de gabinete e comunicação
- Órgãos públicos (secretarias, autarquias)
- **Nível técnico**: BAIXO (nota 4-7/10) → Interface precisa ser MUITO simples

---

## 🎯 PRINCÍPIOS DE DESENVOLVIMENTO

### 1. PARETO AO CUBO
- **20% das features = 80% do valor**: Priorize MVP, corte impiedosamente features "nice to have"
- **Terceirize sempre que possível**: Use APIs prontas (Firecrawl, Bright Data) em vez de construir scrapers do zero
- **Mobile-first**: 70% dos usuários acessam via celular

### 2. SIMPLICIDADE SOBRE COMPLEXIDADE
```python
# ❌ RUIM - Arquitetura over-engineered
class AbstractSentimentAnalyzerFactoryInterface:
    def create_analyzer(self) -> ISentimentAnalyzer:
        pass

# ✅ BOM - Direto ao ponto
def analyze_sentiment(text: str) -> dict:
    response = openai.chat.completions.create(...)
    return response.json()
```

### 3. PERFORMANCE É FEATURE
- Alerta crítico: **< 2 minutos** da publicação ao WhatsApp
- Dashboard load: **< 3 segundos**
- API response: **< 500ms P95**

### 4. OBSERVABILIDADE DESDE O DIA 1
- Todo endpoint tem logs estruturados (Loguru)
- Erros vão pro Sentry automaticamente
- Métricas de performance no Grafana

---

## 🏗️ ARQUITETURA DETALHADA

### Diagrama de Componentes
```
┌─────────────────────────────────────────────┐
│         USUÁRIO (Político/Assessor)         │
│  Mobile (WhatsApp/Telegram) + Web Browser   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│         FRONTEND (React + TypeScript)        │
│  - Dashboard político                       │
│  - Timeline de menções                      │
│  - Configurações                            │
└─────────────────────────────────────────────┘
                    ↓ REST API (HTTPS)
┌─────────────────────────────────────────────┐
│       BACKEND API (Python FastAPI)          │
│  - Autenticação JWT                         │
│  - Endpoints CRUD                           │
│  - Orquestração de serviços                 │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│    CAMADA DE SERVIÇOS (Business Logic)      │
├─────────────────────────────────────────────┤
│ • ScrapingService → Coordena scrapers       │
│ • AIAnalyzerService → Análise sentimento    │
│ • AlertService → Envia notificações         │
│ • ReportService → Gera PDFs                 │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│       WORKERS (Celery + Airflow)            │
├─────────────────────────────────────────────┤
│ • DOUScraper (Fork Ro-DOU)                  │
│ • NewsScraper (Firecrawl API)               │
│ • SocialScraper (Bright Data API)           │
│ • AIAnalysisTask (OpenAI/Claude)            │
│ • AlertSenderTask (Twilio + Telegram)       │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│      DADOS (PostgreSQL + Redis + S3)        │
├─────────────────────────────────────────────┤
│ • PostgreSQL: Users, Mentions, Alerts       │
│ • Redis: Cache + Job Queue                  │
│ • S3: PDFs, Screenshots                     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│         INTEGRAÇÕES EXTERNAS (APIs)         │
├─────────────────────────────────────────────┤
│ • Firecrawl (scraping notícias)             │
│ • Bright Data (redes sociais)               │
│ • OpenAI/Anthropic (IA)                     │
│ • Twilio (WhatsApp)                         │
│ • Telegram Bot API                          │
│ • SendGrid (email)                          │
└─────────────────────────────────────────────┘
```

---

## 🗄️ MODELO DE DADOS

### Tabelas Principais

#### **users**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    hashed_password VARCHAR(255),
    role VARCHAR(50) DEFAULT 'client', -- 'admin', 'client', 'assessor'
    is_active BOOLEAN DEFAULT true,
    
    -- Configurações de monitoramento
    keywords JSONB, -- ["Rodolfo Cecílio", "Anestesiologia DF"]
    notification_channels JSONB, -- {"whatsapp": "+55...", "telegram": "..."}
    alert_preferences JSONB, -- {"urgency": ["critical"], "hours": "24/7"}
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_is_active ON users(is_active);
```

#### **mentions**
```sql
CREATE TABLE mentions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    
    -- Dados da menção
    source_type VARCHAR(50), -- 'dou', 'news', 'twitter', 'facebook'
    source_name VARCHAR(255), -- 'G1', 'Folha', 'DOU Seção 1'
    url TEXT,
    title TEXT,
    content TEXT,
    published_at TIMESTAMP,
    
    -- Análise de IA
    sentiment VARCHAR(20), -- 'positive', 'negative', 'neutral'
    sentiment_score FLOAT, -- -1.0 a 1.0
    urgency VARCHAR(20), -- 'low', 'medium', 'high', 'critical'
    keywords_found JSONB, -- ["Rodolfo", "Anestesiologia"]
    entities JSONB, -- {"people": ["Dr Silva"], "orgs": ["PF"]}
    ai_summary TEXT, -- Resumo gerado pela IA
    ai_suggested_action TEXT, -- "Resposta urgente necessária..."
    
    -- Metadados
    screenshot_url TEXT,
    is_critical BOOLEAN DEFAULT false,
    is_read BOOLEAN DEFAULT false,
    alerted_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_mentions_user_id ON mentions(user_id);
CREATE INDEX idx_mentions_published_at ON mentions(published_at DESC);
CREATE INDEX idx_mentions_urgency ON mentions(urgency);
CREATE INDEX idx_mentions_is_critical ON mentions(is_critical);
CREATE INDEX idx_mentions_sentiment ON mentions(sentiment);
```

#### **alerts**
```sql
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    mention_id INTEGER REFERENCES mentions(id),
    
    channel VARCHAR(50), -- 'whatsapp', 'telegram', 'email'
    status VARCHAR(50), -- 'pending', 'sent', 'failed', 'read'
    sent_at TIMESTAMP,
    read_at TIMESTAMP,
    
    error_message TEXT, -- Se falhou, qual erro
    
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_alerts_user_id ON alerts(user_id);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_sent_at ON alerts(sent_at DESC);
```

---

## 🔌 INTEGRAÇÕES CRÍTICAS

### 1. Ro-DOU (Diário Oficial)

**Fonte**: https://github.com/gestaogovbr/Ro-dou (Fork open-source)

**Implementação**:
```python
# app/services/scraping/dou_scraper.py
import requests
from bs4 import BeautifulSoup
from datetime import datetime

class DOUScraper:
    BASE_URL = "https://www.in.gov.br/consulta"
    
    def search_keywords(self, keywords: list[str], date: datetime = None):
        """Busca keywords no DOU"""
        date = date or datetime.now()
        results = []
        
        for keyword in keywords:
            params = {
                "q": keyword,
                "publishFrom": date.strftime("%d-%m-%Y"),
                "publishTo": date.strftime("%d-%m-%Y")
            }
            
            response = requests.get(f"{self.BASE_URL}/-/buscar/dou", params=params)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            for item in soup.find_all('div', class_='resultado-busca'):
                results.append({
                    'keyword': keyword,
                    'title': item.find('h5').text.strip(),
                    'content': item.find('p').text.strip(),
                    'url': item.find('a')['href'],
                    'date': date,
                    'source_type': 'dou',
                    'source_name': 'DOU'
                })
        
        return results
```

**Airflow DAG** (roda diariamente 6h):
```python
# airflow/dags/dou_daily.py
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def scrape_dou_task():
    scraper = DOUScraper()
    users = db.query(User).filter(User.is_active == True).all()
    
    for user in users:
        mentions = scraper.search_keywords(user.keywords)
        for mention in mentions:
            # Salva no DB
            db_mention = Mention(**mention, user_id=user.id)
            db.add(db_mention)
            
            # Analisa com IA
            analysis = AIAnalyzerService().analyze(mention['content'])
            db_mention.sentiment = analysis['sentiment']
            db_mention.urgency = analysis['urgency']
            
            # Envia alerta se crítico
            if analysis['urgency'] == 'critical':
                AlertService().send_alert(user, db_mention, analysis)
        
        db.commit()

dag = DAG(
    'dou_daily_scraping',
    schedule_interval='0 6 * * *',  # 6h da manhã
    start_date=datetime(2025, 1, 1)
)

PythonOperator(
    task_id='scrape_dou',
    python_callable=scrape_dou_task,
    dag=dag
)
```

---

### 2. Firecrawl (Notícias)

**Documentação**: https://docs.firecrawl.dev  
**Preço**: $299/mês (50k páginas)

**Implementação**:
```python
# app/services/scraping/news_scraper.py
import httpx
from typing import List

class NewsScraperFirecrawl:
    API_KEY = os.getenv("FIRECRAWL_API_KEY")
    BASE_URL = "https://api.firecrawl.dev/v0"
    
    NEWS_SOURCES = [
        "https://g1.globo.com",
        "https://www.folha.uol.com.br",
        "https://www.estadao.com.br",
        "https://www.cnnbrasil.com.br",
        "https://www.correiobraziliense.com.br",
    ]
    
    async def search_keyword(self, keyword: str, limit: int = 50) -> List[dict]:
        """Busca keyword em notícias"""
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{self.BASE_URL}/search",
                headers={"Authorization": f"Bearer {self.API_KEY}"},
                json={
                    "query": keyword,
                    "limit": limit,
                    "lang": "pt"
                }
            )
            
            data = response.json()
            return [
                {
                    'keyword': keyword,
                    'title': item.get('title'),
                    'content': item.get('markdown', '')[:1000],
                    'url': item.get('url'),
                    'published_at': item.get('publishedTime'),
                    'source_type': 'news',
                    'source_name': self._extract_source(item.get('url'))
                }
                for item in data.get('data', [])
            ]
    
    def _extract_source(self, url: str) -> str:
        """Extrai nome da fonte da URL"""
        if 'g1.globo' in url:
            return 'G1'
        elif 'folha.uol' in url:
            return 'Folha de S.Paulo'
        elif 'estadao' in url:
            return 'Estadão'
        # ... mais fontes
        return 'Desconhecido'
```

**Celery Task** (roda de hora em hora):
```python
# app/workers/tasks.py
from celery import shared_task

@shared_task
def scrape_news_for_all_users():
    """Roda a cada hora"""
    users = db.query(User).filter(User.is_active == True).all()
    scraper = NewsScraperFirecrawl()
    
    for user in users:
        for keyword in user.keywords:
            mentions = await scraper.search_keyword(keyword)
            
            for mention in mentions:
                # Verifica se já existe (evita duplicatas)
                exists = db.query(Mention).filter(
                    Mention.url == mention['url'],
                    Mention.user_id == user.id
                ).first()
                
                if not exists:
                    # Salva + analisa + alerta
                    process_mention(mention, user)
```

---

### 3. Bright Data (Redes Sociais)

**Documentação**: https://brightdata.com/products/datasets/social-media  
**Preço**: $500/mês

**Implementação**:
```python
# app/services/scraping/social_scraper.py
import httpx

class SocialScraperBrightData:
    API_KEY = os.getenv("BRIGHT_DATA_API_KEY")
    BASE_URL = "https://api.brightdata.com/datasets/v3"
    
    async def scrape_twitter(self, keyword: str, limit: int = 100):
        """Busca tweets"""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.BASE_URL}/trigger",
                headers={"Authorization": f"Bearer {self.API_KEY}"},
                json={
                    "dataset_id": "gd_l7q7dkf244hwjntr0",  # Twitter dataset
                    "filters": [
                        {"keyword": keyword},
                        {"language": "pt"}
                    ],
                    "limit": limit
                }
            )
            
            snapshot_id = response.json()['snapshot_id']
            result = await self._wait_for_snapshot(snapshot_id)
            
            return [
                {
                    'source_type': 'twitter',
                    'source_name': f"@{tweet['username']}",
                    'url': tweet['url'],
                    'content': tweet['text'],
                    'published_at': tweet['timestamp'],
                    'engagement': {
                        'likes': tweet['favorite_count'],
                        'retweets': tweet['retweet_count']
                    }
                }
                for tweet in result
            ]
    
    async def _wait_for_snapshot(self, snapshot_id: str, max_wait: int = 300):
        """Aguarda Bright Data processar (pode levar até 5min)"""
        start = time.time()
        while time.time() - start < max_wait:
            response = await client.get(
                f"{self.BASE_URL}/snapshot/{snapshot_id}",
                headers={"Authorization": f"Bearer {self.API_KEY}"}
            )
            data = response.json()
            
            if data['status'] == 'ready':
                return data['data']
            
            await asyncio.sleep(10)  # Check a cada 10s
        
        raise TimeoutError("Bright Data snapshot timed out")
```

---

### 4. OpenAI (Análise de Sentimento)

**Modelo**: GPT-4 Turbo  
**Custo**: ~$0.01 por análise

**Implementação**:
```python
# app/services/ai_analyzer.py
from openai import AsyncOpenAI
import json

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class AIAnalyzer:
    
    async def analyze_sentiment(self, text: str, context: dict):
        """Analisa sentimento + urgência + sugestões"""
        
        prompt = f"""
Você é um analista político brasileiro especializado em reputação.

Analise o seguinte texto e retorne APENAS um JSON válido:

TEXTO:
{text}

CONTEXTO DO CLIENTE:
- Nome: {context.get('user_name')}
- Cargo: {context.get('role', 'Político')}
- Keywords: {context.get('keywords')}

RETORNE JSON:
{{
  "sentiment": "positive|negative|neutral",
  "sentiment_score": -1.0 a 1.0,
  "urgency": "low|medium|high|critical",
  "is_critical": true|false,
  "summary": "resumo em 1 frase",
  "suggested_action": "o que fazer",
  "entities": ["pessoas", "organizações"],
  "topics": ["tags"]
}}

REGRAS:
- is_critical = true se: ataque pessoal, fake news, processo judicial, escândalo
- urgency = critical se precisar resposta em < 2h
"""
        
        response = await client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            response_format={"type": "json_object"}
        )
        
        return json.loads(response.choices[0].message.content)
```

---

### 5. Sistema de Alertas

**WhatsApp** (Twilio):
```python
# app/services/alert_sender.py
from twilio.rest import Client

class AlertSender:
    def __init__(self):
        self.twilio = Client(
            os.getenv("TWILIO_ACCOUNT_SID"),
            os.getenv("TWILIO_AUTH_TOKEN")
        )
    
    async def send_whatsapp(self, phone: str, message: str):
        """Envia WhatsApp via Twilio"""
        self.twilio.messages.create(
            from_='whatsapp:+14155238886',  # Twilio sandbox
            body=message,
            to=f'whatsapp:{phone}'
        )
    
    def _format_message(self, mention, analysis):
        """Formata mensagem de alerta"""
        emoji = "🚨" if analysis['urgency'] == 'critical' else "⚠️"
        
        return f"""
{emoji} ALERTA SENTINELA

📰 {mention.source_name}
📅 {mention.published_at.strftime('%d/%m %H:%M')}

📝 {mention.title}

😡 Sentimento: {analysis['sentiment'].upper()} ({analysis['sentiment_score']:.2f})

💡 {analysis['summary']}

🎯 Ação: {analysis['suggested_action']}

🔗 {mention.url}
📊 Dashboard: https://app.sentinela.com/mentions/{mention.id}
"""
```

---

## 🎨 FRONTEND - COMPONENTES CHAVE

### Dashboard Home
```tsx
// src/pages/Dashboard.tsx
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => fetch('/api/v1/dashboard/stats').then(r => r.json()),
    refetchInterval: 30000 // Atualiza a cada 30s
  })
  
  return (
    <div className="p-6 space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard
          title="Menções"
          value={stats?.mentions_24h}
          subtitle="últimas 24h"
          icon={Bell}
        />
        <KPICard
          title="Críticas"
          value={stats?.critical_24h}
          subtitle="precisam atenção"
          icon={AlertCircle}
          variant="danger"
        />
        {/* Mais KPIs... */}
      </div>
      
      {/* Gráfico de Sentimento */}
      <SentimentChart data={stats?.sentiment_breakdown} />
      
      {/* Alertas Críticos */}
      <CriticalAlerts />
    </div>
  )
}
```

### Timeline de Menções
```tsx
// src/components/MentionCard.tsx
interface MentionCardProps {
  mention: Mention
  onRespond: () => void
  onDismiss: () => void
}

export function MentionCard({ mention, onRespond, onDismiss }: MentionCardProps) {
  const sentimentColor = {
    positive: 'text-green-600',
    neutral: 'text-gray-600',
    negative: 'text-red-600'
  }[mention.sentiment]
  
  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SourceIcon type={mention.source_type} />
          <span className="font-medium">{mention.source_name}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(mention.published_at)}
        </span>
      </div>
      
      {/* Título */}
      <h3 className="text-lg font-semibold mb-2">{mention.title}</h3>
      
      {/* Sentimento */}
      <div className={`flex items-center gap-2 mb-4 ${sentimentColor}`}>
        <SentimentIcon sentiment={mention.sentiment} />
        <span className="font-medium">
          {mention.sentiment.toUpperCase()} ({mention.sentiment_score.toFixed(2)})
        </span>
      </div>
      
      {/* Resumo IA */}
      <p className="text-sm mb-4">{mention.ai_summary}</p>
      
      {/* Sugestão de Ação */}
      {mention.ai_suggested_action && (
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Sugestão IA</AlertTitle>
          <AlertDescription>{mention.ai_suggested_action}</AlertDescription>
        </Alert>
      )}
      
      {/* Ações */}
      <div className="flex gap-2 mt-4">
        <Button variant="outline" onClick={() => window.open(mention.url)}>
          Ver original
        </Button>
        <Button onClick={onRespond}>Responder</Button>
        <Button variant="ghost" onClick={onDismiss}>Ignorar</Button>
      </div>
    </Card>
  )
}
```

---

## 🧪 TESTES

### Backend (Pytest)
```python
# tests/test_ai_analyzer.py
import pytest
from app.services.ai_analyzer import AIAnalyzer

@pytest.mark.asyncio
async def test_analyze_negative_mention():
    analyzer = AIAnalyzer()
    
    text = "Deputado João é investigado pela PF por corrupção"
    context = {"user_name": "João Silva", "role": "Deputado"}
    
    result = await analyzer.analyze_sentiment(text, context)
    
    assert result['sentiment'] == 'negative'
    assert result['sentiment_score'] < -0.5
    assert result['urgency'] in ['high', 'critical']
    assert result['is_critical'] == True

@pytest.mark.asyncio
async def test_analyze_positive_mention():
    text = "Deputado João recebe prêmio por projeto de lei inovador"
    result = await analyzer.analyze_sentiment(text, {})
    
    assert result['sentiment'] == 'positive'
    assert result['sentiment_score'] > 0.5
```

### Frontend (Vitest)
```typescript
// tests/Dashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import Dashboard from '@/pages/Dashboard'

describe('Dashboard', () => {
  it('renders KPIs correctly', async () => {
    render(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Menções')).toBeInTheDocument()
      expect(screen.getByText('47')).toBeInTheDocument()
    })
  })
  
  it('shows critical alerts', async () => {
    render(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText(/ALERTA CRÍTICO/)).toBeInTheDocument()
    })
  })
})
```

---

## 🚀 DEPLOY

### Variáveis de Ambiente (.env)
```bash
# Database
DATABASE_URL=postgresql://user:pass@postgres:5432/sentinela
REDIS_URL=redis://redis:6379/0

# APIs Externas
OPENAI_API_KEY=sk-...
FIRECRAWL_API_KEY=fc-...
BRIGHT_DATA_API_KEY=...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TELEGRAM_BOT_TOKEN=...
SENDGRID_API_KEY=SG...

# App Config
SECRET_KEY=...
ENVIRONMENT=production
SENTRY_DSN=https://...
```

### Docker Compose (Produção)
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  api:
    image: sentinela-api:latest
    restart: always
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis
  
  worker:
    image: sentinela-api:latest
    restart: always
    command: celery -A app.workers.celery_app worker -l info
    depends_on:
      - redis
  
  frontend:
    image: sentinela-frontend:latest
    restart: always
    ports:
      - "3000:3000"
  
  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - /etc/letsencrypt:/etc/letsencrypt
```

---

## ⚠️ PROBLEMAS COMUNS & SOLUÇÕES

### 1. Bright Data retorna snapshot vazio
**Causa**: Keywords muito específicos, idioma errado  
**Solução**: Usar keywords mais genéricos, verificar filtro de linguagem

### 2. Alertas WhatsApp não chegam
**Causa**: Twilio sandbox precisa opt-in  
**Solução**: Usuário precisa enviar "join [code]" primeiro

### 3. IA retorna JSON inválido
**Causa**: GPT-4 às vezes adiciona texto antes/depois do JSON  
**Solução**: Strip com regex antes de JSON.parse()
```python
import re
import json

response_text = response.choices[0].message.content
# Remove markdown code blocks
clean_text = re.sub(r'```json\n?|```\n?', '', response_text).strip()
return json.loads(clean_text)
```

### 4. Dashboard lento (>5s load)
**Causa**: Queries sem índices  
**Solução**: Adicionar índices nas colunas filtradas
```sql
CREATE INDEX idx_mentions_user_published 
ON mentions(user_id, published_at DESC);
```

---

## 📝 CHECKLIST DE QUALIDADE

### Antes de Fazer PR

- [ ] Código segue PEP 8 (Python) / Airbnb Style (TS)
- [ ] Testes passando (>70% coverage)
- [ ] Sem console.log / print() esquecidos
- [ ] Variáveis sensíveis em .env (não hardcoded)
- [ ] Docstrings em funções públicas
- [ ] Error handling adequado (try/except, .catch())
- [ ] Logs estruturados (Loguru com context)
- [ ] Performance aceitável (<500ms APIs, <3s frontend)

### Antes de Deploy

- [ ] Migrations rodaram com sucesso
- [ ] Variáveis de produção configuradas
- [ ] Backups automáticos habilitados
- [ ] Monitoring ativo (Sentry + Grafana)
- [ ] Rate limiting configurado
- [ ] SSL certificates válidos
- [ ] Health checks funcionando (`/health`)

---

## 🎓 RECURSOS DE APRENDIZADO

### Documentações Oficiais
- [FastAPI](https://fastapi.tiangolo.com)
- [React](https://react.dev)
- [Celery](https://docs.celeryproject.org)
- [Airflow](https://airflow.apache.org/docs/)
- [PostgreSQL](https://www.postgresql.org/docs/)

### Tutoriais Específicos
- [Firecrawl Quickstart](https://docs.firecrawl.dev/quickstart)
- [Bright Data Social Media](https://docs.brightdata.com/scraping-automation/datasets/social-media)
- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)
- [Twilio WhatsApp](https://www.twilio.com/docs/whatsapp)

---

## 🤖 PROMPTS ÚTEIS PARA IAs

### Para Criar Nova Feature
```
Contexto: [cole este MEMORY.md inteiro]

Tarefa: Implementar feature [X] seguindo os padrões do projeto.

Requisitos:
1. Backend: API endpoint + service + model + testes
2. Frontend: Componente React + integração API
3. Documentação: Atualizar README e API docs

Siga EXATAMENTE a arquitetura e padrões descritos no MEMORY.md.
```

### Para Debug
```
Contexto: [cole MEMORY.md]

Problema: [descreva o erro]

Logs: [cole logs relevantes]

Tarefa: Identificar causa raiz e propor solução seguindo boas práticas do projeto.
```

### Para Refatoração
```
Contexto: [cole MEMORY.md]

Código atual: [cole código]

Tarefa: Refatorar seguindo princípios:
1. PARETO (simplicidade)
2. Performance
3. Padrões do projeto (ver MEMORY.md)
```

---

## 🎯 META-INSTRUÇÕES PARA IAs

### O que SEMPRE fazer:
✅ Seguir arquitetura descrita neste documento  
✅ Usar bibliotecas/APIs mencionadas (não reinventar)  
✅ Adicionar logs estruturados  
✅ Escrever testes  
✅ Pensar em performance desde o início  
✅ Fazer code review mental antes de responder  

### O que NUNCA fazer:
❌ Propor arquitetura diferente sem justificativa forte  
❌ Usar bibliotecas não listadas sem perguntar  
❌ Ignorar requisitos de performance (< 2min alerta, < 3s dashboard)  
❌ Esquecer error handling  
❌ Hardcodear credenciais/secrets  
❌ Criar código over-engineered (KISS!)  

---

**🧠 FIM DO MEMORY - Documento versão 1.0 (14/11/2025)**

_Este documento deve ser atualizado sempre que arquitetura ou decisões técnicas mudarem._
