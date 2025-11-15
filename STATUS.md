# Status de Tarefas — Dashboard e Integrações

## Back-End e Integração
- [ ] Criar módulo AirflowService com chamadas à REST API do Airflow
- [ ] Implementar endpoint de disparo com trigger_date e retorno do dag_run_id
- [ ] Listar execuções por DAG com estado, horários e parâmetros
- [ ] Expor metadados dos relatórios e links para CSV/HTML
- [ ] Configurar proxy dev para evitar CORS com Airflow e smtp4dev
- [ ] Adicionar autenticação básica de desenvolvimento com armazenamento seguro de credenciais
- [ ] Implementar rate limit e tratamento de erros nas chamadas

## Front-End (Dashboard)
- [ ] Integrar TriggerPage ao AirflowService para disparos reais
- [ ] Integrar RunsPage à listagem de execuções por DAG
- [ ] Criar página de Relatórios com preview HTML e download CSV
- [ ] Converter mocks em estado vindo da API com loaders e erros
- [ ] Implementar filtros por data, termo e seção no histórico
- [ ] Adicionar gráficos dinâmicos por termo e por período
- [ ] Criar ConfigPage com edição de termos e webhooks (sem segredos)
- [ ] Aplicar tema e acessibilidade básica (atalhos, ARIA, contraste)

## YAML e Configuração
- [ ] Corrigir YAML rodolfo_dou_example para formato único e válido
- [ ] Criar YAML padrão para uso real com filtros e seções
- [ ] Documentar parâmetros YAML e exemplos com booleanos corretos

## Notificações e Canais
- [ ] Integrar Slack via report.slack.webhook para notificações
- [ ] Integrar Discord via report.discord.webhook para notificações

## DevOps e Deploy
- [ ] Configurar projeto UI com Vite/React e scripts de execução
- [ ] Criar pipeline simples de build e deploy do dashboard
- [ ] Definir variáveis de ambiente e secrets no gateway

## Qualidade e Documentação
- [ ] Escrever testes de integração do AirflowService
- [ ] Documentar fluxo de uso, endpoints e formatos de resposta
- [ ] Preparar guia de instalação local e troubleshooting

> Observação: atualize este arquivo marcando tarefas como concluídas ou removendo-as quando não forem mais necessárias.
