FROM node:16.14

WORKDIR /app

ARG NODE_ENV=production

COPY ./package*.json ./
RUN npm install
COPY src/ ./src

EXPOSE 3000

CMD ["npm", "run", "start"]
