FROM node:18 as build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm ci
ENV VITE_BACKEND_URL=http://localhost/api
RUN npm run build

FROM nginx:1.23
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html