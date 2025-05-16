
# Containers

## Criando nosso primeira imagem

### Estrutura de um Dockerfile

[Commit: Estrutura de um Dockerfile](https://github.com/rocketseat-education/devops-docker-containers/commit/0f8c46d5dcadcc8088a2f6a5262be3bc5a7d2557)

Nesta aula, discutimos a continuação da construção do Dockerfile para executar nossa aplicação. Abordamos instruções como `workdir` para definir o diretório de trabalho, `copy` para copiar arquivos, `run` para executar comandos e `cmd` para iniciar a aplicação. Exploramos a importância de expor portas e a criação de imagens Docker. Também destacamos a necessidade de otimizar o tamanho das imagens geradas. Ao final, preparamos a imagem para rodar o container.

```sh
docker build -t nest-template .

docker image ls nest-template 
# ou
docker images

docker image history nest-template
```

### Rodando Nosso Container

Nesta aula, abordei a criação e execução de um container Docker a partir de uma imagem. Expliquei sobre a importância de tags, Image ID, tamanho da imagem e utilização do comando `docker run`. Destaquei a instrução `-rm` para deletar o container ao final do ciclo de vida, mapeamento de portas com `-p`, e a visualização de containers em execução com `docker ps`. Também mencionei a execução em background com `-d` e a visualização de logs com `docker logs`. Finalizei ressaltando a importância das boas práticas na criação de containers.

```sh
docker run --rm -p 3000:3000 nest-template

curl http://localhost:3000
```

```sh
docker ps
```

```sh
CONTAINER ID   IMAGE           COMMAND                  CREATED              STATUS              PORTS                    NAMES
4c1947426122   nest-template   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:3000->3000/tcp   clever_lalande
```

```sh
docker stop 4c1947426122
```

Ao rodar o camnado abaixo sem a flag `--rm` podemos iniciar o container novamente após um `stop`. O novo parâmetro `-d` é usado para iniciar o container em modo `detached`.

```sh
docker run -p 3000:3000 -d nest-template

docker stop aaf27a58eea6

docker start aaf27a58eea6

docker logs aaf27a58eea6
```

### Melhorias e Otimizações na Nossa Imagem

[Commit: Melhorias e Otimizações na Nossa Imagem](https://github.com/rocketseat-education/devops-docker-containers/commit/7e635ed090972147fc5f0fa6c8663dbf052e89c7)

Nesta aula, vamos abordar boas práticas para melhorar a performance e economizar espaço em uma build Docker. Explico a importância de copiar o Yarn.loc, adicionar o yarnrc.yml e ignorar pastas como NodeModules e dist. Demonstro como utilizar o docker ignore e a tag correta ao construir imagens Docker. Ao final, destaco a necessidade de versionamento adequado. Essas práticas contribuem para otimizar builds e manter um histórico de versões eficiente.

```sh
docker build -t nest-template:v1 .
```

## Redes e Volumes

### Camada de abstração

Nesta aula, abordamos a importância da comunicação e redes em containers Docker. Exploramos os conceitos de redes, como o driver bridge, null e roast, e a criação de redes personalizadas. Destacamos a organização de redes por projetos e a utilização de redes específicas para diferentes aplicações. Além disso, discutimos a criação de redes com o comando `docker network create` e a importância das boas práticas, como a utilização de tags para otimização. Na próxima aula, vamos aprofundar o conhecimento em redes e realizar algumas práticas.

```sh
docker network ls

docker network create --driver bridge primeira-bridge-network
```

### Gerenciando redes

Nesta aula, foi abordado como associar uma rede a um container Docker. Foram apresentadas duas formas de fazer essa associação: utilizando o comando `docker network connect` para containers já em execução e definindo a rede no momento da criação do container com o parâmetro `--network`. Foi explicado como verificar a associação da rede ao container utilizando os comandos `docker network inspect` e `docker container inspect`. Também foi mencionado que um container pode estar associado a várias redes.

```sh
docker network ls
```

```sh
NETWORK ID     NAME                      DRIVER    SCOPE
52e12a6ae682   bridge                    bridge    local
8113e5c75a70   host                      host      local
703ce8f149f3   infra_default             bridge    local
0804d30db0ea   none                      null      local
76dea13da2c3   primeira-bridge-network   bridge    local
```

```sh
docker ps
```

```sh
CONTAINER ID   IMAGE              COMMAND                  CREATED         STATUS         PORTS                    NAMES
605afb44bdfa   nest-template:v1   "docker-entrypoint.s…"   4 seconds ago   Up 3 seconds   0.0.0.0:3000->3000/tcp   optimistic_swirles
```

```sh
#                      NETWORK ID   CONTAINER ID 
docker network connect 76dea13da2c3 605afb44bdfa
```

```sh
docker network inspect 76dea13da2c3

docker container inspect 605afb44bdfa
```

```sh
docker stop 605afb44bdfa

docker run --rm --network=primeira-bridge-network -p 3000:3000 -d nest-template
```

### Arquivos e Containers

Esta aula, aborda a importância dos volumes em containers Docker para manter dados persistentes. Mostra como os arquivos são armazenados no container e como são perdidos ao reconstruir o container. Destaca a necessidade de separar responsabilidades e exemplifica a criação de arquivos dentro do container. Demonstra como os arquivos são perdidos sem volumes persistentes. O instrutor encerra indicando que o próximo vídeo abordará como manter arquivos persistentes em volumes específicos.

```sh
docker exec -it fa12aca6d6f2 bash

exit
```

### Entendendo sobre volumes

Nesta aula, abordamos o conceito de volumes no Docker. Volumes são diretórios externos que permitem persistência de dados, essenciais para salvar arquivos e manter dados em containers. A criação e associação de volumes são fundamentais para garantir a persistência de dados entre reinicializações de containers. O comando `docker volume` é utilizado para gerenciar volumes, permitindo a criação, inspeção e remoção de volumes. A associação de volumes com containers é feita através do comando `docker run -v`, garantindo a persistência dos dados.

```sh
docker volume create primeiro-volume

docker inspect primeiro-volume

docker run --rm -v primeiro-volume --network primeira-bridge-network -p 3000:3000 -d nest-template
```

### Persistindo informações nos volumes

Nesta aula, abordo a criação de arquivos em containers Docker e a persistência desses arquivos em volumes. Demonstrando como criar, verificar e manter arquivos em containers com volumes associados. Destaco a importância de apontar para o volume ao executar um container para evitar a perda de arquivos. Exploro a continuidade da existência dos volumes mesmo após a exclusão dos arquivos e a possibilidade de restaurar arquivos ao associar um volume novamente. Esses conceitos serão aprofundados nos módulos futuros.

## Melhorando a performance

### Alpine e Stretch

Nesta aula, abordamos a otimização de containers, destacando a importância de reduzir o tamanho das imagens para melhorar a performance. Introduzimos o Alpine, uma distribuição Linux enxuta e otimizada para containers. Comparamos diferentes versões do Node, mostrando a redução significativa de tamanho e vulnerabilidades ao utilizar o Alpine em vez do Debian. Exploramos também outras versões do Debian, como Stretch, Buster e Jessie. Na próxima aula, faremos a transição para o Alpine para otimizar ainda mais nossos containers.

### Adicionando o Alpine na nossa imagem

[Commit: Adicionando o Alpine na nossa imagem](https://github.com/rocketseat-education/devops-docker-containers/commit/f54fb9b11c870f8120dd70c29e420c727ed08201)

Nesta aula, foi abordado o processo de configuração de uma aplicação com Alpine, uma imagem leve do Docker. Foi destacada a importância de seguir a lógica de nomenclatura ao trabalhar com diferentes tecnologias. Foi demonstrado como realizar o build da imagem Docker, aproveitando o mecanismo de cache para economizar tempo. Ao trocar a base image para Alpine, houve uma redução significativa no tamanho da imagem, mostrando a eficiência dessa prática. O próximo passo será abordar estágios múltiplos para otimização.

```Dockerfile
FROM node:iron-slim
```

```Dockerfile
FROM node:iron-alpine
```

```sh
docker build -t nest-template:v2 .
```

### Criando múltiplos estágios

[Commit: Criando múltiplos estágios](https://github.com/rocketseat-education/devops-docker-containers/commit/2e1bf92194fe5e19c10fd7b979303d52b91f2091)

Nesta aula, abordo o conceito de multi-stage building para otimização de containers. Explico como dividir o processo de build em diferentes estágios, evitando incluir itens desnecessários na imagem final. Demonstro na prática como utilizar aliases e copiar arquivos entre estágios, resultando em uma imagem mais leve e otimizada. Ao final, realizo um docker build para mostrar a redução do tamanho da imagem com o multi-stage build.

```Dockerfile
FROM node:iron-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```

```sh
docker build -t nest-template:v3 .

docker image ls nest-template
```

### Comparando imagens

[Commit: Comparando imagens](https://github.com/rocketseat-education/devops-docker-containers/commit/6e3c5569760019e86b1d605ca59cf37c34e31840)

Nesta aula, otimizamos uma imagem Docker, reduzindo seu tamanho de 1GB para 210MB. Realizamos ajustes, removendo bibliotecas desnecessárias e executando comandos como `workspaces focus --production` e `yarn-cache-clean`. Enfrentamos um erro ao rodar o `yarn run-bind` devido à dependência dev. Corrigimos isso executando o `yarn` antes do build. Testamos a imagem Docker e verificamos os arquivos dentro do container. Encerramos a otimização e nos preparamos para falar sobre orquestração de containers em ambiente local.

```Dockerfile
FROM node:iron-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install --production

RUN npm cache clean --force

FROM node:iron-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]
```

```sh
docker build -t nest-template:v4 .
```

### Ultimas correções no Dockerfile

[Commit: Ultimas correções no Dockerfile](https://github.com/rocketseat-education/devops-docker-containers/commit/da8347aa2e46f5592b498ba42688d18af7fd8bd8)

Nesta aula, são feitas alterações no Dockerfile, como copiar o package.json e ajustar o comando start para uso em produção. Após as modificações, é feita a build e execução do container, sem associar um volume. O instrutor destaca que na próxima aula será abordado o uso de volumes, indicando a importância para bancos de dados. Por fim, menciona que a aplicação deve estar rodando corretamente e convida para a próxima aula sobre orquestração.

```Dockerfile
FROM node:iron-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm cache clean --force

FROM node:iron-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

```sh
docker build -t nest-template:v5 .
```
