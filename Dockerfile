# Using Docker image that comes with nodejs built with full ICU: https://github.com/Zenika/alpine-node/blob/master/full-icu/Dockerfile
# Also see: https://techoverflow.net/2018/09/19/fixing-nodejs-intl-datetimeformat-not-formatting-properly-for-locales/ and https://nodejs.org/api/intl.html
FROM zenika/alpine-node:full-icu AS builder
LABEL maintainer="datapunt@amsterdam.nl"

ARG BUILD_ENV=prod
ARG BUILD_NUMBER=0

WORKDIR /deploy

# Run updates and cleanup
RUN apk update --no-cache && \
    apk add \
      autoconf \
      automake \
      libpng \
      libtool \
      libwebp \
      libwebp-tools \
      mesa-gl \
      nasm \
      zlib-dev \
      git && \
      rm -rf /var/lib/apt/lists/*

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:

COPY package.json package-lock.json /deploy/
COPY internals /deploy/internals/

RUN npm --no-progress ci && npm cache clean --force

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
