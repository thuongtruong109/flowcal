FROM node:18-alpine as development

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM development as production

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY --chown=node:node ./package.json ./

COPY --chown=node:node --from=development /app/dist /app/dist

RUN npm install --omit=dev

LABEL "maintainer"="thuongtruong1009 <thuongtruong@proton.me>"
LABEL "org.opencontainers.image.authors"="Tran Nguyen Thuong Truong"
LABEL "org.opencontainers.image.version"="1.0"
LABEL "org.opencontainers.image.description"="Official Docker Image of Boardly API application"
LABEL "org.opencontainers.image.licenses"="MIT"
LABEL "org.opencontainers.image.source"="https://github.com/thuongtruong109/boardly"
LABEL "org.opencontainers.image.documentation"="https://github.com/thuongtruong109/boardly/blob/main/README.md"
