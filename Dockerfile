FROM node:10.15-stretch AS builder
LABEL maintainer="datapunt@amsterdam.nl"

ARG BUILD_ENV=prod
ARG BUILD_NUMBER=0

WORKDIR /deploy

# Run updates and cleanup
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      netcat \
      libglu1 \
      git && \
    rm -rf /var/lib/apt/lists/*

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:

COPY package.json package-lock.json /deploy/
COPY internals /deploy/internals/

# RUN npm config set registry https://nexus.data.amsterdam.nl/repository/npm-group/ && \
RUN npm --production=false \
        --unsafe-perm \
        --verbose \
        --no-progress \
        ci

RUN npm install --unsafe-perm -g full-icu @sentry/cli
RUN npm cache clean --force
ENV NODE_ICU_DATA="/usr/local/lib/node_modules/full-icu"

# Build dependencies
COPY . /deploy/

# Build
ENV NODE_PATH=/deploy/
ENV NODE_ENV=production
RUN npm run build


# Deploy
FROM nginx:stable-alpine
ARG BUILD_ENV=prod
COPY --from=builder /deploy/build/. /usr/share/nginx/html/

COPY default.conf /etc/nginx/conf.d/

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log
