# Dashboard Local — Uso Rápido

## Pré-requisitos
- Node.js 18+
- Ambiente Ro-DOU em execução (Airflow em `http://localhost:8080/`, smtp4dev em `http://localhost:5001/`).

## Instalação (dev)
1. Instale dependências (caso use Vite/React):
   - `npm install react react-dom lucide-react recharts`
2. Variáveis (opcional):
   - `VITE_AIRFLOW_BASE_URL` (default: `http://localhost:8080/api/v1`).
3. Proxy de desenvolvimento (recomendado para evitar CORS):
   - Instale dependências: `npm install express http-proxy-middleware`
   - Execute: `AF_USER=airflow AF_PASS=airflow node proxy-dev.js`
   - O proxy expõe `/airflow` → `http://localhost:8080` e `/smtp` → `http://localhost:5001`.

## Autenticação
- Informe Usuário/Senha do Airflow na página “Disparar” (default dev: `airflow`/`airflow`).
- As credenciais são guardadas em `localStorage` (`AF_USER`, `AF_PASS`) para uso no header Basic.

## Fluxo de uso
1. Disparar:
   - Vá em “Disparar”, informe `dag_id` (ex.: `rodolfo_dou_example_ideal`) e a `trigger_date`.
   - Clique “Disparar DAG” e verifique o retorno com `dag_run_id`.
2. Execuções:
   - Vá em “Execuções”, informe a `dag_id` e clique “Atualizar” para listar os runs reais.
3. Relatórios:
   - Vá em “Relatórios”, filtre por assunto (ex.: “DOs de 14/11/2025”) e baixe `HTML` ou `CSV` (via proxy `/smtp`).

## Observações
- Não exponha credenciais de produção no front; em produção, use um gateway backend para autenticar e servir os dados ao dashboard.
- Em dev, o download de relatórios usa `http://localhost:5001/api/messages/...` (smtp4dev).

## Próximos passos
- Adicionar proxy do dev server para `/airflow` e `/smtp` evitando CORS.
- Integrar preview de relatório HTML na própria página.
- Persistir configurações (termos, webhooks) via backend seguro.