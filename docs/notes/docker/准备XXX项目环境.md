---
title: 准备XXX项目环境
createTime: 2025/08/15 14:06:38
permalink: /article/zknm0skk/
---
# 单元一 准备XXX项目环境

## 任务目标

- 能够熟练安装Docker Engine
- 熟练配置Docker镜像加速
- 熟练拉取智慧医疗项目镜像

## 任务单元

### 任务一：走进Docker世界

#### 1-1 任务描述

本任务旨在全面认知Docker容器技术的相关知识，包括Docker的基本介绍、优势、架构组成以及与虚拟机的对比分析。通过本任务，我们能够全面深入地认知Docker容器技术，掌握其基本原理和操作方法，并在实际项目中灵活应用。这将为我们未来的技术探索和创新提供有力的支撑，同时也有助于提升我们在容器化技术领域的专业素养和竞争力。

#### 1-2 必备知识点

##### 1.1.1 Docker简介

Docker起源于2013年，由Docker公司（前身为dotCloud公司）创造和推广。它是一个开源的**容器**化平台，旨在简化应用程序的部署和管理。

在过去，应用程序的部署和运行环境往往存在着依赖关系和配置差异，这导致了许多问题，例如运行环境不兼容、难以移植和难以管理等。为了解决这些问题，Docker应运而生。

官方网站：https://www.docker.com/

![image-20240720101417378](.\images\01官网.png)

官网定义

We help developers and development teams build and ship apps

我们帮助开发人员和开发团队构建和发布应用

We have a complete container solution for you -no matter who you are and where you are on your containerization journey.

我们为你提供了一个完整的**容器**解决方案,不管你是谁,不管你在哪,你都可以开始容器的的旅程。



Docker 是一个可以将应用程序及其依赖打包到几乎可以在任何服务器上运行的**容器**的工具。

Docker的核心概念是**容器**，它是一种轻量级且独立的运行环境，可以在任何操作系统上运行。与传统的虚拟化技术相比，容器不需要额外的操作系统，它们共享主机的内核，因此更加高效和灵活。

Docker容器技术，帮助我们更好地构建和发布应用。

Docker容器到底装的是什么？容器里装的就是一个个的软件服务。

传统方式：

![image-20240720105034832](.\images\02 传统方式.png)

Docker方式：

![image-20240720105034832](.\images\03 docker方式.png)

Docker吉祥物，鲸鱼，代表Docker引擎，在鲸鱼身上背着一个个小箱子，箱子之间互不影响，独立运行。

![](.\images\04 docker logo.png)

##### 1.1.2 Docker优势

(1)一致的运行环境，更轻松迁移

这里我们拿java Web应用程序举例，我们一个java Web应用程序涉及很多东西，比如jdk、tomcat、mysql等软件环境。当这些其中某一项版本不一致的时候，可能就会导致应用程序跑不起来这种情况。Docker则将程序以及使用软件环境直接打包在一起，无论在那个机器上保证了环境一致。

常见的问题：在开发的时候，在本机测试环境可以跑，生产环境跑不起来

(2)对进程进行封装隔离,容器与容器之间互不影响,更高效的利用系统资源。------->容器与容器之间是进程级别的隔离。

如果你的程序重要性不是特别高的话，公司基本上不可能让你的程序独享一台服务器的，这时候你的服务器就会跟公司其他人的程序共享一台服务器，所以不可避免地就会受到其他程序的干扰，导致自己的程序出现问题。Docker就很好解决了环境隔离的问题，别人程序不会影响到自己的程序。

(3)通过镜像复制N多个环境一致容器。让同一个项目能够轻松在多台服务器里进行部署

在没有Docker的情况下，要在几天内部署几十台服务器，这对运维来说是一件非常折磨人的事，而且每台服务器的环境还不一定一样，就会出现各种问题，最后部署地头皮发麻。用Docker的话，我只需要将程序打包到镜像，你要多少台服务，我就给力跑多少容器，极大地提高了部署效率。



##### 1.1.3 Docker架构

![img](.\images\07docker架构.jpg)

三个核心概念

镜像（Image）：一个镜像代表一个应用环境，它是一个只读文件，如mysql镜像、redis镜像、nginx镜像等。

容器（Container）：镜像每次运行就产生一个容器，就是正在运行的镜像，特点是可读可写。

仓库（Registry）：存在镜像的位置，类似于maven仓库，也就是镜像下载和上传的位置。



##### 1.1.4 Docker与虚拟机对比

![](.\images\06与虚拟机对比图.png)



Docker是不携带操作系统的，所以Docker的应用就非常的轻巧。另外在调用宿主机的CPU、磁盘等等这些资源的时候，拿内存举例，虚拟机是利用Hypervisor去虚拟化内存，整个调用过程是虚拟内存->虚拟物理内存->真正物理内存，但是Docker是利用Docker Engine去调用宿主的的资源，这时候过程是虚拟内存->真正物理内存。

![image-20240720112209927](.\images\05与虚拟机对比.png)

##### 1.1.5 Docker在数字化转型中的作用

Docker在数字化转型中扮演着重要角色，其意义在于通过提供轻量级的容器化虚拟化技术，为应用程序的打包、分发和部署提供了简单而强大的解决方案。以下是Docker在数字化转型中的主要作用：

1. **提升开发效率**：Docker允许开发者在同一台机器上运行多个应用实例，这使得开发者可以在本地构建和测试应用，而无需担心对系统的影响。此外，Docker通过容器化技术，将应用程序和依赖项一起打包，为开发团队提供了一个一致的开发环境，从而减少了“在我机器上可以运行”的问题。
2. **简化应用部署**：传统的应用程序部署可能涉及在目标服务器上安装和配置各种依赖项，这是一个复杂且容易出错的过程。而Docker可以将应用程序及其所有依赖项打包到一个可移植的容器中，然后将其部署到任何运行Docker的环境中，大大简化了应用的部署过程。
3. **实现高效资源利用和快速扩展**：在云计算领域，Docker通过容器化技术，帮助企业实现了高效的资源利用和快速扩展。容器化的应用可以在不同的服务器或云平台上轻松迁移和扩展，从而提高了系统的灵活性和可伸缩性。
4. **加速数据处理和分析**：在大数据领域，Docker容器化技术可以加速数据处理和分析。通过将大数据处理和分析工具打包成容器，可以更容易地在不同的环境中部署和扩展这些工具，从而提高数据处理和分析的效率。
5. **提高人工智能应用的效率和精度**：在人工智能领域，Docker简化了模型训练和部署过程。通过将模型和相关的依赖项打包到容器中，可以确保模型在不同环境中的一致性和可移植性，从而提高人工智能应用的效率和精度。

此外，Docker还与其他技术如Kubernetes等容器编排工具相结合，为企业提供了更加完善和高效的容器化解决方案。这些解决方案可以满足不同企业在数字化转型中的需求，推动其业务的快速发展和创新。

综上所述，Docker在数字化转型中发挥着重要作用，它提升了开发效率、简化了应用部署、实现了高效资源利用和快速扩展，并加速了数据处理和分析以及人工智能应用的发展。随着数字化转型的深入推进，Docker将继续发挥更大的作用，为企业带来更多的机遇和挑战。

##### 1.1.6 Docker发展现状与趋势

Docker容器技术的发展现状与趋势相当引人注目。以下是对其现状和未来走向的详细分析：

**发展现状**：

1. **广泛应用与普及**：Docker作为容器技术的代表，已经得到了广泛的应用和普及。越来越多的企业和开发者开始采用Docker来构建、打包、分发和部署应用程序，以实现更高效的应用管理和资源利用。
2. **生态系统完善**：Docker已经形成了一个完整的生态系统，包括Docker Engine、Docker Hub、Docker Compose等一系列工具和服务。这些工具和服务为开发者提供了从应用开发到部署、管理、监控的全方位支持。
3. **与其他技术的集成**：Docker正在与更多的技术和工具进行集成，如容器编排工具（如Kubernetes、Mesos等）、无服务器计算平台、多云和混合云环境等。这些集成使得Docker能够更好地适应不同的应用场景和需求。

**发展趋势**：

1. **轻量化和多容器协调**：Docker将继续推动容器的轻量化发展，并加强对多容器协调工作的支持。这有助于解决多容器平台的复杂性，提高应用的可靠性和性能。
2. **安全性增强**：随着容器技术的普及，安全性问题也日益突出。Docker将加强容器的安全性，包括提供更强大的访问控制、加密通信、漏洞修复等方面的功能，以应对潜在的安全威胁。
3. **与云计算和大数据的深度融合**：随着云计算和大数据技术的快速发展，Docker将与这些技术进行更深入的融合。例如，Docker容器可以作为云计算平台上的基本单元，实现应用的快速部署和扩展；同时，Docker也可以与大数据处理和分析工具结合，提高数据处理效率和精度。
4. **边缘计算的应用**：随着边缘计算的普及，Docker容器技术也将被用于边缘设备和边缘节点上。这有助于更好地处理分布式应用和服务，提高应用的响应速度和可靠性。

综上所述，Docker容器技术的发展现状呈现出广泛应用、生态系统完善和与其他技术集成等特点；未来趋势则包括轻量化和多容器协调、安全性增强、与云计算和大数据的深度融合以及边缘计算的应用等方向。这些发展趋势将进一步推动Docker容器技术在企业数字化转型中发挥更大的作用。



#### 1-3 任务实施

请根据所学Docker容器技术知识点，完成以下任务实施题。

任务实施题1：整理一份关于Docker的简介，包括它的定义、起源和核心特性。 

参考答案：Docker是一个开源的应用容器引擎，允许开发者将应用及其依赖打包在轻量级、可移植的容器中。Docker起源于2013年，由Docker公司开发，其核心特性包括快速部署、易于迁移和版本控制。Docker容器技术通过标准化的容器格式，实现了应用的快速迭代和灵活部署。

任务实施题2：总结Docker的主要优势，并提供实际案例。 

参考答案：Docker的主要优势包括快速部署、易于扩展、资源利用率高、环境一致性和开发与生产环境的一致性。例如，在微服务架构中，Docker可以快速部署服务，实现服务的快速迭代和灵活扩展。

任务实施题3：描述Docker架构图，并解释各组件的作用。

参考答案：Docker架构主要由Docker Engine、Docker Daemon、Docker Client和Docker Registry组成。Docker Engine是Docker的核心，负责管理Docker对象；Docker Daemon是守护进程，处理Docker命令和容器的生命周期；Docker Client是用户与Docker Daemon交互的接口；Docker Registry用于存储和分发Docker镜像。

任务实施题4：对比Docker容器和虚拟机，并讨论它们在不同场景下的应用。 

参考答案：Docker容器与虚拟机的主要区别在于资源利用率、启动速度和隔离级别。Docker容器由于共享宿主机内核，资源利用率更高，启动速度更快，适合微服务和快速迭代的场景。虚拟机则提供更强的隔离性，适合需要完全隔离的环境，如某些特定的开发和测试场景。

通过完成以上任务实施题，我们全面认知Docker容器知识，为后续的实践应用打下坚实基础。

### 任务二：搭建Docker环境

#### 2-1 任务描述

本次任务是搭建Docker运行环境，旨在完成前期环境准备、Docker Engine的安装、配置Docker镜像加速，并验证Docker的安装与配置是否正确无误。通过完成此任务，我们将搭建起一个稳定、高效的Docker运行环境，为后续容器化部署和管理提供坚实基础。

#### 2-2 必备知识点

##### 1.2.1 Docker引擎

Docker Engine是Docker的核心组件，它是一个用于创建和运行容器的客户端-服务器应用程序。Docker Engine提供了一个虚拟化的操作系统环境，使得应用程序可以在独立的容器中运行，而不受宿主操作系统的影响。它主要包括了客户端、守护进程、containerd和runc。

![img](.\images\08docker引擎.jpg)

Docker Engine是运行和管理容器的核心软件，通过它可以创建和运行容器。同时，它负责管理Docker镜像的下载、构建和保存。

Docker客户端是用户与Docker Engine交互的命令行工具，它通过REST API与Docker守护进程进行通信，以便创建、启动、停止和删除Docker容器和镜像。

此外，Docker Engine还提供了其他功能，如构建Docker镜像、管理Docker网络、管理Docker数据卷等。它包含了应用程序及其所有依赖项，如操作系统、库文件、配置文件等。使用Docker Engine，开发人员可以更轻松地构建、部署和管理应用程序，同时提供了高度可移植性和可扩展性。

##### 1.2.2 Docker镜像加速

Docker镜像加速是指通过特定的技术手段来优化Docker镜像的下载速度，从而提高开发和部署的效率。在拉取Docker镜像时，如果网络环境不佳或访问官方仓库的速度较慢，可能会导致下载时间过长，影响开发进度。为了解决这一问题，可以使用Docker镜像加速服务。

Docker镜像加速的原理是在拉取镜像时使用一个国内的镜像站点，该站点已经缓存了各个版本的官方Docker镜像，从而实现对Docker下载速度的优化。开发者可以在客户端配置这个镜像站点，使得Docker在拉取镜像时也会去这个站点中查找需要的镜像，从而缩短Docker镜像的下载时间和提高下载速度。

以阿里云镜像加速为例，阿里云镜像服务（简称为ACR）是阿里云提供的一项服务，用于存储、管理和加速Docker镜像。它可以帮助用户快速搭建一个可扩展、可部署的环境，提升Docker镜像的下载速度，并提供了安全可控的镜像管理功能。阿里云镜像服务提供了简单易用的特性。相比其他镜像服务，如Dockerhub，ACR在大部分地区提供存储能力，支持多地域，提供稳定快速的镜像上传、下载服务。无论是从速度还是稳定性上，ACR都为用户提供了更好的体验。



#### 2-3 任务实施

##### 2-3-1 安装VMware

双击下载好的文件

![](./images/clip_image010.png)

![](./images/clip_image011.png)



点击下一步

![](./images/clip_image012.png)



![](./images/clip_image013.png)



选择安装位置，勾选增强型键盘驱动

![](./images/clip_image014.png)



使用默认，点击下一步–下一步

![](./images/clip_image015.png)

![](./images/clip_image016.png)



点击安装

![](./images/clip_image017.png)

等待安装

![](./images/clip_image018.png)

安装完成

![](./images/clip_image019.png)



输入许可证秘钥–完成–重启计算机，因为安装了虚拟网卡的驱动和键盘驱动

![](./images/clip_image020.png)



![](./images/clip_image021.png)

重启完成，点击桌面的VMware Workstation Pro，打开软件。

![](./images/clip_image022.png)

![](./images/clip_image023.png)



##### 2-3-2 安装Ubuntu

打开VMware，点击“创建新的虚拟机”

![](./images/clip_image001.png)



下一步

![](./images/clip_image002.png)

选择iso光盘映像文件，进入下一步

![](./images/clip_image003.png)



下一步，更改安装信息

![](./images/clip_image004.png)



 选择名称，可更改文件安装位置

![](./images/clip_image005.png)



选择磁盘大小

![](./images/clip_image006.png)



可以选择自定义硬件配置

![](./images/clip_image007.png)



完成安装，进入虚拟机界面，安装比较久耐心等待

![](./images/clip_image008.png)



选择中文简体

![](./images/clip_image009.png)



安装Ubuntu

![](./images/clip_image024.png)

![](./images/clip_image025.png)

 

选择我暂时不想连接到互联网

![](./images/clip_image026.png)



选择跳过

![](./images/clip_image027.png)

 

选择下一步

![](./images/clip_image028.png)



 选择下一步

![](./images/clip_image029.png)

 

选择安装 

![](./images/clip_image030.png)



选择时区

![](./images/clip_image031.png)



设置账号密码

![](./images/clip_image032.png)



选择主题

![](./images/clip_image033.png)



等待安装

![](./images/clip_image034.png)



最后就安装完啦

![](./images/clip_image035.png)



点击立即重启,重启完成

![](./images/clip_image036.png)



##### 2-3-3 远程连接

1）SecureCRT介绍

SecureCRT是一款用于连接运行包括Windows、UNIX和VMS的理想工具。通过使用内含的VCP命令行程序可以进行加密文件的传输。

2）SecureCRT安装

这里提供已经下载好的SecureCRT，版本为SecureCRT_8.7，解压即可使用。

第一步：安装和启动SSH

打开Ubuntu，进入系统，执行命令sudo apt update更新本地软件包列表。

![](./images/clip_image037.png)



执行命令sudo apt-get install openssh-server安装ssh。

![](./images/clip_image038.png)



执行命令sudo service ssh start启动ssh服务。

![](./images/clip_image039.png)



执行命令sudo service ssh status查看ssh服务状态。

![](./images/clip_image040.png)



第二步：设置防火墙安装和启动SSH

执行命令sudo ufw allow ssh来允许SSH流量。

![](./images/clip_image041.png)



启用防火墙，需要root账户权限，执行su root命令，切换到root账户。（root用户默认是没有密码的，使用sudo passwd root命令来设置root密码）

![](./images/clip_image042.png)



执行ufw enable命令，启用防火墙。

![](./images/clip_image043.png)

第三步：SSH配置

确保SSH服务器配置允许远程连接。打开SSH配置文件：

sudo nano /etc/ssh/sshd_config

确保一下内容为开启（默认情况下是注释的，我们需要去掉#），然后保存退出。

![](./images/clip_image044.png)



第四步：执行ip addr获取IP地址 

![](./images/clip_image045.png)



第五步：打开SecureCRT

选择“文件”à”快速连接”，在弹出框的主机名输入ip地址和用户名（hp），然后点击“连接”。

![](./images/clip_image046.png)



输入密码。

![](./images/clip_image047.png)



出现如下界面，表示连接成功。

![](./images/clip_image048.png)



这里需要注意，如果使用root用户连接，需要更改设置

![](./images/clip_image049.png)



![](./images/clip_image050.png)



然后重启服务

![](./images/clip_image051.png)



然后使用root用户连接。

设置外观显示。选择“选项”à”会话选项”，设置如下所示。

![](./images/clip_image052.png)



设置后的界面效果。

![](./images/clip_image053.png)



##### 2-3-4 搭建Docker环境

在Ubuntu操作系统上安装Docker Engine。步骤如下：

第一步：更新本地软件包列表。

```
root@hp-None:~# apt update
命中:1 http://mirrors.tuna.tsinghua.edu.cn/ubuntu mantic InRelease         
命中:2 http://mirrors.tuna.tsinghua.edu.cn/ubuntu mantic-updates InRelease 
命中:3 http://mirrors.tuna.tsinghua.edu.cn/ubuntu mantic-backports InRelease
命中:4 http://security.ubuntu.com/ubuntu mantic-security InRelease       
正在读取软件包列表... 完成
正在分析软件包的依赖关系树... 完成
正在读取状态信息... 完成                 
有 72 个软件包可以升级。请执行 ‘apt list --upgradable’ 来查看它们。
```



第二步：安装docker。执行命令apt install docker.io，如下所示。

```
root@hp-None:~# apt install docker.io
正在读取软件包列表... 完成
正在分析软件包的依赖关系树... 完成
正在读取状态信息... 完成                 
将会同时安装下列软件：
  bridge-utils containerd git git-man liberror-perl pigz runc ubuntu-fan
建议安装：
  ifupdown aufs-tools btrfs-progs cgroupfs-mount | cgroup-lite debootstrap docker-buildx docker-compose-v2 docker-doc rinse zfs-fuse | zfsutils git-daemon-run | git-daemon-sysvinit
  git-doc git-email git-gui gitk gitweb git-cvs git-mediawiki git-svn
下列【新】软件包将被安装：
  bridge-utils containerd docker.io git git-man liberror-perl pigz runc ubuntu-fan
升级了 0 个软件包，新安装了 9 个软件包，要卸载 0 个软件包，有 72 个软件包未被升级。
需要下载 79.5 MB 的归档。
解压缩后会消耗 307 MB 的额外空间。
您希望继续执行吗？ [Y/n] y
……
```



第三步：配置Docker镜像加速。

Docker配置阿里云镜像站点加速，如下所示所示。

在指定目录创建文件（如已存在请忽略此步）。创建文件需要使用root账户。

```
root@hp-None:~# touch /etc/docker/daemon.json
```

修改文件。

```
root@hp-None:~# nano /etc/docker/daemon.json
```

修改文件内容为：

```
{
 "registry-mirrors": [
        "https://do.nark.eu.org",
        "https://dc.j8.work",
        "https://docker.m.daocloud.io",
        "https://dockerproxy.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://docker.nju.edu.cn"
    ]
}
```

阿里云镜像服务

```
{
  "registry-mirrors": ["https://7ouovrds.mirror.aliyuncs.com"]
}
```

重启docker服务。

```
root@hp-None:~# service docker restart
```



第四步：验证Docker安装与配置。

验证 Docker Engine 安装是否成功，执行命令docker run hello-world。

```
root@hp-None:~# docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
2db29710123e: Pull complete 
Digest: sha256:2498fce14358aa50ead0cc6c19990fc6ff866ce72aeb5546e1d59caac3d0d60f
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```



查看Docker版本

```
root@hp-None:~# docker --version
Docker version 24.0.7, build 24.0.7-0ubuntu2~23.10.1
```



查看Docker状态

```
root@hp-None:~# systemctl status docker
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; preset: enabled)
     Active: active (running) since Thu 2024-06-27 14:25:46 CST; 5min ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 5586 (dockerd)
      Tasks: 9
     Memory: 29.4M
        CPU: 381ms
     CGroup: /system.slice/docker.service
             └─5586 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```



### 任务三：探索Docker镜像

#### 3-1 任务描述

本任务旨在运用Docker镜像操作命令来管理tomcat容器。通过理论学习和实践操作，我们将掌握如何拉取tomcat镜像、查看镜像信息、给镜像打标签、删除镜像等关键命令。这将帮助我们深入理解每个命令的参数含义，并能够在实际的 Docker环境中熟练运用这些命令来完成对镜像的日常管理，从而为基于 Docker 的应用开发和部署打下坚实的镜像管理基础。

#### 3-2 必备知识点

##### 1.3.1 Docker镜像概述

镜像到底是个什么东西呢，很多人在学习docker的时候都是一头雾水的，可能是外国人对镜像情有独钟吧，好多东西都有镜像的概念。比如我们安装系统的.iso文件，其实就是镜像，这里你就可以把镜像认为是一种模板。我们可以使用docker根据这个模板创建容器来运行，其实更可以理解为镜像是好比github上的仓库一样，我们可以克隆下来源代码然后运行，运行起来的代码可以是一个网站、一个应用程序啥的，这就可以叫做容器。说白了，镜像就是一堆静态的模板，运行起来的镜像就是容器。镜像一般需要我们拉取下来，是只读的，这个我们克隆github上的仓库是一样一样的。

docker镜像中有分层的概念，就是一个镜像可能基于好几个镜像，比如一个web运行环境可能需要操作系统ubuntu、数据库mysql、.net core runtime运行时，那我们拉取的这个镜像就会包好这好几个镜像，这就好像我们前边说的打包好的运行环境一样，直接就拉下来一个小电脑一样。

总结起来就是docker镜像就是我们事先做好的一套版本，里面装载着我们所需要的东西和流程，模板之间还可以嵌套。

![img](.\images\10 镜像生活实例.png)



##### 1.3.2 镜像内部结构

为什么我们需要讨论镜像的内部结构呢？

如果只是使用镜像，当然不需要了解，直接通过docker命令下载和运行就可以了。但如果我们想创建自己的镜像，或者想理解Docker为什么是轻量级的，就非常有必要学习镜像的内部结构了。我们从一个最小的镜像开始。

**1.hello-world最小镜像**

hello-world是Docker官方提供的一个镜像，通常用来验证Docker是否安装成功。我们先通过docker pull从Docker Hub下载它

```
root@hp-None:~# docker pull hello-world
Using default tag: latest
latest: Pulling from library/hello-world
Digest: sha256:2498fce14358aa50ead0cc6c19990fc6ff866ce72aeb5546e1d59caac3d0d60f
Status: Image is up to date for hello-world:latest
docker.io/library/hello-world:latest
```

用docker images命令查看镜像的信息

```
root@hp-None:~# docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
hello-world   latest    74cc54e27dc4   5 months ago   10.1kB
```

hello-world虽然是一个完整的镜像，但它并没有什么实际用途。通常来说，我们希望镜像能提供一个基本的操作系统环境，用户可以根据需要安装和配置软件。这样的镜像我们称为Base镜像。

**2.base镜像**

base镜像，也被称为基础镜像，是一个在软件开发中常用的概念，尤其在容器化技术如Docker中。它指的是一个最小化的操作系统镜像，提供了一个干净、稳定和隔离的运行环境，用于部署和执行应用程序。base镜像通常包括操作系统核心组件、基本的系统工具以及必要的系统库。

base镜像有两层含义：一是不依赖其他镜像，完全从0开始建起；二是其他镜像可以以之为基础进行扩展。因此，能称作base镜像的通常都是各种Linux发行版的Docker镜像，比如Ubuntu、Debian、CentOS等。

我们以CentOS为例查看base镜像包含哪些内容。

下载centso镜像，命令如下所示。

```
root@hp-None:~# docker pull centos:7
7: Pulling from library/centos
2d473b07cdd5: Pull complete 
Digest: sha256:be65f488b7764ad3638f236b7b515b3678369a5124c47b8d32916d6487418ea4
Status: Downloaded newer image for centos:7
docker.io/library/centos:7
```

查看镜像信息

```
root@hp-None:~# docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
hello-world   latest    74cc54e27dc4   5 months ago   10.1kB
centos        7         eeb6ee3f44bd   3 years ago    204MB
```

使用docker pull centos下载Centos 7镜像也就200M左右，而我们平时下载一个原生的centos镜像都是4G，对于 Docker 初学者都会有这个疑问。

Linux 操作系统由内核空间和用户空间组成。

![img](.\images\11 镜像内部结构.jpg)



##### 1.3.3 镜像基本操作

1.辅助命令

```
#查看docker引擎详细信息
root@hp-None:~# docker info
Client:
 Version:    27.5.1
 Context:    default
 Debug Mode: false

Server:
 Containers: 1
  Running: 0
  Paused: 0
  Stopped: 1
......
```



```
#查看docker客户端引擎和server端引擎版本信息
root@hp-None:~# docker version
 Version:           27.5.1
 API version:       1.47
 Go version:        go1.24.0
 Git commit:        27.5.1-0ubuntu3
 Built:             Tue Feb 25 11:04:14 2025
 OS/Arch:           linux/amd64
 Context:           default

Server:
 Engine:
  Version:          27.5.1
  API version:      1.47 (minimum version 1.24)
  Go version:       go1.24.0
  Git commit:       27.5.1-0ubuntu3
  Built:            Tue Feb 25 11:04:14 2025
  OS/Arch:          linux/amd64
  Experimental:     false 
......
```



```
#查看帮助信息
root@hp-None:~# docker help

Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Common Commands:
  run         Create and run a new container from an image
  exec        Execute a command in a running container
  ps          List containers
  build       Build an image from a Dockerfile
  pull        Download an image from a registry
  push        Upload an image to a registry
  images      List images
  login       Log in to a registry
  logout      Log out from a registry
  search      Search Docker Hub for images
  version     Show the Docker version information
  info        Display system-wide information
......
```

2.拉取镜像

```
docker pull 镜像名称
```

 拉取最新版本redis

```
root@hp-None:~# docker pull redis
Using default tag: latest
latest: Pulling from library/redis
a2abf6c4d29d: Pull complete 
c7a4e4382001: Pull complete 
4044b9ba67c9: Pull complete 
c8388a79482f: Pull complete 
413c8bb60be2: Pull complete 
1abfd3011519: Pull complete 
Digest: sha256:db485f2e245b5b3329fdc7eff4eb00f913e09d8feb9ca720788059fdc2ed8339
Status: Downloaded newer image for redis:latest
docker.io/library/redis:latest
```

等价于docker pull redis:latest

拉取指定版本tomcat

```
root@hp-None:~# docker pull tomcat:8.0
8.0: Pulling from library/tomcat
f189db1b88b3: Pull complete 
3d06cf2f1b5e: Pull complete 
edd0da9e3091: Pull complete 
eb7768aae14e: Pull complete 
e2780f585e0f: Pull complete 
e5ed720afeba: Pull complete 
d9e134700cfc: Pull complete 
e4804b33d02a: Pull complete 
b9df0c24315e: Pull complete 
49fdae8eaa20: Pull complete 
1aea3d9a32e6: Pull complete 
Digest: sha256:8ecb10948deb32c34aeadf7bf95d12a93fbd3527911fa629c1a3e7823b89ce6f
Status: Downloaded newer image for tomcat:8.0
docker.io/library/tomcat:8.0
```



3.查看镜像

```
docker images 或docker image ls
```

 查看当前本地仓库中存在哪些镜像

```
root@hp-None:~# docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
redis        latest    7614ae9453d1   2 years ago   113MB
tomcat       8.0       ef6a7c98d192   5 years ago   356MB
```

说明：

REPOSITORY：镜像名称

TAG：镜像版本

IMAGE ID ：镜像ID

CREATED：镜像创建时间

SIZE：镜像大小

根据镜像名称查询

```
root@hp-None:~# docker images tomcat
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
tomcat       8.0       ef6a7c98d192   5 years ago   356MB
```

根据镜像名称:版本号查询

```
root@hp-None:~# docker pull tomcat
Using default tag: latest
latest: Pulling from library/tomcat
0e29546d541c: Pull complete 
9b829c73b52b: Pull complete 
cb5b7ae36172: Pull complete 
6494e4811622: Pull complete 
668f6fcc5fa5: Pull complete 
dc120c3e0290: Pull complete 
8f7c0eebb7b1: Pull complete 
77b694f83996: Pull complete 
0f611256ec3a: Pull complete 
4f25def12f23: Pull complete 
Digest: sha256:9dee185c3b161cdfede1f5e35e8b56ebc9de88ed3a79526939701f3537a52324
Status: Downloaded newer image for tomcat:latest
docker.io/library/tomcat:latest
root@hp-None:~# docker images tomcat
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
tomcat       latest    fb5657adc892   2 years ago   680MB
tomcat       8.0       ef6a7c98d192   5 years ago   356MB
root@hp-None:~# docker images tomcat:latest
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
tomcat       latest    fb5657adc892   2 years ago   680MB
```



没有根据镜像ID查询，为空

```
root@hp-None:~# docker images b8e65a4d736d
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE


#获取镜像完整ID
root@hp-None:~# docker images --no-trunc
REPOSITORY    TAG       IMAGE ID                                                                  CREATED       SIZE
redis         latest    sha256:7614ae9453d1d87e740a2056257a6de7135c84037c367e1fffa92ae922784631   2 years ago   113MB
hello-world   latest    sha256:feb5d9fea6a5e9606aa995e879d862b825965ba48de054caab5ef356dc6b3412   2 years ago   13.3kB
centos        latest    sha256:5d0da3dc976460b72c77d94c8a1ad043720b0416bfc16c52c45d4847e53fadb6   2 years ago   231MB
tomcat        8.0       sha256:ef6a7c98d192507d6066dcf24e44bec66d07ec9cf7c55d8d3d1ea0a24660bdef   5 years ago   356MB
```



获取所有tomcat镜像ID

```
root@docker:~# docker images tomcat -q
b8e65a4d736d
ef6a7c98d192
```



4.删除镜像

```
正常删除：docker image rm 镜像名称(name:tag)|镜像ID （必须是没有运行过的镜像）
强制删除：docker image rm -f 镜像名称(name:tag)|镜像ID
批量删除：docker image rm -f $(docker images tomcat -q)
```

删除没有运行过的容器

```
root@hp-None:~# docker image rm 5d0da3dc9764
Untagged: centos:latest
Untagged: centos@sha256:a27fd8080b517143cbbbab9dfb7c8571c40d67d534bbdee55bd6c473f432b177
Deleted: sha256:5d0da3dc976460b72c77d94c8a1ad043720b0416bfc16c52c45d4847e53fadb6
Deleted: sha256:74ddd0ec08fa43d09f32636ba91a0a3053b02cb4627c35051aff89f853606b59
```

删除运行过的容器，提示错误

```
#根据镜像名称删除
root@hp-None:~# docker image rm hello-world
Error response from daemon: conflict: unable to remove repository reference "hello-world" (must force) - container 6bb8a271f7b4 is using its referenced image feb5d9fea6a5

#根据镜像ID删除
root@hp-None:~# docker image rm feb5d9fea6a5
Error response from daemon: conflict: unable to delete feb5d9fea6a5 (must be forced) - image is being used by stopped container 6bb8a271f7b4
```

强制删除

```
root@hp-None:~# docker image rm -f feb5d9fea6a5
Untagged: hello-world:latest
Untagged: hello-world@sha256:2498fce14358aa50ead0cc6c19990fc6ff866ce72aeb5546e1d59caac3d0d60f
Deleted: sha256:feb5d9fea6a5e9606aa995e879d862b825965ba48de054caab5ef356dc6b3412
```

批量删除tomcat镜像

```
root@hp-None:~# docker image rm -f $(docker images tomcat -q)
Untagged: tomcat:latest
Untagged: tomcat@sha256:9dee185c3b161cdfede1f5e35e8b56ebc9de88ed3a79526939701f3537a52324
Deleted: sha256:fb5657adc892ed15910445588404c798b57f741e9921ff3c1f1abe01dbb56906
Deleted: sha256:2b4d03a9ce5e200223e5c398d4739d23dd19ad0d6e692cfc65ba3a8fae838444
Deleted: sha256:35c5ea12be1face90896b3a52afc28433885c4448a6c5cfe07561f82365cd18e
Deleted: sha256:6830091c111746b7534960d17f6c156be45d8dcfe0defb06bd427ef38bf49aae
Deleted: sha256:ea82d4efcdfa1c039d722a5a9613c18d3c3a84fbba8efae5e7f13cb3b4ec379f
Deleted: sha256:79a6c362c6b1a580d2d8d33f6d860d45c530f34ff7c0441d36b61aceefdfd656
Deleted: sha256:1788a74c5c86e769f61cd615269eba11c3d7648eac4a85a1ffd2840427820a2f
Deleted: sha256:cbce712ed17923285239f9d9c0528984aef065b7413d68a0290e2c8eecc98f4a
Deleted: sha256:aa56d037ee5925ebf11127c3e1f617874c4ce8bae6b6af7d132b7f7a4a606e6f
Deleted: sha256:97e5f44efb543d466c5847602654a8cb22c9466b61d04988d47ec44b197ea874
Deleted: sha256:11936051f93baf5a4fb090a8fa0999309b8173556f7826598e235e8a82127bce
Untagged: tomcat:8.0
Untagged: tomcat@sha256:8ecb10948deb32c34aeadf7bf95d12a93fbd3527911fa629c1a3e7823b89ce6f
Deleted: sha256:ef6a7c98d192507d6066dcf24e44bec66d07ec9cf7c55d8d3d1ea0a24660bdef
Deleted: sha256:6dc5bbd9ede58ce52f6e9d34eaac4e3bf1fbb3014e9eae344677bf3c2f022a17
Deleted: sha256:6f22c12dcf0ac783b0b00471e38262c708761a677e6a847a57a5d7cce2cbc7f1
Deleted: sha256:dbefc7cd29b21d99c136d6234ca442cdb89fc91f3c91ef6c1d333d37424d2f44
Deleted: sha256:d65396dbf112285c9d395bb33c2eb2f776cd9b959c007152c10a2f25fbf1c198
Deleted: sha256:5b8a875f80bdd2e9f9cf2c0852243e0cb59ea7be5e92620b2c2089800bb18594
Deleted: sha256:d97b31b9ca51e024a895e2f6fa032224fb73ba2a070149499ce87306ed9d7af6
Deleted: sha256:3717c4f05493340d97d982bc6ed8cba98869833918de23c78c39414788dd08c1
Deleted: sha256:b9c326fb510188d2958888aee970ae93925c2a2ad8a78b2ec3a521747ee3ec4f
Deleted: sha256:8cc193ff8a5b4837eab54bee27418daadad8825f13b8fab55229b4954fee6f9f
Deleted: sha256:b1852f6f3f85863ed849af673e566ad8de76dac4d2c6526d791e965978c1ce62
Deleted: sha256:8c466bf4ca6ffdda8b7717b1cd6fe31109529ee64e626a003a224fb8bd2bc469
```



5.搜索镜像：docker search 镜像名称

```
root@hp-None:~# docker search redis
NAME                                DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
redis                               Redis is the world’s fastest data platform f…   12898     [OK]       
redis/redis-stack                   redis-stack installs a Redis server with add…    112
......
```

只能查看当前镜像是否存在（OFFICIAL是OK，证明存在），不能列出版本。



#### 3-3 任务实施

本任务以操作tomcat为例来巩固基本操作命令，实施步骤如下所示。

（1）拉取最新版本tomcat

```
root@hp-None:~# docker pull tomcat
Using default tag: latest
latest: Pulling from library/tomcat
eb993dcd6942: Pulling fs layer 
……
Digest: sha256:77e194ed29250987815cb89b8be96bb05a145a0299ed8a1d30a268c1a3e23680
Status: Downloaded newer image for tomcat:latest
docker.io/library/tomcat:latest
```

（2）拉取tomcat8.0

```
root@hp-None:~# docker pull tomcat:8.0
8.0: Pulling from library/tomcat
……
Digest: sha256:8ecb10948deb32c34aeadf7bf95d12a93fbd3527911fa629c1a3e7823b89ce6f
Status: Downloaded newer image for tomcat:8.0
docker.io/library/tomcat:8.0
```

（3）查看tomcat镜像信息

```
root@hp-None:~# docker images|grep tomcat
tomcat            latest    a8515e7a8d2e   4 days ago     512MB
tomcat            8.0       ef6a7c98d192   6 years ago    356MB
```

（4）查看所有镜像信息

```
root@hp-None:~# docker images
REPOSITORY        TAG       IMAGE ID       CREATED      SIZE
tomcat            latest    a8515e7a8d2e   4 days ago   512MB
hello-world       latest    feb5d9fea6a5   2 years ago  13.3kB
tomcat            8.0       ef6a7c98d192   6 years ago  356MB
```

（5）获取所有tomcat镜像ID

```
root@hp-None:~# docker images tomcat -q
a8515e7a8d2e
ef6a7c98d192
```

（6）删除镜像ID为a8515e7a8d2e的tomcat

```
root@hp-None:~# docker image rm a8515e7a8d2e
Untagged: tomcat:latest
Untagged: tomcat@sha256:77e194ed29250987815cb89b8be96bb05a145a0299ed8a1d30a268c1a3e23680
Deleted: sha256:a8515e7a8d2e289bdf18d5644f2874c309ec3e137f71f8d9498c22788c0170ca
Deleted: sha256:3ca579564c74b5420e2e0cc0ddd70fb11753d281c74fbf273e4d9fa69cb40260
…..
```

（7）批量删除所有tomcat信息

```
root@hp-None:~# docker image rm -f $(docker images tomcat -q)
Untagged: tomcat:8.0
Untagged: tomcat@sha256:8ecb10948deb32c34aeadf7bf95d12a93fbd3527911fa629c1a3e7823b89ce6f
Deleted: sha256:ef6a7c98d192507d6066dcf24e44bec66d07ec9cf7c55d8d3d1ea0a24660bdef
Deleted: sha256:6dc5bbd9ede58ce52f6e9d34eaac4e3bf1fbb3014e9eae344677bf3c2f022a17
……
```

（8）查看tomcat镜像信息

```
root@hp-None:~# docker images tomcat
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
```

通过完成上述步骤，您将能够掌握Docker镜像的基本操作命令，并能够在实际工作中灵活运用。这些技能对于Docker用户来说非常重要，可以帮助您更有效地管理和使用Docker镜像。