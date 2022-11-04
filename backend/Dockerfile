FROM node:16-alpine as dependencies
RUN apk update && apk add build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./package-lock.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm install
RUN npm install --platform=linuxmusl --arch=x64 sharp

FROM node:16-alpine as runner
WORKDIR /opt/app
COPY ./config ./config
COPY ./database ./database
COPY --from=dependencies /opt/node_modules ./node_modules
COPY ./src ./src
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "develop"]
