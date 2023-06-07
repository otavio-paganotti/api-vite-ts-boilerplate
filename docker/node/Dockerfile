ARG NODE_IMAGE=node:18.15.0-alpine

FROM $NODE_IMAGE AS base

LABEL maintainer="Op.Ag <opag.software@gmail.com>"

RUN apk update

RUN apk --no-cache add dumb-init

RUN mkdir -p /var/www/api && chown node:node /var/www/api

WORKDIR /var/www/api

USER node

RUN mkdir tmp

FROM base AS dependencies

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

FROM dependencies AS build

RUN node ace build --production

FROM base AS production

ENV NODE_ENV=production

ENV PORT=$PORT

ENV HOST=0.0.0.0

COPY --chown=node:node ./package*.json ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node --from=build /var/www/api/build .

EXPOSE $PORT

CMD [ "dumb-init", "node", "app.js" ]
