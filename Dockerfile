FROM node:12-alpine
WORKDIR /.

COPY package.json package-lock.json ./
RUN npm i 

CMD ["npm", "run", "start"]