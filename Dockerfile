# Srage 1 - Build
FROM node:8.11.2-alpine as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-prd

# Stage 2 - Deploy
FROM nginx:1.13.12-alpine
COPY --from=node /usr/src/app/dist/web-challenge-sicredi /usr/share/nginx/html
COPY ./NGINX/nginx.conf /etc/nginx/conf.d/default.conf
