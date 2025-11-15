# Parâmetros de pesquisa disponíveis

A página abaixo lista os parâmetros configuráveis nos arquivos YAML:

## Parâmetros da DAG
* **id**: Nome identificador da DAG a ser gerada.
* **description**: Descrição da DAG de pesquisa.
* **doc_md**: Documentação em markdown da DAG para uma descrição mais completa.
* **schedule**: Agendamento da periodicidade de execução da DAG (expressão CRON). Quando ausente, o sistema usa execução diária às 05h com minuto balanceado por hash do `dag_id` (ex.: `43 5 * * *`). Recomendado definir o `schedule` explicitamente em produção.
* **dataset**: Agendamento da DAG baseado na atualização de um Dataset do Airflow. Em conjunto com o `schedule`, a execução pode ser condicionada ao Dataset.
* **callback**: Configuração de e-mails para notificação de falhas na execução.
* **tags**: Tags para categorizar a DAG.
* **owner**: Responsável pela DAG.

## Parâmetros da Pesquisa (Search)
* **search**: Pode ser uma ou uma lista de pesquisas.
- **date**: Intervalo de data para busca. Valores: DIA, SEMANA, MES, ANO. Default: DIA
- **department**: Lista de unidades a serem filtradas na busca. O nome deve ser idêntico ao da publicação.
- **department_ignore**: Lista de unidades e subordinadas a serem desconsideradas na busca. O nome deve ser idêntico ao da publicação.
- **dou_sections**: Lista de seções do DOU onde a busca deverá ser realizada. Valores aceitos: SECAO_1, SECAO_2, SECAO_3, EDICAO_EXTRA, EDICAO_SUPLEMENTAR, TODOS.
- **field**: Campos dos quais os termos devem ser pesquisados. Valores: TUDO, TITULO, CONTEUDO. Default: TUDO
- **force_rematch**: Indica que a busca deve ser forçada, mesmo que já tenha sido feita anteriormente. Valores: True ou False.
- **full_text**: Define se no relatório será exibido o texto completo, ao invés de um resumo. Valores: True ou False. Default: False. (Funcionalidade disponível apenas no INLABS)
- **text_length**: Tamanho do texto que será enviado na mensagem. O padrão é 400.
- **use_summary**: Define se no relatório será exibido a ementa, se existir. Valores: True ou False. Default: False. (Funcionalidade disponível apenas no INLABS)
- **ignore_signature_match**: Ignora a correspondência de assinatura ao realizar a busca. Valores: True ou False. Default: False.
- **is_exact_search**: Busca somente o termo exato. Valores: True ou False. Default: True.
- **pubtype**: Lista de tipos de publicações a serem filtradas na busca. Valores: [Lista de tipos de publicações](tipos_de_publicacoes.md).
- **sources**: Fontes de pesquisa dos diários oficiais. Pode ser uma ou uma lista. Opções disponíveis: DOU, QD, INLABS.
- **terms**: Lista de termos a serem buscados. Para o INLABS podem ser utilizados operadores avançados de busca.
- **territory_id**: Lista de identificadores do id do município. Necessário para buscar no Querido Diário.
- **excerpt_size**: Número máximo de caracteres exibidos no trecho onde o termo de busca foi localizado. (Funcionalidade disponível apenas no Querido Diário)
- **number_of_excerpts**: Número máximo de ocorrências do termo de busca em uma mesma edição. (Funcionalidade disponível apenas no Querido Diário)

Observações importantes:
- Quando a fonte incluir `QD`, os **terms** são obrigatórios.
- Em buscas no `DOU`, é permitido não informar **terms** apenas quando houver pelo menos um filtro entre **department** ou **pubtype**.
- Utilize sempre booleanos `True`/`False` nos YAMLs (não usar `On/Off`).

## Parâmetros do Relatório (Report)
- **attach_csv**: Anexar no email o resultado da pesquisa em CSV.
- **emails**: Lista de emails dos destinatários.
- **footer_text**: Texto em HTML do rodapé do relatório.
- **header_text**: Texto em HTML de cabeçalho do relatório.
- **hide_filters**: Omite no relatório os filtros de pesquisa.
- **no_results_found_text**: Texto padrão para quando não há resultados encontrados. Default: Nenhum dos termos pesquisados foi encontrado nesta consulta.
- **skip_null**: Dispensa o envio de email quando não há resultados encontrados em todas as pesquisas. Valores: True ou False. Default: True.
- **subject**: Texto de assunto do email.
- **slack**: Objeto com configuração de webhook do Slack. Campos: `webhook`.
- **discord**: Objeto com configuração de webhook do Discord. Campos: `webhook`.

