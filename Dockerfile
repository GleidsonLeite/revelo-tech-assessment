FROM node:22-alpine

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install

COPY . .

EXPOSE 3333

CMD ["./shell/startup.sh"]