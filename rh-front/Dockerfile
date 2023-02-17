#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine

COPY --from=node /app/dist/rh-front /usr/share/nginx/html
COPY --from=node /app/dist/rh-front /etc/nginx/html
# RUN apt-get install sysvinit-utils
