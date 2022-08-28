FROM node:lts
LABEL maintainer "me@nikz.in"

ENV PROJECT_DIR=/api PORT=3000
WORKDIR $PROJECT_DIR

COPY package.json $PROJECT_DIR
RUN npm install

COPY . $PROJECT_DIR
RUN npm run build

EXPOSE $PORT
HEALTHCHECK CMD curl --fail http://localhost:$PORT || exit 1

CMD ["npm", "start"]