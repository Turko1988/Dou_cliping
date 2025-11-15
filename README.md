# 🛡️ SENTINELA - Plataforma de Inteligência Reputacional

> Monitoramento 24/7 de reputação online para políticos, gabinetes e órgãos públicos brasileiros

[![Status](https://img.shields.io/badge/status-MVP%20em%20desenvolvimento-yellow)]()
[![Stack](https://img.shields.io/badge/stack-Python%20%7C%20FastAPI%20%7C%20React-blue)]()
[![License](https://img.shields.io/badge/license-Proprietary-red)]()

---

## 🎯 O QUE É O SENTINELA?

**SENTINELA** é uma plataforma SaaS que agrega múltiplas fontes de informação (notícias, redes sociais, Diário Oficial) em um dashboard unificado, usando IA para análise de sentimento e enviando alertas em tempo real via WhatsApp/Telegram quando há menções críticas.

### Problema que Resolve
Políticos e gabinetes gastam **3-5 horas/dia** fazendo clipping manual e descobrem crises reputacionais **horas depois** de já terem viralizado. O Sentinela automatiza 95% desse trabalho e alerta em **< 2 minutos**.

### Público-Alvo
- Deputados Federais/Estaduais
- Senadores
- Prefeitos e Secretários
- Gabinetes parlamentares
- Órgãos públicos

---

## ✨ FEATURES PRINCIPAIS

### 🔍 Monitoramento Multicanal
- **Notícias**: G1, Folha, Estadão, CNN, UOL + 100+ portais regionais
- **Redes Sociais**: Twitter/X, Facebook, Instagram
- **Documentos Oficiais**: Diário Oficial da União (DOU) + Estados
- **Processos**: Jusbrasil, Escavador (roadmap V2)

### 🤖 Inteligência Artificial
- Análise de sentimento contextual (Positivo/Negativo/Neutro)
- Classificação de urgência (Crítico/Alto/Médio/Baixo)
- Sugestões automáticas de ação
- Identificação de entidades (pessoas, organizações)

### 📱 Alertas em Tempo Real
- **WhatsApp** (mensagens CRÍTICAS)
- **Telegram** (alertas HIGH + CRITICAL)
- **Email** (todos os alertas + resumos)
- Notificações configuráveis por tipo de urgência

### 📊 Dashboard Político
- Interface mobile-first (70% dos usuários usam celular)
- 5 telas principais: Home, Timeline, Mapa de Calor, Alertas, Configurações
- Relatórios PDF automáticos (semanal/mensal)
- Gráficos de evolução de sentimento

---

## 🏗️ ARQUITETURA TÉCNICA

### Stack Backend
```
Python 3.11+
├── FastAPI (framework web)
├── SQLAlchemy + PostgreSQL (database)
├── Celery + Redis (background jobs)
├── Apache Airflow (orquestração de scraping)
└── OpenAI/Anthropic (análise IA)
```

### Stack Frontend
```
React 18 + TypeScript
├── Tailwind CSS (estilização)
├── shadcn/ui (componentes)
├── React Query (state management)
└── Recharts (gráficos)
```

### Integrações Externas
- **Ro-DOU** (fork open-source): Diário Oficial
- **Firecrawl**: Scraping de notícias
- **Bright Data**: Scraping de redes sociais + proxies
- **Twilio**: WhatsApp Business API
- **Telegram Bot API**: Notificações
- **SendGrid**: Emails transacionais

---

### ⚠️ Nota Sobre o Setup: Ro-DOU vs. Sentinela
> **Este repositório está em transição.** O `README` abaixo descreve a visão de produto do **Sentinela**, um MVP a ser construído. No entanto, a base de código e a configuração `docker-compose` atuais correspondem ao projeto **Ro-DOU**, um ambiente Apache Airflow funcional.
>
> **Para rodar o projeto no estado atual (Ro-DOU), siga as instruções abaixo.** As instruções do "QUICKSTART" original referem-se a componentes do Sentinela que ainda serão desenvolvidos.

### Setup Rápido (Ambiente Ro-DOU Atual)
1.  **Pré-requisito:** Docker e Docker Compose instalados.
2.  **Comando:** No terminal, na raiz do projeto, execute:
    ```bash
    # Crie um arquivo .env vazio, pois o .env.example pode não existir
    touch .env
    # Suba os containers. Use 'sudo' se necessário.
    sudo docker compose up -d
    ```
3.  **Acesso aos Serviços:**
    *   **Apache Airflow:** [http://localhost:8080](http://localhost:8080) (usuário: `airflow`, senha: `airflow`)
    *   **Smtp4dev (E-mails):** [http://localhost:5001](http://localhost:5001)

---

## 🚀 QUICKSTART

### Pré-requisitos
```bash
- Docker 24+ & Docker Compose
- Node.js 18+ (frontend)
- Python 3.11+ (backend)
- PostgreSQL 15+
- Redis 7+
```

### Setup Local (5 minutos)

```bash
# 1. Clone o repositório
git clone https://github.com/rodolfocecilio/sentinela.git
cd sentinela

# 2. Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas API keys

# 3. Suba os containers
docker-compose up -d

# 4. Rode as migrations
docker-compose exec api alembic upgrade head

# 5. Crie um super admin
docker-compose exec api python -m app.scripts.create_admin \
  --email admin@sentinela.com \
  --password SuaSenhaSegura123

# 6. Acesse a aplicação
# Frontend: http://localhost:3000
# API Docs: http://localhost:8000/docs
# Airflow: http://localhost:8080 (admin/admin)
```

### Primeiro Uso

1. **Login**: Acesse `http://localhost:3000` com credenciais admin
2. **Configure Keywords**: Adicione palavras-chave pra monitorar (ex: "Seu Nome", "Seu Cargo")
3. **Configure Alertas**: Conecte WhatsApp/Telegram nas Configurações
4. **Aguarde**: Scraping roda de hora em hora (ou force manualmente no Airflow)
5. **Veja Dashboard**: Menções aparecerão na Timeline

---

## 📁 ESTRUTURA DO PROJETO

```
sentinela/
│
├── backend/
│   ├── app/
│   │   ├── api/v1/          # Endpoints REST
│   │   ├── core/            # Config, auth, database
│   │   ├── models/          # SQLAlchemy models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Lógica de negócio
│   │   │   ├── scraping/    # Scrapers (DOU, news, social)
│   │   │   ├── ai_analyzer.py
│   │   │   └── alert_sender.py
│   │   └── workers/         # Celery tasks
│   ├── airflow/
│   │   └── dags/            # Jobs agendados
│   ├── tests/
│   ├── alembic/             # Database migrations
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Telas principais
│   │   ├── services/        # API clients
│   │   └── lib/             # Utilitários
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── docs/
│   ├── PRD.md               # Product Requirements Document
│   ├── MEMORY.md            # Instruções para IAs
│   └── API.md               # Documentação de API
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🛠️ DESENVOLVIMENTO

### Rodando Testes

```bash
# Backend (pytest)
docker-compose exec api pytest -v

# Frontend (vitest)
cd frontend && npm test

# Coverage
docker-compose exec api pytest --cov=app --cov-report=html
```

### Linting & Formatting

```bash
# Backend
docker-compose exec api black app/
docker-compose exec api isort app/
docker-compose exec api flake8 app/

# Frontend
cd frontend
npm run lint
npm run format
```

### Migrations (DB Schema)

```bash
# Criar nova migration
docker-compose exec api alembic revision --autogenerate -m "Add new table"

# Aplicar migrations
docker-compose exec api alembic upgrade head

# Rollback
docker-compose exec api alembic downgrade -1
```

### Debugging

```bash
# Ver logs em tempo real
docker-compose logs -f api
docker-compose logs -f worker
docker-compose logs -f frontend

# Acessar container
docker-compose exec api bash
docker-compose exec postgres psql -U user -d sentinela
```

---

## 📚 DOCUMENTAÇÃO

### Para Desenvolvedores
- **[PRD.md](./PRD.md)**: Product Requirements Document completo
- **[MEMORY.md](./MEMORY.md)**: Instruções detalhadas para IAs desenvolvedoras
- **[API Docs](http://localhost:8000/docs)**: Swagger UI automático (FastAPI)
- **[requirements.txt](./requirements.txt)**: Dependências Python

### Para Product Managers
- **[STATUS.md](./STATUS.md)**: Acompanhamento de sprints e features
- **[Roadmap](./docs/ROADMAP.md)**: Planejamento V1, V2, V3+
- **[Analytics](./docs/ANALYTICS.md)**: Métricas e KPIs

---

## 🌐 DEPLOYMENT

### Produção (AWS/DigitalOcean)

```bash
# 1. Configure secrets no servidor
ssh user@servidor
cd /opt/sentinela
cp .env.production .env

# 2. Deploy com Docker Compose
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d --build

# 3. Rode migrations
docker-compose -f docker-compose.prod.yml exec api alembic upgrade head

# 4. Configure SSL (Nginx + Let's Encrypt)
sudo certbot --nginx -d app.sentinela.com.br

# 5. Configure backups automáticos
# Ver docs/BACKUP.md
```

### CI/CD (GitHub Actions)

Pipeline automático configurado:
- ✅ Lint + Tests em cada PR
- ✅ Build Docker images
- ✅ Deploy automático em staging (branch `develop`)
- ✅ Deploy manual em produção (branch `main`)

---

## 🤝 CONTRIBUINDO

### Workflow de Desenvolvimento

1. Crie uma branch: `git checkout -b feature/nova-feature`
2. Faça commits descritivos: `git commit -m "feat: adiciona scraping do Instagram"`
3. Push: `git push origin feature/nova-feature`
4. Abra PR no GitHub
5. Aguarde code review
6. Merge após aprovação

### Padrões de Código

- **Python**: PEP 8 + Black formatter
- **TypeScript**: Airbnb Style Guide
- **Commits**: Conventional Commits (feat:, fix:, docs:, etc)
- **Branches**: `feature/`, `bugfix/`, `hotfix/`

---

## 📊 MÉTRICAS & MONITORAMENTO

### Ferramentas
- **Sentry**: Error tracking
- **Grafana + Prometheus**: Métricas de infra
- **BetterStack**: Logs centralizados
- **Google Analytics**: Uso do frontend

### KPIs Principais
- **Performance**: Alerta < 2min | Dashboard < 3s
- **Uptime**: 99.5% SLA
- **Usuários ativos**: 80% acessam ≥3x/semana
- **NPS**: > 60

---

## 🔐 SEGURANÇA

- ✅ Autenticação JWT com refresh tokens
- ✅ Rate limiting (100 req/min por IP)
- ✅ Input validation (Pydantic schemas)
- ✅ SQL injection protection (SQLAlchemy ORM)
- ✅ CORS configurado corretamente
- ✅ Secrets em variáveis de ambiente
- ✅ HTTPS obrigatório em produção
- ✅ Backups diários encriptados

---

## 📞 SUPORTE & CONTATO

### Time Core
- **CEO/Product**: Dr. Rodolfo Cecílio Filho
- **Tech Lead**: Leopoldo (Dev Backend/Frontend)

### Canais
- 🐛 **Bugs**: Abra uma issue no GitHub
- 💬 **Dúvidas**: Slack #sentinela-dev
- 📧 **Comercial**: contato@sentinela.com.br
- 📱 **Urgências**: WhatsApp +55 61 9xxxx-xxxx

---

## 📄 LICENÇA

Proprietary - © 2025 Sentinela Inteligência Digital Ltda.

Este é um software proprietário. O código-fonte é confidencial e não pode ser reproduzido, distribuído ou usado sem autorização expressa.

---

## 🗓️ CHANGELOG

### [0.1.0] - 2025-11-14 (MVP em desenvolvimento)
- ✅ Setup inicial do projeto
- ✅ PRD completo
- ✅ Arquitetura definida
- ⏳ Sprint 1: Backend foundation (em andamento)

---

**🚀 Vamos construir algo incrível!**

_Se você chegou até aqui, parabéns pela curiosidade. Agora bora codar! 💻_