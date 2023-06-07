ARG NODE_IMAGE=node:18.15.0-alpine

FROM $NODE_IMAGE AS base

LABEL maintainer="Otávio Paganotti <paganottiotavio@gmail.com>"

RUN apk update

RUN apk --no-cache add dumb-init

RUN mkdir -p /var/www/api && chown node:node /var/www/api

WORKDIR /var/www/api

USER node

RUN mkdir tmp

FROM base AS dependencies

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

FROM dependencies AS production

RUN yarn build

ENV PORT=$VITE_APP_PORT

ENV HOST=0.0.0.0

EXPOSE $VITE_APP_PORT

CMD [ "dumb-init", "node", "./build/app.js" ]
