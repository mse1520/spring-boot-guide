FROM node:18
WORKDIR /app
COPY . /app
RUN npm i
RUN npm run build
CMD node ./build/server.js