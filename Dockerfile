FROM node:22-alpine as build
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY package.json package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /home/node/app/dist /usr/share/nginx/html