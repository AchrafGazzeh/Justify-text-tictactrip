FROM  --platform=linux/amd64 node:14

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i
RUN  npm i ts-node typescript

COPY . .

CMD ["npm", "run", "dev"]