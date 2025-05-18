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
- Criar testes de integração automatizados 
- Utilizar ferramenta para monitoramento e logs e notificação de erros
- Implantar Infraestrutura como Código (IAC)

### Plano de Implementação

## 3. Mensuração e Compartilhamento de Conhecimento (M e S de CALMS):

### Métricas

### Plano para Disseminação do Conhecimento

## 4. Três Maneiras

#### 1. Acelerar o Fluxo

#### 2. Ampliar o Feedback

#### 3. Experimentar e Aprender