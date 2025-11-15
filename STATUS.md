# 📊 STATUS - Acompanhamento do Projeto SENTINELA

**Última atualização**: 14 de Novembro de 2025  
**Fase atual**: PLANEJAMENTO → MVP  
**Meta**: Faturar R$ 50M em 2026

---

## 🎯 VISÃO GERAL

### Objetivo
Lançar MVP do SENTINELA em **90 dias** (Jan-Mar 2026) com 30 clientes beta pagos.

### Progresso Geral
```
[████░░░░░░░░░░░░░░░░] 20% - Planejamento completo
```

---

## 📅 TIMELINE & MILESTONES

### ✅ FASE 0: PLANEJAMENTO (Concluída - Nov 2025)
**Duração**: 1 semana  
**Status**: ✅ 100% COMPLETO

- [x] PRD completo (PS³E framework)
- [x] Arquitetura técnica definida
- [x] Stack technology escolhido
- [x] Integrações mapeadas (Firecrawl, Bright Data, Ro-DOU)
- [x] Modelo de dados desenhado
- [x] Documentação inicial (README, MEMORY, requirements)

**Decisões chave**:
- Python + FastAPI (backend)
- React + TypeScript (frontend)
- PostgreSQL + Redis (dados)
- Agregação de APIs (não scraping do zero)
- Distribuição via lobistas (30-40% comissão)

---

### ⏳ FASE 1: MVP - SPRINT 1-2 (Semanas 1-4 | Jan 2026)
**Status**: 🔜 NÃO INICIADO  
**Objetivo**: Backend foundation + Auth + DOU integration

#### Sprint 1 (Semanas 1-2)
**Meta**: Backend rodando com auth + primeiro scraper (DOU)

**Tasks**:
- [ ] Setup repositório GitHub
- [ ] Docker Compose configurado
- [ ] Estrutura de pastas criada
- [ ] Models SQLAlchemy (User, Mention, Alert)
- [ ] Migrations Alembic rodando
- [ ] Autenticação JWT implementada
- [ ] CRUD de usuários funcionando
- [ ] Fork do Ro-DOU integrado
- [ ] Primeiro Airflow DAG (DOU diário)
- [ ] Testes unitários (>70% coverage)

**Entregáveis**:
- API rodando em `localhost:8000/docs`
- Endpoint `/auth/login` funcionando
- Endpoint `/users/me` retorna usuário logado
- DOU sendo raspado diariamente (simulado em dev)

**Bloqueadores conhecidos**:
- [ ] Nenhum ainda

#### Sprint 2 (Semanas 3-4)
**Meta**: Scraping de notícias + IA + Sistema de alertas

**Tasks**:
- [ ] Integrar Firecrawl API
- [ ] Scraping de G1, Folha, Estadão, CNN
- [ ] Celery workers configurados
- [ ] OpenAI integration (análise sentimento)
- [ ] Lógica de classificação de urgência
- [ ] Twilio WhatsApp integration
- [ ] Telegram Bot integration
- [ ] SendGrid email integration
- [ ] AlertService completo
- [ ] Testes de integração

**Entregáveis**:
- Notícias sendo raspadas de hora em hora
- Cada menção analisada por IA automaticamente
- Alertas críticos enviados via WhatsApp/Telegram

**Riscos**:
- Firecrawl pode ter rate limits → Mitigação: Cache agressivo
- OpenAI pode ser lento → Mitigação: Queue assíncrona

---

### ⏳ FASE 2: MVP - SPRINT 3-4 (Semanas 5-8 | Fev 2026)
**Status**: 🔜 NÃO INICIADO  
**Objetivo**: Frontend dashboard + Redes sociais

#### Sprint 3 (Semanas 5-6)
**Meta**: Dashboard político funcionando

**Tasks**:
- [ ] Setup Vite + React + TypeScript
- [ ] Configurar Tailwind + shadcn/ui
- [ ] Tela de Login
- [ ] Dashboard Home (KPIs + gráficos)
- [ ] Timeline de menções
- [ ] Mapa de calor (onde/quando)
- [ ] Tela de configurações
- [ ] Integração com API backend
- [ ] React Query configurado
- [ ] Responsive (mobile-first)

**Entregáveis**:
- Dashboard acessível em `localhost:3000`
- Usuário consegue logar e ver menções
- Interface simples e clara (político entende sem ajuda)

#### Sprint 4 (Semanas 7-8)
**Meta**: Redes sociais + Testes + Deploy beta

**Tasks**:
- [ ] Integrar Bright Data (Twitter/X)
- [ ] Scraping de Facebook (se viável)
- [ ] Geração de relatórios PDF
- [ ] Testes end-to-end (Playwright)
- [ ] Setup CI/CD (GitHub Actions)
- [ ] Deploy em staging (DigitalOcean)
- [ ] Load testing (50 usuários simultâneos)
- [ ] Bug fixes & polish

**Entregáveis**:
- Twitter sendo monitorado
- Relatório PDF semanal funcionando
- App rodando em `staging.sentinela.com`

---

### ⏳ FASE 3: BETA TESTING (Semanas 9-12 | Mar 2026)
**Status**: 🔜 NÃO INICIADO  
**Objetivo**: 10 clientes beta usando + feedback loop

**Meta**: 10 clientes beta pagos (R$ 5k/mês) por 30 dias

**Tasks**:
- [ ] Recrutar 10 beta testers (via lobistas parceiros)
- [ ] Onboarding call individual (30min cada)
- [ ] Configurar keywords personalizadas
- [ ] Monitorar uso diário (Mixpanel)
- [ ] Daily feedback calls
- [ ] Bug fixes urgentes (<24h)
- [ ] Iterar baseado em feedback
- [ ] Coletar depoimentos (casos de sucesso)
- [ ] Calcular NPS (meta: >50)
- [ ] Preparar para Go-to-Market

**Critério de sucesso**:
- ≥8/10 clientes renovam após 30 dias
- NPS ≥ 50
- Tempo de resposta a alertas < 2min (P95)
- Dashboard load < 3s (P95)
- Zero data loss ou security incidents

**Riscos**:
- Lobistas não conseguem recrutar 10 clientes → Mitigação: Buscar direto com assessores conhecidos
- Usuários não entendem produto → Mitigação: Melhorar onboarding + UX

---

## 📈 MÉTRICAS DE ACOMPANHAMENTO

### Desenvolvimento
| Métrica | Meta | Atual | Status |
|---------|------|-------|--------|
| PRD finalizado | Sim | ✅ Sim | ✅ |
| Arquitetura definida | Sim | ✅ Sim | ✅ |
| Backend setup | Sim | ⏳ Não | 🔜 |
| Frontend setup | Sim | ⏳ Não | 🔜 |
| Integrações OK | 5/5 | 0/5 | 🔜 |
| Testes coverage | >70% | 0% | 🔜 |

### Produto (Pós-MVP)
| Métrica | Meta Q1 | Meta Q2 | Meta Q3 | Meta Q4 | Atual |
|---------|---------|---------|---------|---------|-------|
| Clientes ativos | 30 | 100 | 250 | 300 | 0 |
| MRR | R$ 450k | R$ 1.8M | R$ 5.5M | R$ 7.5M | R$ 0 |
| NPS | >50 | >60 | >65 | >70 | - |
| Churn | <10% | <5% | <3% | <3% | - |

---

## 🚧 BLOQUEADORES ATUAIS

### Críticos (Impedem progresso)
_Nenhum bloqueador crítico no momento_

### Importantes (Podem atrasar)
1. **API Keys pendentes**:
   - ⏳ Firecrawl account (precisa criar)
   - ⏳ Bright Data account (precisa criar)
   - ⏳ Twilio WhatsApp approval (pode levar 3-5 dias)
   - ⏳ OpenAI API (fácil, mas precisa cartão)

**Ações**:
- [ ] Criar contas nas APIs listadas
- [ ] Solicitar aumento de limites (Twilio, OpenAI)
- [ ] Validar custos reais antes de escalar

### Nice-to-have (Não bloqueiam MVP)
- Telegram Bot approval (pode usar sandbox)
- SendGrid tier upgrade (500 emails grátis suficiente pra beta)

---

## 💰 ORÇAMENTO & CUSTOS

### Investimento Inicial (MVP)
| Item | Valor | Status |
|------|-------|--------|
| Desenvolvimento (400h) | R$ 60-100k | ⏳ Pendente |
| APIs (3 meses) | R$ 18.6k | ⏳ Pendente |
| **TOTAL MVP** | **R$ 78.6-118.6k** | |

### Custos Mensais (Produção)
| Item | Valor/mês |
|------|-----------|
| Infra (DO/AWS) | R$ 700 |
| Firecrawl | R$ 1.500 |
| Bright Data | R$ 2.500 |
| OpenAI | R$ 1.000 |
| Twilio (WhatsApp) | R$ 300 |
| SendGrid | R$ 150 |
| Monitoring (Sentry) | R$ 200 |
| **TOTAL** | **R$ 6.350/mês** |

### Break-even
- Custo operacional: R$ 6.350/mês
- Ticket médio: R$ 15.000/mês
- **Break-even**: 1 cliente (coberto com sobra!)

---

## 🎯 PRÓXIMAS AÇÕES (Esta Semana)

### Urgente (Fazer HOJE)
1. [ ] Criar contas: Firecrawl, Bright Data, OpenAI, Twilio
2. [ ] Setup repositório GitHub (estrutura inicial)
3. [ ] Call com Leopoldo (kick-off, alinhar sprints)

### Importante (Fazer esta semana)
4. [ ] Recrutar 3 lobistas master como sócios estratégicos
5. [ ] LOI (Letter of Intent) de 10 clientes piloto
6. [ ] Setup CNPJ (se ainda não tiver)
7. [ ] Contratar advogado (retainer R$ 15k/mês)

### Nice-to-have
8. [ ] Criar deck de vendas para lobistas
9. [ ] Mockups de interface (Figma)
10. [ ] Pesquisar concorrentes (Knewin pricing, features)

---

## 📝 DECISÕES PENDENTES

### Arquitetura
- [ ] **Hosting**: AWS vs DigitalOcean vs Heroku? (Recomendação: DO - mais barato)
- [ ] **Monitoring**: Sentry + Grafana vs New Relic? (Recomendação: Sentry + Grafana)
- [ ] **CDN**: CloudFlare vs AWS CloudFront? (Recomendação: CloudFlare - free tier suficiente)

### Produto
- [ ] **Pricing final**: R$ 15k ou R$ 18k/mês? (Testar com beta users)
- [ ] **Contratos**: Mensal ou só anual? (Oferecer os 2, anual com 20% desconto)
- [ ] **Onboarding**: Automático ou call obrigatória? (Call obrigatória pro beta, automatizar depois)

### Comercial
- [ ] **Comissão lobistas**: 30% ou 40%? (40% nos primeiros 3 meses, depois 30%)
- [ ] **Modelo de precificação**: Flat ou por keyword? (Flat - mais simples)

---

## 🐛 BUGS & ISSUES CONHECIDOS

_Nenhum bug conhecido ainda (projeto não iniciou desenvolvimento)_

---

## 💡 IDEIAS & BACKLOG (V2+)

### Features Sugeridas (Não priorizadas)
- [ ] Integração com WhatsApp Business API nativo (não Twilio)
- [ ] Módulo "Campanha 2026" (features específicas pra eleição)
- [ ] War Room dashboard (tempo real pra gestão de crise)
- [ ] Comparação com concorrentes ("Deputado X vs Y")
- [ ] Previsão de tendências com ML
- [ ] Análise de vídeo/áudio (YouTube, TikTok)
- [ ] API pública pra parceiros
- [ ] White-label pra lobistas colocarem própria marca

---

## 🎤 FEEDBACK DOS STAKEHOLDERS

### Lobistas Parceiros
_Ainda não validado - agendar calls_

**Perguntas a fazer**:
1. Comissão 30-40% é atraente?
2. Ticket de R$ 15-18k/mês é viável?
3. Conseguem fechar 10 clientes piloto?
4. Quais features são must-have vs nice-to-have?

### Beta Users (Futuros)
_Pendente recrutamento_

---

## 📞 CONTATOS IMPORTANTES

### Time Core
- **CEO/Product**: Dr. Rodolfo Cecílio Filho
  - Email: [preencher]
  - WhatsApp: [preencher]

- **Tech Lead**: Leopoldo
  - Email: [preencher]
  - WhatsApp: [preencher]

### Parceiros Potenciais
_Lista de lobistas/consultores a contatar_
1. [Nome] - [Cargo] - [Contato]
2. [Nome] - [Cargo] - [Contato]
3. [Nome] - [Cargo] - [Contato]

---

## 📚 RECURSOS & LINKS ÚTEIS

### Documentação
- [PRD.md](./PRD.md) - Product Requirements Document
- [README.md](./README.md) - Guia técnico geral
- [MEMORY.md](./MEMORY.md) - Instruções para IAs
- [requirements.txt](./requirements.txt) - Dependências Python

### Ferramentas
- **Repo GitHub**: [URL do repo]
- **Trello/Jira**: [URL do board]
- **Slack**: #sentinela-dev
- **Figma**: [URL dos mockups]
- **Staging**: https://staging.sentinela.com (após deploy)

### Referências
- [Ro-DOU GitHub](https://github.com/gestaogovbr/Ro-dou)
- [Firecrawl Docs](https://docs.firecrawl.dev)
- [Bright Data API](https://docs.brightdata.com)
- [Pesquisa Knewin 2025](https://www.knewin.com/panorama-gestao-de-reputacao-no-brasil-2025/)

---

## 🔄 CHANGELOG (Atualizações deste documento)

### [1.0] - 2025-11-14
- ✅ Criação inicial do STATUS.md
- ✅ Estrutura de sprints definida
- ✅ Métricas e metas estabelecidas
- ✅ Timeline de 90 dias mapeada

---

**Próxima atualização**: Segunda-feira após Sprint 1 iniciar

**Responsável**: Dr. Rodolfo Cecílio Filho  
**Frequência de atualização**: Semanal (toda segunda-feira)

---

_"O segredo para chegar na frente é começar." - Mark Twain_

🚀 **BORA FAZER ACONTECER!**
