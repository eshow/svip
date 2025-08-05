## 1.部署并验证 Redis 服务

本任务是在docker上安装redis，并运行redis容器。实施步骤如下所示。

1）拉取redis:6.0.9

```
root@hp-None:~# docker pull redis:6.0.9
6.0.9: Pulling from library/redis
a076a628af6f: Pull complete 
f40dd07fe7be: Pull complete 
ce21c8a3dbee: Pull complete 
47b0fe76214f: Pull complete 
6c5e46e23ecb: Pull complete 
e81e24116351: Pull complete 
Digest: sha256:48c1431bed43fb2645314e4a22d6ca03cf36c5541d034de6a4f3330e7174915b
Status: Downloaded newer image for redis:6.0.9
docker.io/library/redis:6.0.9
```



（2）运行redis

```
root@hp-None:~# docker run -p 6379:6379 redis:6.0.9
1:C 22 Jul 2024 00:05:28.311 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 22 Jul 2024 00:05:28.313 # Redis version=6.0.9, bits=64, commit=00000000, modified=0, pid=1, just started
1:C 22 Jul 2024 00:05:28.314 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
1:M 22 Jul 2024 00:05:28.321 * Running mode=standalone, port=6379.
1:M 22 Jul 2024 00:05:28.322 # Server initialized
1:M 22 Jul 2024 00:05:28.323 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
1:M 22 Jul 2024 00:05:28.326 * Ready to accept connections
```



（3）进入容器

```
root@hp-None:~# docker ps
CONTAINER ID   IMAGE         COMMAND                   CREATED         STATUS         PORTS                                                  NAMES
56d60bb98f8b   redis:6.0.9   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:6379->6379/tcp, :::6379->6379/tcp              thirsty_cray
02e6eb10762f   mysql:8.0     "docker-entrypoint.s…"   10 hours ago    Up 10 hours    0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql8-02

#进入容器
root@hp-None:~# docker exec -it 56d60bb98f8b bash
root@56d60bb98f8b:/data# redis-cli 
127.0.0.1:6379> keys *
(empty array)
127.0.0.1:6379> set name zsan
OK
127.0.0.1:6379> get name
"zsan"
127.0.0.1:6379> 
```



## 2.Redis数据类型

**（1）String**

```
SET mykey "Hello, Redis!"
GET mykey
INCR counter
SETEX session:1234 3600 "user data"

127.0.0.1:6379> set mykey "Hello Redis!"
OK
127.0.0.1:6379> get mykey
"Hello Redis!"
127.0.0.1:6379> incr mycounter
(integer) 1
127.0.0.1:6379> incr mycounter
(integer) 2
127.0.0.1:6379> 
127.0.0.1:6379> incr mycounter
(integer) 3
127.0.0.1:6379> decr mycounter
(integer) 2
127.0.0.1:6379> SETEX hello_key 5 hello  #这个命令会将键hello_key设置为值hello，并且该键将在5秒后自动删除。
OK
127.0.0.1:6379> get hello_key
"hello"
127.0.0.1:6379> get hello_key
(nil)
```



**（2）List**

```
127.0.0.1:6379> lpush my_list "world"
(integer) 1
127.0.0.1:6379> llen my_list
(integer) 1
127.0.0.1:6379> lpush my_list "hello"
(integer) 2
127.0.0.1:6379> llen my_list
(integer) 2
127.0.0.1:6379> rpop my_list
"world"
127.0.0.1:6379> llen my_list
(integer) 1
```



**（3）Set**

```
127.0.0.1:6379> SADD myset "Hello"
(integer) 1
127.0.0.1:6379> SADD myset "World"
(integer) 1
127.0.0.1:6379> SISMEMBER myset "Hello"
(integer) 1
127.0.0.1:6379> SMEMBERS myset
1) "World"
2) "Hello"
```

**（4）Hash**

```
127.0.0.1:6379> HSET uid:1001 name "Tom"
(integer) 1
127.0.0.1:6379> HSET uid:1001 age 13
(integer) 1
127.0.0.1:6379> HSET uid:1002 name "Jerry" age 18
(integer) 2
127.0.0.1:6379> HGET uid:1001 name
"Tom"
127.0.0.1:6379> HGETALL uid:1001
1) "name"
2) "Tom"
3) "age"
4) "13"
```



**（5） Sorted Set**

```
127.0.0.1:6379> ZADD leaderboard 100 "Alice"
(integer) 1
127.0.0.1:6379> ZADD leaderboard 200 "Bob"
(integer) 1
127.0.0.1:6379> ZRANGEBYSCORE leaderboard 0 100
1) "Alice"
127.0.0.1:6379> ZSCORE leaderboard "Alice"
"100"
```



## 3.Redis基本命令

**（1 ）设置与获取值（SET, GET）**

```
SET mykey "Hello, Redis!"

GET mykey
```

**（2）删除值（DEL）**

```
DEL mykey
```



**（3） 键的管理（EXISTS, EXPIRE, TTL）**

```
EXISTS mykey

EXPIRE mykey 60

TTL mykey
```



**（4） 数据备份与恢复（SAVE, BGSAVE, RESTORE）**

**（）保存数据快照**：`SAVE`

使用 **save** 命令进行同步备份，备份后的数据默认保存在 **dump.rdb** 文件。可以使用 config get dir 命令查看 。

```
127.0.0.1:6379> save
OK
127.0.0.1:6379> config get dir
1) "dir"
2) "/data"
```

进入容器目录

```
root@hp-None:~/data# docker exec -it 3e1 bash
root@3e152399b508:/data# ls
dump.rdb
```



**（b）后台保存数据快照**：`BGSAVE`

```
127.0.0.1:6379> BGSAVE
Background saving started
127.0.0.1:6379> BGSAVE SCHEDULE
Background saving started
127.0.0.1:6379> lastsave
(integer) 1753088801
```



**（c）恢复数据**：`RESTORE`

```
127.0.0.1:6379> set key1 "Hello Redis!"
OK
127.0.0.1:6379> dump key1
"\x00\x0cHello Redis!\t\x00\xfa\xb1\xffv\xc1\xd2\xcb\x9b"
127.0.0.1:6379> get key1
"Hello Redis!"
(error) BUSYKEY Target key name already exists.
127.0.0.1:6379> del key1
(integer) 1
127.0.0.1:6379> restore key1 0 "\x00\x0cHello Redis!\t\x00\xfa\xb1\xffv\xc1\xd2\xcb\x9b"
OK
127.0.0.1:6379> get key1
"Hello Redis!"
```





## 4.实践Redis数据类型与基本命令

**（1）用 Hash 保存并查询患者信息**

在 Redis 中以 Hash 形式存储两位患者（uid:2001 与 uid:2002）的姓名、年龄、病历号，随后查询并更新其中一位患者的年龄。

实施步骤如下所示。

（1）进入容器

```
docker exec -it <容器ID> redis-cli
```

（2）写入数据

```
HSET uid:2001 name "李雷" age 34 record "A1024"
HSET uid:2002 name "韩梅梅" age 29 record "A1025"
```

（3）查询 uid:2001 的完整信息

```
HGETALL uid:2001
```

（4）将 uid:2001 的年龄改为 35

```
HSET uid:2001 age 35
```

（5）验证更新

```
HGET uid:2001 age
```



**（2）利用 Sorted Set 实现药品销量排行榜并备份**

将 3 种药品的销量写入 Sorted Set，随后使用备份命令持久化数据，最后恢复并验证排行榜。

实施步骤如下所示。

（1）写入排行榜（score 即销量）

```
ZADD drug:sales 1200 "阿莫西林" 950 "布洛芬" 1350 "维生素C"
```

（2）查看销量前 2 名

```
ZREVRANGE drug:sales 0 1 WITHSCORES
```

（3）立即执行快照备份

```
SAVE                # 或 BGSAVE
CONFIG GET dir      # 记下 /data 目录
```

（4）退出容器并复制 dump.rdb 到宿主机备份

```
docker cp <容器ID>:/data/dump.rdb ~/drug_sales_backup.rdb
```

（5）模拟数据丢失：删除 key

```
DEL drug:sales
```

（6）停止容器，将备份文件拷回并重启容器，验证排行榜已恢复

```
docker cp ~/drug_sales_backup.rdb <新容器ID>:/data/dump.rdb
docker restart <新容器ID>
docker exec -it <新容器ID> redis-cli
ZREVRANGE drug:sales 0 -1 WITHSCORES
```









## 5.开启智慧医疗项目持久化

开启智慧医疗项目持久化，实施步骤如下所示。

（1）拉取redis:6.0.9

```
root@hp-None:~# docker pull redis:6.0.9
6.0.9: Pulling from library/redis
a076a628af6f: Pull complete 
f40dd07fe7be: Pull complete 
ce21c8a3dbee: Pull complete 
47b0fe76214f: Pull complete 
6c5e46e23ecb: Pull complete 
e81e24116351: Pull complete 
Digest: sha256:48c1431bed43fb2645314e4a22d6ca03cf36c5541d034de6a4f3330e7174915b
Status: Downloaded newer image for redis:6.0.9
docker.io/library/redis:6.0.9
```



（2）运行redis

```
root@hp-None:~# docker run -p 6379:6379 redis:6.0.9
1:C 22 Jul 2024 00:05:28.311 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 22 Jul 2024 00:05:28.313 # Redis version=6.0.9, bits=64, commit=00000000, modified=0, pid=1, just started
1:C 22 Jul 2024 00:05:28.314 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
1:M 22 Jul 2024 00:05:28.321 * Running mode=standalone, port=6379.
1:M 22 Jul 2024 00:05:28.322 # Server initialized
1:M 22 Jul 2024 00:05:28.323 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
1:M 22 Jul 2024 00:05:28.326 * Ready to accept connections
```



（3）进入容器

```
root@hp-None:~# docker ps
CONTAINER ID   IMAGE         COMMAND                   CREATED         STATUS         PORTS                                                  NAMES
56d60bb98f8b   redis:6.0.9   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:6379->6379/tcp, :::6379->6379/tcp              thirsty_cray
02e6eb10762f   mysql:8.0     "docker-entrypoint.s…"   10 hours ago    Up 10 hours    0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql8-02

#进入容器
root@hp-None:~# docker exec -it 56d60bb98f8b bash
root@56d60bb98f8b:/data# redis-cli 
127.0.0.1:6379> keys *
(empty array)
127.0.0.1:6379> set name zsan
OK
127.0.0.1:6379> get name
"zsan"
127.0.0.1:6379> 
```



（4）启动redis，映射端口，后台启动，指定名称，总是启动

docker run -p 6379:6379 -d --name redis01 --restart=always redis:6.0.9

```
#停止上面的redis
root@hp-None:~# docker stop 56d60bb98f8b
56d60bb98f8b
#查看运行的容器
root@hp-None:~# docker ps
CONTAINER ID   IMAGE       COMMAND                   CREATED        STATUS        PORTS                                                  NAMES
02e6eb10762f   mysql:8.0   "docker-entrypoint.s…"   21 hours ago   Up 21 hours   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql8-02
#运行redis
root@hp-None:~# docker run -p 6379:6379 -d --name redis01 --restart=always redis:6.0.9
7125eec681d09c0d13478f38310c28f4b7bab397751cf0d3a59a6e8d74d9282e

#查看运行的容器
root@hp-None:~# docker ps
CONTAINER ID   IMAGE         COMMAND                   CREATED         STATUS         PORTS                                                  NAMES
7125eec681d0   redis:6.0.9   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:6379->6379/tcp, :::6379->6379/tcp              redis01
02e6eb10762f   mysql:8.0     "docker-entrypoint.s…"   21 hours ago    Up 21 hours    0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql8-02
```



（5）启动redis，映射端口，后台启动，指定名称，总是启动 --restart=always，运行redis开启持久化。

docker run -p 6379:6379 -d --name redis02 --restart=always redis:6.0.9 redis-server --appendonly yes

**注意：只要开启了持久化，将持久化文件生成在容器的/data/目录中**

```
#停止前面的redis
root@hp-None:~# docker stop 7125eec681d0
7125eec681d0
root@hp-None:~# docker ps
CONTAINER ID   IMAGE       COMMAND                   CREATED        STATUS        PORTS                                                  NAMES
02e6eb10762f   mysql:8.0   "docker-entrypoint.s…"   22 hours ago   Up 22 hours   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql8-02

#运行redis
root@hp-None:~# docker run -p 6379:6379 -d --name redis02 --restart=always redis:6.0.9 redis-server --appendonly yes
c79cc7d208c8daaeea9337306a1d4369ebda58e7d799543e4907cd53eb5c50fb

#进入redis容器
root@hp-None:~# docker exec -it c79 bash
root@c79cc7d208c8:/data# ls
appendonly.aof
```

使用redis-desktop-manager添加数据。



查看appendonly.aof内容。

```
root@c79cc7d208c8:/data# cat appendonly.aof 
*2
$6
SELECT
$1
0
*3
$3
SET
$4
name
$4
lisi
```

这时删除redis容器，数据也会跟着删除，因为appendonly.aof文件删除了。

（6）启动redis，映射端口，后台启动，指定名称，总是启动 --restart=always，运行redis开启持久化，使用数据卷映射到外部。

docker run -p 6379:6379 -d --name redis03 --restart=always -v /root/redisdata:/data redis:6.0.9 redis-server --appendonly yes

```
#查看运行的容器
root@hp-None:~# docker ps
CONTAINER ID   IMAGE         COMMAND                   CREATED        STATUS        PORTS                                                  NAMES
c79cc7d208c8   redis:6.0.9   "docker-entrypoint.s…"   11 hours ago   Up 11 hours   0.0.0.0:6379->6379/tcp, :::6379->6379/tcp              redis02
02e6eb10762f   mysql:8.0     "docker-entrypoint.s…"   33 hours ago   Up 33 hours   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql8-02

#停止redis容器
root@hp-None:~# docker stop c79cc7d208c8
c79cc7d208c8
#运行redis
root@hp-None:~# docker run -p 6379:6379 -d --name redis03 --restart=always -v /root/redisdata:/data redis:6.0.9 redis-server --appendonly yes
e620f076d8eda654ecf815c6e7319381d312b76060ac50051b252c4fc316fd80

#进入redis容器
root@hp-None:~# docker exec -it e62 bash
```

使用redis desktop添加数据。然后查看appendonly.aof 

```
root@hp-None:~# ls
abc.txt  data  hp  redisdata  RUNNING.txt  snap
root@hp-None:~# cd redisdata/
root@hp-None:~/redisdata# ls
appendonly.aof
root@hp-None:~/redisdata# cat appendonly.aof 
*2
$6
SELECT
$1
0
*3
$3
SET
$4
name
$6
wangwu
*3
$3
SET
$3
age
$2
22
```

删除redis容器，重新运行redis

```
root@hp-None:~# docker ps
CONTAINER ID   IMAGE         COMMAND                   CREATED         STATUS         PORTS                                                  NAMES
e620f076d8ed   redis:6.0.9   "docker-entrypoint.s…"   9 minutes ago   Up 9 minutes   0.0.0.0:6379->6379/tcp, :::6379->6379/tcp              redis03
02e6eb10762f   mysql:8.0     "docker-entrypoint.s…"   33 hours ago    Up 33 hours    0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql8-02

#删除redis容器
root@hp-None:~# docker rm -f e62
e62
#重新运行redis容器
root@hp-None:~# docker run -p 6379:6379 -d --name redis03 --restart=always -v /root/redisdata:/data redis:6.0.9 redis-server --appendonly yes
834a021d5e54be1021e780cb3351c0a6b2053db7e58307407cc9c31de4c958d2
```

查看redis是否还有之前的数据。









