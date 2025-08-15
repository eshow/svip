import{_ as n,c as a,a as i,o as e}from"./app-DHGoFUDo.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h2 id="_1-项目需求分析" tabindex="-1"><a class="header-anchor" href="#_1-项目需求分析"><span>1. 项目需求分析</span></a></h2><ul><li><strong>缓存的目的</strong>：提升数据访问的速度，减少数据库的负载。</li><li><strong>缓存的数据类型</strong>：确定需要缓存的数据类型，如用户信息、商品详情等。</li><li><strong>缓存策略</strong>：定义缓存策略，如LRU（Least Recently Used）、LFU（Least Frequently Used）等。</li><li><strong>过期策略</strong>：设置数据的过期时间，确保缓存中的数据不失效。</li><li><strong>缓存清理</strong>：定义缓存清理的策略和机制，确保缓存空间不被过多占用。</li></ul><h2 id="_2-使用redis实现缓存" tabindex="-1"><a class="header-anchor" href="#_2-使用redis实现缓存"><span>2.使用Redis实现缓存</span></a></h2><p>Redis是一种高效的内存缓存系统，支持多种数据结构，适合作为缓存系统。以下是Redis缓存系统的基本架构：</p><ul><li><strong>客户端</strong>：应用程序通过Redis客户端与Redis服务器交互。</li><li><strong>Redis服务器</strong>：存储缓存数据，并根据请求返回数据。</li><li><strong>持久化</strong>：可选项，根据需求决定是否开启Redis持久化功能。</li></ul><h2 id="_3-过期策略" tabindex="-1"><a class="header-anchor" href="#_3-过期策略"><span>3.过期策略</span></a></h2><p>Redis提供了多种设置键过期时间的方法：</p><ul><li><code>EXPIRE key seconds</code>：设置键的过期时间。</li><li><code>EXPIREAT key timestamp</code>：设置键的过期时间为指定的时间戳。</li><li><code>TTL key</code>：查询键的剩余生存时间。</li><li><code>PERSIST key</code>：移除键的过期时间，使其永久存在。</li></ul><h2 id="python" tabindex="-1"><a class="header-anchor" href="#python"><span>Python</span></a></h2><h3 id="设置和获取缓存数据" tabindex="-1"><a class="header-anchor" href="#设置和获取缓存数据"><span>设置和获取缓存数据</span></a></h3><p>以下是使用Redis设置和获取缓存数据的示例代码（使用Python和Redis-py库）：</p><h3 id="安装redis和redis-py库" tabindex="-1"><a class="header-anchor" href="#安装redis和redis-py库"><span>安装Redis和Redis-py库</span></a></h3><p>首先，确保已经安装了Redis服务器，并在系统中安装了Redis-py库：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>pip install redis</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="设置缓存数据" tabindex="-1"><a class="header-anchor" href="#设置缓存数据"><span>设置缓存数据</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import redis</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 连接到Redis服务器</span></span>
<span class="line"><span>r = redis.StrictRedis(host=&#39;localhost&#39;, port=6379, db=0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置缓存数据，键为&quot;user:1001&quot;，值为用户信息（假设是JSON字符串）</span></span>
<span class="line"><span>user_data = &#39;{&quot;id&quot;: 1001, &quot;name&quot;: &quot;xing&quot;, &quot;email&quot;: &quot;xing@hopu.com&quot;}&#39;</span></span>
<span class="line"><span>r.set(&#39;user:1001&#39;, user_data)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置缓存数据时，可以指定过期时间（单位：秒）</span></span>
<span class="line"><span>r.setex(&#39;user:1001&#39;, 3600, user_data)  # 数据将在1小时后过期</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取缓存数据" tabindex="-1"><a class="header-anchor" href="#获取缓存数据"><span>获取缓存数据</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span># 获取缓存数据</span></span>
<span class="line"><span>cached_user_data = r.get(&#39;user:1001&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if cached_user_data:</span></span>
<span class="line"><span>    print(f&#39;Cache hit: {cached_user_data.decode(&quot;utf-8&quot;)}&#39;)</span></span>
<span class="line"><span>else:</span></span>
<span class="line"><span>    print(&#39;Cache miss&#39;)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="过期策略与缓存清理" tabindex="-1"><a class="header-anchor" href="#过期策略与缓存清理"><span>过期策略与缓存清理</span></a></h3><h4 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码"><span>示例代码</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span># 设置键的过期时间</span></span>
<span class="line"><span>r.expire(&#39;user:1001&#39;, 3600)  # 数据将在1小时后过期</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查询键的剩余生存时间</span></span>
<span class="line"><span>ttl = r.ttl(&#39;user:1001&#39;)</span></span>
<span class="line"><span>print(f&#39;TTL for user:1001 is {ttl} seconds&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 移除键的过期时间</span></span>
<span class="line"><span>r.persist(&#39;user:1001&#39;)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="缓存清理" tabindex="-1"><a class="header-anchor" href="#缓存清理"><span>缓存清理</span></a></h4><p>缓存清理可以通过以下方式进行：</p><ul><li><strong>手动清理</strong>：定期清理缓存中的过期数据。</li><li><strong>自动清理</strong>：利用Redis的LRU机制，当内存达到限制时，自动清理最久未使用的键。</li><li><strong>脚本清理</strong>：编写脚本定期检查和清理过期数据。</li></ul><h4 id="示例清理脚本" tabindex="-1"><a class="header-anchor" href="#示例清理脚本"><span>示例清理脚本</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span># 假设我们要清理特定前缀的过期缓存</span></span>
<span class="line"><span>for key in r.scan_iter(&#39;user:*&#39;):</span></span>
<span class="line"><span>    ttl = r.ttl(key)</span></span>
<span class="line"><span>    if ttl == -2:</span></span>
<span class="line"><span>        print(f&#39;Removing expired key: {key}&#39;)</span></span>
<span class="line"><span>        r.delete(key)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上述步骤，我们可以构建一个简单的缓存系统，利用Redis实现高效的数据缓存和管理。同时，通过合理的过期策略和缓存清理机制，确保缓存数据的有效性和内存使用的高效性。</p><h2 id="java版" tabindex="-1"><a class="header-anchor" href="#java版"><span>Java版</span></a></h2><p>使用Java和Redis实现简单缓存系统的示例，包括项目需求分析、缓存的设置和获取、过期策略与缓存清理。</p><h3 id="安装jedis" tabindex="-1"><a class="header-anchor" href="#安装jedis"><span>安装Jedis</span></a></h3><p>在<code>pom.xml</code>文件中添加Jedis依赖：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;redis.clients&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;jedis&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;4.0.1&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置缓存数据-1" tabindex="-1"><a class="header-anchor" href="#设置缓存数据-1"><span>设置缓存数据</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import redis.clients.jedis.Jedis;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class RedisCache {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        // 连接到Redis服务器</span></span>
<span class="line"><span>        Jedis jedis = new Jedis(&quot;localhost&quot;, 6379);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 设置缓存数据，键为&quot;user:1001&quot;，值为用户信息（假设是JSON字符串）</span></span>
<span class="line"><span>        String userData = &quot;{\\&quot;id\\&quot;: 1001, \\&quot;name\\&quot;: \\&quot;xing\\&quot;, \\&quot;email\\&quot;: \\&quot;xing@hopu.com\\&quot;}&quot;;</span></span>
<span class="line"><span>        jedis.set(&quot;user:1001&quot;, userData);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 设置缓存数据时，可以指定过期时间（单位：秒）</span></span>
<span class="line"><span>        jedis.setex(&quot;user:1001&quot;, 3600, userData);  // 数据将在1小时后过期</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        jedis.close();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取缓存数据-1" tabindex="-1"><a class="header-anchor" href="#获取缓存数据-1"><span>获取缓存数据</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import redis.clients.jedis.Jedis;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class RedisCache {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        // 连接到Redis服务器</span></span>
<span class="line"><span>        Jedis jedis = new Jedis(&quot;localhost&quot;, 6379);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 获取缓存数据</span></span>
<span class="line"><span>        String cachedUserData = jedis.get(&quot;user:1001&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (cachedUserData != null) {</span></span>
<span class="line"><span>            System.out.println(&quot;Cache hit: &quot; + cachedUserData);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            System.out.println(&quot;Cache miss&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        jedis.close();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="过期策略" tabindex="-1"><a class="header-anchor" href="#过期策略"><span>过期策略</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import redis.clients.jedis.Jedis;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class RedisCache {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        // 连接到Redis服务器</span></span>
<span class="line"><span>        Jedis jedis = new Jedis(&quot;localhost&quot;, 6379);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 设置键的过期时间</span></span>
<span class="line"><span>        jedis.expire(&quot;user:1001&quot;, 3600);  // 数据将在1小时后过期</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 查询键的剩余生存时间</span></span>
<span class="line"><span>        Long ttl = jedis.ttl(&quot;user:1001&quot;);</span></span>
<span class="line"><span>        System.out.println(&quot;TTL for user:1001 is &quot; + ttl + &quot; seconds&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 移除键的过期时间</span></span>
<span class="line"><span>        jedis.persist(&quot;user:1001&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        jedis.close();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="缓存清理-1" tabindex="-1"><a class="header-anchor" href="#缓存清理-1"><span>缓存清理</span></a></h3><p>可以通过编写脚本定期检查和清理过期数据。例如，假设我们要清理特定前缀的过期缓存：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import redis.clients.jedis.Jedis;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class RedisCache {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        // 连接到Redis服务器</span></span>
<span class="line"><span>        Jedis jedis = new Jedis(&quot;localhost&quot;, 6379);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 扫描并清理特定前缀的过期缓存</span></span>
<span class="line"><span>        jedis.keys(&quot;user:*&quot;).forEach(key -&gt; {</span></span>
<span class="line"><span>            Long ttl = jedis.ttl(key);</span></span>
<span class="line"><span>            if (ttl == -2) {  // -2表示键不存在或已过期</span></span>
<span class="line"><span>                System.out.println(&quot;Removing expired key: &quot; + key);</span></span>
<span class="line"><span>                jedis.del(key);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        jedis.close();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="c-版" tabindex="-1"><a class="header-anchor" href="#c-版"><span>C#版</span></a></h2><h3 id="安装stackexchange-redis" tabindex="-1"><a class="header-anchor" href="#安装stackexchange-redis"><span>安装StackExchange.Redis</span></a></h3><p>C#中使用StackExchange.Redis库来与Redis进行交互。</p><p>在NuGet包管理器中安装StackExchange.Redis：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>Install-Package StackExchange.Redis</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="设置缓存数据-2" tabindex="-1"><a class="header-anchor" href="#设置缓存数据-2"><span>设置缓存数据</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>using StackExchange.Redis;</span></span>
<span class="line"><span>using System;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Program</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    static void Main(string[] args)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        // 连接到Redis服务器</span></span>
<span class="line"><span>        ConnectionMultiplexer redis = ConnectionMultiplexer.Connect(&quot;localhost&quot;);</span></span>
<span class="line"><span>        IDatabase db = redis.GetDatabase();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 设置缓存数据，键为&quot;user:1001&quot;，值为用户信息（假设是JSON字符串）</span></span>
<span class="line"><span>        string userData = &quot;{\\&quot;id\\&quot;: 1001, \\&quot;name\\&quot;: \\&quot;xing\\&quot;, \\&quot;email\\&quot;: \\&quot;xing@hopu.com\\&quot;}&quot;;</span></span>
<span class="line"><span>        db.StringSet(&quot;user:1001&quot;, userData);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 设置缓存数据时，可以指定过期时间（单位：秒）</span></span>
<span class="line"><span>        db.StringSet(&quot;user:1001&quot;, userData, TimeSpan.FromHours(1));  // 数据将在1小时后过期</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        redis.Close();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="获取缓存数据-2" tabindex="-1"><a class="header-anchor" href="#获取缓存数据-2"><span>获取缓存数据</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>using StackExchange.Redis;</span></span>
<span class="line"><span>using System;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Program</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    static void Main(string[] args)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        // 连接到Redis服务器</span></span>
<span class="line"><span>        ConnectionMultiplexer redis = ConnectionMultiplexer.Connect(&quot;localhost&quot;);</span></span>
<span class="line"><span>        IDatabase db = redis.GetDatabase();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 获取缓存数据</span></span>
<span class="line"><span>        string cachedUserData = db.StringGet(&quot;user:1001&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (!string.IsNullOrEmpty(cachedUserData))</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            Console.WriteLine(&quot;Cache hit: &quot; + cachedUserData);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            Console.WriteLine(&quot;Cache miss&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        redis.Close();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="过期策略-1" tabindex="-1"><a class="header-anchor" href="#过期策略-1"><span>过期策略</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>using StackExchange.Redis;</span></span>
<span class="line"><span>using System;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Program</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    static void Main(string[] args)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        // 连接到Redis服务器</span></span>
<span class="line"><span>        ConnectionMultiplexer redis = ConnectionMultiplexer.Connect(&quot;localhost&quot;);</span></span>
<span class="line"><span>        IDatabase db = redis.GetDatabase();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 设置键的过期时间</span></span>
<span class="line"><span>        db.KeyExpire(&quot;user:1001&quot;, TimeSpan.FromHours(1));  // 数据将在1小时后过期</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 查询键的剩余生存时间</span></span>
<span class="line"><span>        TimeSpan? ttl = db.KeyTimeToLive(&quot;user:1001&quot;);</span></span>
<span class="line"><span>        Console.WriteLine(&quot;TTL for user:1001 is &quot; + ttl?.TotalSeconds + &quot; seconds&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 移除键的过期时间</span></span>
<span class="line"><span>        db.KeyPersist(&quot;user:1001&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        redis.Close();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="缓存清理-2" tabindex="-1"><a class="header-anchor" href="#缓存清理-2"><span>缓存清理</span></a></h4><p>可以通过编写脚本定期检查和清理过期数据。例如，假设我们要清理特定前缀的过期缓存：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>using StackExchange.Redis;</span></span>
<span class="line"><span>using System;</span></span>
<span class="line"><span>using System.Linq;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Program</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    static void Main(string[] args)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        // 连接到Redis服务器</span></span>
<span class="line"><span>        ConnectionMultiplexer redis = ConnectionMultiplexer.Connect(&quot;localhost&quot;);</span></span>
<span class="line"><span>        IDatabase db = redis.GetDatabase();</span></span>
<span class="line"><span>        IServer server = redis.GetServer(&quot;localhost&quot;, 6379);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 扫描并清理特定前缀的过期缓存</span></span>
<span class="line"><span>        foreach (var key in server.Keys(pattern: &quot;user:*&quot;))</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            TimeSpan? ttl = db.KeyTimeToLive(key);</span></span>
<span class="line"><span>            if (ttl == null)  // null表示键不存在或已过期</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                Console.WriteLine(&quot;Removing expired key: &quot; + key);</span></span>
<span class="line"><span>                db.KeyDelete(key);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        redis.Close();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,55)]))}const r=n(l,[["render",p]]),t=JSON.parse('{"path":"/article/jx0dvhf8/","title":"简单的缓存系统","lang":"zh-CN","frontmatter":{"title":"简单的缓存系统","createTime":"2025/08/15 14:06:38","permalink":"/article/jx0dvhf8/"},"readingTime":{"minutes":5.44,"words":1631},"git":{"createdTime":1754385901000,"updatedTime":1755240741000,"contributors":[{"name":"elvishehai521@163.com","username":"","email":"elvishehai521@163.com","commits":2,"avatar":"https://gravatar.com/avatar/6a640db68c5bf3768af7413cb28623721edb88b0f88957ed42c162769c5f659c?d=retro"}]},"filePathRelative":"notes/docker/简单的缓存系统.md","headers":[],"categoryList":[{"id":"4358b5","sort":10000,"name":"notes"},{"id":"154f33","sort":10001,"name":"docker"}]}');export{r as comp,t as data};
