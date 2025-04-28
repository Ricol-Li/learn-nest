# 分阶段打包，减小打包后的镜像体积
# build stage
FROM node:18 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN npm run build

# production stage
FROM node:18 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install -g pnpm
RUN pnpm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]