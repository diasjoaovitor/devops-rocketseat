# Configuração de Ambiente com Docker Compose: Relatório Técnico

Este documento descreve a solução implementada para o [Desafio Nível 2](https://efficient-sloth-d85.notion.site/Desafio-Configura-o-de-Ambiente-com-Docker-Compose-486107762a0042c99a3bf7d3ecc14e85) do módulo "Primeiros passos com Docker" da Formação DevOps da Rocketseat.

## Contexto Inicial

Foi utilizado como base o projeto [node-boilerplate](https://github.com/diasjoaovitor/node-boilerplate), um setup inicial que contém configurações básicas para projetos Node.js, incluindo:

- Linter para código e mensagens de commit
- Configuração de aliases
- Biblioteca para testes automatizados
- Suporte a TypeScript
- Scripts fundamentais

As demais ferramentas utilizadas no contexto da aplicação `Node.js` foram instaladas posteriormente.

## Implementação do Dockerfile

Foi adotada a imagem `node:iron-alpine` como base, obtida do [Docker Hub](https://hub.docker.com/). A escolha por uma versão Alpine ocorreu devido à ser mais leve e otimizada para containers. O Dockerfile implementado seguiu uma abordagem de multi-stage build. O código a seguir apresenta esse arquivo:

```Dockerfile
FROM node:iron-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm install --omit=dev --ignore-scripts

FROM node:iron-alpine

RUN apk add --no-cache mariadb-client

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/wait-for-db.js ./wait-for-db.js
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["sh", "-c", "npm run db:wait && npm run migrations:up && npm run start"]
```

### Primeiro Estágio (Build)

1. **`FROM node:iron-alpine AS build`**

   - Usa a imagem oficial do Node.js com tag `iron-alpine` (Node.js 20+ em Alpine Linux) como base
   - Nomeia este estágio como "build" para referência posterior

2. **`WORKDIR /usr/src/app`**

   - Define o diretório de trabalho dentro do container

3. **`COPY package*.json ./` e `COPY prisma ./`**

   - Copia os arquivos package.json, package-lock.json e a pasta prisma para o container

4. **`RUN npm ci`**

   - Instala as dependências exatamente como especificado no package-lock.json (mais rápido e confiável que npm install)

5. **`COPY . .`**

   - Copia todo o restante do código fonte para o container

6. **`RUN npm run build`**

   - Executa o script de build

7. **`RUN npm install --omit=dev --ignore-scripts`**
   - Remove dependências de desenvolvimento e ignora scripts pós-instalação para otimização

### Segundo Estágio (Produção)

1. **`FROM node:iron-alpine`**

   - Começa uma nova imagem limpa com a mesma base Node.js

2. **`RUN apk add --no-cache mariadb-client`**

   - Instala o cliente MariaDB, necessário para comando "db:wait"

3. **`WORKDIR /usr/src/app`**

   - Define o mesmo diretório de trabalho

4. **Cópias seletivas do primeiro estágio**:

   - Copia apenas os arquivos necessários para produção do estágio de build:
     - package.json
     - wait-for-db.js (script auxiliar)
     - Pasta prisma (schemas e migrations)
     - Pasta dist (código compilado)
     - node_modules (já sem dependências de dev)

5. **`EXPOSE 3000`**

   - Informa que a aplicação usará a porta 3000

6. **`CMD ["sh", "-c", "npm run db:wait && npm run migrations:up && npm run start"]`**
   - Comando de execução que:
     1. Espera o banco de dados ficar disponível (wait-for-db.js)
     2. Executa migrations do Prisma
     3. Inicia a aplicação

## Otimização com .dockerignore

Foi criado um arquivo `.dockerignore` para excluir arquivos desnecessários do processo de build, incluindo:

- Diretórios como `.git`, `dist`, `.github`
- Arquivos de configuração como `.editorconfig`, `.prettierrc.json`
- Documentação (`Readme.md`)
- Arquivos relacionados ao próprio Docker (`compose.yml`, `Dockerfile`)

A implementação do arquivo é mostrada abaixo:

```text
.git
dist
.github
.husky
.vscode
node_modules
src/tests
.dockerignore
.editorconfig
.env.example
.gitignore
.lintstagedrc.mjs
.nvmrc
.prettierrc.json
commitlint.config.js
compose.yml
Dockerfile
eslint.config.mjs
jest.*
Readme.md
```

## Configuração do Docker Compose

Foi implementado um arquivo `compose.yml` utilizando a [versão 2](https://docs.docker.com/compose/releases/migrate/) do `Docker Compose`:

```yml
services:
  mariadb:
    image: mariadb:lts-ubi9
    container_name: mariadb-container
    restart: unless-stopped
    volumes:
      - data:/var/lib/mysql
    env_file:
      - .env
    ports:
      - '3306:3306'
    networks:
      - desafio-docker-network

  desafio-docker:
    build:
      context: .
    container_name: desafio-docker-container
    env_file:
      - .env
    ports:
      - 3000:3000
    depends_on:
      - mariadb
    networks:
      - desafio-docker-network

networks:
  desafio-docker-network:
    driver: bridge

volumes:
  data:
```

Esse arquivo contém os seguintes parâmetros:

### Serviço MariaDB

- **Imagem**: Usa a imagem oficial do MariaDB na versão LTS com UBI9 (Red Hat Universal Base Image)
- **Nome do container**: Define um nome fixo (`mariadb-container`)
- **Política de reinício**: Reinicia automaticamente a menos que seja explicitamente parado
- **Volume**: Monta um volume chamado `data` no diretório padrão do MariaDB (/var/lib/mysql) para persistência de dados
- **Variáveis de ambiente**: Carrega variáveis de ambiente de um arquivo `.env` conforme especificado na [documentação](https://hub.docker.com/_/mariadb#:~:text=latest%20%2D%2Dverbose%20%2D%2Dhelp-,Environment%20Variables,-When%20you%20start)
- **Portas**: Expõe a porta 3306 do container para a mesma porta no host
- **Rede**: Conecta à rede `desafio-docker-network`

### Serviço da Aplicação

- **Build**: Constrói a imagem a partir do Dockerfile no diretório atual (.)
- **Nome do container**: Define um nome fixo (`desafio-docker-container`)
- **Variáveis de ambiente**: Carrega variáveis de ambiente de um arquivo `.env
- **Portas**: Expõe a porta 3000 do container para a mesma porta no host
- **Dependência**: Garante que o serviço mariadb inicie primeiro
- **Rede**: Conecta à mesma rede que o MariaDB para comunicação entre containers

### Infraestrutura

#### Rede

- Cria uma rede interna chamada `desafio-docker-network`
- Usa o driver `bridge` (padrão para comunicação entre containers no mesmo host)

#### Volumes

- Define um volume chamado `data` para persistência dos dados do MariaDB
- O volume será gerenciado pelo Docker e persistirá mesmo após a remoção do container

## Processo de Execução

Foi executado o ambiente com o comando:

```sh
docker compose up --build

# para omitir os logs, basta passa o parâmetro -d
```

Foi observado o seguinte fluxo:

1. Construção da imagem MariaDB a partir da imagem oficial
2. Construção da imagem da aplicação Node.js conforme Dockerfile
3. Conexão dos containers através da rede bridge compartilhada
4. Execução sequencial dos comandos (CMD):
   - Verificação de disponibilidade do banco de dados
   - Aplicação de migrations
   - Inicialização da aplicação

Ao final do processo, foi criada uma imagem com tamanho de **311MB**
