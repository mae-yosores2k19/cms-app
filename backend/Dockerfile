FROM node:16.15.1

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*","tsconfig.json", "./"]
RUN npm install --production

EXPOSE 4000

COPY . .
CMD ["node","dist/server.js"]