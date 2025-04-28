# 上面2个打包方式，打包出来的镜像，依然很大
# 那是因为我们用的基础的 linux 镜像比较大，
# 可以换成 alpine 的，这是一个 linux 发行版，主打的就是一个体积小。


FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

# COPY 复制宿主机的 package.json 和 lock 文件到容器的当前目录，也就是 /app 下
COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN npm run build

# production stage
FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g pnpm

RUN pnpm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]