---
title: '使用Dockerfile构建应用 '
createTime: 2025/08/15 14:06:38
permalink: /article/hvuv3nvu/
---
# 使用Dockerfile构建应用

## 任务目标

- 理解 Dockerfile 的定义、组成及构建流程
- 学习并应用Dockerfile核心指令
- 灵活运用指令组合，实现文件复制、环境变量、端口声明及数据持久化等常见需求
- 掌握 SpringBoot 项目 Docker 部署全流程

## 任务单元

### 任务一：理解Dockerfile基础与构建流程

#### 1-1 任务描述

本任务旨在引导我们掌握Dockerfile的核心概念和构建机制。通过实际操作，我们将理解Dockerfile的文件组成（基础镜像、操作指令、启动命令）和构建三步骤（编写→构建→运行）。最终，我们能够编写基础Dockerfile（使用FROM/RUN指令），构建自定义Ubuntu镜像（含nano工具），并通过容器验证构建效果。

#### 1-2 必备知识点

##### 4.1.1  Dockerfile是什么

Docker官方提供的镜像已经可以适用于大多数应用程序。如果我们想构建属于自己的业务镜像，这个时候需要自定义镜像。自定义镜像使用Dockerfile。

DockerFile是用来构建Docker镜像的文本文件，是一条条构建镜像所需要的指令和参数构成的脚本。

Dockerfile的主要作用是自动化构建Docker镜像，通过编写Dockerfile，我们可以将应用的构建、配置和运行步骤打包到一个可移植的文件中，方便在不同的环境中快速部署。

##### 4.1.2 Dockerfile文件组成

一个dockerfile文件包含以下部分：

- 基础镜像信息： 使用FROM关键字指定基础镜像信息，FROM是dockerfile文件的第一条指令。
- 镜像操作指令： 每执行一条镜像操作指令，都会在镜像中添加新的一层。
- 容器启动执行命令： 用户指定在启动容器时需要执行的命令，通过：CMD ENTRYPOINT指定。



DockerFile文件内容规范：

（1）每条保留字指令都必须为大写字母且后面要跟随至少一个参数

（2）指令按照从上向下，顺序执行

（3）\#表示注释

（4）每个指令都会创建一个新的镜像层并且对于镜像进行提交



##### 4.1.3 Dockerfile构建步骤

**1.构建三步骤**

（1）编写DockerFile文件

（2）Docker build命令构建镜像

（3）docker run 依据镜像运行容器实例



![image-20240724151336858](.\images\Dockerfile构建步骤.png)



**2.Dockerfile执行流程**

（1）Docker从基础镜像运行一个容器

（2）执行一条指令并且对于容器做出修改

（3）执行类似docker commit的操作提交一个新的镜像层

（4）Docker再基于刚提交的镜像运行一个新的容器

（5）执行DockeFile 中的下一条指令直到所有指令都执行完成



![image-20240724151336858](.\images\Dockerfile执行流程.png)





**3.Dockerfile、Docker镜像、Docker容器**

从应用软件的角度而言，DockerFile，Docker镜像和Docker容器分别代表了软件的三个不同阶段

- DockerFile是软件的原材料
- Docker镜像是软件的交付品
- Docker容器则可以认为是软件镜像的运行状态，也是依照镜像运行的容器实例



**DockerFile面向开发，Docker镜像成为交付标准，Docker容器则涉及部署和运维，三者缺一不可，合理充当Docker体系的基石！**

![](.\images\02三者关系.png)



#### 1-3 任务实施

**（1）理解 Dockerfile 基础**：明确 Dockerfile 是构建镜像的文本文件，包含基础镜像信息、操作指令和启动命令，构建流程为 “编写文件→构建镜像→运行容器”。

**（2）编写基础 Dockerfile：**

- 创建工作目录：`mkdir myfirstdocker && cd myfirstdocker`
- 创建 Dockerfile：`touch Dockerfile`
- 编辑 Dockerfile，使用 FROM 指定基础镜像，RUN 指令安装 nano 工具：

（a）创建Dockerfile

```
root@hp-None:~# mkdir myfirstdocker
root@hp-None:~# ls
data  hp  myfirstdocker  nginxconfig  RUNNING.txt  snap
root@hp-None:~# cd myfirstdocker/
root@hp-None:~/myfirstdocker# touch Dockerfile
root@hp-None:~/myfirstdocker# ls
Dockerfile
```

（b）编写Dockerfile

```
FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y nano
```



（c）构建镜像

```
root@hp-None:~/myfirstdocker# docker build -t myubuntu:01 .
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/

Sending build context to Docker daemon  2.048kB
Step 1/3 : FROM ubuntu:latest
latest: Pulling from library/ubuntu
32f112e3802c: Already exists 
Digest: sha256:a08e551cb33850e4740772b38217fc1796a66da2506d312abe51acda354ff061
Status: Downloaded newer image for ubuntu:latest
 ---> 65ae7a6f3544
Step 2/3 : RUN apt-get update
 ---> Running in 8cba11e28a44
Get:1 http://archive.ubuntu.com/ubuntu noble InRelease [256 kB]
Get:2 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
......

```



（d）验证结果

运行容器docker run -it myubuntu:01，在容器内执行nano test.txt，检查 nano 是否可正常使用。

```
root@hp-None:~# docker run -it myubuntu:01
root@196d63fc14cc:/# nano text.txt
root@196d63fc14cc:/# 
```

进入容器后执行`nano test.txt`，若能打开编辑界面则成功。



### 任务二：掌握 Dockerfile 核心指令的使用

#### 2-1 任务描述

本任务旨在指导我们熟练应用关键Docker指令。通过编写包含多指令的Dockerfile，我们将实现：设置工作目录、复制文件、配置环境变量、声明数据卷和暴露端口。最终，我们将构建镜像并通过容器验证各指令效果（目录结构/文件复制/环境变量/挂载点）。

#### 2-2 必备知识点

##### 4.2.1 Dockerfile基本指令

看看ubuntu系统

```
#拉取ubuntu
root@hp-None:~# docker pull ubuntu:latest
latest: Pulling from library/ubuntu
7b1a6ab2e44d: Pull complete 
Digest: sha256:626ffe58f6e7566e00254b638eb7e0f3b11d4da9675088f4781a50ae288f3322
Status: Downloaded newer image for ubuntu:latest
docker.io/library/ubuntu:latest

#进入系统
root@hp-None:~# docker run -d ubuntu:latest
98b256eae2438c61ffeb98adf0fef57ee1a0c66033ba73ffd9b98a25b0479d2d

root@hp-None:~# docker ps
CONTAINER ID   IMAGE           COMMAND                   CREATED        STATUS        PORTS                                                  NAMES
499518388cd8   app:1.0         "java -jar app.jar"       4 hours ago    Up 4 hours    9001/tcp, 0.0.0.0:9001->8088/tcp, :::9001->8088/tcp    webapp
d53a155b1dd1   nginx:1.19.10   "/docker-entrypoint.…"   29 hours ago   Up 29 hours   80/tcp, 0.0.0.0:8099->8088/tcp, :::8099->8088/tcp      nginx02
cc2fef6311e9   nginx:1.19.10   "/docker-entrypoint.…"   29 hours ago   Up 29 hours   0.0.0.0:80->80/tcp, :::80->80/tcp                      nginx01
834a021d5e54   redis:6.0.9     "docker-entrypoint.s…"   32 hours ago   Up 32 hours   0.0.0.0:6379->6379/tcp, :::6379->6379/tcp              redis03
02e6eb10762f   mysql:8.0       "docker-entrypoint.s…"   2 days ago     Up 2 days     0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql8-02
```

ubuntu系统运行就退出，我们可基于ubuntu系统构建。



常见的Dockerfile操作指令：

|    指令    |                             描述                             |
| :--------: | :----------------------------------------------------------: |
|    FROM    |      基础镜像，一切从这里开始构建，第一个指令必须是FROM      |
|    RUN     |                 镜像构建的时候需要运行的命令                 |
|   EXPOSE   |                        保留暴露的端口                        |
|    ENV     |                    构建的时候设置环境变量                    |
|    ADD     |              添加内容： 比如加一个tomcat压缩包               |
|    COPY    |              类似ADD ，将我们的文件拷贝到镜像中              |
|  WORKDIR   |                        镜像的工作目录                        |
|   VOLUME   |                        镜像挂载的目录                        |
|    CMD     | 指定这个容器启动的时候要运行的命令，只有最后一个会生效，可以被代替 |
| ENTRYPOINT |      指定这个容器启动的时候需要运行的命令，可以追加命令      |

**（1）FROM指令**

FROM指令用于指定基础镜像。一个有效的Dockerfile必须包含FROM指令，且必须是第一条非注释指令。

示例：

```
FROM ubuntu:latest
```

创建myfile目录，在该目录下创建Dockerfile

```
root@hp-None:~# mkdir myfile
root@hp-None:~# cd myfile/
root@hp-None:~/myfile# touch Dockerfile
root@hp-None:~/myfile# ls
Dockerfile
root@hp-None:~/myfile# nano Dockerfile
```

编写Dockerfile内容

```
FROM ubuntu:latest
```

执行docker build进行构建（需要注意，后面要加 .）

```
#执行docker build
root@hp-None:~/myfile# docker build -t myubuntu:01 .
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/

Sending build context to Docker daemon  2.048kB
Step 1/1 : FROM ubuntu:latest
 ---> ba6acccedd29
Successfully built ba6acccedd29
Successfully tagged myubuntu:01

root@hp-None:~# docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
app          1.0       3ed0eb4c44a5   5 hours ago   351MB
openjdk      8-jre     26ac3f63d29f   2 years ago   273MB
redis        latest    7614ae9453d1   2 years ago   113MB
mysql        8.0       3218b38490ce   2 years ago   516MB
ubuntu       latest    ba6acccedd29   2 years ago   72.8MB
myubuntu     01        ba6acccedd29   2 years ago   72.8MB
nginx        1.19.10   f0b8a9a54136   3 years ago   133MB
redis        6.0.9     6060df96cef3   3 years ago   104MB
tomcat       8.0       ef6a7c98d192   5 years ago   356MB

```



**（2）RUN指令**

RUN指令用于在镜像构建过程中执行任何命令。这些命令通常用于安装软件包、设置环境变量等。

- 第一种 shell格式

  RUN apt-get install nano

- 第二种 exec格式

  RUN [“可执行文件”,“参数1”,“参数2”]

运行前面拉取的ubuntu:latest，进入容器，创建文件，提示没有nano命令

```
root@hp-None:~# docker run -it ubuntu:latest
root@aad734a7bd04:/# nano abc.txt
bash: nano: command not found
```

然后执行更新，再安装nano

```
#执行更新
root@aad734a7bd04:/# apt-get update
Get:1 http://security.ubuntu.com/ubuntu focal-security InRelease [128 kB]
Get:2 http://archive.ubuntu.com/ubuntu focal InRelease [265 kB]
Get:3 http://security.ubuntu.com/ubuntu focal-security/restricted amd64 Packages [3780 kB]
......                                                                                                                                                
Reading package lists... Done
Building dependency tree       
Reading state information... Done
51 packages can be upgraded. Run 'apt list --upgradable' to see them.

#安装nano
root@aad734a7bd04:/# apt-get install nano
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Suggested packages:
  hunspell
The following NEW packages will be installed:
  nano
0 upgraded, 1 newly installed, 0 to remove and 51 not upgraded.
Need to get 269 kB of archives.
After this operation, 868 kB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu focal/main amd64 nano amd64 4.8-1ubuntu1 [269 kB]
Fetched 269 kB in 2s (128 kB/s)
......
```



我们希望构建的ubuntu系统安装nano，可以使用RUN指令

```
RUN apt-get update
RUN apt-get install nano
```

```
#构建镜像
root@hp-None:~/myfile# docker build -t myubuntu:02 .
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/

Sending build context to Docker daemon  2.048kB
Step 1/3 : FROM ubuntu:latest
 ---> ba6acccedd29
Step 2/3 : RUN apt update
 ---> Running in 8b9d08053490
 ......
 
```



```
root@hp-None:~# docker images
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
myubuntu     02        4a96df1e09db   5 minutes ago   126MB
app          1.0       3ed0eb4c44a5   6 hours ago     351MB
openjdk      8-jre     26ac3f63d29f   2 years ago     273MB
redis        latest    7614ae9453d1   2 years ago     113MB
mysql        8.0       3218b38490ce   2 years ago     516MB
myubuntu     01        ba6acccedd29   2 years ago     72.8MB
ubuntu       latest    ba6acccedd29   2 years ago     72.8MB
nginx        1.19.10   f0b8a9a54136   3 years ago     133MB
redis        6.0.9     6060df96cef3   3 years ago     104MB
tomcat       8.0       ef6a7c98d192   5 years ago     356MB

#进入容器
root@hp-Noneroot@docker:~# docker run -it myubuntu:02
root@075eee432afd:/# nano abc.txt
```

第二种方式写法（带缓存）

```
RUN ["apt-get","update"]
RUN ["apt-get","install","nano"]
```



**（3）EXPOSE指令**

EXPOSE指令用于声明容器运行时监听的端口。这并不会使容器自动访问宿主机的端口，但可以帮助Docker了解哪些端口可能需要映射到宿主机。

```
EXPOSE 8099
```

注意：**这里只做声明**，并不会使容器自动访问宿主机的端口。

```
root@hp-None:~/myfile# docker build -t myubuntu:04 .
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/

Sending build context to Docker daemon  2.048kB
Step 1/4 : FROM ubuntu:latest
 ---> ba6acccedd29
Step 2/4 : RUN ["apt-get","update"]
 ---> Using cache
 ---> 7a1fec8ea0a1
Step 3/4 : RUN ["apt-get","install","nano"]
 ---> Using cache
 ---> a4e175415678
Step 4/4 : EXPOSE 8099
 ---> Running in f8752840607a
Removing intermediate container f8752840607a
 ---> b0a6d1baa465
Successfully built b0a6d1baa465
Successfully tagged myubuntu:04
```



**（4）WORKDIR指令**

WORKDIR指令用于设置容器内的工作目录。后续的RUN、CMD、ENTRYPOINT等指令都会在这个目录下执行。

下面是ubuntu进入默认的目录，如果想设置进入默认目录，可以使用WORKDIR指令。

```
root@hp-None:~# docker run -it myubuntu:02
root@075eee432afd:/# pwd
/
```

例如，进入默认目录为/apps

```
WORKDIR /apps
```



```
root@hp-None:~/myfile# docker build -t myubuntu:05 .
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/

Sending build context to Docker daemon  2.048kB
Step 1/5 : FROM ubuntu:latest
 ---> ba6acccedd29
Step 2/5 : RUN ["apt-get","update"]
 ---> Using cache
 ---> 7a1fec8ea0a1
Step 3/5 : RUN ["apt-get","install","nano"]
 ---> Using cache
 ---> a4e175415678
Step 4/5 : EXPOSE 8099
 ---> Using cache
 ---> b0a6d1baa465
Step 5/5 : WORKDIR /apps
 ---> Running in 3b2f99c9fdb0
Removing intermediate container 3b2f99c9fdb0
 ---> 4ebb1ee885c6
Successfully built 4ebb1ee885c6
```

进入容器，默认是/apps目录（没有该目录，会自动创建）

```
root@hp-None:~# docker run -it myubuntu:05 
root@ed09308b9732:/apps# 
```

多层写法：

```
WORKDIR /apps
WORKDIR data
```

等价于

```
WORKDIR /apps/data
```



**（5）ADD指令**

ADD指令用于将本地文件或目录添加到容器中，并支持自动解压tar包。

```
WORKDIR /apps 
WORKDIR data
ADD abc.txt /apps/data
```

把Dockerfile所在目录的abc.txt拷贝到/apps/data下，也可以直接写 ADD ./abc.txt .

```
root@hp-None:~/myfile# nano abc.txt
#构建镜像
root@hp-None:~/myfile# docker build -t myubuntu:06 .
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/

Sending build context to Docker daemon  3.072kB
Step 1/7 : FROM ubuntu:latest
 ---> ba6acccedd29
Step 2/7 : RUN ["apt-get","update"]
 ---> Using cache
 ---> 7a1fec8ea0a1
Step 3/7 : RUN ["apt-get","install","nano"]
 ---> Using cache
 ---> a4e175415678
Step 4/7 : EXPOSE 8099
 ---> Using cache
 ---> b0a6d1baa465
Step 5/7 : WORKDIR /apps
 ---> Using cache
 ---> 4ebb1ee885c6
Step 6/7 : WORKDIR data
 ---> Running in c7849978de48
Removing intermediate container c7849978de48
 ---> 9c91630bfdba
Step 7/7 : ADD abc.txt /apps/data
 ---> 0ac5cdbe4658
Successfully built 0ac5cdbe4658
Successfully tagged myubuntu:06
```

进入容器

```
root@hp-None:~# docker run -it myubuntu:06
root@df41224c7d84:/apps/data# ls
abc.txt
```



思考题：下面的abc.txt文件拷贝到哪里？

```
WORKDIR /apps 
ADD abc.txt .
WORKDIR data
```



ADD可以下载

```
ADD https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.107/bin/apache-tomcat-9.0.107.tar.gz .
```

实现文件下载，并解压，再删除tar.gz包，然后重命名

```
ADD https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.107/bin/apache-tomcat-9.0.107.tar.gz .
RUN tar -xvf apache-tomcat-9.0.107.tar.gz
RUN rm -rf apache-tomcat-9.0.107.tar.gz
RUN mv apache-tomcat-9.0.107 tomcat-9.0.107
```

示例：

```
#构建镜像
root@hp-None:~/myfile# docker build -t myubuntu:07 .
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/

......
apache-tomcat-9.0.107/bin/catalina.sh
apache-tomcat-9.0.107/bin/ciphers.sh
apache-tomcat-9.0.107/bin/configtest.sh
apache-tomcat-9.0.107/bin/daemon.sh
apache-tomcat-9.0.107/bin/digest.sh
apache-tomcat-9.0.107/bin/makebase.sh
apache-tomcat-9.0.107/bin/setclasspath.sh
apache-tomcat-9.0.107/bin/shutdown.sh
apache-tomcat-9.0.107/bin/startup.sh
apache-tomcat-9.0.107/bin/tool-wrapper.sh
apache-tomcat-9.0.107/bin/version.sh
 ---> Removed intermediate container 1cc11e722529
 ---> 6f8e3767b912
Step 9/10 : RUN rm -rf apache-tomcat-9.0.107.tar.gz
 ---> Running in 841367c9532e
 ---> Removed intermediate container 841367c9532e
 ---> 137309981753
Step 10/10 : RUN mv apache-tomcat-9.0.107 tomcat-9.0.107
 ---> Running in 7d4d94c7f136
 ---> Removed intermediate container 7d4d94c7f136
 ---> acc5c43d4b4c
Successfully built acc5c43d4b4c
Successfully tagged myubuntu:07


#进入容器
root@hp-None:~# docker run -it myubuntu:07
root@4f66bf58586e:/apps/data# ls
abc.txt  tomcat-9.0.107
```



**（6）COPY指令**

COPY指令用于将本地文件或目录复制到容器中。与ADD指令相比，COPY指令只支持简单的复制操作，不支持自动解压。

```
WORKDIR /apps 
WORKDIR data
COPY abc.txt /apps/data
```



**ADD 和 COPY 的区别和使用场景**

- ADD 支持添加远程 url 和自动提取压缩格式的文件，COPY 只允许从本机中复制文件
- COPY 支持从其他构建阶段中复制源文件(–from)
- 根据官方 Dockerfile 最佳实践，除非真的需要从远程 url 添加文件或自动提取压缩文件才用 ADD，其他情况一律使用 COPY

**注意事项**

- ADD 从远程 url 获取文件和复制的效果并不理想，因为该文件会增加 Docker Image 最终的大小。相反，应该使用 curl huo wget 来获取远程文件，然后在不需要它时进行删除

**（7）ENV指令**

ENV指令用于设置环境变量。这些变量可以在后续的RUN指令中使用，也可以在容器运行时被应用使用。

```
#不用ENV
WORKDIR=/apps/data

#使用ENV
ENV APP_PATH=/apps/data
WORKDIR $APP_PATH
```



**（8）VOLUME指令**

VOLUME指令用于创建一个可以从容器外部访问的挂载点。这可以用于存储数据库文件、配置文件等需要持久化的数据。

```
#使用ENV
ENV APP_PATH=/apps/data
WORKDIR $APP_PATH
#这里仅仅是声明，告诉使用者容器中可以挂载这个目录到宿主机         
VOLUME $APP_PATH
```

示例：

```
#构建镜像
root@hp-None:~/myfile# docker build -t myubuntu:09 .
......
Step 12/12 : VOLUME $APP_PATH
 ---> Running in 7c02e13a5dac
Removing intermediate container 7c02e13a5dac
 ---> 54aa1c9580a9
Successfully built 54aa1c9580a9
Successfully tagged myubuntu:09

#运行容器，并挂载数据目录
root@hp-None:~# docker run -v mydata:/apps/data myubuntu:09
#查看数据卷信息
root@hp-None:~# docker inspect mydata
[
    {
        "CreatedAt": "2024-07-25T07:50:30+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/mydata/_data",
        "Name": "mydata",
        "Options": null,
        "Scope": "local"
    }
]
root@hp-None:~# cd /var/lib/docker/volumes/mydata/_data
root@hp-None:/var/lib/docker/volumes/mydata/_data# ls
abc.txt  tomcat-9.0.107
```



**（9）CMD指令**

CMD指令用于指定容器启动后要执行的命令。Dockerfile中可以包含多个CMD指令，但只有最后一个会生效。如果容器以命令行方式运行，并且提供了命令和参数，那么CMD指令指定的默认命令和参数将会被覆盖。

```
#直接运行jar
java -jar app.jar

#json数组（推荐）
["java","-jar","app.jar"]
```

示例：进入容器，默认显示apps/data目录下所有文件

CMD ls /apps/data 或者 CMD ls $APP_PATH

```
#构建镜像
root@hp-None:~/myfile# docker build -t myubuntu:10 .
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/
            
......
Step 13/13 : CMD ls /apps/data
 ---> Running in ae9fef4763ee
Removing intermediate container ae9fef4763ee
 ---> 7110fdbed963
Successfully built 7110fdbed963
Successfully tagged myubuntu:10

#运行容器
root@hp-None:~# docker run myubuntu:10
abc.txt
tomcat-9.0.107
```



json数组写法：CMD [“ls","/apps/data"]，**支持传参**

```
root@docker:~/myfile# docker build -t myubuntu:13 .
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/

Sending build context to Docker daemon  3.584kB
Step 1/13 : FROM ubuntu:latest
 ---> ba6acccedd29
......

#运行容器，默认为apps目录
root@docker:~# docker run myubuntu:13 ls /apps
data

#运行容器，默认为/目录
root@docker:~# docker run myubuntu:13 ls /
apps
bin
boot
dev
etc
home
lib
lib32
lib64
libx32
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var
```



**（10）ENTRYPOINT指令**

ENTRYPOINT指令用于配置容器启动时的默认命令及其参数。与CMD指令类似，但ENTRYPOINT不会被docker run命令行指定的参数所覆盖，这些命令行参数会被当作参数送给ENTRYPOINT指令指定的程序。

**CMD和ENTRYPOINT如何使用？**

ENTRYPOINT用来书写固定的指令（ls /apps/data   ==>**ls**）

CMD用来传递参数（**/apps/data**）

注意：配合使用时必须使用json数组写法

```
ENTRYPOINT ["ls"]
CMD ["/apps/data"]
```

运行jar包（java -jar app.jar）

```
ENTRYPOINT ["java","-jar"]
CMD ["app.jar"]
```



#### 2-3 任务实施

实施Dockerfile核心指令的使用，实施步骤如下所示。

**（1）准备工作**：在工作目录下创建`test.txt`文件（内容自定义）。

```
root@hp-None:~# mkdir test
root@hp-None:~# cd test
root@hp-None:~/test# ls
root@hp-None:~/test# nano test.txt
root@hp-None:~/test# ls
test.txt
root@hp-None:~/test# nano Dockerfile
```



**（2）编写 Dockerfile**：

```
FROM ubuntu:latest
# 设置环境变量
ENV APP_DIR=/myapp/data
# 设置工作目录
WORKDIR $APP_DIR
# 安装nano（复用基础指令）
RUN apt-get update && apt-get install -y nano
# 复制本地文件到容器
COPY test.txt .
# 声明暴露端口
EXPOSE 8080
# 声明数据挂载目录
VOLUME $APP_DIR
```



**（3）构建镜像**：`docker build -t myubuntu:core .`

```
root@hp-None:~/test# docker build -t myubuntu:core .
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/

Sending build context to Docker daemon  3.072kB
Step 1/7 : FROM ubuntu:latest
 ---> 65ae7a6f3544
Step 2/7 : ENV APP_DIR=/myapp/data
 ---> Running in c82d6e80c551
 ---> Removed intermediate container c82d6e80c551
 ---> ceb99dcec127
Step 3/7 : WORKDIR $APP_DIR
 ---> Running in eae0d4d3a5c8
 ---> Removed intermediate container eae0d4d3a5c8
 ---> 653aabec56fa
Step 4/7 : RUN apt-get update && apt-get install -y nano
 ---> Running in 97898d72971c
Get:1 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
......
```



**（4）验证各指令**：

- 运行容器：docker run -it --name test-container myubuntu:core
- 验证 WORKDIR：执行`pwd`，应显示`/myapp/data`
- 验证 COPY：执行`ls`，应显示`test.txt`
- 验证 ENV：执行`echo $APP_DIR`，应显示`/myapp/data`

```
root@hp-None:~# docker run -it --name test-container myubuntu:core
root@3d060c0f7c2b:/myapp/data# pwd
/myapp/data
root@3d060c0f7c2b:/myapp/data# ls
test.txt
root@3d060c0f7c2b:/myapp/data# echo $APP_DIR 
/myapp/data
root@3d060c0f7c2b:/myapp/data# 
```



- 验证 VOLUME：另开终端执行`docker inspect test-container`，查看`Mounts`部分是否包含`/myapp/data`

```
root@hp-None:~# docker inspect test-container

......
        "Mounts": [
            {
                "Type": "volume",
                "Name": "22bd9b3c80085bae00a9f0f3355e6f07c8e64a20fe8e58aa353a9e62cab697ed",
                "Source": "/var/lib/docker/volumes/22bd9b3c80085bae00a9f0f3355e6f07c8e64a20fe8e58aa353a9e62cab697ed/_data",
                "Destination": "/myapp/data",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
......
```



验证要点：工作目录正确、文件复制成功、环境变量生效、挂载目录存在。



### 任务三：使用 Dockerfile 部署SpringBoot 项目

#### 3-1 任务描述

本任务旨在带领我们完成SpringBoot项目的容器化全流程部署。通过准备JAR包、编写Dockerfile（ENTRYPOINT+CMD）、构建镜像、配置容器网络连接数据库等步骤，我们将实现：创建自定义网络、连接MySQL容器、运行SpringBoot应用。最终，我们将通过Web访问验证项目功能（后台管理/移动端页面）。

#### 3-2 必备知识点

使用AI自学Docker中自定义网络。



#### 3-3 任务实施

使用 Dockerfile 部署SpringBoot 项目，实施步骤如下所示。

（1）上传jar

在root目录下创建app目录

```
root@hp-None:~# mkdir app
```

使用filezilla上传hp-demo.jar到app目录下。

![image-20240724073530995](.\images\01上传jar.png)

（2）编写Dockerfile

在app目录下创建Dockerfile，并编写内容

```
root@hp-None:~# cd app
root@hp-None:~/app# touch Dockerfile
root@hp-None:~/app# ls
Dockerfile
root@hp-None:~/app# nano Dockerfile
```

编写Dockerfile，内容如下

```
FROM openjdk:8-jre
ENV APP_PATH=/web-app
WORKDIR $APP_PATH
ADD hp-demo.jar $APP_PATH/app.jar
EXPOSE 9001
ENTRYPOINT ["java","-jar"]
CMD ["app.jar"]
```

（3）运行Dockerfile

```
root@hp-None:~/app# docker build -t app:1.0 .
DEPRECATED: The legacy builder is deprecated and will be removed in a future release.
            Install the buildx component to build images with BuildKit:
            https://docs.docker.com/go/buildx/

Sending build context to Docker daemon  24.61MB
Step 1/7 : FROM openjdk:8-jre
8-jre: Pulling from library/openjdk
0e29546d541c: Pull complete 
9b829c73b52b: Pull complete 
cb5b7ae36172: Pull complete 
99ce012bef04: Pull complete 
22dc2a72d098: Pull complete 
9c69a57e10d9: Pull complete 
Digest: sha256:c0ab1c0631266ef9420a414726a790733a2561efc5f4fa2f9b8186f4d6b00d53
Status: Downloaded newer image for openjdk:8-jre
 ---> 26ac3f63d29f
Step 2/7 : ENV APP_PATH=/web-app
 ---> Running in d96d498cc689
Removing intermediate container d96d498cc689
 ---> d12ae3ddd8bb
Step 3/7 : WORKDIR $APP_PATH
 ---> Running in 46ba42847dc7
Removing intermediate container 46ba42847dc7
 ---> 77ec863f44b4
Step 4/7 : ADD hp-demo.jar $APP_PATH/app.jar
 ---> 3db314061c69
Step 5/7 : EXPOSE 9001
 ---> Running in b50a91bab707
Removing intermediate container b50a91bab707
 ---> 20015c8e0ec1
Step 6/7 : ENTRYPOINT ["java","-jar"]
 ---> Running in ee8cb723d997
Removing intermediate container ee8cb723d997
 ---> 66f32bcbdfce
Step 7/7 : CMD ["app.jar"]
 ---> Running in 15b73eba0eb6
Removing intermediate container 15b73eba0eb6
 ---> afbac44043a4
Successfully built afbac44043a4
Successfully tagged app:1.0
```

查看镜像

```
root@hp-None:~# docker images
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
app          1.0       afbac44043a4   2 minutes ago   298MB
openjdk      8-jre     26ac3f63d29f   2 years ago     273MB
redis        latest    7614ae9453d1   2 years ago     113MB
mysql        8.0       3218b38490ce   2 years ago     516MB
nginx        1.19.10   f0b8a9a54136   3 years ago     133MB
redis        6.0.9     6060df96cef3   3 years ago     104MB
tomcat       8.0       ef6a7c98d192   5 years ago     356MB
```

现在运行app容器可以吗？



（4）创建数据库

使用Navicat连接数据库，创建zhiyihui数据库，然后导入zhiyihui.sql

![image-20240724081956253](.\images\02创建数据库.png)



（5）创建网络

容器是相互隔离的，要app.jar能连接到mysql，需要他们在同一网络下。

创建网络：docker network create 网络名称

```
#创建网络
root@hp-None:~# docker network create mynetwork
fd8d4ffba57810e798913b756d9a68b27b28a4536153034932ab9d05429c26a2
```

mysql连接到自定义网络

连接自定义网络：docker network connect 网络名称 容器ID|容器名称

```
root@hp-None:~# docker ps
CONTAINER ID   IMAGE           COMMAND                   CREATED        STATUS        PORTS                                                  NAMES
d53a155b1dd1   nginx:1.19.10   "/docker-entrypoint.…"   22 hours ago   Up 22 hours   80/tcp, 0.0.0.0:8099->8088/tcp, :::8099->8088/tcp      nginx02
cc2fef6311e9   nginx:1.19.10   "/docker-entrypoint.…"   22 hours ago   Up 22 hours   0.0.0.0:80->80/tcp, :::80->80/tcp                      nginx01
834a021d5e54   redis:6.0.9     "docker-entrypoint.s…"   25 hours ago   Up 25 hours   0.0.0.0:6379->6379/tcp, :::6379->6379/tcp              redis03
02e6eb10762f   mysql:8.0       "docker-entrypoint.s…"   2 days ago     Up 2 days     0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql8-02

#mysql连接到mynetwork
root@hp-None:~# docker network connect mynetwork 02e6eb10762f
```

查看自定义网络信息

docker inspect 网络名称

```
#mysql连接到mynetwork
root@hp-None:~# docker inspect mynetwork
[
    {
        "Name": "mynetwork",
        "Id": "fd8d4ffba57810e798913b756d9a68b27b28a4536153034932ab9d05429c26a2",
        "Created": "2024-07-24T08:26:16.117157077+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "02e6eb10762f7d4f7ca8217e1c2993e0c6883874e423df26afcda361e3b767f4": {
                "Name": "mysql8-02",
                "EndpointID": "42415a5a07e83ccc004dec1b60b4b1ac47d9f5e38de76b2002f0a833fbe03ff8",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]
```

**【同理redis也需加入网络】**

（6）运行项目

```
root@hp-None:~# docker run -d -p 9001:8088 --name webapp app:1.0
5dc7cca24bcb9b2b97b38e2bede0c37c170b37906c255f9289e27216d18799a7
```

查看运行日志：docker logs -f 容器ID

```
root@hp-None:~# docker ps
CONTAINER ID   IMAGE           COMMAND                   CREATED              STATUS              PORTS                                                  NAMES
5dc7cca24bcb   app:1.0         "java -jar app.jar"       About a minute ago   Up About a minute   0.0.0.0:9001->9001/tcp, :::9001->9001/tcp              webapp
d53a155b1dd1   nginx:1.19.10   "/docker-entrypoint.…"   22 hours ago         Up 22 hours         80/tcp, 0.0.0.0:8099->8088/tcp, :::8099->8088/tcp      nginx02
cc2fef6311e9   nginx:1.19.10   "/docker-entrypoint.…"   22 hours ago         Up 22 hours         0.0.0.0:80->80/tcp, :::80->80/tcp                      nginx01
834a021d5e54   redis:6.0.9     "docker-entrypoint.s…"   25 hours ago         Up 25 hours         0.0.0.0:6379->6379/tcp, :::6379->6379/tcp              redis03
02e6eb10762f   mysql:8.0       "docker-entrypoint.s…"   2 days ago           Up 2 days           0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql8-02

#查看日志
root@hp-None:~# docker logs -f 5dc7cca24bcb

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.6)

2024-07-24 00:46:46.921  INFO 1 --- [           main] com.hp.demo.HpDemoApplication            : Starting HpDemoApplication using Java 1.8.0_312 on 5dc7cca24bcb with PID 1 (/web-app/app.jar started by root in /web-app)
2024-07-24 00:46:46.953  INFO 1 --- [           main] com.hp.demo.HpDemoApplication            : No active profile set, falling back to 1 default profile: "default"
2024-07-24 00:46:51.159  INFO 1 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 9001 (http)
2024-07-24 00:46:51.204  INFO 1 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2024-07-24 00:46:51.205  INFO 1 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.69]
2024-07-24 00:46:51.466  INFO 1 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2024-07-24 00:46:51.468  INFO 1 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 4320 ms
2024-07-24 00:46:52.763  INFO 1 --- [           main] o.s.b.a.w.s.WelcomePageHandlerMapping    : Adding welcome page: class path resource [static/index.html]
2024-07-24 00:46:53.326  INFO 1 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 9001 (http) with context path ''
2024-07-24 00:46:53.367  INFO 1 --- [           main] com.hp.demo.HpDemoApplication            : Started HpDemoApplication in 7.795 seconds (JVM running for 8.923)
```

app项目加入网络

```
root@hp-None:~# docker network connect mynetwork 5dc7cca24bcb
root@hp-None:~# docker inspect mynetwork
[
    {
        "Name": "mynetwork",
        "Id": "fd8d4ffba57810e798913b756d9a68b27b28a4536153034932ab9d05429c26a2",
        "Created": "2024-07-24T08:26:16.117157077+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "02e6eb10762f7d4f7ca8217e1c2993e0c6883874e423df26afcda361e3b767f4": {
                "Name": "mysql8-02",
                "EndpointID": "42415a5a07e83ccc004dec1b60b4b1ac47d9f5e38de76b2002f0a833fbe03ff8",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            },
            "5dc7cca24bcb9b2b97b38e2bede0c37c170b37906c255f9289e27216d18799a7": {
                "Name": "webapp",
                "EndpointID": "62b12e23aaa3d61a38ccb34dec53128127bf17e60f5cfa5922560d91f38f133f",
                "MacAddress": "02:42:ac:12:00:03",
                "IPv4Address": "172.18.0.3/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]
```



（7）访问项目

http://192.168.6.136:9001/login.html

后台登录

![](.\images\03后台登录.png)



检查项管理

![](.\images\04检查项列表.png)

http://192.168.6.136:9001/mobile/pages/index.html

移动端首页

![](.\images\08移动端首页.png)

套餐列表

![](.\images\09套餐列表.png)
