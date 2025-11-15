## Visão Geral
- O projeto "Ro-DOU" realiza clipping automatizado do Diário Oficial da União (DOU) e de diários municipais via Querido Diário, com envio de relatórios e notificações por e‑mail, Slack e Discord.
- Documentação principal em `docs/docs` e visão pública em `README.md` e `docs/docs/index.md`.

## Principais Funcionalidades
- Clipping diário/semanal/mensal com agendamento (`schedule`) ou por `Dataset` do Airflow.
- Fontes de busca: `DOU`, `QD` (Querido Diário) e `INLABS` (base Postgres do DOU).
- Filtros: seção do DOU, período (dia/semana/mês/ano), campo (título/conteúdo), órgão/unidade (`department`/`department_ignore`), tipos de publicação (`pubtype`), termos exatos/aproximados e rematch/assinatura.
- Relatórios: HTML, anexo `.CSV`, textos de cabeçalho/rodapé e ocultação de filtros.
- Notificações: e‑mail (com anexos), Slack e Discord; alerta de falha de DAG por e‑mail e Slack.

## Fluxo de Execução (código)
- Geração dinâmica de DAGs a partir de YAML em `dou_dag_generator.py`:
  - Gera DAGs lendo `RO_DOU__DAG_CONF_DIR` e cria tarefas de busca e notificação (`src/dou_dag_generator.py:311`, `src/dou_dag_generator.py:557`).
  - Seleção de termos: lista, variável do Airflow ou consulta SQL (`src/dou_dag_generator.py:608-645`).
  - Execução das buscas por fonte e merge de resultados (`src/dou_dag_generator.py:347-431`).
  - Branch para envio/skip com base em resultados (`src/dou_dag_generator.py:446-463`).
  - Notificação via `Notifier` (`src/dou_dag_generator.py:547-556`).
- Buscas:
  - DOU: consultas à API oficial com paginação e filtros, higienização e destaques (`src/hooks/dou_hook.py:74-172`, `src/searchers.py:199-267`).
  - QD: payload com `excerpt_size`, `number_of_excerpts`, `territory_id`, formatação e highlights (`src/searchers.py:469-501`, `src/searchers.py:385-418`).
  - INLABS: geração de SQL com operadores (&, |, !, parênteses), filtros, unaccent e montagem do resultado (`src/hooks/inlabs_hook.py:106-233`, `src/searchers.py:511-563`).
- Notificações:
  - E‑mail com HTML e `.CSV` opcional (`src/notification/email_sender.py:67-83`, `src/notification/email_sender.py:84-190`, `src/notification/email_sender.py:191-241`).
  - Slack (blocos, links e datas) (`src/notification/slack_sender.py:62-109`).
  - Discord (embeds) (`src/notification/discord_sender.py:57-75`).
  - Alertas de falha de DAG: e‑mail e Slack (`src/dou_dag_generator.py:132-209`).

## Configuração YAML (o que está disponível)
- Parâmetros documentados em `docs/docs/como_funciona/parametros.md` com exemplos em `docs/docs/como_funciona/exemplos.md`.
- Padrões e restrições testados: sem termos no `DOU` exige `department` ou `pubtype`; `QD` exige termos (`tests/test_validate_yaml_schemas.py:100-110`).

## Implantação e Ambiente
- Desenvolvimento local via `Docker`/`docker-compose` e `make run` com Airflow em `http://localhost:8080/` e SMTP fake em `http://localhost:5001/` (`docs/docs/como_utilizar/instalacao.md`).
- Produção com SMTP real ou webhooks e opção Kubernetes (`docs/docs/como_utilizar/instalacao_k8s.md`).

## O que funciona hoje (segundo docs e código)
- Geração de DAGs por YAML, buscas em DOU/QD/INLABS com filtros completos, agrupamento por termo/departamento, formatação com destaque, CSV de resultados e envio por e‑mail/Slack/Discord.
- Notificação de erros de DAG por e‑mail/Slack.
- Integrações estáveis baseadas em testes para QD payload e validação de YAML.

## Plano de Verificação e Demonstração
1. Preparar ambiente local em macOS: validar Docker/Compose, instalar requisitos Python de testes (`requirements.txt`/`tests-requirements.txt`).
2. Subir stack com `make run` e acessar `http://localhost:8080/`.
3. Ativar a DAG de exemplo `all_parameters_example` e observar execução, resultados e e‑mail em `http://localhost:5001/`.
4. Criar um YAML simples com termos e `attach_csv: True` para confirmar geração de `.CSV` e filtros (`department`/`pubtype`).
5. Configurar webhooks de Slack/Discord para validar notificações.
6. Executar testes unitários críticos (searchers, parsers, validação YAML) e registrar eventuais falhas.

Confirma estas etapas para eu proceder com a verificação prática e te retornar evidências (logs, telas e saídas)?