FROM node:10.10 AS builder
LABEL maintainer="datapunt@amsterdam.nl"

ARG BUILD_ENV=prod
ARG BUILD_NUMBER=0
WORKDIR /app

# Run updates and cleanup
RUN apt-get update
RUN apt-get install -y \
      netcat \
      git
RUN rm -rf /var/lib/apt/lists/*

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:


# Install NPM dependencies. Also:
RUN npm --production=false \
        --unsafe-perm \
        --verbose \
       install
RUN npm cache clean --force

# Build
ENV NODE_ENV=production
RUN echo "run build" ${BUILD_ENV}
# RUN npm rebuild node-sass
RUN npm run build:${BUILD_ENV}
RUN echo "build ${BUILD_NUMBER} - `date`" > /src/build/version.txt

# Test


# Deploy
FROM nginx:stable-alpine
ARG BUILD_ENV=prod
COPY --from=builder /src/build/. /usr/share/nginx/html/

COPY default.conf /etc/nginx/conf.d/

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log
