FROM node:20-alpine AS development

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM development AS production

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY --chown=node:node ./package.json ./

COPY --chown=node:node --from=development /app/dist /app/dist

RUN npm install --only=production

EXPOSE 3000

LABEL "maintainer"="thuongtruong1009 <thuongtruong@proton.me>"
LABEL "org.opencontainers.image.authors"="Tran Nguyen Thuong Truong"
LABEL "org.opencontainers.image.version"="1.0"
LABEL "org.opencontainers.image.description"="Official Docker Image of flowcal API application"
LABEL "org.opencontainers.image.licenses"="MIT"
LABEL "org.opencontainers.image.source"="https://github.com/thuongtruong109/flowcal"
LABEL "org.opencontainers.image.documentation"="https://github.com/thuongtruong109/flowcal/blob/main/README.md"
