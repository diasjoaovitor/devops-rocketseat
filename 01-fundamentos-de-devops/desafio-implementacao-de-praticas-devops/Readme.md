# Desafio: Implementação de Práticas DevOps em um Ambiente Empresarial Fictício

Esta é a minha solução para o primeiro desafio da **Formação DevOps** da Rocketseat, referente ao primeiro nível `Fundamentos de DevOps`. 

A descrição do desafio pode ser acessada através do seguinte link: https://efficient-sloth-d85.notion.site/Desafio-Implementa-o-de-Pr-ticas-DevOps-em-um-Ambiente-Empresarial-Fict-cio-bd3b6b458a5b470d8902f54fdb801cb8

A seção abaixo descreve a resolução do desafio.

---

## 1. Diagnóstico Cultural (C de CALMS)

### Identificação dos Processos

-Entrega de Código
-Deploy
-Testes
-Monitoramento

### Descrição dos Processos

- Após a realização de uma tarefa, a equipe de desenvolvimento encaminha um pacote de implantação à equipe de operações
- O deploy é realizado de maneira manual diretamente no ambiente de produção
- Todos os testes são feitos de maneira manual pela equipe de operações
- A equipe de operações monitora manualmente os logs do servidor em produção

#### Dados de desempenho:

- Tempo médio entre a entrega do código e o deploy: 2 dias.
- Taxa de sucesso dos deploys manuais: 80%.
- Número de incidentes após o deploy: média de 2 por semana.
- Tempo médio de recuperação (MTTR) de incidentes: 4 horas.

### Diagnóstico 

#### Pontos de Atrito

- Processo ineficiente entre a equipe de desenvolvimento e a equipe de operação ocasionando em um tempo maior entre a entrega de código e deploy
- Deploys manuais e ausência de ambiente de homologação, o que acarreta em uma alta taxa de falhas
- A exclusivade de testes manuais gera diversos problemas, dentre eles: 
  - Falta de cobertura
  - Maior tempo
  - Falta de padronização
  - Maior sucessão a falhas, etc.
- A verificação manual de logs do sistema é ineficiente para identificar problemas com rapidez e precisão

#### Proposta de Solução

- Implementar uma cultura colaborativa entre equipe de desenvolvimento e equipe de operação
- Dividir ambientes entre `desenvolvimento`, `homologação` e `produção`
- Automatizar e melhorar processo de `Deploy` através da implementação de CI/CD
- Implementar testes automatizados
- Implementar mecanismo para monitoramento de logs contínuo e notificação de erros

## 2. Automação (A de CALMS)

### Proposta de Automação

- Implementar pipeline utilizando o [GitHub CI/CD](https://github.com/resources/articles/devops/ci-cd)
- Utilizar Docker para padronizar e isolar ambientes, bem como facilitar o processo integração com diversas ferramentas
- Implantar Infraestrutura como Código (IAC) com Terraform
- Criar testes de integração automatizados 
- Utilizar ferramenta para monitoramento e logs e notificação de erros

### Plano de Implementação

1. Fase 1 - Preparação:
   - Configuração de ambiente de desenvolvimento
   - Treinamento das equipes
   - Documentação inicial

2. Fase 2 - Implementação Básica:
   - Criação de containers Docker
   - Implementação do Terraform
   - Implementação de testes automatizados

3. Fase 3 - Expansão:
   - Integração com ferramentas de monitoramento
   - Implementação de análise de código
   - Automação de deploys

## 3. Mensuração e Compartilhamento de Conhecimento (M e S de CALMS):

### Dados de desempenho esperado

| Métrica                     | Atual   | Meta      |
| --------------------------- | ------- | --------- |
| Tempo entre código e deploy | 2 dias  | < 4 horas |
| Taxa de sucesso em deploys  | 80%     | > 95%     |
| Nº de incidentes/semana     | 2       | < 0.5     |
| MTTR                        | 4 horas | < 1 hora  |

### Plano de Compartilhamento de Conhecimento

- **Documentação:** Wiki interna com descrição dos processos, tutoriais e informações relevantes
- **Sessões de Pair Programming:** Devs e Ops trabalhando juntos
- **Retrospectivas Mensais:** Discussão de melhorias no processo
- **Intensificar comunicação (síncrona e assíncrona)**: Toda tarefa realiza deve ser relatada e o processo deve ser resumido (em texto, audio ou video)

## 4. Três Maneiras

### 1. Acelerar o Fluxo

- **Padronizar e Automatizar:** Eliminar etapas manuais no deploy.    
- **Pipeline Unificado:** Integrar Dev, QA e Ops em um único fluxo.

### 2. Ampliar o Feedback

- **Monitoramento em Tempo Real:** Alertas automáticos para falhas.
- **ChatOps:** Integrar feedback via plataforma de comunicação (ex.: "Deploy falhou na etapa X").

### 3. Experimentar e Aprender

- **Postmortems sem Culpa:** Analisar falhas para melhorar processos.
- **Hackathons Internos:** Testar novas ferramentas (ex.: migração gradual do legado Delphi).
    

## Resultados Esperados

- Redução máxima no tempo de deploy.
- Diminuição de incidentes em produção.
- Equipes mais alinhadas e menos "silos".
- Estabelecimento da cultura DevOps

### Conclusão

A implementação das práticas DevOps na Tech trará benefícios significativos em termos de eficiência, qualidade e colaboração. O plano proposto considera as particularidades da empresa, incluindo o sistema legado em Delphi, e propõe uma abordagem gradual e sustentável para a transformação digital.
