# 基于一个基础镜像来修改
FROM node:latest

# 指定当前的工作目录
WORKDIR /app

# 把容器外的内容复制容器内
# 通过 COPY 把 Dockerfile 同级目录下的内容复制到容器内，这里的 . 也就是 /app 目录
COPY . .

# RUN 在容器内执行命令
RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g http-server


# 声明当前容器要访问的网络端口，比如这里起服务会用到 8080
EXPOSE 8080

# 设置挂载点
VOLUME /app

# 容器启动的时候执行的命令
CMD ["http-server", "-p", "8080"]

# 然后执行docker build . -t aaa:ccc -f 2.Dockerfile
# aaa 是镜像名，ccc 是镜像的标签
