# PRD - PROJETO SENTINELA
## Product Requirements Document

**Versão:** 1.0  
**Data:** 14 de Novembro de 2025  
**Autor:** Dr. Rodolfo Cecílio Filho  
**Framework:** PS³E  
**Status:** Em Desenvolvimento

---

## 📋 RESUMO EXECUTIVO

**SENTINELA** é uma plataforma SaaS de Inteligência Reputacional focada no mercado político-corporativo brasileiro. Agrega ferramentas de monitoramento dispersas (notícias, redes sociais, Diário Oficial) em um dashboard unificado com IA, alertas em tempo real e distribuição via canal de lobistas.

**Tese de Negócio:** Transformar ferramentas open-source e APIs existentes em uma solução premium B2G/B2B, faturando R$ 50+ milhões em 2026 através de licenciamento para gabinetes, secretarias e órgãos públicos.

**Diferencial:** Único no mercado com UX focada em não-técnicos (políticos/assessores), distribuição via lobistas (30-40% comissão recorrente) e timing perfeito (eleições 2026-2027).

---

## 🎯 PROBLEMA

### Descrição
Políticos, gabinetes parlamentares e órgãos públicos enfrentam 3 dores críticas na gestão de reputação:

1. **Monitoramento fragmentado**: Precisam consultar manualmente 10+ fontes diariamente (G1, Folha, Twitter, DOU, processos judiciais)
2. **Resposta lenta a crises**: Descobrem notícias negativas horas/dias depois, quando já viralizaram
3. **Ferramentas técnicas demais**: Soluções existentes (Knewin, LexisNexis) têm UX complexa para assessores não-técnicos

### Impacto Quantitativo
- **5.570 gabinetes federais** (594 parlamentares) + 26 governos estaduais
- **Tempo desperdiçado**: 3-5 horas/dia por assessor fazendo clipping manual
- **Custo de crise mal gerida**: R$ 500k - R$ 5M em danos reputacionais (estimativa baseada em casos reais)

### Impacto Qualitativo
- Estresse constante de assessores ("e se perdi algo importante?")
- Decisões políticas baseadas em informação atrasada
- Incapacidade de medir sentimento real da população

### Consequências de NÃO Resolver
- Crises reputacionais não gerenciadas destroem carreiras políticas
- Oportunidades de resposta rápida perdidas (ex: fake news se espalham)
- Lobistas/consultores perdem contratos por não oferecer inteligência em tempo real

---

## 💡 SOLUÇÃO

### Visão
Uma plataforma unificada que monitora 24/7 todas as menções a um político/órgão em notícias, redes sociais e documentos oficiais, usando IA para classificar urgência e enviar alertas instantâneos via WhatsApp/Telegram, com dashboard político simplificado e relatórios automáticos.

### Features Principais (MVP - 90 dias)

#### 1. **Monitoramento Multicanal Automatizado**
- **O que faz**: Scraping contínuo de 100+ fontes (G1, Folha, Estadão, CNN, UOL, portais regionais, Twitter/X, Facebook, DOU)
- **Por que importa**: Elimina 95% do trabalho manual de clipping
- **Exemplo de uso**: Assessor configura keywords "Deputado Silva" + "Projeto Lei 1234/2024" → Sistema monitora 24/7 automaticamente

#### 2. **Análise de Sentimento com IA Contextual**
- **O que faz**: Claude/GPT-4 analisa cada menção e classifica como Positiva/Negativa/Neutra + score (-1.0 a +1.0) + urgência (Crítico/Alto/Médio/Baixo)
- **Por que importa**: Filtra ruído - assessor só vê o que realmente importa
- **Exemplo de uso**: Notícia "Deputado Silva investigado por corrupção" → IA detecta sentimento NEGATIVO (-0.85) + urgência CRÍTICA → Alerta enviado em 30 segundos

#### 3. **Sistema de Alertas Multicanal Inteligente**
- **O que faz**: Envia notificações via WhatsApp, Telegram e Email baseado na urgência
- **Por que importa**: Político/assessor sempre sabem de crises no momento que acontecem
- **Exemplo de uso**: 
  - CRÍTICO → WhatsApp + Telegram + Email (vibra o celular)
  - ALTO → Telegram + Email
  - MÉDIO → Apenas notificação no dashboard

#### 4. **Dashboard Político Simplificado**
- **O que faz**: Interface mobile-first com 5 telas (Home KPIs, Timeline, Mapa de Calor, Alertas, Configurações)
- **Por que importa**: Político consegue entender em 30 segundos sem treinamento
- **Exemplo de uso**: Deputado abre app durante sessão → vê "12 menções nas últimas 2h, 1 crítica" → clica → lê resumo da IA em 10 segundos

#### 5. **Relatórios Executivos Automatizados**
- **O que faz**: PDF semanal/mensal com gráficos, top menções, análise de sentimento, sugestões de ação
- **Por que importa**: Líder político mostra para equipe/partido "veja como estou sendo visto"
- **Exemplo de uso**: Todo domingo 18h, PDF chega no WhatsApp do deputado com resumo da semana

### Fluxo de Uso Típico
1. **Assessor configura** keywords ("Prefeito João", "Secretaria Saúde", "Reforma Administrativa")
2. **Sistema monitora** 24/7 automaticamente
3. **IA analisa** cada menção e classifica urgência
4. **Alerta crítico** chega no WhatsApp do assessor às 14h32
5. **Assessor abre** dashboard, vê contexto completo em 20 segundos
6. **Toma decisão** se precisa nota oficial ou se pode ignorar
7. **Fim do dia** recebe resumo automático via Telegram

### Diferencial
- **Distribuição única**: Lobistas vendem (30-40% comissão) → CAC = R$ 0
- **UX político**: WhatsApp > Dashboard complexo | PDF > Dados brutos
- **IA contextual BR**: Entende jargão político brasileiro ("CPI", "Rapporteur", "Obstrução")
- **Timing perfeito**: Eleições 2026 (municipais) + 2027 (gerais) = 2 anos de boom

---

## 👥 PÚBLICO-ALVO

### Persona Principal: "Carlos, Chefe de Gabinete"
- **Idade**: 35-50 anos
- **Profissão**: Chefe de Gabinete de Deputado Federal
- **Dor principal**: Precisa monitorar reputação do deputado mas não tem tempo/equipe
- **Comportamento tech**: Usa WhatsApp e Instagram, não gosta de sistemas complexos (nota 6/10)
- **Objetivo ao usar**: Saber de qualquer menção ao deputado em < 5 minutos

### Persona Secundária: "Ana, Assessora de Imprensa"
- **Idade**: 28-40 anos
- **Profissão**: Assessora de Comunicação de Secretaria Estadual
- **Dor principal**: Fazer clipping manual demora 3h/dia
- **Comportamento tech**: Mais técnica (7/10), usa Google Alerts mas acha limitado
- **Objetivo ao usar**: Automatizar clipping + ter análise de sentimento

### Persona Terciária: "Político Sênior"
- **Idade**: 45-70 anos
- **Profissão**: Senador/Deputado/Governador
- **Dor principal**: Não tem visibilidade se reputação está boa ou ruim
- **Comportamento tech**: Baixa (4/10), equipe opera sistemas
- **Objetivo ao usar**: Ver relatório semanal simples "estou bem ou mal?"

### Contexto de Uso
- **Onde**: Gabinete (desktop) + Carro/Casa (mobile)
- **Quando**: 24/7 para alertas críticos | Manhã e tarde para revisão do dashboard
- **Como**: 70% mobile (WhatsApp/Telegram) + 30% desktop (dashboard completo)

---

## 📊 MÉTRICAS DE SUCESSO

### Produto (Quantitativas)
- **Adoção**: 300 clientes ativos pagantes até Dez/2026
- **Engajamento**: 80% dos usuários acessam dashboard ≥3x/semana
- **Performance**: 
  - Alerta crítico enviado em < 2 minutos da publicação
  - Dashboard carrega em < 3 segundos
  - 99.5% uptime
- **NPS**: Net Promoter Score > 60 (promotores - detratores)

### Impacto (Qualitativas)
- **Problema resolvido**: Reduz tempo de clipping de 3h/dia para 15min/dia (90% economia)
- **Benefício direto**: Cliente descobre crise 4-6 horas ANTES que concorrentes
- **Feedback esperado**: "Não consigo mais trabalhar sem o Sentinela"

### Meta de 6 Meses (Jun/2026)
- **MRR**: R$ 1.8M (100 clientes × R$ 18k/mês médio)
- **ARR Run Rate**: R$ 21.6M
- **Churn**: < 5% mensal
- **Tempo de resposta a alertas**: < 90 segundos (P95)

---

## 📦 ESCOPO

### V1 - MVP (3 meses | Jan-Mar 2026)

**Entra:**
- ✅ Monitoramento: DOU (Ro-DOU fork) + Notícias (Firecrawl API) + Twitter/X (Bright Data)
- ✅ Análise: IA sentimento (OpenAI GPT-4) + classificação urgência
- ✅ Alertas: WhatsApp + Telegram + Email
- ✅ Dashboard: 5 telas essenciais (Home, Timeline, Mapa, Configurações, Relatórios)
- ✅ Relatórios: PDF semanal automático
- ✅ Auth: JWT + RBAC (admin, cliente, assessor)
- ✅ Infra: Docker + PostgreSQL + Redis + Celery

**Critério de "pronto"**: 10 clientes beta usando por 30 dias com feedback positivo (NPS > 50)

### V2 - Expansão (6 meses | Abr-Jun 2026)

**Entra:**
- ✅ Monitoramento: Facebook + Instagram + YouTube
- ✅ Processos judiciais: Jusbrasil + Escavador integration
- ✅ Comparação com concorrentes: "Como Deputado X vs Deputado Y"
- ✅ Busca semântica: RAG com vetores (encontra menções indiretas)
- ✅ API pública: Parceiros/consultores podem integrar
- ✅ White-label: Lobistas podem colocar própria marca

### V3+ - Futuro (1 ano+ | Jul 2026+)

**Visão de longo prazo:**
- ✅ Previsão de tendências: ML prevê se sentimento vai piorar
- ✅ Módulo "Campanha": Features específicas para ano eleitoral
- ✅ War Room: Dashboard tempo real para gestão de crise 24/7
- ✅ Integração CRM: Salesforce, HubSpot (lobistas querem)
- ✅ Mobile app nativo: iOS + Android

### ❌ NÃO ENTRA (V1)

1. **Remoção de conteúdo** - Motivo: Questões legais complexas, foco é monitorar não apagar
2. **Análise de vídeo/áudio** - Motivo: Custo alto de processamento, 95% das menções são texto
3. **Rede social chinesa (WeChat, TikTok)** - Motivo: Baixa relevância para político BR
4. **Blockchain/Web3** - Motivo: Buzzword sem valor real para o caso de uso
5. **Automação de resposta** - Motivo: Político precisa aprovar, muito arriscado automatizar

**Importante**: Escopo pode mudar baseado em feedback de beta testers

---

## 🔒 REQUISITOS TÉCNICOS E REGULATÓRIOS

### Compliance
- ✅ **LGPD**: Dados tratados com base legal (execução de contrato) | Usuário pode exportar/deletar dados
- ✅ **Lei Eleitoral**: Não automatizar propaganda eleitoral | Apenas monitoramento passivo
- ✅ **Termos de Uso**: Cláusula clara "usuário responsável pelo uso da informação"
- ✅ **API Terms**: Respeitar rate limits de Twitter, G1, etc.

### Integrações Necessárias
- **Ro-DOU** (open source): Fork do GitHub + adaptações
- **Firecrawl**: API $299/mês para scraping de notícias
- **Bright Data**: API $500/mês para redes sociais + proxies
- **OpenAI/Anthropic**: API $200/mês para análise IA
- **Twilio**: WhatsApp Business API ~$300/mês
- **Telegram Bot API**: Gratuito
- **SendGrid**: Email transacional $150/mês

### Restrições Técnicas
- **Performance**: Alerta < 2min | Dashboard < 3s load | API < 500ms P95
- **Dispositivos**: Web (Chrome, Safari, Firefox) + Mobile responsive (iOS 14+, Android 10+)
- **Offline**: Não precisa funcionar offline (sempre online pra alertas tempo real)
- **Escalabilidade**: Suportar 1.000 clientes simultâneos (Q4 2026)

---

## 📖 CASOS DE USO

### Caso 1: Alerta de Crise em Tempo Real

**Persona**: Carlos, Chefe de Gabinete  
**Situação**: É terça-feira, 14h30. Deputado está em sessão plenária.

**Fluxo:**
1. Folha de S.Paulo publica: "Deputado Silva é investigado pela PF em esquema de desvio"
2. Sentinela detecta em 45 segundos via Firecrawl
3. IA analisa: Sentimento NEGATIVO (-0.89) | Urgência CRÍTICA
4. WhatsApp do Carlos vibra: "🚨 ALERTA CRÍTICO - Folha publicou investigação PF..."
5. Carlos clica no link, abre dashboard, vê contexto completo
6. Liga para advogado do gabinete em 3 minutos
7. Nota oficial publicada em 40 minutos (antes de viralizar)

**Valor entregue**: Evitou que notícia viralizasse sem resposta | Economizou R$ 2M em danos reputacionais

---

### Caso 2: Clipping Diário Automatizado

**Persona**: Ana, Assessora de Imprensa  
**Situação**: Antes do Sentinela, Ana gastava 3h/dia fazendo clipping manual.

**Fluxo:**
1. Ana configura keywords: "Secretaria da Saúde", "Reforma SUS DF", "Secretário João"
2. Todo dia 8h da manhã, recebe PDF no email com:
   - 12 menções encontradas (DOU, G1, Correio Braziliense, Twitter)
   - Gráfico de sentimento: 70% positivo, 20% neutro, 10% negativo
   - Top 3 menções mais importantes destacadas
3. Ana lê o PDF em 10 minutos no metrô indo pro trabalho
4. Identifica 1 menção que precisa resposta, anota
5. Chega no gabinete, já sabe exatamente o que fazer

**Valor entregue**: Economiza 2h45min/dia (R$ 4.500/mês em tempo de trabalho)

---

### Caso 3: Relatório Semanal para Liderança

**Persona**: Senador (Político Sênior)  
**Situação**: Senador quer saber se reputação está boa antes de reunião com partido.

**Fluxo:**
1. Todo domingo 18h, Senador recebe PDF no WhatsApp: "Relatório Semanal - Sentinela"
2. Abre o PDF (5 páginas bem diagramadas)
3. Primeira página: "Resumo Executivo" - 67 menções | Sentimento +0.42 (positivo) | 2 alertas críticos gerenciados
4. Segunda página: Gráfico de evolução do sentimento (linha do tempo)
5. Terceira página: Top 5 menções da semana
6. Senador lê tudo em 7 minutos
7. Segunda de manhã na reunião: "Minha reputação está estável, tivemos apenas 2 situações e já respondemos"

**Valor entregue**: Decisões políticas baseadas em dados reais de percepção pública

---

## 🎯 PRÓXIMOS PASSOS

1. ✅ **Validar PRD com stakeholders** (Lobistas parceiros + 3 clientes piloto)
2. ⏳ **Criar BRAIN_DUMP.md** (contexto técnico completo para devs)
3. ⏳ **Definir stack técnico** (MEMORY_AI.md com decisões arquiteturais)
4. ⏳ **Setup do projeto** (Repo GitHub + Docker + CI/CD)
5. ⏳ **Sprint 1** (Semanas 1-2): Backend foundation + Auth + Ro-DOU integration
6. ⏳ **Sprint 2** (Semanas 3-4): Scraping notícias + IA + Alertas
7. ⏳ **Sprint 3** (Semanas 5-6): Frontend dashboard
8. ⏳ **Sprint 4** (Semanas 7-8): Redes sociais + Testes + Deploy beta
9. ⏳ **Sprint 5** (Semanas 9-12): Polish + Features avançadas

---

## 📎 ANEXOS

### Referências
- [Ro-DOU - Governo Federal](https://github.com/gestaogovbr/Ro-dou)
- [Firecrawl API Docs](https://docs.firecrawl.dev)
- [Bright Data Social Media APIs](https://brightdata.com/products/datasets/social-media)
- [Pesquisa Knewin - Gestão Reputação BR 2025](https://www.knewin.com/panorama-gestao-de-reputacao-no-brasil-2025/)

### Inspirações (Concorrentes/Similares)
- **Knewin** (BR): Líder em monitoramento, mas UX técnica demais + caro (R$ 20k+/mês)
- **LexisNexis** (Global): Poderoso mas enterprise demais pra político médio
- **Reputation.com** (EUA): Foco em review management, não político
- **Sprinklr** (EUA): Social listening enterprise, complexo demais

### Glossário
- **MRR**: Monthly Recurring Revenue (Receita Recorrente Mensal)
- **ARR**: Annual Recurring Revenue (MRR × 12)
- **Churn**: % de clientes que cancelam por mês
- **NPS**: Net Promoter Score (métrica de satisfação -100 a +100)
- **P95**: Percentil 95 (95% das requisições são mais rápidas que X)
- **LGPD**: Lei Geral de Proteção de Dados (equivalente BR do GDPR europeu)
- **B2G**: Business-to-Government (vendas para órgãos públicos)
- **SaaS**: Software as a Service (modelo de assinatura online)

---

**FIM DO PRD**

_Última atualização: 14/11/2025_  
_Próxima revisão: Após feedback de beta testers (Mar/2026)_
