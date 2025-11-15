## O que vou entregar
- Um YAML limpo e válido para a DAG `rodolfo_dou_example`, com estrutura conforme os schemas e boas práticas.
- Instruções de uso para disparo por data específica (ex.: ontem) e visualização do relatório sem e‑mail real.

## YAML Ideal
```yaml
dag:
  id: rodolfo_dou_example
  description: Teste de envio de relatório do DOU
  tags:
    - dou
    - teste
  owner:
    - rodolfo
  search:
    header: "Monitoramento DOU"
    sources:
      - DOU
    terms:
      - portaria
      - resolução
      - decreto
      - edital
      - extrato
    dou_sections:
      - SECAO_1
    date: DIA
    field: TITULO
    is_exact_search: True
    ignore_signature_match: True
  report:
    emails:
      - rodolfofilho2@gmail.com
    attach_csv: True
    subject: "Relatório Ro-DOU"
    skip_null: False
    hide_filters: False
```

## Como usar
- Ativar a DAG na UI do Airflow (`http://localhost:8080/`) ou via API (`PATCH /api/v1/dags/rodolfo_dou_example` com `{ "is_paused": false }`).
- Disparar para uma data específica (ex.: 2025-11-13): `POST /api/v1/dags/rodolfo_dou_example/dagRuns` com `{ "dag_run_id": "manual__dou_2025-11-13", "conf": { "trigger_date": "2025-11-13" } }`.
- Visualizar o relatório sem e‑mail real em `http://localhost:5001/` (smtp4dev), e baixar `.html`/`.csv` conforme preferir.

## Próximo passo
- Se aprovar, aplico este YAML no arquivo `dag_confs/rodolfo_dou_example.yaml` e aciono a execução conforme sua data desejada.