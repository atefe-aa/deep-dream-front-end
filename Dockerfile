FROM  node:21-alpine AS node

WORKDIR /app

COPY package*.json .

RUN npm install --force

COPY . .

EXPOSE 5173

CMD [ "npm","run","dev" ]