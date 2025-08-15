---
title: 开启xxxx项目持久化
createTime: 2025/08/15 14:06:38
permalink: /article/31mlm1s8/
---

# 开启xxxx项目持久化

## 任务目标

- 掌握 Redis 容器化部署流程
- 熟练掌握 Redis 的 5 种核心数据类型的特点及适用场景，
- 能熟练运用各类基本命令完成数据的操作
- 学会开启智慧医疗项目持久化
- 能够将 Redis 相关知识应用到实际场景中

## 任务单元

### 任务一：部署并验证 Redis 服务

#### 1-1 任务描述

本任务通过 Docker 容器技术完成 Redis 的部署与基础验证。需拉取指定版本 Redis 镜像，运行容器并配置端口映射，进入容器使用`redis-cli`执行键值对操作，同时通过可视化工具连接验证。旨在掌握 Redis 容器化部署流程，理解其作为 NoSQL 数据库的特性，熟悉基础命令与连接方式，为智慧医疗项目缓存优化奠定实操基础。

#### 1-2 必备知识点

##### 3.1.1  SQL数据库和NoSQL数据库

**关系型数据库**

![](.\images\QQ_1722306351083.png)

关系型数据库（SQL数据库）最典型的数据结构是表，由二维表及其之间的联系所组成的一个数据组织。
**优点**：

- 易于维护：都是使用表结构，格式一致；

![](.\images\QQ_1722307123348.png)

- 使用方便：SQL语言通用，可用于复杂查询；
  - 一对一的关系
  - 一对多关系
  - 多对多关系

- 复杂操作：支持SQL，可用于一个表以及多个表之间非常复杂的查询。
  - 支持ACID（原子性、一致性、隔离性、持久性）

**缺点：**

- 读写性能比较差，尤其是海量数据的高效率读写；
- 固定的表结构，灵活度稍欠；
- 高并发读写需求，传统关系型数据库来说，硬盘I/O是一个很大的瓶颈。

**非关系数据库**

非关系数据库（NoSQL）被称作 Not only SQL或Non SQL 非关系数据库不以表格式存储和组织数据。不同数据点之间没有表、行、列或关系。数据存储在**集合**中。数据库通常是非结构化的并使用动态架构。

有四种主要类型的非关系数据库：

- **列式数据库**
  - HBase
  - Cassandra
  - Riak
- **键-值数据库**
  - Redis
  - Memcache
- **面向文档的数据库**
  - CouchDB
  - MongoDB
- **图数据库**
  - Neo4j

##### 3.1.2 什么是Redis

![](.\images\QQ_1722308044554.png)

Redis 是一个开源的（BSD 许可），内存中的数据结构存储系统，可以用作数据库、缓存和消息中间件。它支持多种类型的数据结构，如字符串、哈希、列表、集合、有序集合、位图、HyperLog 和地理空间索引半径查询等。Redis 内置复制（replication）、LUA 脚本（Lua scripting）、LRU 驱动事件（LRU eviction）、事务（transactions）和不同级别的磁盘持久化（persistence），并通过 Redis Sentinel（哨兵） 和自动分区（Cluster）提供高可用性（high availability）。

[Redis - The Real-time Data Platform](https://redis.io/)

![](.\images\QQ_1722305832692.png)



2008年，意大利一家创业公司Merzia的创始人Salvatore Sanfilippo为了避免MySQL的低性能，亲自定做一个数据库，并于2009年开发完成了Redis的最初版本。
​Salvatore Sanfilippo自己也没有想到，短短的几年时间，Redis就拥有了庞大的用户群体。Hacker News在2012年发布了一份数据库的使用情况调查，结果显示有近12%的公司在使用Redis。国内如新浪微博、街旁和知乎，国外如GitHub、Stack Overflow、Flickr、暴雪和Instagram，都是Redis的用户。

如今，Redis 已成为主流，其足迹几乎出现在所有 Web 服务中。根据 Stack Overflow 的调查，Redis 已连续五年成为最受欢迎的数据库。

![](.\images\QQ_1722306171587.png)



##### 3.1.3 Redis的应用场景

1. **缓存**：Redis 常用于缓存系统，因为它的读写速度非常快，并且支持丰富的数据类型。可以用来缓存数据库查询结果、会话数据、网页内容等。
2. **消息队列**：使用 Redis 的 List 数据结构，可以轻松实现一个高效的消息队列系统。利用 List 的 PUSH 和 POP 操作，可以实现消息的发布与订阅。
3. **实时数据分析**：Redis 的高性能和丰富的数据结构使其非常适合用于实时数据分析。例如，使用 Sorted Sets 实现排行榜功能，或者使用 HyperLogLog 进行唯一值计数。
4. **分布式锁**：Redis 可以用来实现分布式锁，利用其原子性操作（如 SETNX 和 EXPIRE），可以确保多个进程或线程间的互斥访问。
5. **会话存储**：由于 Redis 是内存数据库，非常适合作为会话存储，特别是对于需要快速读取和写入会话数据的应用程序。
6. **地理位置计算**：Redis 支持地理空间索引和半径查询，可以用于存储和查询地理位置数据，例如实现“附近的人”功能。

##### 3.1.4 Redis与其他数据库的对比

1. **与关系型数据库（如 MySQL、PostgreSQL）对比**：
   - **数据结构**：关系型数据库使用表格来存储数据，数据以行和列的形式存在；而 Redis 使用丰富的数据结构，如字符串、哈希、列表、集合和有序集合。
   - **性能**：Redis 将所有数据存储在内存中，读写速度非常快；而关系型数据库将数据存储在磁盘中，读写速度相对较慢。
   - **使用场景**：关系型数据库适用于需要复杂查询和事务支持的场景，而 Redis 更适合用于缓存、高速数据读取和写入、消息队列等场景。
2. **与键值数据库（如 Memcached）对比**：
   - **数据类型**：Memcached 仅支持简单的键值对存储，数据类型非常有限；而 Redis 支持丰富的数据结构。
   - **持久化**：Memcached 主要用作缓存，没有持久化机制；而 Redis 支持多种持久化机制，可以将数据存储在磁盘上。
   - **功能**：Redis 支持复杂的操作和高级功能，如事务、发布/订阅、Lua 脚本等，而 Memcached 功能较为简单。
3. **与文档数据库（如 MongoDB）对比**：
   - **数据模型**：MongoDB 使用 BSON 格式存储文档，适合存储和查询复杂的嵌套数据；而 Redis 使用键值对存储，并支持多种数据结构。
   - **查询能力**：MongoDB 提供强大的查询语言，可以进行复杂的查询和聚合操作；而 Redis 提供简单的键值查询和数据结构操作，查询能力相对较弱。
   - **使用场景**：MongoDB 适合用于需要灵活的文档结构和强大查询能力的应用场景，而 Redis 更适合用于需要高速读写和简单数据操作的场景。



#### 1-3 任务实施

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



使用redis-desktop-manager连接：

（a）安装redis-desktop-manager-0.8.8.384.exe，傻瓜式安装。

（b）创建连接，点击“Connect to Redis Server”，设置如下

![](.\images\09redis desktop.png)



（c）查看redis存储

![](.\images\10redis存储结果.png)





### 任务二：实践Redis数据类型与基本命令

#### 2-1 任务描述

本任务旨在让我们熟练掌握 Redis 的 5 种核心数据类型，以及 Redis 基本命令的使用。通过实际操作，加深对不同数据类型适用场景的理解，能够根据需求选择合适的数据类型，并熟练运用各类命令完成数据的增删改查、生命周期管理及备份恢复等操作，为 Redis 在智慧医疗项目中的缓存优化打下扎实基础。

#### 2-2 必备知识点

##### 3.2.1 Redis数据类型

Redis 是一个高性能的键值存储系统，支持多种数据类型，每种类型适用于不同的场景。以下是 Redis 最常用的 **5 种核心数据类型** 及其应用场景：

**（1）String**

**简介**：

- String是Redis中最基本的数据类型，可以存储任何形式的字符串，包括二进制数据（如图片或序列化的对象）。

**常见使用场景**

1. **缓存数据**：将常用数据缓存在 Redis 中，提高访问速度。
2. **计数器**：通过 INCR 和 DECR 命令实现计数器功能。
3. **分布式锁**：通过 SETNX 命令实现分布式锁。
4. **会话存储**：将用户会话信息存储在 Redis 中，实现快速访问。

**性能优势**

- **快速读写**：Redis 的 String 类型操作非常快速，读写操作的复杂度都是 O(1)。
- **灵活性高**：支持多种操作，包括字符串操作和数值操作，应用场景广泛。

​    Redis 的 String 数据类型功能丰富，使用灵活，适用于多种不同的场景。了解并熟练掌握这些命令和操作，可以有效提高 Redis 在项目中的应用效果。

**操作命令**：

- 设置值：`SET key value`
- 获取值：`GET key`
- 递增值：`INCR key`
- 递减值：`DECR key`
- 设置带过期时间的值：`SETEX key seconds value`

**示例**：

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

**简介**：

- List是按顺序排列的字符串集合，基于链表实现。

**使用场景**：

- 消息队列，使用`LPUSH`和`BRPOP`实现。
- 任务队列，按照插入顺序处理任务。

**操作命令**：

- 从左边插入：`LPUSH key value`
- 从右边插入：`RPUSH key value`
- 从左边弹出：`LPOP key`
- 从右边弹出：`RPOP key`
- 获取列表长度：`LLEN key`

**示例**：

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

**简介**：

- Set是无序的字符串集合，不允许重复成员。

**使用场景**：

- 用户标签、分类标签等去重数据存储。
- 共同好友、共同兴趣等交集计算。

**操作命令**：

- 添加成员：`SADD key member`
- 移除成员：`SREM key member`
- 检查成员是否存在：`SISMEMBER key member`
- 获取集合所有成员：`SMEMBERS key`
- 求交集：`SINTER key1 key2 ...`

**示例**：

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

**简介**：

- Hash是键值对集合，适用于存储对象。

**使用场景**：

- 存储用户信息、商品信息等结构化数据。
- 实现多字段的存储和访问。

**操作命令**：

- 设置字段值：`HSET key field value`
- 获取字段值：`HGET key field`
- 删除字段：`HDEL key field`
- 获取所有字段和值：`HGETALL key`
- 检查字段是否存在：`HEXISTS key field`

**示例**：

uid      name age
1001    Tom   13
1002    Jerry    18

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

**简介**：

- Sorted Set是带有分数的有序集合，成员按分数排序。

**使用场景**：

- 排行榜、评分系统。
- 实现带优先级的队列。

**操作命令**：

- 添加成员：`ZADD key score member`
- 获取成员的分数：`ZSCORE key member`
- 按分数区间获取成员：`ZRANGEBYSCORE key min max`
- 获取排名：`ZRANK key member`（默认升序）
- 获取有序集合成员数量：`ZCARD key`

**示例**：

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

**（6） 总结**

**各种数据类型特点和使用场景总结**

| 数据类型   | 特点               | 典型场景               |
| ---------- | ------------------ | ---------------------- |
| **String** | 简单键值对         | 缓存、计数器、分布式锁 |
| **Hash**   | 对象存储           | 用户信息、商品详情     |
| **List**   | 双向链表           | 消息队列、最新消息     |
| **Set**    | 无序唯一集合       | 标签、共同关注、去重   |
| **ZSet**   | 有序集合（带分数） | 排行榜、延迟队列       |



##### 3.2.2 Redis基本命令

以下是 Redis 中关于 **设置与获取值、删除值、键管理、数据备份与恢复** 的核心命令详解及示例，涵盖生产环境常用场景和注意事项：

**（1 ）设置与获取值（SET, GET）**

1. **设置值**：`SET`

   - 用于设置指定键的值。

   - 格式：`SET key value`

   - 示例：

     ```
     SET mykey "Hello, Redis!"
     ```

2. **获取值**：`GET`

   - 用于获取指定键的值。

   - 格式：`GET key`

   - 示例：

     ```
     GET mykey
     ```

**（2）删除值（DEL）**

1. **删除值：`DEL`**

   - 用于删除指定的键。

   - 格式：`DEL key [key ...]`

   - 示例：

     ```
     DEL key1 key2 key3
     ```

**（3） 键的管理（EXISTS, EXPIRE, TTL）**

1. **检查键是否存在**：`EXISTS`

   - 用于检查一个键是否存在。

   - 格式：`EXISTS key`

   - 示例：

     ```
     EXISTS mykey
     ```

2. **设置键的过期时间**：`EXPIRE`

   - 用于设置键的过期时间（以秒为单位）。

   - 格式：`EXPIRE key seconds`

   - 示例：

     ```
     EXPIRE mykey 60
     ```

3. **检查键的剩余生存时间**：`TTL`

   - 用于获取键的剩余生存时间（以秒为单位）。

   - 格式：`TTL key`

   - 示例：

     ```
     TTL mykey
     ```

**（4） 数据备份与恢复（SAVE, BGSAVE, RESTORE）**

1. **保存数据快照**：`SAVE`

   - 立即创建数据快照并阻塞Redis服务器，直到快照完成。

   - 格式：`SAVE`

   - 语法：

     ```
     SAVE
     ```

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

     

2. **后台保存数据快照**：`BGSAVE`

   - 在后台异步保存数据快照，不会阻塞Redis服务器。

   - 格式：`BGSAVE`

   - 语法：

   ```
   BGSAVE [SCHEDULE]
   ```

   - 示例：

   ```
   127.0.0.1:6379> BGSAVE
   Background saving started
   127.0.0.1:6379> BGSAVE SCHEDULE
   Background saving started
   127.0.0.1:6379> lastsave
   (integer) 1753088801
   ```

   可以使用 LASTSAVE 命令检查操作是否成功。

   

3. **恢复数据**：`RESTORE`

- 假设我们有一个键 `mykey`，我们想要备份并恢复这个键。

  ```
   set key1 "Hello Redis!"
  ```

- 使用 `DUMP` 命令获取序列化值：

  ```
  dump key1
  ```

- 使用 `RESTORE` 命令恢复这个键：

  ```
  restore key1 0 "\x00\x0cHello Redis!\t\x00\xfa\xb1\xffv\xc1\xd2\xcb\x9b"
  ```



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

（5 ）总结

Redis提供了多种基本命令来管理键值对、控制键的生命周期以及进行数据备份和恢复。熟练掌握这些命令有助于高效地操作和维护Redis数据库。

1. **设置与获取值**：
   - 设置值：`SET key value`
   - 获取值：`GET key`
2. **删除值**：
   - 删除值：`DEL key [key ...]`
3. **键的管理**：
   - 检查键是否存在：`EXISTS key`
   - 设置键的过期时间：`EXPIRE key seconds`
   - 检查键的剩余生存时间：`TTL key`
4. **数据备份与恢复**：
   - 立即保存数据快照：`SAVE`
   - 后台保存数据快照：`BGSAVE`
   - 恢复数据：`RESTORE key ttl serialized-value`

这些基本命令是Redis操作的基础，了解并掌握它们可以大大提高Redis使用的效率和可靠性。



#### 2-3 任务实施

##### 3-2-1 用 Hash 保存并查询患者信息

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



##### 3-2-2 利用 Sorted Set 实现药品销量排行榜并备份

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



### 任务三：开启智慧医疗项目持久化

#### 3-1 任务描述

本任务聚焦智慧医疗项目持久化，通过 Docker 部署 Redis 并配置持久化与数据卷映射，确保缓存数据持久化存储，提升项目稳定性。需掌握 Redis 容器的后台启动、持久化配置（AOF 模式）及数据卷挂载，解决容器删除导致的数据丢失问题，为智慧医疗项目提供可靠的缓存支持，保障患者信息、药品数据等关键缓存数据的安全性与连续性。

#### 3-2 必备知识点

##### 3.3.1 Redis持久化

Redis 持久化是将存储在内存中的数据库数据保存到磁盘上的过程，目的是在服务器重启后能够恢复数据，防止因进程退出或机器故障导致的数据丢失。Redis 提供了两种主要的持久化机制：**RDB (快照)** 和 **AOF (追加日志**)，以及结合了两者优点的**混合持久化 (RDB-AOF)**。

###### 3.3.1.1 RDB（Redis DataBase）

**工作原理**

1. **生成快照**：

   - Redis使用RDB持久化机制通过在某个时刻创建数据库的完整数据快照来实现持久化。这些快照是二进制格式的文件，通常命名为`dump.rdb`。
   - 快照的创建方式可以是同步（`SAVE`命令）或异步（`BGSAVE`命令）。

2. **快照创建过程**：

   - **`SAVE`命令**：在执行`SAVE`命令时，Redis会阻塞主进程，创建一个新的RDB快照。这可能导致Redis响应其他命令的延迟，因此在生产环境中不推荐使用。
   - **`BGSAVE`命令**：在执行`BGSAVE`时，Redis会创建一个子进程来生成RDB快照，主进程不会被阻塞。这种方式较为高效，适用于生产环境。

3. **触发条件**：

   - RDB持久化可以根据配置的条件定期生成快照。例如，在配置文件中可以设置如下条件：

     ```
     save 900 1
     save 300 10
     save 60 10000
     ```

     这意味着如果900秒内有至少1次写操作，300秒内有至少10次写操作，或60秒内有至少10000次写操作，Redis将创建一个RDB快照。

4. **恢复过程**：

   - 启动Redis时，如果存在RDB文件，Redis会使用该文件恢复数据库状态。恢复过程是直接将快照文件加载到内存中，因此恢复速度较快。

**优缺点**

- **优点**：
  - **性能**：RDB快照的生成是异步的，不会阻塞主进程，适用于需要较高性能的场景。
  - **恢复速度**：RDB文件通常比AOF文件小，恢复时加载速度快。
  - **备份**：RDB文件便于备份和迁移。
- **缺点**：
  - **数据丢失**：RDB的快照是周期性的，因此在最后一次快照之后到崩溃发生之间的数据可能会丢失。
  - **快照时间**：快照生成的时间点可能与实际数据状态有延迟，不适合对数据一致性要求极高的场景。

###### 3.3.1.2 AOF（Append-Only File）

**工作原理**

1. **命令追加**：
   - AOF持久化机制通过将每个写操作（如`SET`、`DEL`等）追加到一个AOF文件（通常命名为`appendonly.aof`）来实现持久化。
2. **写入策略**：
   - **`appendfsync always`**：每次写操作都会同步到磁盘。这种方式提供了最好的数据安全性，但性能较差。
   - **`appendfsync everysec`**：每秒同步一次。性能与数据安全性之间的平衡，适用于大多数场景。
   - **`appendfsync no`**：由操作系统决定何时将数据同步到磁盘，性能最佳，但数据安全性较差。
3. **文件重写**：
   - 随着时间推移，AOF文件可能会变得非常大。Redis提供了`BGREWRITEAOF`命令来重写AOF文件。这会创建一个新的AOF文件，其中仅包含当前数据库状态的最小化命令集，从而减少文件大小。
   - `BGREWRITEAOF`是一个后台进程，不会阻塞主Redis进程。
4. **恢复过程**：
   - 启动Redis时，如果存在AOF文件，Redis会按顺序执行AOF文件中的命令来恢复数据库状态。这确保了恢复的数据与崩溃时的状态尽可能一致。

**优缺点**

- **优点**：

  - **数据完整性**：AOF记录了所有写操作，因此数据恢复通常能恢复到最近的状态，数据丢失较少。
  - **数据一致性**：适合对数据一致性要求较高的场景。
  - **操作记录**：AOF文件可以作为操作的记录，便于审计和追踪。

- **缺点**：

  - **性能**：AOF文件写入频繁，可能影响Redis的性能，尤其是在使用`appendfsync always`时。
  - **恢复速度**：由于需要重放所有写操作，恢复速度可能较慢。
  - **文件碎片化**：AOF文件可能随着时间增长而变得很大，尽管可以通过`BGREWRITEAOF`进行优化，但仍需定期维护。

  #### AOF配置

  打开AOF

  ```
  appendonly yes
  ```

  AOF文件名字（可以自定义后缀必须是.aof）

  ```
  appendfilename "appendonly.aof"
  ```

###### 3.3.1.3 RDB和AOF

- **RDB和AOF的结合**：

  - 在生产环境中，许多用户选择同时启用RDB和AOF持久化机制。这样可以在重启时使用RDB文件进行快速恢复，同时利用AOF确保数据的最新状态和一致性。

- **配置示例**：

  - 在

    ```
    redis.conf
    ```

    配置文件中，你可以同时启用RDB和AOF持久化：

    ```
    # RDB配置
    save 900 1
    save 300 10
    save 60 10000
    
    # AOF配置
    appendonly yes
    appendfsync everysec
    ```

- **选择策略**：

  - **高性能应用**：如果对数据丢失的容忍度较高，可以选择仅使用RDB持久化。
  - **高数据安全性要求**：如果需要最小化数据丢失，可以选择仅使用AOF持久化，或同时使用RDB和AOF。

通过合理配置RDB和AOF持久化机制，可以在性能和数据安全性之间取得适当的平衡，满足不同应用场景的需求。



###### 3.3.1.4 **持久化方式对比与选择建议**

| **场景**         | **推荐方式**      | **理由**                                       |
| ---------------- | ----------------- | ---------------------------------------------- |
| 追求恢复速度     | RDB 或混合持久化  | RDB 加载快，混合持久化兼顾速度与完整性。       |
| 数据安全性要求高 | AOF 或混合持久化  | AOF 记录所有操作，混合持久化减少数据丢失风险。 |
| 高并发写入场景   | AOF（`everysec`） | 平衡性能与安全，避免频繁 `fork()` 影响主线程。 |
| 资源受限环境     | RDB               | 文件体积小，对磁盘 I/O 压力低。                |

#### 3-3 任务实施

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



使用redis-desktop-manager连接：

（a）安装redis-desktop-manager-0.8.8.384.exe，傻瓜式安装。

（b）创建连接，点击“Connect to Redis Server”，设置如下

![image-20240722081732351](.\images\09redis desktop.png)

（c）查看redis存储

![image-20240722081908482](.\images\10redis存储结果.png)



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



使用redis-desktop-manager查看redis

![image-20240722191640652](.\images\11redis存储结果2.png)

发现前面存在redis里的数据没有了，说明redis没有持久化。

redis支持内存数据库持久化：

a）rdb持久化：快照Redis服务器将某一时刻数据以快照文件形式写入磁盘

b）aof持久化：Redis服务器将所有Redis客户端的写操作以命令方式记录到日志文件中（AOF更加安全）

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

使用redis-desktop-manager添加数据

![image-20240722203451455](.\images\12redis添加值.png)

查看appendonly.aof内容

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

查看redis是否还有之前的数据

![image-20240723073739672](.\images\13redis数据.png)





