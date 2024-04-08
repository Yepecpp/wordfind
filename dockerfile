FROM node:20.11.1-alpine AS node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.21.6-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/ /usr/share/nginx/html
EXPOSE 80