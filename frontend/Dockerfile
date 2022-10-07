FROM node:16.15.1-alpine
WORKDIR /app
RUN npm install -g serve
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
# RUN npm install -g npm@8.19.2
RUN npm run build
EXPOSE 3000

CMD ["npm","start"]