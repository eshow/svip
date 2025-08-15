import{_ as n,c as a,a as e,o as i}from"./app-DHGoFUDo.js";const l={};function d(p,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h2 id="_1-部署并验证-redis-服务" tabindex="-1"><a class="header-anchor" href="#_1-部署并验证-redis-服务"><span>1.部署并验证 Redis 服务</span></a></h2><p>本任务是在docker上安装redis，并运行redis容器。实施步骤如下所示。</p><p>1）拉取redis:6.0.9</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>root@hp-None:~# docker pull redis:6.0.9</span></span>
<span class="line"><span>6.0.9: Pulling from library/redis</span></span>
<span class="line"><span>a076a628af6f: Pull complete </span></span>
<span class="line"><span>f40dd07fe7be: Pull complete </span></span>
<span class="line"><span>ce21c8a3dbee: Pull complete </span></span>
<span class="line"><span>47b0fe76214f: Pull complete </span></span>
<span class="line"><span>6c5e46e23ecb: Pull complete </span></span>
<span class="line"><span>e81e24116351: Pull complete </span></span>
<span class="line"><span>Digest: sha256:48c1431bed43fb2645314e4a22d6ca03cf36c5541d034de6a4f3330e7174915b</span></span>
<span class="line"><span>Status: Downloaded newer image for redis:6.0.9</span></span>
<span class="line"><span>docker.io/library/redis:6.0.9</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）运行redis</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>root@hp-None:~# docker run -p 6379:6379 redis:6.0.9</span></span>
<span class="line"><span>1:C 22 Jul 2024 00:05:28.311 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo</span></span>
<span class="line"><span>1:C 22 Jul 2024 00:05:28.313 # Redis version=6.0.9, bits=64, commit=00000000, modified=0, pid=1, just started</span></span>
<span class="line"><span>1:C 22 Jul 2024 00:05:28.314 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf</span></span>
<span class="line"><span>1:M 22 Jul 2024 00:05:28.321 * Running mode=standalone, port=6379.</span></span>
<span class="line"><span>1:M 22 Jul 2024 00:05:28.322 # Server initialized</span></span>
<span class="line"><span>1:M 22 Jul 2024 00:05:28.323 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add &#39;vm.overcommit_memory = 1&#39; to /etc/sysctl.conf and then reboot or run the command &#39;sysctl vm.overcommit_memory=1&#39; for this to take effect.</span></span>
<span class="line"><span>1:M 22 Jul 2024 00:05:28.326 * Ready to accept connections</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）进入容器</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>root@hp-None:~# docker ps</span></span>
<span class="line"><span>CONTAINER ID   IMAGE         COMMAND                   CREATED         STATUS         PORTS                                                  NAMES</span></span>
<span class="line"><span>56d60bb98f8b   redis:6.0.9   &quot;docker-entrypoint.s…&quot;   2 minutes ago   Up 2 minutes   0.0.0.0:6379-&gt;6379/tcp, :::6379-&gt;6379/tcp              thirsty_cray</span></span>
<span class="line"><span>02e6eb10762f   mysql:8.0     &quot;docker-entrypoint.s…&quot;   10 hours ago    Up 10 hours    0.0.0.0:3306-&gt;3306/tcp, :::3306-&gt;3306/tcp, 33060/tcp   mysql8-02</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#进入容器</span></span>
<span class="line"><span>root@hp-None:~# docker exec -it 56d60bb98f8b bash</span></span>
<span class="line"><span>root@56d60bb98f8b:/data# redis-cli </span></span>
<span class="line"><span>127.0.0.1:6379&gt; keys *</span></span>
<span class="line"><span>(empty array)</span></span>
<span class="line"><span>127.0.0.1:6379&gt; set name zsan</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>127.0.0.1:6379&gt; get name</span></span>
<span class="line"><span>&quot;zsan&quot;</span></span>
<span class="line"><span>127.0.0.1:6379&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-redis数据类型" tabindex="-1"><a class="header-anchor" href="#_2-redis数据类型"><span>2.Redis数据类型</span></a></h2><p><strong>（1）String</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>SET mykey &quot;Hello, Redis!&quot;</span></span>
<span class="line"><span>GET mykey</span></span>
<span class="line"><span>INCR counter</span></span>
<span class="line"><span>SETEX session:1234 3600 &quot;user data&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>127.0.0.1:6379&gt; set mykey &quot;Hello Redis!&quot;</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>127.0.0.1:6379&gt; get mykey</span></span>
<span class="line"><span>&quot;Hello Redis!&quot;</span></span>
<span class="line"><span>127.0.0.1:6379&gt; incr mycounter</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379&gt; incr mycounter</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>127.0.0.1:6379&gt; </span></span>
<span class="line"><span>127.0.0.1:6379&gt; incr mycounter</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>127.0.0.1:6379&gt; decr mycounter</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>127.0.0.1:6379&gt; SETEX hello_key 5 hello  #这个命令会将键hello_key设置为值hello，并且该键将在5秒后自动删除。</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>127.0.0.1:6379&gt; get hello_key</span></span>
<span class="line"><span>&quot;hello&quot;</span></span>
<span class="line"><span>127.0.0.1:6379&gt; get hello_key</span></span>
<span class="line"><span>(nil)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（2）List</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>127.0.0.1:6379&gt; lpush my_list &quot;world&quot;</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379&gt; llen my_list</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379&gt; lpush my_list &quot;hello&quot;</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>127.0.0.1:6379&gt; llen my_list</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>127.0.0.1:6379&gt; rpop my_list</span></span>
<span class="line"><span>&quot;world&quot;</span></span>
<span class="line"><span>127.0.0.1:6379&gt; llen my_list</span></span>
<span class="line"><span>(integer) 1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（3）Set</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>127.0.0.1:6379&gt; SADD myset &quot;Hello&quot;</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379&gt; SADD myset &quot;World&quot;</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379&gt; SISMEMBER myset &quot;Hello&quot;</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379&gt; SMEMBERS myset</span></span>
<span class="line"><span>1) &quot;World&quot;</span></span>
<span class="line"><span>2) &quot;Hello&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（4）Hash</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>127.0.0.1:6379&gt; HSET uid:1001 name &quot;Tom&quot;</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379&gt; HSET uid:1001 age 13</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379&gt; HSET uid:1002 name &quot;Jerry&quot; age 18</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>127.0.0.1:6379&gt; HGET uid:1001 name</span></span>
<span class="line"><span>&quot;Tom&quot;</span></span>
<span class="line"><span>127.0.0.1:6379&gt; HGETALL uid:1001</span></span>
<span class="line"><span>1) &quot;name&quot;</span></span>
<span class="line"><span>2) &quot;Tom&quot;</span></span>
<span class="line"><span>3) &quot;age&quot;</span></span>
<span class="line"><span>4) &quot;13&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（5） Sorted Set</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>127.0.0.1:6379&gt; ZADD leaderboard 100 &quot;Alice&quot;</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379&gt; ZADD leaderboard 200 &quot;Bob&quot;</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379&gt; ZRANGEBYSCORE leaderboard 0 100</span></span>
<span class="line"><span>1) &quot;Alice&quot;</span></span>
<span class="line"><span>127.0.0.1:6379&gt; ZSCORE leaderboard &quot;Alice&quot;</span></span>
<span class="line"><span>&quot;100&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-redis基本命令" tabindex="-1"><a class="header-anchor" href="#_3-redis基本命令"><span>3.Redis基本命令</span></a></h2><p><strong>（1 ）设置与获取值（SET, GET）</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>SET mykey &quot;Hello, Redis!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>GET mykey</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（2）删除值（DEL）</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>DEL mykey</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>（3） 键的管理（EXISTS, EXPIRE, TTL）</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>EXISTS mykey</span></span>
<span class="line"><span></span></span>
<span class="line"><span>EXPIRE mykey 60</span></span>
<span class="line"><span></span></span>
<span class="line"><span>TTL mykey</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（4） 数据备份与恢复（SAVE, BGSAVE, RESTORE）</strong></p><p><strong>（）保存数据快照</strong>：<code>SAVE</code></p><p>使用 <strong>save</strong> 命令进行同步备份，备份后的数据默认保存在 <strong>dump.rdb</strong> 文件。可以使用 config get dir 命令查看 。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>127.0.0.1:6379&gt; save</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>127.0.0.1:6379&gt; config get dir</span></span>
<span class="line"><span>1) &quot;dir&quot;</span></span>
<span class="line"><span>2) &quot;/data&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入容器目录</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>root@hp-None:~/data# docker exec -it 3e1 bash</span></span>
<span class="line"><span>root@3e152399b508:/data# ls</span></span>
<span class="line"><span>dump.rdb</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（b）后台保存数据快照</strong>：<code>BGSAVE</code></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>127.0.0.1:6379&gt; BGSAVE</span></span>
<span class="line"><span>Background saving started</span></span>
<span class="line"><span>127.0.0.1:6379&gt; BGSAVE SCHEDULE</span></span>
<span class="line"><span>Background saving started</span></span>
<span class="line"><span>127.0.0.1:6379&gt; lastsave</span></span>
<span class="line"><span>(integer) 1753088801</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（c）恢复数据</strong>：<code>RESTORE</code></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>127.0.0.1:6379&gt; set key1 &quot;Hello Redis!&quot;</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>127.0.0.1:6379&gt; dump key1</span></span>
<span class="line"><span>&quot;\\x00\\x0cHello Redis!\\t\\x00\\xfa\\xb1\\xffv\\xc1\\xd2\\xcb\\x9b&quot;</span></span>
<span class="line"><span>127.0.0.1:6379&gt; get key1</span></span>
<span class="line"><span>&quot;Hello Redis!&quot;</span></span>
<span class="line"><span>(error) BUSYKEY Target key name already exists.</span></span>
<span class="line"><span>127.0.0.1:6379&gt; del key1</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>127.0.0.1:6379&gt; restore key1 0 &quot;\\x00\\x0cHello Redis!\\t\\x00\\xfa\\xb1\\xffv\\xc1\\xd2\\xcb\\x9b&quot;</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>127.0.0.1:6379&gt; get key1</span></span>
<span class="line"><span>&quot;Hello Redis!&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-实践redis数据类型与基本命令" tabindex="-1"><a class="header-anchor" href="#_4-实践redis数据类型与基本命令"><span>4.实践Redis数据类型与基本命令</span></a></h2><p><strong>（1）用 Hash 保存并查询患者信息</strong></p><p>在 Redis 中以 Hash 形式存储两位患者（uid:2001 与 uid:2002）的姓名、年龄、病历号，随后查询并更新其中一位患者的年龄。</p><p>实施步骤如下所示。</p><p>（1）进入容器</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>docker exec -it &lt;容器ID&gt; redis-cli</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>（2）写入数据</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>HSET uid:2001 name &quot;李雷&quot; age 34 record &quot;A1024&quot;</span></span>
<span class="line"><span>HSET uid:2002 name &quot;韩梅梅&quot; age 29 record &quot;A1025&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）查询 uid:2001 的完整信息</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>HGETALL uid:2001</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>（4）将 uid:2001 的年龄改为 35</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>HSET uid:2001 age 35</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>（5）验证更新</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>HGET uid:2001 age</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>（2）利用 Sorted Set 实现药品销量排行榜并备份</strong></p><p>将 3 种药品的销量写入 Sorted Set，随后使用备份命令持久化数据，最后恢复并验证排行榜。</p><p>实施步骤如下所示。</p><p>（1）写入排行榜（score 即销量）</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>ZADD drug:sales 1200 &quot;阿莫西林&quot; 950 &quot;布洛芬&quot; 1350 &quot;维生素C&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>（2）查看销量前 2 名</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>ZREVRANGE drug:sales 0 1 WITHSCORES</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>（3）立即执行快照备份</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>SAVE                # 或 BGSAVE</span></span>
<span class="line"><span>CONFIG GET dir      # 记下 /data 目录</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>（4）退出容器并复制 dump.rdb 到宿主机备份</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>docker cp &lt;容器ID&gt;:/data/dump.rdb ~/drug_sales_backup.rdb</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>（5）模拟数据丢失：删除 key</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>DEL drug:sales</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>（6）停止容器，将备份文件拷回并重启容器，验证排行榜已恢复</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>docker cp ~/drug_sales_backup.rdb &lt;新容器ID&gt;:/data/dump.rdb</span></span>
<span class="line"><span>docker restart &lt;新容器ID&gt;</span></span>
<span class="line"><span>docker exec -it &lt;新容器ID&gt; redis-cli</span></span>
<span class="line"><span>ZREVRANGE drug:sales 0 -1 WITHSCORES</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-开启智慧医疗项目持久化" tabindex="-1"><a class="header-anchor" href="#_5-开启智慧医疗项目持久化"><span>5.开启智慧医疗项目持久化</span></a></h2><p>开启智慧医疗项目持久化，实施步骤如下所示。</p><p>（1）拉取redis:6.0.9</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>root@hp-None:~# docker pull redis:6.0.9</span></span>
<span class="line"><span>6.0.9: Pulling from library/redis</span></span>
<span class="line"><span>a076a628af6f: Pull complete </span></span>
<span class="line"><span>f40dd07fe7be: Pull complete </span></span>
<span class="line"><span>ce21c8a3dbee: Pull complete </span></span>
<span class="line"><span>47b0fe76214f: Pull complete </span></span>
<span class="line"><span>6c5e46e23ecb: Pull complete </span></span>
<span class="line"><span>e81e24116351: Pull complete </span></span>
<span class="line"><span>Digest: sha256:48c1431bed43fb2645314e4a22d6ca03cf36c5541d034de6a4f3330e7174915b</span></span>
<span class="line"><span>Status: Downloaded newer image for redis:6.0.9</span></span>
<span class="line"><span>docker.io/library/redis:6.0.9</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）运行redis</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>root@hp-None:~# docker run -p 6379:6379 redis:6.0.9</span></span>
<span class="line"><span>1:C 22 Jul 2024 00:05:28.311 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo</span></span>
<span class="line"><span>1:C 22 Jul 2024 00:05:28.313 # Redis version=6.0.9, bits=64, commit=00000000, modified=0, pid=1, just started</span></span>
<span class="line"><span>1:C 22 Jul 2024 00:05:28.314 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf</span></span>
<span class="line"><span>1:M 22 Jul 2024 00:05:28.321 * Running mode=standalone, port=6379.</span></span>
<span class="line"><span>1:M 22 Jul 2024 00:05:28.322 # Server initialized</span></span>
<span class="line"><span>1:M 22 Jul 2024 00:05:28.323 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add &#39;vm.overcommit_memory = 1&#39; to /etc/sysctl.conf and then reboot or run the command &#39;sysctl vm.overcommit_memory=1&#39; for this to take effect.</span></span>
<span class="line"><span>1:M 22 Jul 2024 00:05:28.326 * Ready to accept connections</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）进入容器</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>root@hp-None:~# docker ps</span></span>
<span class="line"><span>CONTAINER ID   IMAGE         COMMAND                   CREATED         STATUS         PORTS                                                  NAMES</span></span>
<span class="line"><span>56d60bb98f8b   redis:6.0.9   &quot;docker-entrypoint.s…&quot;   2 minutes ago   Up 2 minutes   0.0.0.0:6379-&gt;6379/tcp, :::6379-&gt;6379/tcp              thirsty_cray</span></span>
<span class="line"><span>02e6eb10762f   mysql:8.0     &quot;docker-entrypoint.s…&quot;   10 hours ago    Up 10 hours    0.0.0.0:3306-&gt;3306/tcp, :::3306-&gt;3306/tcp, 33060/tcp   mysql8-02</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#进入容器</span></span>
<span class="line"><span>root@hp-None:~# docker exec -it 56d60bb98f8b bash</span></span>
<span class="line"><span>root@56d60bb98f8b:/data# redis-cli </span></span>
<span class="line"><span>127.0.0.1:6379&gt; keys *</span></span>
<span class="line"><span>(empty array)</span></span>
<span class="line"><span>127.0.0.1:6379&gt; set name zsan</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>127.0.0.1:6379&gt; get name</span></span>
<span class="line"><span>&quot;zsan&quot;</span></span>
<span class="line"><span>127.0.0.1:6379&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（4）启动redis，映射端口，后台启动，指定名称，总是启动</p><p>docker run -p 6379:6379 -d --name redis01 --restart=always redis:6.0.9</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>#停止上面的redis</span></span>
<span class="line"><span>root@hp-None:~# docker stop 56d60bb98f8b</span></span>
<span class="line"><span>56d60bb98f8b</span></span>
<span class="line"><span>#查看运行的容器</span></span>
<span class="line"><span>root@hp-None:~# docker ps</span></span>
<span class="line"><span>CONTAINER ID   IMAGE       COMMAND                   CREATED        STATUS        PORTS                                                  NAMES</span></span>
<span class="line"><span>02e6eb10762f   mysql:8.0   &quot;docker-entrypoint.s…&quot;   21 hours ago   Up 21 hours   0.0.0.0:3306-&gt;3306/tcp, :::3306-&gt;3306/tcp, 33060/tcp   mysql8-02</span></span>
<span class="line"><span>#运行redis</span></span>
<span class="line"><span>root@hp-None:~# docker run -p 6379:6379 -d --name redis01 --restart=always redis:6.0.9</span></span>
<span class="line"><span>7125eec681d09c0d13478f38310c28f4b7bab397751cf0d3a59a6e8d74d9282e</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#查看运行的容器</span></span>
<span class="line"><span>root@hp-None:~# docker ps</span></span>
<span class="line"><span>CONTAINER ID   IMAGE         COMMAND                   CREATED         STATUS         PORTS                                                  NAMES</span></span>
<span class="line"><span>7125eec681d0   redis:6.0.9   &quot;docker-entrypoint.s…&quot;   2 minutes ago   Up 2 minutes   0.0.0.0:6379-&gt;6379/tcp, :::6379-&gt;6379/tcp              redis01</span></span>
<span class="line"><span>02e6eb10762f   mysql:8.0     &quot;docker-entrypoint.s…&quot;   21 hours ago    Up 21 hours    0.0.0.0:3306-&gt;3306/tcp, :::3306-&gt;3306/tcp, 33060/tcp   mysql8-02</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（5）启动redis，映射端口，后台启动，指定名称，总是启动 --restart=always，运行redis开启持久化。</p><p>docker run -p 6379:6379 -d --name redis02 --restart=always redis:6.0.9 redis-server --appendonly yes</p><p><strong>注意：只要开启了持久化，将持久化文件生成在容器的/data/目录中</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>#停止前面的redis</span></span>
<span class="line"><span>root@hp-None:~# docker stop 7125eec681d0</span></span>
<span class="line"><span>7125eec681d0</span></span>
<span class="line"><span>root@hp-None:~# docker ps</span></span>
<span class="line"><span>CONTAINER ID   IMAGE       COMMAND                   CREATED        STATUS        PORTS                                                  NAMES</span></span>
<span class="line"><span>02e6eb10762f   mysql:8.0   &quot;docker-entrypoint.s…&quot;   22 hours ago   Up 22 hours   0.0.0.0:3306-&gt;3306/tcp, :::3306-&gt;3306/tcp, 33060/tcp   mysql8-02</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#运行redis</span></span>
<span class="line"><span>root@hp-None:~# docker run -p 6379:6379 -d --name redis02 --restart=always redis:6.0.9 redis-server --appendonly yes</span></span>
<span class="line"><span>c79cc7d208c8daaeea9337306a1d4369ebda58e7d799543e4907cd53eb5c50fb</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#进入redis容器</span></span>
<span class="line"><span>root@hp-None:~# docker exec -it c79 bash</span></span>
<span class="line"><span>root@c79cc7d208c8:/data# ls</span></span>
<span class="line"><span>appendonly.aof</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用redis-desktop-manager添加数据。</p><p>查看appendonly.aof内容。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>root@c79cc7d208c8:/data# cat appendonly.aof </span></span>
<span class="line"><span>*2</span></span>
<span class="line"><span>$6</span></span>
<span class="line"><span>SELECT</span></span>
<span class="line"><span>$1</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>*3</span></span>
<span class="line"><span>$3</span></span>
<span class="line"><span>SET</span></span>
<span class="line"><span>$4</span></span>
<span class="line"><span>name</span></span>
<span class="line"><span>$4</span></span>
<span class="line"><span>lisi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时删除redis容器，数据也会跟着删除，因为appendonly.aof文件删除了。</p><p>（6）启动redis，映射端口，后台启动，指定名称，总是启动 --restart=always，运行redis开启持久化，使用数据卷映射到外部。</p><p>docker run -p 6379:6379 -d --name redis03 --restart=always -v /root/redisdata:/data redis:6.0.9 redis-server --appendonly yes</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>#查看运行的容器</span></span>
<span class="line"><span>root@hp-None:~# docker ps</span></span>
<span class="line"><span>CONTAINER ID   IMAGE         COMMAND                   CREATED        STATUS        PORTS                                                  NAMES</span></span>
<span class="line"><span>c79cc7d208c8   redis:6.0.9   &quot;docker-entrypoint.s…&quot;   11 hours ago   Up 11 hours   0.0.0.0:6379-&gt;6379/tcp, :::6379-&gt;6379/tcp              redis02</span></span>
<span class="line"><span>02e6eb10762f   mysql:8.0     &quot;docker-entrypoint.s…&quot;   33 hours ago   Up 33 hours   0.0.0.0:3306-&gt;3306/tcp, :::3306-&gt;3306/tcp, 33060/tcp   mysql8-02</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#停止redis容器</span></span>
<span class="line"><span>root@hp-None:~# docker stop c79cc7d208c8</span></span>
<span class="line"><span>c79cc7d208c8</span></span>
<span class="line"><span>#运行redis</span></span>
<span class="line"><span>root@hp-None:~# docker run -p 6379:6379 -d --name redis03 --restart=always -v /root/redisdata:/data redis:6.0.9 redis-server --appendonly yes</span></span>
<span class="line"><span>e620f076d8eda654ecf815c6e7319381d312b76060ac50051b252c4fc316fd80</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#进入redis容器</span></span>
<span class="line"><span>root@hp-None:~# docker exec -it e62 bash</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用redis desktop添加数据。然后查看appendonly.aof</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>root@hp-None:~# ls</span></span>
<span class="line"><span>abc.txt  data  hp  redisdata  RUNNING.txt  snap</span></span>
<span class="line"><span>root@hp-None:~# cd redisdata/</span></span>
<span class="line"><span>root@hp-None:~/redisdata# ls</span></span>
<span class="line"><span>appendonly.aof</span></span>
<span class="line"><span>root@hp-None:~/redisdata# cat appendonly.aof </span></span>
<span class="line"><span>*2</span></span>
<span class="line"><span>$6</span></span>
<span class="line"><span>SELECT</span></span>
<span class="line"><span>$1</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>*3</span></span>
<span class="line"><span>$3</span></span>
<span class="line"><span>SET</span></span>
<span class="line"><span>$4</span></span>
<span class="line"><span>name</span></span>
<span class="line"><span>$6</span></span>
<span class="line"><span>wangwu</span></span>
<span class="line"><span>*3</span></span>
<span class="line"><span>$3</span></span>
<span class="line"><span>SET</span></span>
<span class="line"><span>$3</span></span>
<span class="line"><span>age</span></span>
<span class="line"><span>$2</span></span>
<span class="line"><span>22</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除redis容器，重新运行redis</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>root@hp-None:~# docker ps</span></span>
<span class="line"><span>CONTAINER ID   IMAGE         COMMAND                   CREATED         STATUS         PORTS                                                  NAMES</span></span>
<span class="line"><span>e620f076d8ed   redis:6.0.9   &quot;docker-entrypoint.s…&quot;   9 minutes ago   Up 9 minutes   0.0.0.0:6379-&gt;6379/tcp, :::6379-&gt;6379/tcp              redis03</span></span>
<span class="line"><span>02e6eb10762f   mysql:8.0     &quot;docker-entrypoint.s…&quot;   33 hours ago    Up 33 hours    0.0.0.0:3306-&gt;3306/tcp, :::3306-&gt;3306/tcp, 33060/tcp   mysql8-02</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#删除redis容器</span></span>
<span class="line"><span>root@hp-None:~# docker rm -f e62</span></span>
<span class="line"><span>e62</span></span>
<span class="line"><span>#重新运行redis容器</span></span>
<span class="line"><span>root@hp-None:~# docker run -p 6379:6379 -d --name redis03 --restart=always -v /root/redisdata:/data redis:6.0.9 redis-server --appendonly yes</span></span>
<span class="line"><span>834a021d5e54be1021e780cb3351c0a6b2053db7e58307407cc9c31de4c958d2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看redis是否还有之前的数据。</p>`,92)]))}const c=n(l,[["render",d]]),t=JSON.parse('{"path":"/article/gx84lejm/","title":"部署并验证 Redis 服务","lang":"zh-CN","frontmatter":{"title":"部署并验证 Redis 服务","createTime":"2025/08/15 14:06:38","permalink":"/article/gx84lejm/"},"readingTime":{"minutes":7.29,"words":2188},"git":{"createdTime":1754385901000,"updatedTime":1755240741000,"contributors":[{"name":"elvishehai521@163.com","username":"","email":"elvishehai521@163.com","commits":2,"avatar":"https://gravatar.com/avatar/6a640db68c5bf3768af7413cb28623721edb88b0f88957ed42c162769c5f659c?d=retro"}]},"filePathRelative":"notes/docker/部署并验证 Redis 服务.md","headers":[],"categoryList":[{"id":"4358b5","sort":10000,"name":"notes"},{"id":"154f33","sort":10001,"name":"docker"}]}');export{c as comp,t as data};
