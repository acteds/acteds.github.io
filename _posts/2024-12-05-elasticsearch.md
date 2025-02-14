---
layout: post
title: Elasticsearch
categories: [Java,elasticsearch]
description: Java笔记
keywords: Java,elasticsearch
---

# 引言

elasticsearch的操作方法。

# Elasticsearch

##  简介

Elasticsearch（简称 ES）是一个开源的分布式搜索引擎，基于 Apache Lucene 构建，能够存储、搜索、分析大量数据。它广泛应用于日志分析、全文搜索、实时数据分析等场景。和 MongoDB 类似，Elasticsearch 也是一个 NoSQL 数据库，但它主要用于高效的搜索和分析。

Elasticsearch 中的核心概念包括：

- **Index（索引）**：类似于关系数据库中的数据库。它是 Elasticsearch 中的数据存储单位。
- **Document（文档）**：类似于关系数据库中的一行数据。一个文档包含一个或多个字段，每个字段有不同的数据类型。
- **Field（字段）**：类似于关系数据库中的列。字段包含实际的数据，支持不同的数据类型，如文本、数字、日期等。
- **Shard（分片）**：Elasticsearch 将索引数据分成多个分片，以便分布式存储。
- **Cluster（集群）**：由多个节点组成，Elasticsearch 集群可以横向扩展以处理大规模的数据。



与 MongoDB 对比

- **数据模型**：
  - **MongoDB**：文档存储，灵活的 JSON 格式数据，适用于多变的数据结构。
  - **Elasticsearch**：也使用 JSON 格式，但主要用于高效的文本搜索和分析，支持全文索引、倒排索引等。
  
- **查询**：
  - **MongoDB**：通过 MongoDB 的查询语言进行数据查询，支持多种条件和聚合操作。
  - **Elasticsearch**：通过 Elasticsearch 的查询 DSL（查询语言）进行复杂的全文搜索、聚合分析和过滤操作，尤其擅长高效的文本搜索。

- **性能**：
  - **MongoDB**：适用于大规模的数据存储和处理，支持高并发读写操作。
  - **Elasticsearch**：专注于高效的搜索和分析，可以快速处理大量的文本数据并提供实时搜索功能。

Elasticsearch 非常适合需要高效搜索和分析的场景，通常与 MongoDB 配合使用，MongoDB 用于存储结构化数据，Elasticsearch 用于处理和分析日志、文本等非结构化数据。

------

在 Elasticsearch（ES）、MongoDB 和 MySQL 之间，有一些重要的类比关系，它们都属于数据存储系统，但它们的结构和功能有所不同。以下是它们的主要组件和概念的对比：

**Elasticsearch 与 MongoDB/MySQL 对比**

| **Elasticsearch** | **MongoDB**          | **MySQL**            |
| ----------------- | -------------------- | -------------------- |
| **Index**         | **Collection**       | **Table**            |
| **Document**      | **Document**         | **Row**              |
| **Field**         | **Field**            | **Column**           |
| **Shard**         | No Direct Equivalent | No Direct Equivalent |
| **Cluster**       | No Direct Equivalent | No Direct Equivalent |

**索引（Index）**

- **Elasticsearch**: 
  - 一个 **索引（Index）** 是 Elasticsearch 用来存储和组织文档的单位。每个索引包含多个文档，类似于数据库的表。索引通常用于对数据进行分区和存储。
  - **作用**：类似于数据库中的“表”，它定义了存储数据的结构、映射规则（数据类型等）和分片等。
  
- **MongoDB**:
  - **集合（Collection）**：MongoDB 中的集合类似于 Elasticsearch 的索引。集合是 MongoDB 存储文档（数据）的容器。每个集合包含多个文档，文档类似于一行数据。
  
- **MySQL**:
  - **表（Table）**：在 MySQL 中，表是数据的存储单位。每个表由多行数据组成，每一行包含多个列。表中的每一行是一个记录。

**文档（Document）**

- **Elasticsearch**: 
  - **文档（Document）** 是 Elasticsearch 存储的基本数据单位，类似于 MongoDB 中的文档或者 MySQL 中的行。每个文档都是一个 JSON 对象，表示一个完整的记录。一个文档包含多个字段（类似于列）。
  
- **MongoDB**:
  - **文档（Document）**：MongoDB 中的文档是基本的数据单元，它们是以 BSON 格式（类似于 JSON）存储的。每个文档可以包含多个字段（类似于表的列），而且字段类型是动态的，可以根据需要存储不同的结构。
  
- **MySQL**:
  - **行（Row）**：MySQL 中的每一行代表一个记录。行中的每一列对应表的字段。与 Elasticsearch 的文档类似，MySQL 的一行代表了一个完整的数据记录。

**字段（Field）**

- **Elasticsearch**:
  - **字段（Field）** 是文档中的一部分，存储特定的值或属性。每个字段都有一个数据类型（如字符串、整数、日期等），并且支持不同的搜索、排序和聚合操作。
  
- **MongoDB**:
  - **字段（Field）**：每个 MongoDB 文档由多个字段组成，字段是数据的基本单元。字段可以是简单的数值或复杂的嵌套结构。字段类似于数据库表中的列。
  
- **MySQL**:
  - **列（Column）**：MySQL 中的列表示表的字段。每个列有固定的数据类型和约束（如 NOT NULL、UNIQUE 等）。

**分片（Shard）**

- **Elasticsearch**:
  - **分片（Shard）** 是 Elasticsearch 中用于分布式存储和处理的单位。每个索引可以分为多个分片，分片可以存储在集群中的不同节点上，从而提高可扩展性和并发处理能力。
  
- **MongoDB & MySQL**:
  - MongoDB 和 MySQL 都没有直接类似于分片的概念（尽管 MongoDB 支持分片）。但是，MongoDB 的集合和 MySQL 的表也可以在多个节点上分布和存储数据，尤其是在需要水平扩展的场景中。

**集群（Cluster）**

- **Elasticsearch**:
  - **集群（Cluster）** 是 Elasticsearch 中由多个节点组成的一个集合。集群中的节点共享数据，并共同完成数据的分片和复制任务，确保系统的高可用性和扩展性。
  
- **MongoDB & MySQL**:
  - MongoDB 和 MySQL 都有支持分布式架构的功能，MongoDB 使用 **副本集（Replica Set）** 和 **分片（Sharding）** 机制来实现数据的高可用性和横向扩展。而 MySQL 可以通过 **主从复制（Master-Slave Replication）** 或 **分区表（Partitioning）** 来实现类似的功能。

**总结**

- Elasticsearch 更侧重于**全文搜索**和**大数据分析**，并且使用 **索引（Index）** 来管理文档（Document），它非常适合用于快速查询和分析大量的非结构化数据（如日志、文本等）。  
- MongoDB 和 MySQL 则是传统的数据库，MongoDB 是一个文档型数据库，MySQL 是一个关系型数据库。MongoDB 使用**集合（Collection）**存储文档数据，MySQL 使用**表（Table）**存储数据。  

举个例子：

假设你有一个用户信息的表，存储在 MySQL 中，结构如下：
- **表**：`users`
  - **字段**：`user_id`（主键），`name`，`email`，`created_at`
  

在 Elasticsearch 中，你可以使用 **索引（Index）** 来存储类似的文档数据，结构如下：
- **索引**：`users`
  - **文档**：每个文档代表一个用户，包含类似字段：`user_id`，`name`，`email`，`created_at`。

对于 MongoDB，你的 **集合（Collection）** 也可以存储这些数据，每个 **文档（Document）** 也包含这些字段。

## 准备工作

引入依赖：

```xml
<dependency>
  <groupId>co.elastic.clients</groupId>
  <artifactId>elasticsearch-java</artifactId>
  <version>8.10.4</version>
</dependency>
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.12.3</version>
</dependency>
```

配置ES属性：

```yaml
custom:
  elasticsearch:
    # ES 服务端的用户名，默认值是 "elastic"。这是连接到 Elasticsearch 的认证凭证。
    UserName: ${ES_USERNAME:elastic}

    # ES 服务端的密码，默认值是 "*"。这是连接到 Elasticsearch 的认证凭证。
    Password: ${ES_PASSWORD:*}

    # Elasticsearch 服务端地址，默认值是 "*:9200"。可以指定多个地址，以逗号分隔，如果是集群模式，配置多个节点地址以保证高可用。
    address: ${ES_ADDR:*:9200}

    # 网络链接协议，默认为 "http"。可以选择 "http" 或 "https"。
    schema: ${ES_SCHEMA:http}

    # 连接超时时间，单位是毫秒。此配置决定了客户端连接到 Elasticsearch 服务器时的最大等待时间。默认 6000 毫秒，即 6 秒。
    connectTimeout: 6000

    # Socket 连接超时时间，单位是毫秒。这个配置用于规定连接建立后，接收数据时的超时限制，默认 6000 毫秒。
    socketTimeout: 6000

    # 最大连接数，默认 100。设置连接池中所有连接的最大数量。如果连接数达到最大值，其他请求会等待，直到有连接可用。
    maxConnectNum: 100

    # 每个路由（每个 Elasticsearch 集群节点）允许的最大连接数，默认 100。这个配置用于控制与集群内单个节点的连接数。
    maxConnectPerRoute: 100
```

配置连接时效：

```java
import org.apache.http.HttpResponse;
import org.apache.http.impl.client.DefaultConnectionKeepAliveStrategy;
import org.apache.http.protocol.HttpContext;

import java.util.concurrent.TimeUnit;

// 自定义 KeepAlive 时限策略
public class CustomConnectionKeepAliveStrategy extends DefaultConnectionKeepAliveStrategy {

    // 创建一个实例，确保整个应用中只有一个实例
    public static final CustomConnectionKeepAliveStrategy INSTANCE = new CustomConnectionKeepAliveStrategy();

    // 私有构造方法，确保类的实例只通过上述静态成员访问
    private CustomConnectionKeepAliveStrategy() {
        super();
    }

    /**
     * 最大 KeepAlive 的时间（分钟）
     * <p>
     * 这里默认为 10 分钟，可以根据实际情况设置。该值用于控制 HTTP 连接保持的最长时间。
     * 如果客户端机器的 TCP 连接数处于 TIME_WAIT 状态过多，适当增加此值可以避免频繁关闭连接。
     * </p>
     */
    private final long MAX_KEEP_ALIVE_MINUTES = 10;

    /**
     * 重写父类的 `getKeepAliveDuration` 方法
     * <p>
     * 该方法决定了 HTTP 连接保持的时长（毫秒）。如果父类返回负值（表示无限期保持连接），
     * 将其替换为自定义的最大保持时长（10 分钟）。
     * </p>
     *
     * @param response HTTP 响应对象
     * @param context HTTP 上下文
     * @return 连接保持的时长（毫秒）
     */
    @Override
    public long getKeepAliveDuration(HttpResponse response, HttpContext context) {
        // 调用父类的实现，获取默认的 Keep-Alive 时长
        long keepAliveDuration = super.getKeepAliveDuration(response, context);

        // 如果父类返回的是负值（表示连接应该无限期保持）
        // 则将其替换为我们自定义的最大保持时长（10 分钟）
        if (keepAliveDuration < 0) {
            return TimeUnit.MINUTES.toMillis(MAX_KEEP_ALIVE_MINUTES);
        }

        // 返回父类获取的时长
        return keepAliveDuration;
    }
}
```

创建ES连接：

```java
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

/**
 * 配置类，用于初始化与 Elasticsearch 集群的连接配置。
 * <p>
 * 该类通过 Spring 配置机制，读取外部配置文件中的相关设置，创建并配置一个 {@link ElasticsearchClient} 实例。
 * 它自定义了连接超时、认证信息、最大连接数等，并配置了连接池管理与连接保活策略。
 * </p>
 */
@Configuration
public class ElasticSearchConfig {

    /** 协议，例如 "http" 或 "https" */
    @Value("${custom.elasticsearch.schema:http}")
    private String schema;

    /** Elasticsearch 集群地址，多个地址用逗号分隔 */
    @Value("${custom.elasticsearch.address}")
    private String address;

    /** 连接超时时间，单位为毫秒 */
    @Value("${custom.elasticsearch.connectTimeout}")
    private int connectTimeout;

    /** Socket 连接超时时间，单位为毫秒 */
    @Value("${custom.elasticsearch.socketTimeout}")
    private int socketTimeout;

    /** 最大连接数 */
    @Value("${custom.elasticsearch.maxConnectNum}")
    private int maxConnectNum;

    /** 最大路由连接数，每个路由的最大连接数 */
    @Value("${custom.elasticsearch.maxConnectPerRoute}")
    private int maxConnectPerRoute;

    /** Elasticsearch 用户名，用于 Basic Authentication */
    @Value("${custom.elasticsearch.UserName}")
    private String userName;

    /** Elasticsearch 密码，用于 Basic Authentication */
    @Value("${custom.elasticsearch.Password}")
    private String password;

    /**
     * 创建并配置一个 {@link ElasticsearchTransport} 实例。
     * <p>
     * 本方法通过 Spring 注解 {@link Bean} 来定义一个 Bean，供 Spring 管理。
     * 它配置了 Elasticsearch 集群的连接信息，包括协议、地址、认证信息、连接池和超时设置。
     * </p>
     *
     * @return 配置好的 {@link ElasticsearchTransport} 实例
     */
    @Bean
    public ElasticsearchTransport getElasticsearchTransport() {
        // 将多个 Elasticsearch 集群地址拆分为 HttpHost 数组
        String[] hostList = address.split(",");
        HttpHost[] httpHost = Arrays.stream(hostList).map(addr -> {
            String host = addr.split(":")[0];  // 提取主机部分
            String port = addr.split(":")[1];  // 提取端口部分
            return new HttpHost(host, Integer.parseInt(port), schema); // 构建 HttpHost 对象
        }).toArray(HttpHost[]::new);

        // 设置 Basic Authentication 认证
        final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(userName, password));

        // 创建 RestClient 构建器，配置连接超时和 Socket 超时
        RestClientBuilder builder = RestClient.builder(httpHost).setRequestConfigCallback(requestConfigBuilder -> {
            // 配置连接和 Socket 超时
            requestConfigBuilder.setConnectTimeout(connectTimeout);
            requestConfigBuilder.setSocketTimeout(socketTimeout);
            requestConfigBuilder.setConnectionRequestTimeout(socketTimeout);
            return requestConfigBuilder;
        }).setHttpClientConfigCallback(httpClientBuilder -> {
            // 禁用认证缓存，设置最大连接数和连接保活策略
            httpClientBuilder.disableAuthCaching();  // 禁用认证缓存
            httpClientBuilder.setKeepAliveStrategy(CustomConnectionKeepAliveStrategy.INSTANCE);  // 设置保活策略
            httpClientBuilder.setMaxConnTotal(maxConnectNum);  // 设置最大连接数
            httpClientBuilder.setMaxConnPerRoute(maxConnectPerRoute);  // 设置每个路由的最大连接数
            // 显式调用方法来添加拦截器
            httpClientBuilder.addInterceptorFirst((HttpRequestInterceptor) new RequestLogger());  // 添加请求拦截器
            httpClientBuilder.addInterceptorLast((HttpResponseInterceptor) new RequestLogger()); // 添加响应拦截器
            // 设置认证信息
            return httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider);
        });

        // 构建 RestClient 实例
        RestClient restClient = builder.build();

        // 创建 ElasticsearchTransport
        return new RestClientTransport(restClient, new JacksonJsonpMapper());
    }
    /**
     * 创建一个 {@link ElasticsearchClient} 实例。
     * @param transport 实现 Elasticsearch 特性的传输层
     * @return
     */
    @Bean
    public ElasticsearchClient docqaElasticsearchClient(ElasticsearchTransport transport) {
        return new ElasticsearchClient(transport);  // 返回配置好的 ElasticsearchClient 实例
    }
    /**
     * 创建一个 {@link ElasticsearchAsyncClient} 实例。
     * @param transport 实现 Elasticsearch 特性的传输层
     * @return
     */
    @Bean
    public ElasticsearchAsyncClient docqaElasticsearchAsyncClient(ElasticsearchTransport transport) {
        return new ElasticsearchAsyncClient(transport);  // 返回配置好的 ElasticsearchClient 实例
    }
}
```

- `RestClient`这个类主要是用作于与服务端IP以及端口的配置，在其的`builder()`方法可以设置登陆权限的账号密码、连接时长等等。
- **`RestClientTransport`** 是`Jackson`映射器创建传输。建立客户端与服务端之间的连接传输数据。这是在创建`ElasticsearchClient`需要的参数，而创建`RestClientTransport`就需要上面创建的`RestClient`。
- **`ElasticsearchClient`** 是 Elasticsearch 高级客户端，基于 `RestClientTransport` 构建，它提供了更为便捷的 API，帮助开发者通过 Java 代码与 Elasticsearch 进行交互。提供更加抽象和封装的接口，允许执行各种 Elasticsearch 操作（如索引、搜索、删除等）。基于 `RestClientTransport`，它将底层的 HTTP 请求转换为更高层的 Elasticsearch 操作。支持同步和异步操作。
- **`ElasticsearchAsyncClient`** 是 `ElasticsearchClient` 的异步版本，它用于执行异步的 Elasticsearch 操作，支持非阻塞 I/O 操作。
- 提供与 `ElasticsearchClient` 类似的功能，但所有请求和响应操作都不阻塞线程。适用于需要高吞吐量或并发请求的场景，避免了线程的阻塞。异步操作通常会返回一个 `CompletableFuture` 对象，允许调用者在操作完成时获取结果。

## 打开日志

新建一个日志打印类：

```java
@Slf4j
class RequestLogger implements HttpRequestInterceptor, HttpResponseInterceptor {

    @Override
    public void process(HttpRequest request, HttpContext context) {
        // Log request details
        log.debug("请求 URI: " + request.getRequestLine().getUri());
        log.debug("请求方法： " + request.getRequestLine().getMethod());
        log.debug("请求标头：" + Arrays.toString(request.getAllHeaders()));

        // 获取请求体内容
        if (request instanceof HttpEntityEnclosingRequest) {
            HttpEntity entity = ((HttpEntityEnclosingRequest) request).getEntity();
            if (entity != null) {
                // 缓存请求体内容
                byte[] entityContent = entityToBytes(entity);
                if (entityContent!=null) {
                    String body = new String(entityContent);
                    log.debug("请求体：" + body);
                }
            }
        }
    }

    @Override
    public void process(HttpResponse response, HttpContext context) throws IOException {
        // Log response details
        log.debug("响应状态： " + response.getStatusLine());
        log.debug("响应标头： " + Arrays.toString(response.getAllHeaders()));
        // 获取响应体内容
        HttpEntity entity = response.getEntity();
        if (entity != null) {
            // 缓存响应体内容
            byte[] entityContent = entityToBytes(entity);
            if (entityContent != null) {
                String body = new String(entityContent);
                log.info("响应体：" + body);
            }
        }
    }
    /**
     * 将 HttpEntity 内容转换为字节数组
     * @param entity HttpEntity
     * @return 字节数组
     */
    public byte[] entityToBytes(HttpEntity entity) {
        if (entity == null) {
            return null;
        }
        try (InputStream content = entity.getContent();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = content.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
            return out.toByteArray();
        } catch (Exception e) {
            // 处理异常，返回null或者其他默认值
            return null;
        }
    }
}
```

添加到`RestClientBuilder`：

```java
// 显式调用方法来添加拦截器
httpClientBuilder.addInterceptorFirst((HttpRequestInterceptor) new RequestLogger());  // 添加请求拦截器
httpClientBuilder.addInterceptorLast((HttpResponseInterceptor) new RequestLogger()); // 添加响应拦截器
```

打开调试日志：

```yaml
logging:
  level:
    org.elasticsearch.client: DEBUG
    com.*.config.RequestLogger: DEBUG
```

其中 `com.*.config.RequestLogger`是日志打印类的类名。

## 使用

### 插入

通过 HTTP 请求插入数据：

要通过 HTTP 向 Elasticsearch 插入数据，通常使用 `PUT` 或 `POST` 请求。以下是通过 HTTP 请求插入数据的步骤和示例。

**插入数据的 HTTP 请求方式**

- **使用 `POST` 请求**：如果不指定文档 ID，Elasticsearch 会自动生成一个 ID。
- **使用 `PUT` 请求**：如果指定文档 ID，Elasticsearch 会使用该 ID 插入数据。如果文档已存在，则会更新该文档。

**HTTP 请求的基本格式**

- **请求 URL**：
  - 格式：`http://<hostname>:<port>/<index>/_doc/<document_id>`
  - 示例：`http://localhost:9200/products/_doc/1`

- **请求头**：`Content-Type: application/json`：指定请求体的格式为 JSON。
  
- **请求体**：以 JSON 格式提供文档的内容。

**示例：通过 HTTP 插入数据**

假设你要向 `products` 索引插入一个文档，文档的内容包括 SKU、产品名称和价格。

**使用 `POST` 插入数据（自动生成 ID）**
```http
POST http://localhost:9200/products/_doc
Content-Type: application/json

{
  "sku": "bk-1",
  "name": "City bike",
  "price": 123.0
}
```

**使用 `PUT` 插入数据（指定 ID）**
```http
PUT http://localhost:9200/products/_doc/bk-1
Content-Type: application/json

{
  "sku": "bk-1",
  "name": "City bike",
  "price": 123.0
}
```

在这两个示例中，`products` 是目标索引，`_doc` 是文档类型，`bk-1` 是文档的 ID（在第二个示例中指定），文档的内容是 JSON 格式。

------

通过Java插入数据：

构建请求最直接的方法是使用 Fluent DSL：

```java
record Product(String sku, String cityBike, double v) {}
Product product = new Product("bk-1", "City bike", 123.0);

IndexResponse response = esClient.index(i -> i
        .index("products")           // 设置索引名为 "products"
        .id(product.sku())           // 设置文档的 ID 为 `product.sku()`（即 "bk-1"），可选
        .document(product)           // 设置文档内容为 `product` 对象
);
log.info("Indexed with version " + response.version());
```

还可以将使用 DSL 创建的对象分配给变量。Java API Client 类有一个静态方法，该方法使用 DSL 语法创建一个对象。`of()`：

```java
IndexRequest<Product> request = IndexRequest.of(i -> i
        .index("products")
        .id(product.sku())
        .document(product)
);
response = esClient.index(request);
```

使用经典构建器：

```java
IndexRequest<Object> build = new IndexRequest.Builder<>()
        .index("product")
        .id(product.sku())
        .document(product)
        .build();
response = esClient.index(build);
```

`esClient.index(...)` 是用来执行文档索引操作的代码。

`.index("products")`：指定将数据索引到名为 `"products"` 的索引中。索引是 Elasticsearch 中数据的存储单元，相当于数据库中的表。

`.id(product.sku())`：指定该文档的 ID，通常用于唯一标识每个文档。这里使用 `product.sku()` 来设置 ID，这意味着文档的 ID 是商品的 SKU（如 `"bk-1"`）。

`.document(product)`：指定将要存储的文档内容。`product` 对象被直接传递给 `document()` 方法，Elasticsearch 会自动将其转化为适当的 JSON 格式存储。

`IndexResponse` 是 Elasticsearch 返回的响应对象，包含有关文档索引操作的详细信息。

`response.version()`：获取索引操作的版本号。每当文档被创建或更新时，Elasticsearch 会为该文档分配一个版本号，用于追踪文档的变更。这里的 `version` 是索引的版本号，可以用于控制并发和版本管理。

使用异步客户端：

```java
CompletableFuture<IndexResponse> future = esAsyncClient.index(i -> i
        .index("products")
        .id(finalProduct2.sku())
        .document(finalProduct2)
);
future.whenComplete((response1, exception) -> {
    if (exception != null) {
        log.error("索引失败", exception);
    } else {
        log.info("使用 version 编制索引 " + response1.version());
    }
});
```

完整代码：

```java

import co.elastic.clients.elasticsearch.ElasticsearchAsyncClient;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.IndexRequest;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;

@SpringBootTest(classes = *Application.class)
@RunWith(SpringRunner.class)
@Slf4j
class *ApplicationTests {
    @Resource
    private ElasticsearchClient esClient;

    @Resource
    private ElasticsearchAsyncClient esAsyncClient;

    @Test
    void contextLoads() throws IOException {
        record Product(String sku, String cityBike, double v) {}
        Product product = new Product("bk-1", "City bike", 123.0);
        // * 使用 Fluent DSL
        Product finalProduct1 = product;
        IndexResponse response = esClient.index(i -> i
                .index("products")           // 设置索引名为 "products"
                .id(finalProduct1.sku())           // 设置文档的 ID 为 `product.sku()`（即 "bk-1"）
                .document(finalProduct1)           // 设置文档内容为 `product` 对象
        );
        log.info("使用 version 编制索引 " + response.version());

        // * 使用 DSL 创建的对象分配给变量
        product = new Product("bk-2", "City bike", 124.0);
        Product finalProduct = product;
        IndexRequest<Product> request = IndexRequest.of(i -> i
                .index("products")
                .id(finalProduct.sku())
                .document(finalProduct)
        );
        response = esClient.index(request);
        log.info("使用 version 编制索引 " + response.version());

        // * 使用经典构建器
        product = new Product("bk-3", "City bike", 125.0);
        IndexRequest<Object> build = new IndexRequest.Builder<>()
                .index("products")
                .id(product.sku())
                .document(product)
                .build();

        response = esClient.index(build);
        log.info("使用 version 编制索引 " + response.version());

        // * 使用异步客户端
        product = new Product("bk-4", "City bike", 126.0);
        Product finalProduct2 = product;
        CompletableFuture<IndexResponse> future = esAsyncClient.index(i -> i
                .index("products")
                .id(finalProduct2.sku())
                .document(finalProduct2)
        );
        future.whenComplete((response1, exception) -> {
            if (exception != null) {
                log.error("索引失败", exception);
            } else {
                log.info("使用 version 编制索引 " + response1.version());
            }
        });
    }
}
```

------

**`withJson`**

在使用 Elasticsearch 进行应用程序开发过程中，一个常见的工作流程是使用 Kibana 开发人员控制台以交互方式准备和测试查询、聚合、索引映射和其他复杂的 API 调用。这将生成您可能希望在应用程序中使用的有效 JSON 代码段。

由于将这些 JSON 代码片段转换为 Java 代码可能非常耗时且容易出错，因此 Java API 客户端中的大多数数据类都可以从 JSON 文本加载：对象生成器具有从原始 JSON 填充生成器的方法。这还允许您将动态加载的 JSON 与对象的编程构造相结合。``

在后台，这些方法调用对象的反序列化器。因此，JSON 文本的结构和值类型必须正确适用于目标数据结构。使用可保持 Java API Client 的强类型保证。

**从资源文件加载索引定义**

考虑一个包含索引定义的资源文件：`some-index.json`

```json
{
  "mappings": {
    "properties": {
      "field1": { "type": "text" }
    }
  }
}
```

可以根据该定义创建索引，如下所示：

```java
InputStream input = this.getClass()
    .getResourceAsStream("some-index.json"); 

CreateIndexRequest req = CreateIndexRequest.of(b -> b
    .index("some-index")
    .withJson(input) 
);

boolean created = client.indices().create(req).acknowledged();
```

打开 JSON 资源文件的输入流。使用资源文件内容填充索引创建请求。

**从 JSON 文件摄取文档**

同样，可以从数据文件中读取要存储在 Elasticsearch 中的文档：

```java
FileReader file = new FileReader(new File(dataDir, "document-1.json"));

IndexRequest<JsonData> req; 

req = IndexRequest.of(b -> b
    .index("some-index")
    .withJson(file)
);

client.index(req);
```

当你在 `IndexRequest` 中使用泛型（比如 `JsonData`），`withJson()` 方法会使用这个类型来处理数据，确保文件内容符合这个数据类型的格式，并最终被索引到 Elasticsearch 中。

------

**`withPipeline`**

`withPipeline(String pipeline)` 是 `IndexRequest` 类中的一个方法，它用于指定在将文档索引到 Elasticsearch 之前应用的 **管道（Pipeline）**。

Elasticsearch 的 **管道** 是一个处理数据的功能，它可以在数据被索引前对文档进行转换、处理或者清洗等操作。通过管道，用户可以对文档进行更复杂的操作，例如：

- **数据格式转换**：对文档的字段进行重命名或改变格式。
- **数据增强**：根据外部数据来源来修改文档内容。
- **验证和清洗**：确保文档数据符合某些标准或者格式。

**`withPipeline` 方法的作用**

该方法将指定的管道名称（管道ID）**与当前的索引请求关联**。这个管道将在文档被索引之前被调用，对文档进行处理。

**使用示例**

```java
IndexRequest<Product> request = new IndexRequest<>();
request.index("products")  // 设置索引
       .id("product-123")    // 设置文档 ID
       .document(new Product("bk-1", "City Bike", 123.0))  // 设置文档内容
       .withPipeline("my-pipeline");  // 设置管道，使用 "my-pipeline"
```

在Elasticsearch 8.x 版本中，`withPipeline` 改为了 `pipeline` 方法。

------

**插入详解**

操作：

```java
IndexResponse response = esClient.index(i -> i
        .index("products")           // 设置索引名为 "products"
        .id(finalProduct1.sku())           // 设置文档的 ID 为 product.sku()（即 "bk-1"）
        .document(finalProduct1)           // 设置文档内容为 product 对象
);
```

涉及到以下类：

**IndexRequest**（`i -> i.index(...)`）

`IndexRequest`是一个封装 Elasticsearch 索引请求的类，包含了目标索引名、文档 ID 和文档内容等信息。它是 `index()` 方法的参数。

**IndexResponse**（`response`）

 `IndexResponse` 是 Elasticsearch 索引操作的响应类。它包含有关索引操作的信息，例如文档的版本号、成功与否、是否进行了刷新等。

#### `IndexRequest`

`IndexRequest<TDocument>` 是 Elasticsearch 客户端库中的一个类，它用于向指定的 Elasticsearch 索引中 **创建** 或 **更新** 文档。这个类是 Elasticsearch 中的索引操作请求（`index` API）的核心部分，用于表示向 Elasticsearch 索引中插入或更新文档的请求。

**主要功能**

- **创建文档**：如果指定的文档 ID 在索引中不存在，Elasticsearch 会创建一个新的文档。
- **更新文档**：如果指定的文档 ID 已经存在，Elasticsearch 会更新该文档的数据。默认情况下，如果文档已经存在，`index` 请求会覆盖原有文档，但你也可以使用一些选项来控制更新方式。
- **选择索引**：可以选择目标索引（`index`），指定文档的 ID（`id`），以及文档的内容（`document`）。
- **支持 JSON 序列化和反序列化**：文档的内容通常是一个 POJO 对象，Elasticsearch 会自动将 POJO 对象序列化为 JSON 格式，并发送到服务器端。




以下是 `IndexRequest<TDocument>` 类的常用方法：

**`index(String index)`**: 设置文档的目标索引（指定文档存储的索引名）。

```java
IndexRequest<Product> request = new IndexRequest<>();
request.index("products");  // 将文档插入到 "products" 索引中
```



**`id(String id)`**: 设置文档的 ID。Elasticsearch 使用文档的 ID 来唯一标识文档。

```java
request.id("product-1");  // 设置文档 ID 为 "product-1"
```



**`document(TDocument document)`**: 设置文档的内容。这个内容通常是一个 POJO 对象（比如 `Product`），该对象将被自动转换为 JSON 格式。

```java
Product product = new Product("bk-1", "City bike", 123.0);
request.document(product);  // 将 Product 对象作为文档内容
```

**参数**: `TDocument document` — 文档内容，可以是任何 POJO 类型或 JSON 数据（需要通过 `JsonpSerializable` 序列化）。



**`opType(IndexRequest.OpType opType)`**: 设置操作类型。操作类型决定了文档插入的方式：

`OpType.CREATE`: 如果文档已存在，则会抛出异常。

`OpType.INDEX`: 默认值，文档存在时会被覆盖。

```java
request.opType(OpType.CREATE);  // 如果文档存在，会抛出异常
```



 **`routing(String routing)`**

为文档指定一个路由值。路由用于优化文档在 Elasticsearch 集群中的分布。

```java
request.routing("user-123");  // 为文档指定一个路由值 "user-123"
```



**`version(Long version)`**: 设置文档的版本号。版本控制用于乐观并发控制，可以确保文档不会在其他进程更新时发生冲突。

```java
request.version(1L);  // 设置版本号为 1
```



**`versionType(String versionType)`**：设置版本类型。常见的版本类型包括 `internal` 和 `external`。

```java
request.versionType("external");  // 设置版本类型为 "external"
```

- `VersionType.Internal`（默认）: Elasticsearch 内部的版本控制,文档的版本号由 Elasticsearch 自动生成。
- `VersionType.External `: 使用外部版本控制系统。在索引文档时，文档的版本由用户提供，而不是由 Elasticsearch 自动管理。
- `VersionType.ExternalGte`: 该版本类型表示仅在外部版本号大于或等于当前文档的版本时，才允许执行更新操作。它允许更新操作在确保不会覆盖更高版本的数据的情况下执行。
- `VersionType.Force`：该类型会强制执行操作，忽略版本控制。即使文档版本不匹配，它也会执行索引或更新操作。



**`refresh(Refresh refresh)`**: 设置是否刷新索引，以便可以立即搜索该文档。常用的选项有 `Refresh.TRUE`, `Refresh.FALSE`, `Refresh.WaitFor`。

`Refresh.True` :在执行完写操作后立即刷新索引，使得文档立即可用于搜索。

`Refresh.False`(默认值):不进行刷新，文档不会立即对查询可见。索引将不会立即刷新，而是等待默认的刷新周期。

`Refresh.WaitFor`:执行写操作后，等待一定条件下的刷新，直到索引被刷新（通常是通过异步刷新机制）。这意味着请求将等待直到文档可搜索（但不会立即刷新）。

```java
request.refresh(Refresh.TRUE);  // 索引操作后立即刷新索引
```

Elasticsearch 默认每 1 秒自动刷新一次索引。当索引中的文档被写入后，这些文档会暂时保存在内存中，直到 Elasticsearch 自动刷新索引。这一默认行为有助于减少过度刷新导致的性能开销。



**`withJson(JsonData json)`**：通过 JSON 数据将文档内容传递给索引请求。适用于不使用 POJO 类型的情况。

```java
JsonData jsonData = JsonData.of("{\"sku\": \"bk-1\", \"cityBike\": \"City bike\", \"v\": 123.0}");
request.withJson(jsonData);  // 将 JSON 数据作为文档传递
```



**`withPipeline(String pipeline)`**: 设置一个管道，管道用于在文档被索引之前对文档进行处理（例如对数据进行转换）。

```java
request.withPipeline("my-pipeline");  // 使用管道 "my-pipeline"
```



`IndexRequest<TDocument>` 是用于向 Elasticsearch 索引中创建或更新文档的核心请求类。它包含了文档的目标索引、文档 ID、文档内容以及其他索引请求的相关参数。常用方法包括设置索引名、文档 ID、文档内容、操作类型（创建或更新）等。

#### `IndexResponse`

在 Elasticsearch Java 客户端中，`IndexResponse` 是用于表示文档索引操作响应的对象。它提供了许多方法和字段，用于获取关于索引操作的详细信息。以下是 `IndexResponse` 的常用方法和字段的详细说明：

**常用字段**

1. **`index`**：表示索引文档所在的索引名。示例值：`"products"`

2. **`id`**：表示文档的唯一标识符（ID）。示例值：`"bk-1"`

3. **`version`**：文档的版本号（一个递增值，表示文档的修改次数）。示例值：`1`

4. **`seqNo`**：表示文档的序列号，用于内部版本控制。示例值：`0`

5. **`primaryTerm`**：表示文档的主分片的主要版本号。示例值：`1`

6. **`result`**操作结果，表示文档的操作状态，常见的值包括：  
   - `"created"`: 文档被成功创建。
   - `"updated"`: 文档被成功更新。
   - `"deleted"`: 文档被成功删除
   - `"not_found"`: 在执行操作时，文档不存在。
   - `"noop"`: 没有操作（例如在某些条件下没有对文档进行更改）。

要获取这些值，可以通过同名方法获取。

------

#### `index()`

`esClient.index()` 方法是 Elasticsearch 客户端中用于执行文档索引操作的核心方法之一。它允许你将文档索引到指定的 Elasticsearch 索引中。

**基本的 `index()` 方法**

**参数：**
- **`IndexRequest indexRequest`**：包含索引操作所需的信息，例如索引名、文档 ID、文档数据等。
- **`RequestOptions`**：请求的选项，如超时、认证、头信息等（通常为 `RequestOptions.DEFAULT`）。

**返回：** **`IndexResponse`**：返回的响应对象，包含关于索引操作的状态信息，如文档 ID、版本号等。

**示例：**

```java
IndexRequest indexRequest = new IndexRequest("products")
    .id("bk-1")
    .source("sku", "bk-1", "name", "City bike", "price", 123.0);

IndexResponse response = esClient.index(indexRequest, RequestOptions.DEFAULT);
System.out.println("Document indexed with id: " + response.getId());
```

---

**异步 `index()` 方法（带 `ActionListener`）**

Elasticsearch 客户端也支持异步执行索引操作，使用 `ActionListener` 来处理异步响应。

**参数：**

- **`IndexRequest indexRequest`**：请求对象。
- **`RequestOptions`**：请求的配置选项（可选）。
- **`ActionListener<IndexResponse>`**：回调，用于处理异步响应。

**返回：** 异步操作，不直接返回 `IndexResponse`，而是通过回调进行通知。

**示例：**
```java
IndexRequest indexRequest = new IndexRequest("products")
    .id("bk-1")
    .source("sku", "bk-1", "name", "City bike", "price", 123.0);

esClient.index(indexRequest, RequestOptions.DEFAULT, new ActionListener<IndexResponse>() {
    @Override
    public void onResponse(IndexResponse response) {
        System.out.println("Document indexed with id: " + response.getId());
    }

    @Override
    public void onFailure(Exception e) {
        e.printStackTrace();
    }
});
```

---

**`index()` 方法（ElasticsearchClient 8.x）**

在 Elasticsearch 8.x 中，`index()` 方法的接口进行了优化，通常采用泛型和 `IndexRequest` 构建请求，并返回相应的响应类型。

**参数：**
- **`IndexRequest indexRequest`**：请求对象，包含索引名称、文档 ID 和文档内容。
- **`Class<T>`**：指定要索引的文档类型（通常是自定义的 Java 类）。

**返回：**
- **`IndexResponse`**：返回的响应对象，包含索引操作的结果。

**示例：**

```java
IndexRequest indexRequest = new IndexRequest("products")
    .id("bk-1")
    .source("sku", "bk-1", "name", "City bike", "price", 123.0);

IndexResponse response = esClient.index(indexRequest, Product.class);
System.out.println("Document indexed with id: " + response.getId());
```

---

**总结：**

`esClient.index()` 方法提供了多种使用方式，主要变体和常用参数如下：
- **同步 `index()` 方法**：通过 `IndexRequest` 提交索引请求，返回 `IndexResponse`。
- **异步 `index()` 方法**：通过 `ActionListener` 处理异步索引操作。



### 获取

通过 HTTP 请求执行 Elasticsearch 的 `GET` 操作，可以直接向 Elasticsearch 的 REST API 发起请求。

**HTTP GET 请求 URL：**
```
GET http://<Elasticsearch-host>:<port>/<index>/_doc/<id>
```

- `<Elasticsearch-host>`: Elasticsearch 的主机名或 IP 地址（例如 `localhost` 或 `10.80.21.121`）。
- `<port>`: Elasticsearch 的端口号，默认是 `9200`。
- `<index>`: 目标索引的名称。
- `<id>`: 文档的唯一标识符（ID）。

```http
GET http://localhost:9200/products/_doc/bk-1
```

**响应示例（JSON）：**
```json
{
  "_id": "bk-1",
  "_index": "products",
  "_primary_term": 1,
  "_seq_no": 0,
  "_source": {
    "cityBike": " City bike ",
    "sku": "bk-1",
    "v": 123
  },
  "_version": 1,
  "found": true
}
```

- **`found: true`** 表示找到了文档。
- **`_source`** 包含文档的实际数据。

如果指定的文档 ID 不存在，返回如下 JSON：
```json
{
  "_index": "products",
  "_type": "_doc",
  "_id": "bk-999",
  "found": false
}
```

------

使用Java代码：

```java
GetRequest getRequest = new GetRequest.Builder()
    .index("products") // 指定索引名称
    .id("bk-1")        // 指定文档 ID
    .build();

GetResponse<Product> getResponse = esClient.get(getRequest, Product.class);

if (getResponse.found()) {
    Product product = getResponse.source();
    System.out.println("Document found: " + product);
} else {
    System.out.println("Document not found.");
}
```

Elasticsearch 的 `get` 方法是用来**获取单条数据**的，并且需要指定 **索引** 和 **文档 ID**。

------

**获取详解**

在 Java 中，使用 Elasticsearch 获取单条数据（`get`）时，主要涉及：

`GetRequest` 是构建获取单条数据请求的类。它封装了获取文档所需的所有参数，如索引名称、文档 ID 以及可能的路由值。

`GetResponse` 是 Elasticsearch 响应类，包含了从 Elasticsearch 获取的单条文档的结果，包括文档的 `_source` 数据、索引名称、文档 ID 等。

#### `GetRequest`

`GetRequest` 是 Elasticsearch 客户端中用于获取单个文档的请求类。

**字段**

| 字段名称              | 类型           | 描述                                                        |
| --------------------- | -------------- | ----------------------------------------------------------- |
| `index`               | `String`       | 文档所属的索引名称，必须设置。                              |
| `id`                  | `String`       | 要检索的文档 ID，必须设置。                                 |
| `routing`             | `String`       | 路由值，用于指向特定分片（可选）。                          |
| `preference`          | `String`       | 检索首选项，用于控制节点间查询的路由逻辑（可选）。          |
| `realtime`            | `Boolean`      | 是否实时检索（默认为 `true`，非实时可能查询到旧版本文档）。 |
| `refresh`             | `Boolean`      | 在检索前是否强制刷新索引（默认为 `false`）。                |
| `storedFields`        | `List<String>` | 返回指定的存储字段，而不是返回整个文档（可选）。            |
| `fetchSource`         | `Boolean`      | 是否检索 `_source` 字段的数据（默认为 `true`）。            |
| `fetchSourceIncludes` | `List<String>` | 设置需要包含在 `_source` 中的字段（可选）。                 |
| `fetchSourceExcludes` | `List<String>` | 设置需要从 `_source` 中排除的字段（可选）。                 |

**方法**

**字段设置方法**

| 方法                                         | 描述                                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| `index(String index)`                        | 设置目标索引名称。                                           |
| `id(String id)`                              | 设置要检索的文档 ID。                                        |
| `routing(String routing)`                    | 设置路由值，影响分片定位。                                   |
| `preference(String pref)`                    | 设置检索的首选项（如 `_primary`、`_primary_first` 等）。     |
| `realtime(boolean rt)`                       | 设置是否实时检索（默认为 `true`）。                          |
| `refresh(boolean refresh)`                   | 设置在检索前是否刷新索引（`true` 为刷新）。                  |
| `storedFields(List<String> fields)`          | 设置需要返回的存储字段（不返回 `_source`，只返回存储字段内容）。 |
| `fetchSource(boolean fetch)`                 | 是否检索 `_source` 字段。                                    |
| `fetchSourceIncludes(List<String> includes)` | 设置 `_source` 中要包含的字段（支持通配符）。                |
| `fetchSourceExcludes(List<String> excludes)` | 设置 `_source` 中要排除的字段（支持通配符）。                |

**构造与辅助方法**
| 方法         | 描述                                                   |
| ------------ | ------------------------------------------------------ |
| `build()`    | 构建 `GetRequest` 对象，将设置的所有参数封装到请求中。 |
| `toString()` | 返回对象的字符串表示，主要用于调试和日志记录。         |

------

**示例代码**

```java
GetRequest request = new GetRequest.Builder()
    .index("products")          // 指定索引
    .id("bk-1")                 // 指定文档 ID
    .build();
```

**设置更多参数：**

```java
GetRequest request = new GetRequest.Builder()
    .index("products")
    .id("bk-1")
    .routing("customRouting")         // 指定路由值
    .preference("_primary_first")     // 优先使用主分片
    .realtime(false)                  // 设置非实时模式
    .fetchSourceIncludes(List.of("name", "price")) // 仅检索指定字段
    .fetchSourceExcludes(List.of("internalField")) // 排除某些字段
    .build();
```

---

**用途与说明**

- **`index` 和 `id` 是必填字段**，用于定位目标文档。
- 提供了灵活的选项来精确控制返回的数据（如过滤字段、使用存储字段等）。
- 通常与 `GetResponse` 一起使用，用于解析和处理返回的文档数据。

#### `GetResponse` 

`GetResponse` 是 Elasticsearch 客户端中，用于封装单条文档检索结果的响应类。

**字段**

| 字段名称      | 类型                              | 描述                                            |
| ------------- | --------------------------------- | ----------------------------------------------- |
| `index`       | `String`                          | 文档所在的索引名称。                            |
| `id`          | `String`                          | 检索到的文档 ID。                               |
| `version`     | `long`                            | 文档的版本号（仅在版本控制启用时有效）。        |
| `source`      | `Map<String, Object>` 或 `Object` | 返回的文档 `_source` 数据，通常是原始文档内容。 |
| `found`       | `Boolean`                         | 是否成功找到文档。                              |
| `primaryTerm` | `long`                            | 主分片的术语号（可选）。                        |
| `seqNo`       | `long`                            | 文档的序列号（可选）。                          |
| `routing`     | `String`                          | 文档的路由值（可选）。                          |

**方法**

**基本字段获取方法**

| 方法            | 返回值类型                        | 描述                                              |
| --------------- | --------------------------------- | ------------------------------------------------- |
| `index()`       | `String`                          | 获取文档的索引名称。                              |
| `id()`          | `String`                          | 获取文档的 ID。                                   |
| `version()`     | `long`                            | 获取文档的版本号。                                |
| `source()`      | `Map<String, Object>` 或 `Object` | 获取文档的 `_source` 数据，通常是原始 JSON 文档。 |
| `found()`       | `Boolean`                         | 检查是否成功找到文档。                            |
| `primaryTerm()` | `long`                            | 获取主分片的术语号（仅当返回时有效）。            |
| `seqNo()`       | `long`                            | 获取文档的序列号（仅当返回时有效）。              |
| `routing()`     | `String`                          | 获取文档的路由值（如果有的话）。                  |

**辅助方法**
| 方法                 | 返回值类型 | 描述                                       |
| -------------------- | ---------- | ------------------------------------------ |
| `toString()`         | `String`   | 返回对象的字符串表示，方便调试或日志记录。 |
| `equals(Object obj)` | `boolean`  | 比较两个响应对象是否相同。                 |
| `hashCode()`         | `int`      | 返回对象的哈希值，用于集合操作等场景。     |

---

**示例代码**

```java
GetResponse<Product> response = esClient.get(g -> g
    .index("products")
    .id("bk-1"), 
    Product.class
);

if (response.found()) {
    System.out.println("Document found:");
    System.out.println("Index: " + response.index());
    System.out.println("ID: " + response.id());
    System.out.println("Source: " + response.source());
} else {
    System.out.println("Document not found!");
}
```

**获取主分片信息：**

```java
if (response.found()) {
    System.out.println("Primary Term: " + response.primaryTerm());
    System.out.println("Sequence Number: " + response.seqNo());
}
```

**通过 `_source` 转为对象：**
```java
Product product = response.source();  // 如果使用泛型，直接返回反序列化的对象。
System.out.println("Product: " + product);
```

---

**注意事项**

- **`found` 字段：**如果文档不存在，则 `found` 为 `false`，且 `source` 等字段返回 `null`。

- **`source` 的泛型支持：**如果在请求中使用了泛型类（如 `Product.class`），`source()` 方法会返回反序列化后的对象。

- **路由和版本控制：**如果文档启用了自定义路由或版本控制，可通过 `routing()` 和 `version()` 获取这些信息。

- **与 `GetRequest` 配合使用：**`GetResponse` 通常与 `GetRequest` 一起使用，用于解析返回的单条文档数据。



#### `get()`

`esClient.get()` 是 Elasticsearch 客户端中用于获取单条文档数据的方法。在不同版本的 Elasticsearch 客户端中，`get()` 方法的参数可能有所不同。以下是 `esClient.get()` 方法的常用变体和参数，基于 Elasticsearch 7.x 和 8.x 客户端。

**基本的 `get()` 方法**

**参数：**`GetRequest getRequest`：这是一个 `GetRequest` 对象，包含了需要的索引、文档 ID 和其他可选参数（如路由值）。

**返回：**`GetResponse`：包含了文档的 `_source` 数据、文档 ID、索引名等。

**示例：**
```java
GetRequest getRequest = new GetRequest("products", "bk-1");
GetResponse response = esClient.get(getRequest, RequestOptions.DEFAULT);
if (response.found()) {
    Product product = response.source();
    System.out.println("Product: " + product);
}
```

---

**`get()` 方法的异步变体**

Elasticsearch 客户端也支持异步获取文档数据的方法，可以通过 `ActionListener` 来处理异步响应。

**参数：**
- `GetRequest getRequest`：请求对象。
- `ActionListener<GetResponse>`：用于处理异步响应的回调。

**返回：** 异步操作，不会直接返回 `GetResponse`，而是通过回调通知响应。

**示例：**
```java
GetRequest getRequest = new GetRequest("products", "bk-1");
esClient.get(getRequest, RequestOptions.DEFAULT, new ActionListener<GetResponse>() {
    @Override
    public void onResponse(GetResponse response) {
        if (response.found()) {
            Product product = response.source();
            System.out.println("Product: " + product);
        }
    }

    @Override
    public void onFailure(Exception e) {
        e.printStackTrace();
    }
});
```

---

**`get()` 方法（ElasticsearchClient 8.x）**

在 Elasticsearch 8.x 中，`get()` 方法的接口发生了一些变化，`ElasticsearchClient` 引入了新的 API 来进行数据的获取。相比于 7.x 客户端，8.x 客户端的 `get()` 方法不再直接使用 `RequestOptions`，而是使用 `GetRequest` 对象和泛型来指定返回类型。

**参数：**
- `GetRequest getRequest`：请求对象，包含索引、文档 ID 和可选的路由。
- `Class<T>`：指定返回类型，通常是从 Elasticsearch 获取的数据模型类（如 `Product.class`）。

**返回：**`GetResponse<T>`：返回指定类型的数据。

**示例：**
```java
GetRequest getRequest = new GetRequest("products", "bk-1");
GetResponse<Product> response = esClient.get(getRequest, Product.class);
if (response.found()) {
    Product product = response.source();
    System.out.println("Product: " + product);
}
```

---

**`get()` 方法的其他变体**

**常用参数：**
- **`index(String index)`**：指定要查询的索引。
- **`id(String id)`**：指定要查询文档的 ID。
- **`routing(String routing)`**：指定文档的路由值（可选）。
- **`preference(String preference)`**：指定查询的优先级（可选）。

这些参数通常通过 `GetRequest` 对象来传递。

**示例：**

```java
GetRequest getRequest = new GetRequest("products", "bk-1")
    .routing("user1")
    .preference("replica");
```

**总结**

`esClient.get()` 方法的常用变体和参数：

- **`GetRequest getRequest`**：这是必须提供的，包含索引名称、文档 ID 以及其他可选参数（如路由和优先级）。
- **`RequestOptions`**：在 7.x 版本中，可通过 `RequestOptions` 设置请求的配置（如超时、认证等）。在 8.x 中已不再显式使用。
- **`ActionListener<GetResponse>`**：用于异步操作，提供回调机制来处理响应或失败。
- **`Product.class` 或其他自定义类**：指定返回数据的类型，Elasticsearch 会将 `_source` 数据反序列化为该类型。

### 更新

通过 HTTP 更新 Elasticsearch 中的数据，通常使用 `PUT` 或 `POST` 请求。更新操作会依赖于你是否指定文档的 ID。以下是通过 HTTP 请求更新数据的步骤和示例。

**更新数据的 HTTP 请求方式**

- **使用 `PUT` 请求**：如果文档已存在，它会被更新。如果文档不存在，则会创建新文档。
- **使用 `POST` 请求**：适用于部分更新（文档部分字段更新），即使用 Elasticsearch 的更新 API。

**HTTP 请求的基本格式**

- **请求 URL**：
  - 格式：`http://<hostname>:<port>/<index>/_doc/<document_id>`
  - 示例：`http://localhost:9200/products/_doc/1`

- **请求头**：`Content-Type: application/json`：指定请求体的格式为 JSON。
  
- **请求体**：
  - 在 `PUT` 请求中，可以提供完整的文档内容，更新文档。
  - 在 `POST` 请求中，通常只提供需要更新的字段，Elasticsearch 会对文档进行部分更新。

**示例：通过 HTTP 更新数据**

**使用 `PUT` 更新数据（完整替换文档）**

`PUT` 请求将完全替换指定 ID 的文档。如果文档不存在，则会创建新文档。

```http
PUT http://localhost:9200/products/_doc/bk-1
Content-Type: application/json

{
  "sku": "bk-1",
  "name": "Mountain bike",
  "price": 150.0
}
```

**使用 `POST` 更新数据（部分更新）**

`POST` 请求适用于部分更新，只有提供的字段会被更新，其他字段保持不变。

```http
POST http://localhost:9200/products/_doc/bk-1/_update
Content-Type: application/json

{
  "doc": {
    "price": 150.0
  }
}
```

在这个例子中，`_update` 路径指示部分更新操作，`doc` 字段包含要更新的内容。

**更新数据的响应**

无论是 `PUT` 还是 `POST` 请求，Elasticsearch 都会返回一个 JSON 响应，表示更新操作的结果。以下是响应的一个示例：

```json
{
  "_index": "products",
  "_type": "_doc",
  "_id": "bk-1",
  "_version": 2,
  "result": "updated",
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "_seq_no": 1,
  "_primary_term": 1
}
```

- **`_index`**：文档所在的索引。
- **`_id`**：文档的 ID。
- **`_version`**：文档的版本，更新时会增加版本号。
- **`result`**：操作结果，`updated` 表示文档已更新。
- **`_shards`**：有关分片的信息，表示操作执行成功的分片数等。

**错误处理**

如果更新操作出现错误，Elasticsearch 会返回错误信息，例如：
- **400 Bad Request**：请求格式错误，通常是因为 JSON 格式不正确。
- **404 Not Found**：目标索引或文档 ID 不存在。
- **409 Conflict**：尝试更新不存在的文档。

---

**总结**

通过 HTTP 更新数据的基本步骤是：
1. 使用 `PUT` 或 `POST` 请求，`PUT` 用于完整替换文档，`POST` 用于部分更新文档。
2. 设置正确的 URL 和请求头。
3. 提供要更新的文档内容（完整或部分字段）。
4. 发送请求并处理响应。

------

通过Java更新数据：

**部分更新文档（使用 `update`）**

```java
UpdateRequest<Object> updateRequest = UpdateRequest.of(u -> u
        .index(index)
        .id(id)
        .doc(JsonData.of(jsonString))
);
UpdateResponse<Object> updateResponse = client.update(updateRequest);
System.out.println(updateResponse.result());
```

- **`UpdateRequest.of()`**：使用 `of()` 方法构建更新请求。
- **`JsonData.of()`**：将 JSON 字符串转换为 `JsonData` 类型，这是 `co.elastic.clients` 中用于传输 JSON 数据的类型。
- **`updateResponse.result()`**：返回操作结果，指示更新是否成功。

**完整替换文档（使用 `index`）**，详解插入。

更新操作可能会失败，因此需要进行异常处理。常见的异常有：
- **`VersionConflictEngineException`**：版本冲突异常，通常发生在多线程环境中。
- **`ElasticsearchException`**：其他与 Elasticsearch 相关的异常。

------

**更新详解**

**`co.elastic.clients.elasticsearch.core.UpdateRequest<TDocument, TPartial>`**

- 用于构建更新请求。
- 支持更新整个文档或部分字段。

**`co.elastic.clients.elasticsearch.core.UpdateResponse<TDocument>`**

- 用于处理更新操作的响应。
- 包含结果状态和文档元数据。

同 `index`，`UpdateRequest`也有同样的几种构建方式：

方式2：

```java
Map<String,String> map=new HashMap<>();
map.put("cityBike","测试修改");
UpdateRequest<Map, Object> updateRequest = UpdateRequest.of(u -> u
        .index("products")
        .id("bk-1")
        .doc(map)
);
UpdateResponse<Map> updateResponse = esClient.update(updateRequest,Map.class);
```

方式3：

```java
UpdateResponse<Map> updateResponse = esClient.update(u -> u
        .index("products")
        .id("bk-1")
        .doc(map),Map.class);
```

#### **`UpdateRequest`**

`UpdateRequest` 是用于构建 Elasticsearch 更新请求的核心类。通过它，可以指定索引、文档 ID、更新内容（部分更新或脚本更新）等参数。

**字段**

以下是 `UpdateRequest` 的常用字段：

| 字段名称          | 类型                                       | 描述                                           |
| ----------------- | ------------------------------------------ | ---------------------------------------------- |
| `index`           | `String`                                   | 要更新的索引名称。                             |
| `id`              | `String`                                   | 要更新的文档 ID。                              |
| `routing`         | `String`                                   | 可选的路由值，用于分片分发。                   |
| `ifSeqNo`         | `Long`                                     | 序列号，确保只在特定版本时更新（乐观锁）。     |
| `ifPrimaryTerm`   | `Long`                                     | 主分片版本号，与 `ifSeqNo` 结合使用。          |
| `doc`             | `Map<String, Object>` 或 `JsonData`，或`T` | 要更新的部分文档内容。                         |
| `upsert`          | `Map<String, Object>` 或 `JsonData`，或`T` | 如果文档不存在时插入的内容。                   |
| **`script`**      | `Script`                                   | 用于动态更新文档的脚本。                       |
| **`docAsUpsert`** | `boolean`                                  | 是否将部分文档作为插入内容（如果文档不存在）。 |
| `fetchSource`     | `FetchSourceContext`                       | 是否返回更新后的文档以及哪些字段需要返回。     |
| `retryOnConflict` | `Integer`                                  | 更新冲突重试的次数。                           |
| `refresh`         | `RefreshPolicy`                            | 更新操作后是否刷新索引。                       |
| `timeout`         | `TimeValue`                                | 等待主分片响应的超时时间。                     |

---

**方法**

**基础设置方法**

| 方法                       | 返回类型        | 描述                             |
| -------------------------- | --------------- | -------------------------------- |
| `index(String index)`      | `UpdateRequest` | 设置目标索引名称。               |
| `id(String id)`            | `UpdateRequest` | 设置文档 ID。                    |
| `routing(String routing)`  | `UpdateRequest` | 设置路由信息。                   |
| `ifSeqNo(long seqNo)`      | `UpdateRequest` | 设置序列号（用于乐观并发控制）。 |
| `ifPrimaryTerm(long term)` | `UpdateRequest` | 设置主分片版本号。               |

**内容设置方法**

| 方法                               | 返回类型        | 描述                                           |
| ---------------------------------- | --------------- | ---------------------------------------------- |
| `doc(Object doc)`                  | `UpdateRequest` | 设置部分更新的内容，可以是 Map 或 POJO。       |
| `upsert(Object upsert)`            | `UpdateRequest` | 设置插入文档（如果文档不存在时）。             |
| **`script(Script script)`**        | `UpdateRequest` | 设置更新脚本。                                 |
| `docAsUpsert(boolean docAsUpsert)` | `UpdateRequest` | 是否将部分文档作为插入内容（如果文档不存在）。 |

**控制参数方法**

| 方法                            | 返回类型        | 描述                                     |
| ------------------------------- | --------------- | ---------------------------------------- |
| `retryOnConflict(int retries)`  | `UpdateRequest` | 设置更新冲突的重试次数（默认 0）。       |
| `refresh(RefreshPolicy policy)` | `UpdateRequest` | 设置刷新策略。                           |
| `timeout(TimeValue timeout)`    | `UpdateRequest` | 设置等待主分片响应的超时时间。           |
| `scriptedUpsert(Boolean value)` | `UpdateRequest` | 设置为 true 以执行脚本，无论文档是否存在 |

**Fetch Source 方法**

| 方法                         | 返回类型        | 描述                                     |
| ---------------------------- | --------------- | ---------------------------------------- |
| `source(SourceConfig fetch)` | `UpdateRequest` | 设置返回的字段范围（具体字段或排除字段） |

**部分字段更新**

```java
UpdateRequest.Builder<Product, Product> builder = new UpdateRequest.Builder<>();
UpdateRequest<Product, Product> request = builder
    .index("products")
    .id("1")
    .doc(Map.of("price", 200, "stock", 50)) // 更新部分字段
    .docAsUpsert(true)                      // 如果文档不存在，插入新文档
    .retryOnConflict(3)                     // 更新冲突重试次数
    .fetchSource(true)                      // 返回更新后的源文档
    .build();
```

**脚本更新**

通过脚本动态更新字段的值：
```java
Script script = new Script.Builder()
    .source("ctx._source.price += params.increment") // 使用 Painless 脚本
    .params(Map.of("increment", 20))                // 设置参数
    .build();

UpdateRequest.Builder<Product, Product> builder = new UpdateRequest.Builder<>();
UpdateRequest<Product, Product> request = builder
    .index("products")
    .id("1")
    .script(script)
    .timeout(t -> t.time("2s")) // 设置超时时间
    .build();
```

**设置 `upsert`**

`upsert` 的功能在 Fluent DSL 中也支持：

```java
UpdateRequest.Builder<Product, Product> builder = new UpdateRequest.Builder<>();
UpdateRequest<Product, Product> request = builder
    .index("products")
    .id("1")
    .doc(Map.of("price", 200))               // 如果文档存在，更新 "price" 字段的值为 200
    .upsert(Map.of("price", 200, "stock", 100)) // 如果文档不存在，创建一个包含 "price" 和 "stock" 的新文档
    .build();
```

**控制刷新策略**

设置刷新策略，以确保更新后立即对查询可见：

```java
UpdateRequest.Builder<Product, Product> builder = new UpdateRequest.Builder<>();
UpdateRequest<Product, Product> request = builder
    .index("products")
    .id("1")
    .doc(Map.of("status", "updated"))
    .refresh(Refresh.True) // 设置刷新策略为立即刷新
    .build();
```

#### `UpdateResponse` 

`UpdateResponse` 是一个重要的类，用于表示 `UpdateRequest` 的响应。它包含了关于更新操作的详细信息，例如更新状态、文档元数据等。

| 方法            | 描述                                  | 返回类型              |
| --------------- | ------------------------------------- | --------------------- |
| `id()`          | 获取文档的 `_id`                      | `String`              |
| `index()`       | 获取文档的索引名称                    | `String`              |
| `version()`     | 获取文档版本号                        | `long`                |
| `result()`      | 获取更新操作的结果                    | `Result`              |
| `shards()`      | 获取分片统计信息                      | `ShardStatistics`     |
| `seqNo()`       | 获取操作的序列号                      | `long`                |
| `primaryTerm()` | 获取操作的主分片任期号                | `long`                |
| `get()`         | 获取文档的当前状态（需启用 `source`） | `@Nullable GetResult` |

**`result` (Result)**：表示更新操作的结果状态，枚举类型 `Result`，可能的值有：

- `Created`：文档是新创建的（通过 `upsert`）。
- `Updated`：文档已被成功更新。
- `Deleted`：文档被删除。
- `NoOp`：未执行任何操作。
- `NotFound`：未找到文档。

**`get` (`GetResult`)**：如果更新操作包含 `fetchSource(true)`，会返回 `GetResult` 对象，提供关于文档当前状态的详细信息。

```java
if (response.get() != null) {
   Map<String, Object> source = response.get().source();
   System.out.println("Updated source: " + source);
}
```

#### `update()`

`update` API 允许你对已存在的文档进行部分更新，而无需替换整个文档。

在 **Elasticsearch 8.x Java Client** 中，`update()` 方法有多个变体，可以通过不同的构造方式来执行文档更新操作。

 **`update()` 方法的基本变体**

```java
public <TDocument, TPartialDocument> UpdateResponse<TDocument> update(
        UpdateRequest<TDocument, TPartialDocument> request, Class<TDocument> tDocumentClass)
        throws IOException, ElasticsearchException {
    // ...
}
```

**功能**：此方法接受一个 **`UpdateRequest`** 对象和目标文档的 **`Class`** 类型（用于指定返回的文档类型），然后执行更新操作。

**参数**：
- `UpdateRequest<TDocument, TPartialDocument> request`：包含更新操作详细信息的请求对象。
- `Class<TDocument> tDocumentClass`：返回结果文档的类型，通常是你的实体类。
  

此方法直接通过 `transport.performRequest()` 执行请求，执行一个同步的文档更新操作。

------

**`update()` 方法的构建器变体**

```java
public final <TDocument, TPartialDocument> UpdateResponse<TDocument> update(
        Function<UpdateRequest.Builder<TDocument, TPartialDocument>, ObjectBuilder<UpdateRequest<TDocument, TPartialDocument>>> fn,
        Class<TDocument> tDocumentClass) throws IOException, ElasticsearchException {
    return update(fn.apply(new UpdateRequest.Builder<TDocument, TPartialDocument>()).build(), tDocumentClass);
}
```

**功能**：此变体使用了构建器模式。通过一个函数 `fn`，你可以配置一个 `UpdateRequest` 对象，然后调用 `update()` 执行请求。

**参数**：
- `fn`：一个接受 `UpdateRequest.Builder` 的函数，构造一个 `UpdateRequest` 对象。
- `Class<TDocument> tDocumentClass`：返回结果文档的类型。
  

此方法的优势是可以通过 Lambda 表达式快速构建请求对象，避免显式地创建请求对象。

**示例**：

```java
UpdateResponse<Map> response = esClient.update(
    u -> u.index("products").id("bk-1").script(script).refresh(Refresh.True), 
    Map.class);
```

------

**`updateByQuery()` 方法变体**

```java
public UpdateByQueryResponse updateByQuery(UpdateByQueryRequest request)
        throws IOException, ElasticsearchException {
    // ...
}
```

- **功能**
  执行一个更新查询操作，更新符合条件的所有文档，而不直接改变源文档的内容（如应用映射更改）。通常用于批量更新。
  **参数**：`UpdateByQueryRequest request`：包含更新查询操作的请求对象。
  

该方法执行一个同步的更新操作，更新索引中的多个文档。

------

**`updateByQuery()` 方法的构建器变体**

```java
public final UpdateByQueryResponse updateByQuery(
        Function<UpdateByQueryRequest.Builder, ObjectBuilder<UpdateByQueryRequest>> fn)
        throws IOException, ElasticsearchException {
    return updateByQuery(fn.apply(new UpdateByQueryRequest.Builder()).build());
}
```

**功能**：该变体允许使用构建器模式配置一个 `UpdateByQueryRequest` 对象，然后执行更新查询操作。
**参数**：`fn`：一个接受 `UpdateByQueryRequest.Builder` 的函数，构造 `UpdateByQueryRequest` 对象。

通过这个方法，你可以更灵活地构建请求参数，适用于复杂的查询和批量更新操作。

**示例**：

```java
UpdateByQueryResponse response = esClient.updateByQuery(
    u -> u.index("products").query(q -> q.matchAll()).script(script)
);
```

**`updateByQueryRethrottle()` 方法**

```java
public UpdateByQueryRethrottleResponse updateByQueryRethrottle(UpdateByQueryRethrottleRequest request)
        throws IOException, ElasticsearchException {
    // ...
}
```

**功能**：用于更改 `UpdateByQuery` 操作的请求频率（每秒请求数）。如果你想控制查询操作的速率，可以使用此方法。
**参数**：`UpdateByQueryRethrottleRequest request`：请求对象，指定需要更改速率的 `UpdateByQuery` 操作。

**`updateByQueryRethrottle()` 方法的构建器变体**

```java
public final UpdateByQueryRethrottleResponse updateByQueryRethrottle(
        Function<UpdateByQueryRethrottleRequest.Builder, ObjectBuilder<UpdateByQueryRethrottleRequest>> fn)
        throws IOException, ElasticsearchException {
    return updateByQueryRethrottle(fn.apply(new UpdateByQueryRethrottleRequest.Builder()).build());
}
```

**功能**：该变体使用构建器模式构造一个 `UpdateByQueryRethrottleRequest` 对象，然后执行重新调整请求频率的操作。

总结

- **`update()`**：用于单个文档的更新操作，支持 `script`、`doc` 等字段。
- **`updateByQuery()`**：用于根据查询条件批量更新多个文档。
- **`updateByQueryRethrottle()`**：用于控制 `update_by_query` 操作的速率。

所有这些方法的变体都可以通过构建器模式或函数式编程来配置请求，提供了灵活的 API 使得你可以根据需求构造更新操作。

#### `SourceConfig`

`SourceConfig` 是一个用于定义如何获取文档 `_source` 数据的类。它有两种主要的配置方式：`Filter` 和 `Fetch`，这两种方式可以决定是完全检索 `_source`，还是根据过滤条件来获取 `_source`。

**使用 `filter` 类型的 `SourceConfig`**：

```java
SourceConfig sourceConfig = SourceConfig.of(
  s -> s.filter(
      f->f.includes("name").excludes("age")
  )
);
```

**使用 `fetch` 类型的 `SourceConfig`**：

```java
SourceConfig sourceConfig = SourceConfig.of(b -> b
    .fetch(true)
);
```

**总结**

- `SourceConfig` 用于控制如何检索文档的 `_source` 数据。
- 它支持两种类型：`Filter`（通过过滤字段来检索）和 `Fetch`（完全检索 `_source` 数据）。
- 通过 `Builder` 模式，您可以方便地构建 `SourceConfig` 实例，并在查询中使用它。

#### `SourceFilter`

`SourceFilter.Builder` 是用于构建 `SourceFilter` 实例的类。它允许您动态地设置哪些字段应该被包含或排除在 `_source` 字段中，并且提供了多种方法来添加包含或排除的字段。

**关键字段：**

- `includes`: 这个字段保存了需要包含在 `_source` 中的字段名列表。
- `excludes`: 这个字段保存了需要排除在 `_source` 中的字段名列表。

**关键方法：**

**`excludes(List<String> list)`**
 - 这个方法允许您将一个字段列表添加到排除列表 `excludes` 中。
 - **参数**：一个包含字段名的 `List<String>`。
 - **返回值**：`Builder` 对象，允许链式调用。

 ```java
 builder.excludes(List.of("field1", "field2"));
 ```

**`excludes(String value, String... values)`**
- 这个方法允许您将一个或多个字段名添加到排除列表 `excludes` 中。
- **参数**：一个字段名或多个字段名作为参数。
- **返回值**：`Builder` 对象，允许链式调用。

```java
builder.excludes("field1", "field2", "field3");
```

**`includes(List<String> list)`**
- 这个方法允许您将一个字段列表添加到包含列表 `includes` 中。
- **参数**：一个包含字段名的 `List<String>`。
- **返回值**：`Builder` 对象，允许链式调用。

```java
builder.includes(List.of("field1", "field2"));
```

**`includes(String value, String... values)`**
- 这个方法允许您将一个或多个字段名添加到包含列表 `includes` 中。
- **参数**：一个字段名或多个字段名作为参数。
- **返回值**：`Builder` 对象，允许链式调用。

```java
builder.includes("field1", "field2", "field3");
```

**`self()`**：这个方法是继承自 `WithJsonObjectBuilderBase` 的一个辅助方法，它返回当前的 `Builder` 实例。用于支持链式调用。

**`build()`**：构建并返回一个 `SourceFilter` 对象。如果一些必要字段为 `null`，则会抛出 `NullPointerException`。

```java
SourceFilter filter = builder.build();
```

以下是如何使用 `SourceFilter.Builder` 来创建一个 `SourceFilter` 实例的示例：

```java
SourceFilter filter = new SourceFilter.Builder()
    .includes("field1", "field2")
    .excludes("field3", "field4")
    .build();
```

更简洁的方式：

```java
SourceConfig sourceConfig = SourceConfig.of(s -> s.filter(f->f.includes("name").excludes("age")));
```

#### `Script`

`Script` 类用于表示 Elasticsearch 中的脚本，支持两种主要的脚本类型：`Inline` 和 `Stored`。它是一个标签联合类（`TaggedUnion`），意味着它可以在不同类型的变体之间切换。

**字段**:
- **`_kind`**：表示当前脚本的类型，可能的值为 `Inline` 或 `Stored`。
- **`_value`**：存储当前脚本的实际内容。具体内容根据 `_kind` 的值而定。如果 `_kind` 是 `Inline`，则 `value` 是 `InlineScript` 类型；如果 `_kind` 是 `Stored`，则 `value` 是 `StoredScriptId` 类型。

**方法**:
- **`_kind()`**: 返回脚本的类型（`Inline` 或 `Stored`）。
- **`_get()`**: 获取脚本的实际内容（`InlineScript` 或 `StoredScriptId`）。
- **`isInline()`**: 判断当前脚本是否为 `Inline` 类型。
- **`inline()`**: 获取 `Inline` 类型的脚本内容。若当前脚本不是 `Inline` 类型，将抛出异常。
- **`isStored()`**: 判断当前脚本是否为 `Stored` 类型。
- **`stored()`**: 获取 `Stored` 类型的脚本内容。若当前脚本不是 `Stored` 类型，将抛出异常。
- **`serialize()`**: 将脚本对象序列化为 JSON 格式。
- **`toString()`**: 返回脚本的字符串表示，通常为 JSON 格式。

**`Builder` 类**:
- **`inline(InlineScript v)`**: 设置脚本为 `Inline` 类型，并传入 `InlineScript` 对象。
- **`inline(Function<InlineScript.Builder, ObjectBuilder<InlineScript>> fn)`**: 使用构建器模式创建 `InlineScript` 对象。
- **`stored(StoredScriptId v)`**: 设置脚本为 `Stored` 类型，并传入 `StoredScriptId` 对象。
- **`stored(Function<StoredScriptId.Builder, ObjectBuilder<StoredScriptId>> fn)`**: 使用构建器模式创建 `StoredScriptId` 对象。
- **`build()`**: 构建 `Script` 对象。

**增量更新示例**:
假设你需要增量更新一个 Elasticsearch 文档时使用脚本。以下是如何构建一个 `Script` 对象，执行增量更新的示例。

```java
// 假设有一个字段 "v"，我们要将它的值增加 1。
Script script = Script.of(builder -> builder
        .inline(inlineScriptBuilder -> inlineScriptBuilder
                .source("ctx._source.v += params.increment") // inline 脚本
                .params("increment",  JsonData.of(1)) // 传递参数
        )
);
UpdateResponse<Map> updateResponse2 = esClient.update(u -> u
                .index("products")
                .id("bk-1")
                .script(script)
                .refresh(Refresh.True)
        ,Map.class);
System.out.println(updateResponse2.result());
```
在此示例中，使用了 `Inline` 脚本来增量更新 `counter` 字段，脚本内容是 `ctx._source.v += params.increment`，它表示将 `counter` 字段的值增加 `increment` 参数的值。

**`params`**: 增量更新需要传递参数。在脚本中通过 `params.increment` 引用了这个参数，并在构建脚本时传递了实际值 `1`。

**`UpdateRequest`**: 构建了一个 `UpdateRequest` 对象，使用 `Script` 执行增量更新。

`Script` 类用于封装 Elasticsearch 的脚本操作，支持 `Inline` 和 `Stored` 两种类型的脚本。通过构建器模式，可以动态地设置脚本内容并执行操作。在增量更新场景中，使用 `InlineScript` 类型的脚本结合传递参数的方式实现字段值的增量更新。



在 Java 中，`Script` 类用于与 Elasticsearch 中的脚本交互，允许你在查询、聚合、更新等操作中使用自定义的脚本。`Script` 类支持多种脚本语言，其中 `Painless` 是默认和推荐的脚本语言。下面简要介绍常用的脚本语法及其特殊变量，如 `params`、`ctx._source` 等。

**脚本类型（ScriptType）**

`Script` 类支持两种类型的脚本：
- **INLINE**：直接在查询或操作中内联定义脚本代码。
- **STORED**：从已存储的脚本中加载脚本（通常是预先定义并存储在 Elasticsearch 中的脚本）。

**特殊变量**

在 Painless 脚本中，有几个关键的特殊变量用于访问文档数据、查询参数等内容。常见的特殊变量有 `doc`、`params` 和 `ctx`。

**`doc`**

`doc` 是一个用于访问文档字段的特殊变量。它允许在脚本中访问文档中的字段值，通常用于获取数值、日期或文本字段的内容。

- `doc['field_name'].value`：获取字段的值。
- `doc['field_name'].size()`：获取字段的数组大小。

**示例：**
```painless
return doc['price'].value * 1.2;
```
这个脚本返回字段 `price` 的值乘以 1.2。

**`params`**
`params` 是一个用于传递脚本参数的特殊变量。它允许将外部参数传递给脚本，从而使脚本更加灵活和动态。`params` 是一个 `Map<String, Object>`，其中可以存储多个键值对。

- 通过 `params['param_name']` 访问传入的参数。

**示例：**
```java
// 假设有一个字段 "v"，我们要将它的值增加 1。
Script script = Script.of(builder -> builder
        .inline(inlineScriptBuilder -> inlineScriptBuilder
                .source("ctx._source.v += params.increment") // inline 脚本
                .params("increment",  JsonData.of(1)) // 传递参数
        )
);
```
这里将参数 `1` 传递给脚本，在脚本中通过 `params.increment` 使用该值。

**`ctx._source`**

`ctx._source` 是用于在更新脚本中访问和修改文档源的特殊变量。它代表当前文档的完整源内容（即 `_source` 字段），并允许脚本在更新时修改文档的数据。

- `ctx._source['field_name']`：获取或修改文档字段的值。
- `ctx._source.remove('field_name')`：从文档中删除字段。

**示例：**
```java
// 假设有一个字段 "v"，我们要将它的值增加 1。
Script script = Script.of(builder -> builder
        .inline(inlineScriptBuilder -> inlineScriptBuilder
                .source("ctx._source.v += params.increment") // inline 脚本
                .params("increment",  JsonData.of(1)) // 传递参数
        )
);
```
这个脚本将文档字段 `v` 的值增加 `1`。

**`_score`**
`_score` 是一个在查询过程中用于获取当前文档的评分的特殊变量。它可以在自定义评分脚本中使用。

**示例：**
```painless
return _score * 2;  // 将文档评分加倍
```

**`_id`**
`_id` 用于访问文档的唯一标识符。

**示例：**

```painless
return _id;  // 返回文档的ID
```

**常见脚本语法**

**数学运算**

支持常见的数学运算，如加法、减法、乘法、除法、取余等。

**示例：**

```painless
return doc['price'].value * params.factor + params.offset;
```

**条件语句**

可以使用 `if`、`else` 进行条件判断。

**示例：**

```painless
if (doc['age'].value > 30) {
    return 'Adult';
} else {
    return 'Youth';
}
```

**字符串操作**
支持字符串拼接、截取、替换等操作。

**示例：**

```painless
return doc['name'].value + ' - ' + doc['category'].value;
```

**数组操作**

支持操作数组或列表，如获取特定索引的值。

**示例：**

```painless
return params.myList[0];  // 获取列表的第一个元素
```

**更新脚本**
在文档更新操作中，`Script` 类通常与 `ctx._source` 一起使用，以便在文档更新时修改其字段值。

**示例：**
```java
// 假设有一个字段 "v"，我们要将它的值增加 1。
Script script = Script.of(builder -> builder
        .inline(inlineScriptBuilder -> inlineScriptBuilder
                .source("ctx._source.v += params.increment") // inline 脚本
                .params("increment",  JsonData.of(1)) // 传递参数
        )
);
```
该脚本将文档字段 `v` 的值增加 `1`。

**脚本评分**
在查询中使用脚本进行评分时，`_score` 和其他文档字段可以一起参与评分计算。

**示例：**

```painless
Math.log(doc['views'].value + 1) + _score
```
这个脚本计算评分时结合了 `views` 字段的对数值和原始评分。

总结
在 Elasticsearch 中，`Script` 类通过 Painless 脚本语言允许在查询、聚合、更新等场景中执行自定义逻辑。常用的特殊变量包括：
- `doc`：访问文档字段。
- `params`：传递外部参数给脚本。
- `ctx._source`：访问并修改文档的源内容（用于更新操作）。
- `_score`：访问当前文档的评分。
- `_id`：访问文档的 ID。

通过灵活使用这些变量和 Painless 脚本语法，可以实现复杂的数据处理和查询逻辑。

### 条件更新

#### `updateByQuery`

在 Elasticsearch 中，`updateByQuery` 是一种通过查询更新多个文档的方法。与传统的单个文档更新 (`update`) 不同，`updateByQuery` 允许你对符合查询条件的所有文档应用一个更新脚本。

示例代码解析

```java
UpdateByQueryResponse response = esClient.updateByQuery(
    u -> u.index("products")
          .query(q -> q.matchAll(m->m))
          .script(script)
);
```

这段代码的意思是：

1. **`index("products")`**: 指定操作的索引为 `"products"`。
2. **`query(q -> q.matchAll(m->m))`**: 查询条件使用 `matchAll`，即匹配所有文档。
3. **`script(script)`**: 执行脚本来更新匹配的文档，`script` 是一个更新脚本，它将应用于所有匹配的文档。

代码功能

- **`updateByQuery`**: 这个方法执行一个基于查询的批量更新操作，允许你使用一个查询条件（比如 `matchAll` 或其他复杂查询）来选择文档，然后通过脚本对这些文档进行更新。
- **`script`**: 更新操作通过脚本完成，脚本可以访问文档的字段并对其进行修改。例如，你可以使用 `painless` 脚本来增加、修改或删除字段。

典型的 `script` 更新示例

假设你希望更新所有 `v` 字段等于 123 的产品，将它们的 `v` 字段更新为 50。你可以使用以下脚本：

```java
UpdateByQueryResponse response = esClient.updateByQuery(
        u -> u.index("products")
                .query(q -> q.matchAll(m -> m))  // 使用 matchAll 构建查询条件  // 查询所有文档
                .script(builder -> builder.inline(i->i.source("if (ctx._source.v == 123) { ctx._source.v = 50 }")))
);
System.out.println(response);
```

参数说明

1. **`index("products")`**: 指定了目标索引 `"products"`，更新操作将在这个索引的文档上执行。
2. **`query(q -> q.matchAll(m->m))`**: `matchAll` 查询匹配所有文档，你也可以使用其他更复杂的查询，如 `match`、`term` 等。
3. **`script(script)`**: 这是更新的核心，通过一个脚本对文档进行修改。在这里，`painless` 脚本会检查每个文档的 `v` 字段，如果其值等于 123，则将 `v` 字段设置为 50。

更复杂的查询与脚本

可以根据需要构造更复杂的查询和脚本。例如，查询所有 `status` 为 `inactive` 且 `last_updated` 超过 30 天的文档，并将它们的 `active` 字段设置为 `false`：

```java
UpdateByQueryResponse response2 = esClient.updateByQuery(
    u -> u.index("products")
        .query(q -> q.bool(b -> b
                .must(m -> m.term(t -> t.field("status").value("inactive")))
                .filter(f -> f.range(r -> r.field("last_updated").lt(JsonData.fromJson("now-30d/d"))))))
        .script(builder -> builder.inline(
                i->i.source("if (ctx._source.status == 'inactive' && (new Date().getTime() - ctx._source.last_updated) > 2592000000L) { ctx._source.active = false }")))
);
```

主要方法说明

- **`index`**: 指定操作的索引。
- **`query`**: 设置更新操作的查询条件。指定哪些文档需要更新，可以是 `matchAll`、`term` 或其他查询类型。
- **`script`**: 设置执行的脚本，脚本可以通过 `ctx._source` 来访问文档字段并进行更新。
- **`refresh`**（可选）: 是否在更新后刷新索引，通常用于确保文档立即可见。

- **`updateByQuery`**：允许你通过查询条件批量更新文档。适用于需要批量修改文档的场景。

这种方法非常适合用于需要条件更新的批量操作，能够高效地更新大量文档。

### 删除

在 Java 中，使用 Elasticsearch 进行数据删除（`delete`）主要涉及以下几个类和接口：

**`DeleteRequest` 类**：是删除操作的核心类，表示删除文档的请求。你可以使用它来设置删除操作的目标索引和文档 ID。

**`DeleteResponse` 类**：是 `delete` 请求返回的响应类。它包含删除操作的结果，比如是否成功、删除的文档信息等。

**`DeleteByQueryRequest` 类**：如果你想基于查询条件删除多个文档，而不仅仅是单个文档，可以使用 `DeleteByQueryRequest` 类。这个类支持通过查询条件删除符合条件的多个文档。

**`DeleteByQueryResponse` 类**：与 `DeleteByQueryRequest` 配套的响应类，用于返回 `delete_by_query` 操作的结果。它包含删除的文档数量等信息。

#### `DeleteRequest`

`DeleteRequest` 是 Elasticsearch 中用于执行文档删除操作的请求类，它主要用于指定要删除的文档的索引、文档 ID 以及一些其他的参数。

**字段：**
`DeleteRequest` 的字段主要用于指定要删除的文档所在的索引和文档 ID。常用的字段如下：

- **`index`** (`String`): 要删除文档的索引名称。
- **`id`** (`String`): 要删除文档的 ID。
- **`version`** (`long`): 文档的版本号，用于乐观并发控制（可选）。
- **`versionType`** (`VersionType`): 版本类型，默认是 `VersionType.INTERNAL`，可以指定其他类型（如 `VersionType.EXTERNAL`）。
- **`routing`** (`String`): 指定路由值，默认情况下会根据文档 ID 进行路由。
- **`parent`** (`String`): 设置父文档的 ID（对于父子文档关系有用）。
- **`timeout`** (`TimeValue`): 设置请求的超时时间。
- **`refresh`** (`Boolean`): 是否刷新索引以便立即可见（例如：`true` 或 `false`）。
- **`waitForActiveShards`** (`String`): 指定在删除请求返回前等待多少个活动分片（例如：`1`）。
- **`routing`** (`String`): 用于路由的值。

---

**常用方法：**

**设置索引和文档 ID：**
- `DeleteRequest index(String index)`  ：设置删除操作的索引名称。
- `DeleteRequest id(String id)`  ：设置要删除文档的 ID。

**设置版本控制：**
- `DeleteRequest version(long version)` ：设置文档的版本号，适用于乐观锁控制。
- `DeleteRequest versionType(VersionType versionType)` ：设置版本类型（如 `VersionType.INTERNAL` 或 `VersionType.EXTERNAL`）。

**设置路由：**
- `DeleteRequest routing(String routing)`  ：设置路由值，指定文档的路由策略。

**设置父文档：**
- `DeleteRequest parent(String parent)`  ：设置父文档的 ID（用于父子文档关系）。

**设置超时：**
- `DeleteRequest timeout(TimeValue timeout)` ：设置请求的超时时间。
- `DeleteRequest timeout(String timeout)`  ：设置请求的超时时间，字符串形式（如 `"30s"`）。

**设置刷新选项：**
- `DeleteRequest setRefreshPolicy(WriteRequest.RefreshPolicy refreshPolicy)` ：设置刷新策略（例如 `WriteRequest.RefreshPolicy.IMMEDIATE`）。

**设置等待活动分片：**
- `DeleteRequest waitForActiveShards(String waitForActiveShards)`：设置在返回之前等待多少个活动分片。


**示例代码：**

```java
DeleteResponse deleteResponse = esClient.delete(d -> d
        .index("products")
        .id("bk-1"));
log.info(String.valueOf(deleteResponse.version()));
```

#### `DeleteResponse`

`DeleteResponse` 是 Elasticsearch 删除请求的响应对象。它用于返回删除操作的结果，包括文档删除的状态、版本号、索引名称等信息。以下是 `DeleteResponse` 类的字段和常用方法：

**字段：**

`DeleteResponse` 的字段主要用于返回删除操作的相关信息。常用的字段如下：

- **`result`** (`DocWriteResponse.Result`): 删除操作的结果。可能的值包括：
  - `DELETED`: 删除成功。
  - `NOT_FOUND`: 删除的文档不存在。
  - `VERSION_CONFLICT`: 版本冲突。
  - `FAILURE`: 失败。
  
- **`id`** (`String`): 被删除文档的 ID。
  
- **`index`** (`String`): 被删除文档所在的索引名称。

- **`version`** (`long`): 被删除文档的版本号。

- **`shardInfo`** (`ShardInfo`): 执行删除操作的分片信息，包含了请求处理的分片数量、失败的分片数量等信息。

**常用方法：**

**获取删除结果：**，**`result()`** ，获取删除操作的结果，返回值为 `Result` 类型，可能的结果包括：

**获取文档 ID：**，**`id()`**，获取已删除文档的 ID。

**获取索引名称：**，**`index()`**，获取已删除文档所在的索引名称。

**获取文档版本号：**，**`version()`** ， 获取已删除文档的版本号。

**获取分片信息：**，**`shards()`** ，获取执行删除操作的分片信息，返回 `ShardInfo` 对象，包含有关分片的信息，例如成功处理的分片数量、失败的分片数量等。

**获取操作执行的分片数量：**，**`shards().total()`**  ，获取执行删除操作时，参与处理的总分片数量。

**获取失败的分片数量：**，**`shards().failed()`**  ，获取在执行删除操作时，失败的分片数量。

**获取失败的分片信息：**，**`shards().failures()`**  ，获取失败的分片的详细信息，返回一个 `List<ShardFailure>`，包含失败的原因和其他信息。

**示例代码：**

```java
DeleteResponse deleteResponse = esClient.delete(d -> d
        .index("products")
        .id("bk-1"));
log.info(String.valueOf(deleteResponse.version()));


// 获取删除操作的结果
Result result1 = deleteResponse.result();
System.out.println("Delete result: " + result1);

// 获取被删除文档的 ID
String docId = deleteResponse.id();
System.out.println("Deleted document ID: " + docId);

// 获取文档所在的索引名称
String index = deleteResponse.index();
System.out.println("Document index: " + index);

// 获取文档的版本号
long version = deleteResponse.version();
System.out.println("Deleted document version: " + version);

// 获取分片信息
ShardStatistics shards = deleteResponse.shards();
System.out.println("Shard info: " + shards);
System.out.println("Total shards: " + shards.total());
System.out.println("Failed shards: " + shards.failed());

// 如果有失败的分片，可以查看失败的具体信息
List<ShardFailure> failures1 = shards.failures();
for (ShardFailure failure : failures1) {
    System.out.println("Failure reason: " + failure.reason());
}
```

#### `delete()`

在 Elasticsearch 中，`esClient.delete` 方法用于删除文档。该方法有几个常见的变体和参数，下面列出了这些变体及其相关说明。

**`delete(DeleteRequest request)`** 方法：

**功能**：根据传入的 `DeleteRequest` 对象来删除文档。
**参数**：`DeleteRequest request`  
- `DeleteRequest` 是一个包含删除文档所需信息的对象。
- 它通常需要指定以下内容：
  - `index`：要删除文档的索引名称。
  - `id`：要删除文档的 ID。
  - `routing`：指定文档的路由（可选）。
  - `version`：指定文档的版本（可选，用于版本控制，避免删除不同版本的文档）。
  - `versionType`：版本控制的类型（可选）。

**返回值**：返回一个 `DeleteResponse` 对象，包含删除操作的结果。

```java
DeleteRequest request = new DeleteRequest("index_name", "doc_id");
DeleteResponse response = esClient.delete(request);
```

**`delete(Function<DeleteRequest.Builder, ObjectBuilder<DeleteRequest>> fn)`** 方法：

**功能**：使用一个函数式编程风格的构建器来创建 `DeleteRequest` 对象，并执行删除操作。
**参数**：一个函数 `fn`，该函数将一个 `DeleteRequest.Builder` 转换为 `DeleteRequest` 对象。  
- `DeleteRequest.Builder` 是用于构建 `DeleteRequest` 对象的构建器。
  

**返回值**：返回一个 `DeleteResponse` 对象。

```java
DeleteResponse response = esClient.delete(builder -> builder
    .index("index_name")
    .id("doc_id")
);
```

**`DeleteRequest` 类的常用字段和方法：**

`DeleteRequest` 是一个用于表示删除文档请求的类，常用字段和方法包括：

- **`index`**：文档所在的索引名称。
- **`id`**：要删除文档的 ID。
- **`routing`**：路由（可选），用于指定文档的路由。
- **`version`**：文档的版本（可选），用于版本控制。
- **`versionType`**：版本控制类型（可选），例如 `internal` 或 `external`。
- **`timeout`**：操作超时（可选）。

```java
DeleteRequest request = new DeleteRequest("index_name", "doc_id");
request.routing("routing_value");
request.version(2);
request.versionType(VersionType.INTERNAL);
DeleteResponse response = esClient.delete(request);
```

**`DeleteResponse` 类的常用字段和方法：**

`DeleteResponse` 是删除操作的响应对象，常用字段和方法包括：

- **`getResult()`**：获取删除操作的结果，例如 `DELETED` 或 `NOT_FOUND`。
- **`getId()`**：获取删除文档的 ID。
- **`getIndex()`**：获取删除文档的索引名称。
- **`getVersion()`**：获取删除文档的版本号。
- **`getShardInfo()`**：获取与删除操作相关的分片信息。

```java
DeleteResponse response = esClient.delete(request);
String result = response.getResult().toString(); // 获取删除结果
String docId = response.getId(); // 获取文档 ID
```

总结：

`esClient.delete` 方法有两种主要的调用方式：
1. **直接传递 `DeleteRequest` 对象**：适用于已经创建好的删除请求对象。
2. **使用构建器模式**：通过一个函数来构建 `DeleteRequest` 对象。

通过这两种方式，你可以灵活地删除文档并获取删除操作的响应结果。如果需要，删除请求可以包含路由、版本控制、超时等其他参数，响应则包含删除的结果、文档 ID、索引名和版本号等信息。

### 条件删除

类似条件更新。

### 查询

使用 Elasticsearch 客户端发送 HTTP Post请求 `/products/_search` 查询数据，得到类似如下结果：

```json
{
  "_shards": {
    "failed": 0,
    "skipped": 0,
    "successful": 1,
    "total": 1
  },
  "hits": {
    "hits": [
      {
        "_id": "bk-1",
        "_index": "products",
        "_score": 1,
        "_source": {
          "cityBike": "City bike",
          "sku": "bk-1",
          "v": 123
        }
      }
    ],
    "max_score": 1,
    "total": {
      "relation": "eq",
      "value": 1
    }
  },
  "timed_out": false,
  "took": 2
}
```

这个 JSON 响应是来自 Elasticsearch 搜索请求的结果。它包含了有关查询执行情况以及返回的文档的详细信息。以下是各个字段的解释：

`_shards` 部分描述了 Elasticsearch 执行搜索请求时的分片（shard）状态。Elasticsearch 将数据存储在多个分片中，因此此部分提供了请求在分片上执行的结果。

- `failed`：表示查询过程中失败的分片数量（在这个例子中是 0，表示没有失败的分片）。
- `skipped`：表示跳过的分片数量（在这个例子中是 0，表示没有跳过分片）。
- `successful`：表示成功执行查询的分片数量（在这个例子中是 1，表示有一个分片成功执行）。
- `total`：表示总共的分片数量（在这个例子中是 1，表示只有一个分片）。



`hits`部分包含了查询的匹配结果，包括每个匹配文档的信息。

- `hits`: 一个数组，包含了所有符合查询条件的文档。在这个例子中，只有一个文档符合条件。
- `max_score`: 表示查询结果中最高的评分（`_score`），用来衡量文档与查询条件的匹配度。在这个例子中，`max_score` 是 1，表示评分最高的文档的得分为 1。
- `total`: 这是符合查询条件的文档总数。`relation: "eq"` 表示查询结果是“等于”的关系，`value: 1` 表示查询返回了 1 个符合条件的文档。



`_id`, `_index`, `_score`, `_source`,这些字段描述了每个文档的具体信息。

- `_id`: 该字段表示文档的唯一标识符。在这个例子中，文档的 `_id` 是 `"bk-1"`。

- `_index`: 该字段表示文档所在的索引。在这个例子中，文档存储在 `"products"` 索引中。

- `_score`: 这是文档的相关性评分（在 Elasticsearch 中通常用于衡量文档与查询条件的匹配度）。此值在这里为 `1`，表示该文档完全匹配查询。

- `_source`: 这是实际存储在 Elasticsearch 中的文档内容。在这个例子中，文档的内容如下：

  - `"cityBike": "City bike"`：表示该文档的 `cityBike` 字段值为 `"City bike"`。
  - `"sku": "bk-1"`：表示该文档的 `sku` 字段值为 `"bk-1"`。
  - `"v": 123`：表示该文档的 `v` 字段值为 `123`。

  

`timed_out`,表示查询是否超时。在这个例子中，它是 `false`，意味着查询没有超时。

`took`,表示查询花费的时间（单位是毫秒）。在这个例子中，`took` 是 `2`，表示查询的执行时间为 2 毫秒。

这个 JSON 响应的结构反映了一个 Elasticsearch 查询的结果，包含了以下主要部分：

- **分片执行状态**（`_shards`）：查询执行的成功和失败情况。
- **查询结果**（`hits`）：匹配查询条件的文档。
- **查询性能**：如查询时间和是否超时。

在该示例中，查询成功返回了一个文档，文档的内容包括字段 `cityBike`, `sku`, 和 `v`，并且查询执行速度很快（2 毫秒）。

------

在 Elasticsearch 中，默认情况下，`Search` 查询返回的文档数量是 10 条。这是 Elasticsearch 的分页机制（`from` 和 `size`）的一部分。要返回更多的数据，你需要显式地设置查询的 `size` 参数。

Java代码实例：

```java
SearchResponse<Map> response = esClient.search(builder -> builder
                .index("products")
                .query(q -> q.match(m -> m.field("v").query(50)))
                .size(10)
                .from(0),
        Map.class
);
HitsMetadata<Map> hits = response.hits();
List<Map> collect = hits.hits().stream().map(Hit::source).toList();
collect.forEach(System.out::println);
```

这段代码演示了如何在 Elasticsearch 中执行一个简单的搜索查询，获取结果并处理。下面是对每个部分的详细解释：

**`SearchResponse<Map> response = esClient.search(...)`**：
这是一个用于执行搜索查询的调用，返回一个 `SearchResponse` 对象，其中 `Map` 是查询结果的类型。通过这段代码，应用将查询 Elasticsearch 索引并获取匹配的结果。

参数解释：
- **`builder -> builder.index("products")`**：指定查询的目标索引为 `products`。
- **`.query(q -> q.match(m -> m.field("v").query(50)))`**：
  - 这里使用了 `match` 查询来查找字段 `v` 的值为 `50` 的文档。
  - `field("v")` 指定字段名为 `v`，`query(50)` 表示查询值为 `50` 的文档。
  
- **`.size(10)`**：限制查询结果返回的文档数目为 10。
  
- **`.from(0)`**：指定查询结果的起始位置为 `0`（即从第一个文档开始返回）。通常用于分页查询。

- **`Map.class`**：指定返回的结果类型为 `Map`。`Map` 表示一个无类型约束的键值对集合（通常为 `String` 对应字段名称，`Object` 对应字段值），这里每个文档的内容将作为 `Map` 对象返回。

**`HitsMetadata<Map> hits = response.hits();`**：
- **`response.hits()`**：从 `SearchResponse` 对象中提取出 `HitsMetadata`，其中包含了查询返回的所有文档的详细信息。
- **`HitsMetadata<Map>`**：`HitsMetadata` 是一个包含了多条匹配文档的元数据的类，`Map` 类型的 `hits` 表示每个文档的内容都将被当作 `Map` 对象来处理。

**`List<Map> collect = hits.hits().stream().map(Hit::source).toList();`**：
- **`hits.hits()`**：获取包含查询结果文档的列表（每个文档用 `Hit` 对象表示）。
- **`.stream()`**：将 `hits.hits()` 转换为流（stream）以便进行进一步的操作。
- **`.map(Hit::source)`**：`Hit::source` 是一个方法引用，表示从每个 `Hit` 对象中提取文档内容（即文档的 `_source` 部分）。这个方法返回一个 `Map` 对象，包含了文档的字段和值。
- **`.toList()`**：将流中的所有 `Map` 对象收集到一个列表中，最终得到包含所有查询结果文档内容的列表。

**`collect.forEach(System.out::println);`**：
- **`forEach(System.out::println)`**：对 `collect` 列表中的每一个元素（即每一个 `Map` 对象）执行 `println` 输出操作，逐个打印出查询结果文档的内容。

这段代码执行了一个查询，查找索引 `products` 中字段 `v` 的值为 `50` 的文档。返回的每个文档的内容被当作 `Map` 对象处理，并且将查询结果中的每个文档内容打印出来。这个代码的核心流程包括：
1. 使用 `esClient.search` 执行查询。
2. 提取查询结果中的文档。
3. 将每个文档内容提取为 `Map` 并收集到一个列表中。
4. 将结果列表打印出来。

执行该查询后，控制台将打印出满足条件（`v = 50`）的文档内容。

#### `SearchRequest`

`SearchRequest` 是 Elasticsearch Java 客户端中用于构建和执行搜索查询的请求对象。以下是 `SearchRequest` 类中的主要字段和方法：

**主要字段：**

**`index`**：类型：`String[]`，指定搜索的索引名称。如果多个索引需要查询，可以传递索引数组。

**`types`**（已废弃，建议不再使用）：类型：`String[]`，指定查询的类型。在 Elasticsearch 7.x 之后，类型已经被弃用，通常不再使用。

**`query`**：类型：`Query`，指定搜索查询的主体，通常是一个查询 DSL（如 `match`、`term` 等）。

**`size`**： 类型：`int`，默认值：`10`，指定要返回的最大结果数。

**`from`**：类型：`int`， 默认值：`0`，指定查询结果的起始偏移量，通常用于分页。

**`sort`**：类型：`SortBuilder[]`，指定结果排序方式，可以根据字段或自定义排序进行排序。

**`source`**：类型：`SourceBuilder`，控制 `_source` 字段的输出，允许配置字段筛选（包括 `includes` 和 `excludes`）等。

**`trackTotalHits`**：类型：`boolean`，默认值：`true`，指定是否在返回的结果中包含总命中数。设置为 `false` 可以提高性能。

**`aggregations`**：类型：`AggregationBuilder`，用于指定聚合查询，允许执行如 `terms`、`range` 等聚合操作。

**`highlight`**：类型：`HighlightBuilder`，用于指定高亮显示的字段。

**`suggest`**：类型：`SuggestBuilder`，指定搜索建议（suggest）操作。



**主要方法：**

**`index(String... index)`**：设置要查询的索引名称。可以使用一个或多个索引名称。

**`query(QueryBuilder query)`**：设置查询条件，`query` 是一个 `QueryBuilder` 对象，可以是各种类型的查询（如 `match`、`term`）。

**`size(int size)`**：设置返回的最大文档数。

**`from(int from)`**：设置查询结果的偏移量，用于分页。

**`sort(SortBuilder... sort)`**：设置查询结果的排序规则。

**`trackTotalHits(boolean trackTotalHits)`**：设置是否跟踪总命中数。

**`source(SourceBuilder source)`**：设置 `_source` 字段的筛选条件，控制返回的字段内容。

**`aggregations(Map<String, AggregationBuilder> aggregations)`**：设置聚合操作。可以通过键值对形式指定多个聚合操作。

**`highlight(HighlightBuilder highlight)`**：设置高亮显示的字段。

**`suggest(SuggestBuilder suggest)`**：设置查询建议，主要用于拼写建议或搜索建议。

**`explain(boolean explain)`**：设置是否返回查询的详细评分解释。

**`profile(boolean profile)`**：设置是否启用性能分析，以帮助理解查询执行的详细情况。



`SearchRequest` 是构建和执行 Elasticsearch 查询的核心对象，它允许设置查询的索引、查询条件、分页参数、排序、聚合等。通过对 `SearchSourceBuilder` 进行构造，能够进一步指定查询的细节。

------

#### `SearchResponse`

在 Elasticsearch 8.x 中，`SearchResponse` 类是一个封装了搜索结果的对象，包含了搜索查询的响应信息。它继承自 `BaseResponse` 类，并提供了多个字段和方法来处理搜索结果。

主要字段：

**`hits`**，类型：`SearchHits`，表示搜索到的所有命中的文档。通过这个字段可以访问所有匹配的文档，以及它们的得分、排序等信息。

**`aggregations`**，类型：`Aggregations`，包含聚合结果。聚合是 Elasticsearch 提供的一种强大功能，用于对数据进行分组、求和、平均等操作。

**`suggest`**，类型：`Map<String, List<Suggest.Suggestion<T>>>`，包含搜索建议（如果查询使用了建议功能）。

**`scrollId`**，类型：`String`，在使用滚动查询时，返回一个 scrollId，用于获取接下来的结果。

**`took`**，类型：`long`，表示执行查询所花费的时间（单位：毫秒）。

**`timedOut`**，类型：`boolean`，表示搜索是否超时。

**`shards`**，类型：`Shards`，包含搜索过程中涉及的所有分片的信息。

**`total`**，类型：`long`，表示查询匹配的文档总数。

**`failedShards`**，类型：`List<FailedShard>`，表示查询过程中失败的分片信息。

主要方法：与字段同名。

这些字段和方法提供了对 Elasticsearch 搜索响应的全面访问，能够让你获取查询结果、聚合结果、建议、执行时间等重要信息。

------

#### `HitsMetadata`

在 Elasticsearch 8.x 中，`HitsMetadata` 是一个用来表示搜索结果元数据的类，主要用于封装搜索命中的元信息，如文档的 `_id`、得分（score）、排序等。它是 `SearchHits` 中 `Hits` 数组中单个命中的元数据。

主要字段：
**`_id`**，类型：`String`，文档的唯一标识符，即 `_id` 字段。

**`_index`**，类型：`String`，文档所在的索引名称。

**`_score`**，类型：`Float`，文档的得分，表示该文档与查询条件的匹配度。

**`_source`**，类型：`Map<String, Object>`，文档的原始数据（即 `_source` 字段），它是存储在 Elasticsearch 中的实际内容。

**`_routing`**，类型：`String`，路由信息，用于确定文档所在的分片（如果启用了路由）。

**`_version`**，类型：`Long`，文档的版本号，适用于启用了版本控制的索引。

**`fields`**，类型：`Map<String, List<Object>>`，存储查询时请求的字段值。如果在查询中指定了返回特定字段，那么这些字段将包含在 `fields` 中。

**`highlight`**，类型：`Map<String, List<String>>`，高亮显示的字段，如果查询中使用了高亮功能。

**`sort`**，类型：`List<Object>`，文档的排序值。如果查询使用了排序功能，`sort` 字段中将包含排序后的结果。

**`hits`**,类型：`List<Hit<T>>`,用于嵌套查询的内嵌命中结果（例如，nested 查询或子查询的结果）。如果查询包含嵌套或子查询，`hits` 将包含这些结果。

主要方法：与字段同名。

`HitsMetadata` 类是用于封装 Elasticsearch 查询结果中的单个命中文档的元数据。它提供了文档的基本信息，如 ID、索引、得分等，并支持获取高亮、排序、字段等附加信息。通过这些字段和方法，您可以方便地处理和访问查询结果中的各种数据。

#### `Hit`

这是一个 Elasticsearch 查询返回结果的表示类，通常用于存储从 Elasticsearch 中查询到的单个文档的信息。该类可以包含多个字段，包括文档 ID、索引、得分、字段内容、内嵌查询结果、排序信息等。

主要字段解释：

- **`index`**: 返回文档所在的索引名称。
- **`id`**: 返回文档的 ID。
- **`score`**: 查询得分，通常是相关性评分，表示文档与查询的匹配度。
- **`explanation`**: 查询解释，包含如何计算得分的信息。
- **`fields`**: 文档的字段数据，这些字段是额外的自定义字段（通常是 `_source` 之外的字段）。
- **`highlight`**: 高亮显示的字段，用于标明查询中匹配的部分。
- **`innerHits`**: 内嵌查询的结果，用于查询包含子文档的情况。
- **`matchedQueries`**: 匹配到的查询条件。
- **`nested`**: 如果文档是嵌套类型，包含嵌套文档的信息。
- **`ignored`**: 被忽略的字段。
- **`ignoredFieldValues`**: 被忽略字段的具体值。
- **`shard`**: 该文档所在的分片。
- **`node`**: 存储该文档的 Elasticsearch 节点。
- **`routing`**: 路由信息，帮助确定文档所在的分片。
- **`source`**: 文档的源数据，通常是原始的 JSON 数据。
- **`seqNo`**: 文档的序列号。
- **`primaryTerm`**: 文档的主版本号。
- **`version`**: 文档的版本号。
- **`sort`**: 排序信息，记录文档的排序字段。

如果你需要查询某些文档并获取它们的结果，你可以使用 `Hit` 类来表示这些文档：

```java
SearchRequest searchRequest = SearchRequest.of(s -> s
    .query(q -> q
        .match(m -> m.field("title").query("elasticsearch"))  // 查询条件：匹配 'title' 字段
    )
    .sort(priceSort, publishDateSort, nameSort)
);

// 假设返回的结果是 Hit 对象
Hit<MyDocument> hit = response.hits().hits().get(0);
MyDocument doc = hit.source(); // 获取文档源数据
```

`Hit<TDocument>` 类表示 Elasticsearch 查询返回的单个文档，并包含了丰富的元数据，如文档得分、排序信息、内嵌查询结果等。它可以根据不同的查询需求和文档类型灵活配置，并提供了序列化和转换为 JSON 的功能。



#### `SourceFilter`

**`SourceFilter` 类的常用字段与方法**：

用于指定哪些字段包含或排除在返回结果中。

- **`includes(String... fields)`**：指定要返回的字段。
- **`excludes(String... fields)`**：指定不返回的字段。

```java
SearchResponse<MyDocument> response = esClient.search(builder -> builder
    .index("products")
    .source(s -> s.includes("name", "price").excludes("description"))
    .query(q -> q.match(m -> m.field("category").query("electronics"))),
    MyDocument.class
);
```

同更新的`SourceFilter`。

#### 特殊字段

在 Elasticsearch 中，`keyword` 是一种特殊的字段类型，它通常用于不分词（即不被分割成多个词项）的字段。除了 `keyword` 类型，Elasticsearch 还支持其他一些特殊的字段标识符（字段类型），这些标识符在创建映射时可以指定。以下是常见的一些特殊字段类型：

**`keyword`**，标识需要精确匹配的字段，通常用于 ID、标签、邮箱、域名等字段。字段的内容不会被分词，而是作为一个整体来索引。

   - **用法**：`tagInfoList.tagList.keyword`
   - 例如：`"tagList": ["tag1", "tag2", "tag3"]`

**`text`**，标识需要被分词的字段，通常用于需要进行全文搜索的字段。例如，文章的内容、评论、描述等字段通常使用 `text` 类型。

- **用法**：`title`, `description`
- Elasticsearch 会对 `text` 类型的字段进行分词处理，支持全文搜索。

**`date`**，表示日期时间数据。通常用于表示时间戳、事件日期等。

- **用法**：`createdDate`, `publishDate`
- 支持多种格式，如 `yyyy-MM-dd`, `yyyy-MM-dd HH:mm:ss` 等。

**`long`, `integer`, `short`, `byte`, `double`, `float`**,这些是数值类型，用于表示整数和浮点数。不同的类型有不同的存储范围。
**用法**：

 - `price` (浮动数值)
 - `quantity` (整数)
 - `timestamp` (长整型时间戳)

**`boolean`**，表示布尔值，通常是 `true` 或 `false`。
**用法**：`isActive`, `isAvailable`

**`object`**，表示嵌套对象。`object` 字段可以包含复杂的结构，类似 JSON 对象。

- **用法**：`address`, `userInfo`
- 嵌套对象可以包含其他字段类型，可以是 `text`, `keyword`, `integer` 等。

**`nested`**

- `nested` 类型是一个特殊的 `object` 类型，用于处理数组中的对象。它为数组中的每个对象分配一个单独的文档，可以在查询时进行嵌套查询。
- **用法**：`comments` （评论列表）
- `nested` 类型与 `object` 类型类似，但它为每个子文档创建了一个独立的查询上下文，可以通过 `nested` 查询进行高效查询。

**`geo_point`**，表示地理位置数据，通常用于存储经纬度。

 - **用法**：`location` 或 `coordinates`
 - 可以存储如经纬度坐标（`latitude`, `longitude`）和用于地理位置搜索。

**`ip`**，表示 IP 地址字段。

- **用法**：`ipAddress`, `clientIp`

**`binary`**，存储二进制数据，如图像、视频等。

- **用法**：`image`, `fileData`

**`scaled_float`**，存储浮动数值，并通过一个缩放因子来避免存储过大的数字。

- **用法**：`discount_rate` （存储带缩放比例的浮动数值）

**`token_count`**，计算文本字段的词项数量，可以用于某些查询分析或统计。

- **用法**：`wordCount`（存储一个字段中的词项数）

**`alias`**用于创建字段别名，它不会存储数据，而只是将查询映射到实际的字段。

- **用法**：`current_email` 可以作为 `email` 字段的别名。

在查询中，你可以指定字段类型来进行不同的操作，例如，`keyword` 字段用于精确匹配，`text` 字段用于全文搜索，而 `nested` 字段则用于处理嵌套的对象数组等。不同的字段类型适用于不同的场景，因此了解它们的区别和用途对于设计高效的查询非常重要。



如果在 Elasticsearch 中不设置字段类型，Elasticsearch 会尝试根据数据的内容自动推断字段的类型，称为 **动态映射**（Dynamic Mapping）。默认情况下，Elasticsearch 会使用以下规则来推断字段类型：

**自动类型推断（Dynamic Mapping）**

   - **字符串字段（`text` 或 `keyword`）**：
     - 如果字段值是 **文本** 类型（如字符串），Elasticsearch 默认将其映射为 `text` 类型，适用于需要分词的字段。如果 Elasticsearch 检测到该字段包含 URL 或电子邮件等常见标识符，它可能会将其映射为 `keyword` 类型。
   - **数字字段（`long`, `integer`, `float`, `double`, 等）**：
     - 如果字段值是 **数字** 类型（整数或浮点数），Elasticsearch 会将其映射为合适的数值类型（如 `long`, `integer`, `float`）。
   - **日期字段（`date`）**：
     - 如果字段值是 **日期时间格式**（如 `2022-01-01` 或 `1629834074`），Elasticsearch 会自动推断为 `date` 类型。
   - **布尔字段（`boolean`）**：
     - 如果字段值是 **布尔值**（`true` 或 `false`），Elasticsearch 会将其映射为 `boolean` 类型。
   - **数组字段（`object`, `nested`）**：
     - 如果字段值是一个 **数组**，Elasticsearch 会尝试推断它是 `array` 类型的对象或基本数据类型。如果数组中的元素是对象，则会推断为 `nested` 类型；如果是简单类型（如字符串、数字），则会根据元素类型推断。

**动态映射的行为**

   - **动态启用**：在默认情况下，Elasticsearch 启用动态映射。这意味着如果索引的映射中没有明确指定某个字段类型，Elasticsearch 会尝试根据文档中的数据推断出字段的类型。
   - **动态禁用**：你也可以通过设置 `dynamic: false` 来禁用动态映射，防止 Elasticsearch 自动创建新字段的映射。此时，如果文档中包含未知字段，Elasticsearch 会拒绝该文档。此选项适用于对数据格式要求严格的场景。
   - **动态模板**：你还可以使用 **动态模板** 来对字段的类型进行精确控制，例如，指定某些字段自动映射为 `keyword` 类型，或者根据字段名称自动使用特定的数据类型。

**没有显式设置字段类型的后果**
如果你没有为某个字段设置明确的类型，Elasticsearch 会按以下方式处理：

   - **字符串类型**：通常会被自动推断为 `text` 类型，但如果该字段的内容表现出某些模式（如 URL、电子邮件地址、IP 地址等），可能会被推断为 `keyword` 类型。
   - **数值类型**：会自动推断为整数、长整型、浮动数值或双精度浮动数值，具体取决于输入的值。
   - **日期类型**：如果字段值看起来是日期格式，Elasticsearch 会自动将其映射为 `date` 类型。
   - **未知字段**：如果一个字段的类型无法自动推断，Elasticsearch 会尝试将它映射为 `text` 或其他常见类型，并且你可以使用 `dynamic` 设置控制是否允许自动创建字段。

**使用动态模板进行控制**
动态模板允许你通过预定义规则控制字段的类型。例如，如果你希望所有带 `.id` 后缀的字段都映射为 `keyword` 类型，可以使用如下的动态模板：

```json
{
  "mappings": {
    "dynamic_templates": [
      {
        "strings_as_keywords": {
          "match": "*_id",
          "mapping": {
            "type": "keyword"
          }
        }
      }
    ]
  }
}
```

**禁用动态映射**
如果你希望禁止自动创建新字段，可以设置 `dynamic: false` 来禁用动态映射：

```json
{
  "mappings": {
    "dynamic": false,
    "properties": {
      "name": {
        "type": "text"
      }
    }
  }
}
```

- **默认情况下**，如果不显式指定字段类型，Elasticsearch 会根据字段值的类型自动推断字段的类型，采用动态映射。
- 对于大多数应用，Elasticsearch 的自动类型推断足够好，但是在某些场景下，特别是当数据结构复杂时，显式地指定字段类型可以提高索引的性能和准确性，避免不必要的类型推断错误。

#### `Query`

在 Elasticsearch 中，`Query` 是一个顶级接口，通常与 `bool` 查询、`term` 查询、`terms` 查询等结合使用。查询通常是通过构建器模式来创建的，允许我们灵活地组合查询条件。

**默认情况下，会对非数字和布尔类型分词，因此如果不要分词，请在字段后面加后缀`.keyword`。**

------

**`Query` 的常用构建方式**：

##### `match`

全词匹配查询。

```java
.query(q -> q.match(m -> m.field("title").query("elasticsearch")));
```

------

##### `term`

用于精确匹配某个字段的值。

```java
.query(q -> q.term(t -> t.field("id").value("123")));
```

------

##### `terms`

用于匹配多个值，通常用于字段的多个可能值查询。

```
.query(
        q -> q.terms(
                t -> t.field("id").terms(tm ->
                        tm.value(List.of(FieldValue.of("123"),FieldValue.of("456")))
                )
        )
)
```

------

##### `bool`

布尔查询，用于组合多个查询条件。包括 `must`、`should` 和 `mustNot` 等。例如，`must` 表示查询结果必须匹配的条件，而 `should` 表示查询结果最好匹配的条件（但不是必须的）。

```java
.query(q -> q.bool(b -> b
    .must(m -> m.match(m1 -> m1.field("title").query("elasticsearch")))
    .filter(f -> f.term(t -> t.field("status").value("active")))
));
```

示例2：

```java
Function<Query.Builder, ObjectBuilder<Query>> fn = q -> q
.bool(b -> b
    .must(m -> m
        .term(tagCategoryQuery)   // 必须匹配的条件：tagCategoryQuery
    )
    .must(m -> m
        .terms(tagListQuery)      // 必须匹配的条件：tagListQuery
    )
);
```

如果使用`must`，那么两个查询条件必须同时满足；如果使用 `should`，那么至少一个条件必须满足。示例：

```java
// 使用Elasticsearch客户端执行一个查询，查询字段 "title" 是否匹配查询词 "elasticsearch"
esClient.search(c -> c
        .query(q -> q.match(m -> m.field("title").query("elasticsearch")))  // 匹配查询
, Map.class);  // 返回结果类型为 Map

// 创建一个 Term 查询，查询字段 "tagInfoList.tagCategory.keyword" 是否为 1
TermQuery tagCategoryQuery = TermQuery.of(t -> t.field("tagInfoList.tagCategory.keyword").value(1));

// 创建一个 Terms 查询，查询字段 "tagInfoList.tagList.keyword" 是否包含 "123" 或 "456"
TermsQuery tagListQuery = TermsQuery.of(t -> t.field("tagInfoList.tagList.keyword")
        .terms(tm -> tm.value(List.of(FieldValue.of("123"), FieldValue.of("456")))));

// 构建一个 OR 查询，使用 bool 查询的 should 子句，表示满足以下任一条件即为匹配
Function<Query.Builder, ObjectBuilder<Query>> orQuery = q -> q
        .bool(b -> b
                // 第一个 should 查询：tagCategoryQuery，查询是否匹配 tagCategory
                .should(s -> s.term(tagCategoryQuery))  
                // 第二个 should 查询：tagListQuery，查询是否匹配 tagList
                .should(s -> s.terms(tagListQuery))  
                // minimumShouldMatch 设置为 "1"，表示至少有一个 should 条件满足即可
                .minimumShouldMatch("1")
        );

```

------

##### `range`

范围查询，用于查找字段值在某个范围内的文档。

```java
.query(q -> q.range(r -> r.field("price").gte(JsonData.of(100)).lte(JsonData.of(500))))
```

------

##### `prefix` 

前缀查询（查询）

```java
PrefixQuery prefixQuery = PrefixQuery.of(p -> p
    .field("title.keyword")
    .value("prefixValue")
);

Function<Query.Builder, ObjectBuilder<Query>> prefixCondition = q -> q
    .bool(b -> b
        .must(m -> m.prefix(prefixQuery))
    );
```

------

##### `match` 

匹配查询

```java
MatchQuery matchQuery = MatchQuery.of(m -> m
    .field("description")
    .query("search text")
);

Function<Query.Builder, ObjectBuilder<Query>> matchCondition = q -> q
    .bool(b -> b
        .must(m -> m.match(matchQuery))
    );
```

------

##### `wildcard`

通配符查询（查询）

```java
WildcardQuery wildcardQuery = WildcardQuery.of(w -> w
    .field("content")
    .value("val*")
);

Function<Query.Builder, ObjectBuilder<Query>> wildcardCondition = q -> q
    .bool(b -> b
        .must(m -> m.wildcard(wildcardQuery))
    );
```

##### `regexp`

正则表达式匹配，提供比 `wildcard` 查询更强大的模式匹配能力。正则表达式可以更灵活地定义匹配模式，如字符类、重复次数、分组等。







------

##### `matchPhrase`

`match_phrase` 是 Elasticsearch 中用于短语匹配（Phrase Matching）的一种查询类型。与普通的 `match` 查询不同，`match_phrase` 查询会考虑词语的顺序，并且要求词语紧密相邻，因此更适合用于查询语句、短语或句子等场景。

`match_phrase` 的基本特性：

- **顺序敏感**：`match_phrase` 会按给定的顺序匹配文本，不能像普通的 `match` 查询那样不考虑顺序。
- **相邻词语匹配**：要求文本中的词语相邻，并且之间没有其他词语（如果设置了 `slop`，则允许词语之间有一定的“跳跃”）。
- **适用于短语查询**：适合搜索包含特定短语或句子的情况。

`match_phrase` 查询语法结构比较简单，通常使用以下格式：

```json
{
  "query": {
    "match_phrase": {
      "field": "short phrase"
    }
  }
}
```

- `field`：要搜索的字段。
- `"short phrase"`：要匹配的短语，多个词会按照给定顺序进行匹配。

示例：

假设有以下文档：

```json
{
  "text": "Elasticsearch provides fast and scalable search."
}
```

**匹配短语**：

```json
{
  "query": {
    "match_phrase": {
      "text": "fast and scalable"
    }
  }
}
```

该查询会搜索包含短语 "fast and scalable" 的文档，注意这要求短语中的词语按顺序出现。

**顺序敏感性**：

```json
{
  "query": {
    "match_phrase": {
      "text": "scalable fast"
    }
  }
}
```

这将不会匹配到前面的文档，因为词语的顺序是不同的。`match_phrase` 查询是顺序敏感的。

`slop` 参数：

`slop` 参数允许在匹配的短语中插入一定数量的词语（即可以“跳跃”）。例如，如果我们设置 `slop` 为 2，就表示可以在短语中插入最多 2 个词。

```json
{
  "query": {
    "match_phrase": {
      "text": {
        "query": "fast scalable search",
        "slop": 2
      }
    }
  }
}
```

在这个查询中，`slop` 设置为 2，表示可以接受 `fast`, `scalable`, `search` 三个词之间最多有 2 个词。也就是说，查询会匹配包含这些词的任何顺序，允许有最多两个词的间隔。

`match_phrase` 与 `match` 的区别：

- **顺序**：`match` 查询不考虑词语的顺序，而 `match_phrase` 查询要求词语按照指定的顺序排列。
- **相邻性**：`match` 查询可以在一个字段中任意位置找到匹配词，而 `match_phrase` 查询要求词语相邻，除非使用 `slop`。

示例：
使用 `match` 查询：

```json
{
"query": {
  "match": {
    "text": "fast scalable"
  }
}
}
```
该查询会匹配包含 `fast` 和 `scalable` 两个词的任何文档，无论它们是否相邻，是否按顺序排列。

使用 `match_phrase` 查询：
```json
{
"query": {
  "match_phrase": {
    "text": "fast scalable"
  }
}
}
```
该查询要求文档中 `fast` 和 `scalable` 两个词要紧密相邻，且按顺序排列。

使用 `match_phrase` 查询的场景：

**搜索带有固定顺序的短语**：如果你希望查询精确的短语，并且要求词语之间相对顺序不变，可以使用 `match_phrase`。

例如，查询某个特定地址、名称或短语：

```json
{
 "query": {
   "match_phrase": {
     "address": "New York City"
   }
 }
}
```

**避免词语出现顺序混乱的情况**：`match_phrase` 查询适合用在内容中顺序非常重要的场景，比如标题、句子、文章等。

**精准短语搜索**：对于一些需要高度精确匹配的查询，`match_phrase` 是非常合适的选择，例如查询产品名称、地理位置等。

示例代码（Java）：

在 Java 中，使用 `match_phrase` 查询类似于其他查询类型。你可以使用 Elasticsearch 客户端 API 来构建查询：

```java
Query matchPhraseQuery = Query.of(q -> q.matchPhrase(mp -> mp
        .field("text")
        .query("fast scalable")
        .slop(1)  // 可选，设置slop来允许跳跃
));
```

总结：

- `match_phrase` 查询用于精确匹配短语，要求短语中的词语顺序一致且相邻。
- `slop` 参数允许在短语中插入一定的词语间隔，使得查询更加灵活。
- 适用于需要顺序和相邻关系的重要短语匹配场景。







------

##### `ids`

查找制定出的文档ID

```java
List<String> ids=...
...
.query(queryBuilder -> queryBuilder
        .ids(idsQueryBuilder -> idsQueryBuilder
                .values(ids))
)
```

在这个查询中，它会根据给定的文档 ID 来返回对应的文档。

`idsQueryBuilder -> idsQueryBuilder.values(ids)`：`idsQueryBuilder` 是用来构建 ID 查询的构建器。在这段代码中，通过 `values(ids)` 方法传入一个包含文档 ID 的列表，表示希望查找这些 ID 对应的文档。`ids` 是一个包含多个文档 ID 的集合（通常是一个 List 或数组）。

------

##### `multiMatch`

跨多个字段的全文检索，会分词，**可以设置为短语匹配：`.type(TextQueryType.Phrase)  // 使用短语查询`。**

```java
query = Query.of(m -> m.multiMatch(mm -> mm
        .query(search)                       // 查询关键词，通常是用户输入的搜索词
        .fields("memberInfo","name")             
        .type(BestFields)                    // 设置查询类型为 BestFields
    )
);
```

`multi_match` 查询是 Elasticsearch 中用于对多个字段进行相同查询条件的查询。它类似于 `match` 查询，但可以一次性匹配多个字段，通常用于对多个文本字段的全文搜索。

当用户希望搜索多个字段时，可以使用 `multi_match` 查询。比如在用户搜索时，可能同时需要对 `title`、`description`、`content` 等多个字段进行匹配，而不需要逐个字段进行查询。

**`.query(search)`**：设置了搜索的关键词，即用户要查找的文本。在这个代码片段中，`search` 变量通常是一个字符串，包含用户输入的搜索条件。

**`.fields("memberInfo","name")`**：指定了哪些字段将被用于匹配搜索关键词，注意字段不能用通配符。

**`.type(BestFields)`**：设置了 `multi_match` 查询的类型为 `BestFields`。`BestFields` 是 Elasticsearch 中的一种匹配类型，用于选择最相关的字段进行评分计算。

  - **`BestFields`**：这是默认的查询类型，它会根据每个字段的匹配度选择最相关的字段进行评分。如果查询涉及多个字段，`BestFields` 会为每个字段计算相关性评分，最终选择评分最高的字段作为匹配结果。

  - 在 `BestFields` 模式下，如果在多个字段中找到匹配项，Elasticsearch 会根据字段的相关性（比如匹配的词频、字段的文本长度等因素）来选择最相关的一个字段的结果。


如果 `memberInfo` 对象下有多个字段，`BestFields` 会自动选择最相关的字段进行评分。比如，如果 `memberInfo` 下有 `name`、`address` 和 `email` 字段，查询 `"John"` 时，假设：
- `name` 匹配 `"John"`，得分为 1.0
- `email` 匹配 `"john.doe@example.com"`，得分为 0.5
- `address` 没有匹配项，得分为 0

在这种情况下，`BestFields` 会选择 `name` 字段，因为它的匹配度更高，得分为 1.0，返回这个字段作为最相关的匹配字段。

------

##### `TextQueryType`

在 Elasticsearch 中，`multi_match` 查询用于在多个字段上执行查询。不同的 `multi_match` 查询类型可以影响查询结果的计算方式。这些类型主要用于在文本字段上执行多字段匹配，每种类型有不同的应用场景。

`TextQueryType` 枚举提供了几种常见的 `multi_match` 查询类型，每种类型都有不同的行为。接下来我会详细解释每种类型的用法和适用场景。

**BestFields (`best_fields`)**：这是默认的查询类型。它会选择最佳匹配的字段来返回结果。如果多个字段匹配查询词，`best_fields` 会根据每个字段的匹配度（相关性）来选择最相关的一个字段的结果。

**适用场景**：适用于当你在多个字段上搜索相同的查询词时，查询应该集中在最相关的字段上，而不是计算所有字段的综合评分。

 ```json
 {
   "query": {
     "multi_match": {
       "query": "Elasticsearch tutorial",
       "fields": ["title", "description"],
       "type": "best_fields"
     }
   }
 }
 ```
此查询会在 `title` 和 `description` 字段中查找 `Elasticsearch tutorial`，并根据匹配度选择最相关的字段进行评分。

**MostFields (`most_fields`)**：与 `best_fields` 类似，但是 `most_fields` 会尝试为每个匹配的字段增加评分。这意味着它会计算所有匹配字段的总相关性评分，而不是只选择一个字段的结果。

**适用场景**：当你希望所有匹配字段对最终评分都有贡献时使用。适合于多字段匹配时，所有字段的匹配都重要的场景。

```json
{
"query": {
 "multi_match": {
   "query": "Elasticsearch tutorial",
   "fields": ["title", "description"],
   "type": "most_fields"
 }
}
}
```
此查询会在 `title` 和 `description` 字段中查找 `Elasticsearch tutorial`，并根据这两个字段的匹配度计算总的相关性评分。

**CrossFields (`cross_fields`)**：将多个字段视为一个单一的字段来进行查询。`cross_fields` 会把多个字段的值合并在一起，然后执行一个查询。例如，`title` 和 `description` 字段的内容将被合并为一个查询上下文。

**适用场景**：当你希望字段之间的查询词没有严格的顺序关系时使用。适用于多个字段需要一起查询，并且字段之间的内容可以交换或跨字段匹配的场景。

```json
{
"query": {
 "multi_match": {
   "query": "Elasticsearch tutorial",
   "fields": ["title", "description"],
   "type": "cross_fields"
 }
}
}
```
此查询会将 `title` 和 `description` 字段的内容合并起来，然后进行一次整体查询。

**Phrase (`phrase`)**：与普通的 `match` 查询不同，`phrase` 查询要求查询词必须出现在特定顺序中。它在多字段查询中保持查询词的顺序。

**适用场景**：当你需要确保查询词在文本中按指定顺序出现时使用。例如，查询 "Elasticsearch tutorial" 时，只有当这两个词按顺序出现时才匹配。

```json
{
"query": {
 "multi_match": {
   "query": "Elasticsearch tutorial",
   "fields": ["title", "description"],
   "type": "phrase"
 }
}
}
```
此查询会检查 `title` 和 `description` 字段中是否按顺序出现 `Elasticsearch tutorial`。

**PhrasePrefix (`phrase_prefix`)**：类似于 `phrase` 查询，但允许查询词的最后一个词是前缀匹配。这意味着在查询词的最后部分可以是一个不完全的单词。

**适用场景**：当你希望搜索短语时，允许部分匹配或前缀匹配某个词时使用。适合处理像 "Elasticsearch tut" 这样没有完全输入的查询。

```json
{
"query": {
 "multi_match": {
   "query": "Elasticsearch tut",
   "fields": ["title", "description"],
   "type": "phrase_prefix"
 }
}
}
```
此查询会匹配 `title` 和 `description` 中的短语，允许 `tut` 为前缀匹配，例如匹配 `tutorial`。

**BoolPrefix (`bool_prefix`)**：`bool_prefix` 查询是一种特殊的布尔查询，它允许对查询的最后一个词进行前缀匹配。与 `phrase_prefix` 类似，它支持在查询词的最后部分进行前缀匹配。

**适用场景**：适合需要在多个字段上进行布尔查询，并且最后一个词允许前缀匹配的场景。

```json
{
"query": {
 "multi_match": {
   "query": "Elasticsearch tut",
   "fields": ["title", "description"],
   "type": "bool_prefix"
 }
}
}
```
此查询会匹配 `title` 和 `description` 中的短语，允许最后一个词（`tut`）进行前缀匹配，并使用布尔查询的逻辑。

**总结：**

这些查询类型提供了不同的方式来匹配多字段查询，适用于不同的文本匹配需求：

- **BestFields**：选择最相关的字段进行匹配。
- **MostFields**：所有匹配字段都对最终评分有贡献。
- **CrossFields**：多个字段合并为一个进行查询，适合字段间不需要严格顺序的场景。
- **Phrase**：要求查询词按顺序匹配。
- **PhrasePrefix**：允许查询词的最后部分进行前缀匹配。
- **BoolPrefix**：布尔查询并允许最后部分进行前缀匹配。

选择合适的查询类型可以显著提高查询的准确性和性能，取决于你的具体场景需求。

##### `queryString`

`query_string` 是 Elasticsearch 中的一种查询类型，允许你在查询中使用 Lucene 查询语法，支持多种查询运算符和符号。它类似于 `match` 查询，但提供了更强大的查询功能，允许在一个字段或多个字段中进行复杂的搜索。

`query_string` 查询的常见用法：

**基础查询**：

`query_string` 查询支持对字段进行自由文本搜索，并且支持多种查询语法，如布尔运算符、通配符、短语查询等。

```json
{
 "query": {
   "query_string": {
     "query": "甘肃省"
   }
 }
}
```

这将搜索包含 "甘肃省" 的所有文档。

**指定查询字段**：

可以通过 `fields` 参数指定要查询的字段，或者使用 `*` 来表示查询所有字段。

```json
{
 "query": {
   "query_string": {
     "query": "甘肃省",
     "fields": ["memberInfo.name", "memberInfo.address"]
   }
 }
}
```

这将在 `memberInfo.name` 和 `memberInfo.address` 字段中查找 "甘肃省"。

**通配符查询**：

`query_string` 支持通配符查询，可以使用 `*` 和 `?` 来匹配零个或多个字符，以及一个字符。

```json
{
 "query": {
   "query_string": {
     "query": "甘肃*"
   }
 }
}
```

这将匹配以 "甘肃" 开头的所有文档，例如 "甘肃省" 或 "甘肃市"。

**布尔查询**：

`query_string` 支持布尔运算符 `AND`、`OR` 和 `NOT`，可以用来连接多个查询条件。

```json
{
 "query": {
   "query_string": {
     "query": "甘肃省 AND (北京 OR 上海)"
   }
 }
}
```

这将查找包含 "甘肃省" 且同时包含 "北京" 或 "上海" 的文档。

**短语查询**：

可以通过将查询词用双引号括起来来进行短语查询，查找词语按照给定顺序出现的文档。

```json
{
 "query": {
   "query_string": {
     "query": "\"甘肃省 兰州\""
   }
 }
}
```

这将查找包含 "甘肃省 兰州" 短语的文档。

**字段优先级**：

如果查询中多个字段包含相同的词语，你可以为字段指定权重，以便给特定字段更多的匹配优先级。

```json
{
 "query": {
   "query_string": {
     "query": "甘肃省^2 北京",
     "fields": ["memberInfo.name", "memberInfo.address"]
   }
 }
}
```

在这个查询中，`memberInfo.name` 字段的匹配会比 `memberInfo.address` 字段的匹配更重要，因为 `^2` 给了 `memberInfo.name` 字段一个权重。

**解析错误控制**：

你还可以设置 `allow_leading_wildcard` 参数来控制是否允许以通配符开头的查询，默认情况下 Elasticsearch 会拒绝以 `*` 或 `?` 开头的查询。

```json
{
 "query": {
   "query_string": {
     "query": "*甘肃",
     "allow_leading_wildcard": true
   }
 }
}
```

这允许查询以 `*` 开头的查询，例如 `*甘肃`。

**支持空格分隔符**：

`query_string` 查询支持空格分隔符来组合多个查询项，允许用户在查询字符串中使用空格来分隔不同的查询条件。

```json
{
 "query": {
   "query_string": {
     "query": "甘肃省 北京 上海"
   }
 }
}
```

这将查找包含 "甘肃省"、"北京" 和 "上海" 的文档。

------

**控制符**

在 Elasticsearch 中，`query_string` 查询是一种非常强大的查询方式，它支持复杂的查询语法和灵活的查询表达式。通过 `query_string` 查询，你可以构建具有高级查询条件的搜索请求，支持布尔运算符、通配符、短语查询、字段级查询等多种功能。以下是 `query_string` 查询的常用方法和功能：

**`query`** - 查询字符串

`query` 是 `query_string` 查询的核心，定义了搜索的查询表达式。你可以在查询中使用多个运算符（如 `AND`, `OR`, `NOT`）来构建复杂的查询。

**`default_operator`** - 设置默认操作符

`default_operator` 用来设置查询中的默认操作符。如果查询字符串中没有明确指定操作符，默认操作符将被应用。常见的操作符有 `OR` 和 `AND`。

- **`AND`**：如果两个查询词都出现，则返回匹配。
- **`OR`**：只要其中一个查询词出现即可。

```json
{
  "query_string": {
    "query": "甘肃省 北京",
    "default_operator": "AND"
  }
}
```
Java 示例：
```java
Query query = Query.of(q -> q.queryString(qs -> 
    qs.query("甘肃省 北京").defaultOperator(QueryStringQuery.Operator.AND)
));
```



**`analyze_wildcard`** - 启用或禁用通配符分析

Elasticsearch 默认不对通配符 (`*`, `?`) 进行分析。如果你希望在查询中启用通配符的分析，可以将 `analyze_wildcard` 设置为 `true`。

```json
{
  "query_string": {
    "query": "甘肃* AND 北京?",
    "analyze_wildcard": true
  }
}
```

Java 示例：
```java
Query query = Query.of(q -> q.queryString(qs -> 
    qs.query("甘肃* AND 北京?").analyzeWildcard(true)
));
```

**`escape`** - 启用或禁用特殊字符转义

如果你在查询字符串中需要使用特殊字符（如 `+`, `-`, `=`, `&&`, `||`, `>`, `<`, `!`, `()`, `{}`, `[]`, `^`, `"`, `~`, `*`, `?`, `:`），并且不希望它们被当作运算符处理，你可以设置 `escape` 为 `true` 来对它们进行转义。

```json
{
  "query_string": {
    "query": "address:甘肃省 AND description:\"北京的景点\"",
    "escape": true
  }
}
```

Java 示例：
```java
Query query = Query.of(q -> q.queryString(qs -> 
    qs.query("address:甘肃省 AND description:\"北京的景点\"").escape(true)
));
```

**`quote_field_suffix`** - 指定短语查询时的字段后缀

如果字段支持短语查询，`quote_field_suffix` 用于在短语查询时添加字段后缀。通常情况下，短语查询会在字段名后加上 `.keyword` 后缀来指定精确匹配。

```json
{
  "query_string": {
    "query": "\"甘肃省 北京\"",
    "quote_field_suffix": ".keyword"
  }
}
```

Java 示例：

```java
Query query = Query.of(q -> q.queryString(qs -> 
    qs.query("\"甘肃省 北京\"").quoteFieldSuffix(".keyword")
));
```

**`fuzzy_max_expansions`** - 设置模糊查询的最大扩展数

如果查询字符串中包含模糊查询（例如 `~` 后缀的查询），则 `fuzzy_max_expansions` 可以限制模糊查询的最大扩展数，避免生成过多的扩展词。

 示例：
```json
{
  "query_string": {
    "query": "甘肃省~2",
    "fuzzy_max_expansions": 5
  }
}
```

Java 示例：
```java
Query query = Query.of(q -> q.queryString(qs -> 
    qs.query("甘肃省~2").fuzzyMaxExpansions(5)
));
```

**`tie_breaker`** - 多字段查询的得分合并策略

当查询多个字段时，`tie_breaker` 用来指定如果某些字段得分相同，应该如何合并它们的得分。`tie_breaker` 的值介于 `0` 和 `1` 之间，默认值为 `0`。

- `tie_breaker` 值接近 0：会优先考虑高得分的字段。
- `tie_breaker` 值接近 1：会让所有字段得分差距较小。

```json
{
  "query_string": {
    "query": "甘肃省 北京",
    "fields": ["address^2", "description"],
    "tie_breaker": 0.3
  }
}
```

Java 示例：

```java
Query query = Query.of(q -> q.queryString(qs -> 
    qs.query("甘肃省 北京").fields("address^2", "description").tieBreaker(0.3)
));
```

**`allow_leading_wildcard`** - 是否允许通配符以 `*` 开头

默认情况下，`query_string` 查询不允许通配符以 `*` 开头，因为这可能导致性能问题。通过设置 `allow_leading_wildcard` 为 `true`，你可以允许以 `*` 开头的通配符查询。

```json
{
  "query_string": {
    "query": "甘肃*",
    "allow_leading_wildcard": true
  }
}
```

Java 示例：

```java
Query query = Query.of(q -> q.queryString(qs -> 
    qs.query("甘肃*").allowLeadingWildcard(true)
));
```

**`minimum_should_match`** - 设置 `should` 子句的最小匹配数

`minimum_should_match` 用来控制 `should` 子句的最小匹配数。它通常与布尔查询结合使用，控制 `should` 子句必须满足多少个才能被视为匹配。

```json
{
  "query_string": {
    "query": "甘肃省 OR 北京",
    "minimum_should_match": 1
  }
}
```

Java 示例：
```java
Query query = Query.of(q -> q.queryString(qs -> 
    qs.query("甘肃省 OR 北京").minimumShouldMatch(1)
));
```

`query_string` 查询非常强大，支持多种操作符、通配符、短语查询等复杂查询需求。常用的方法包括：

- `query`：查询字符串本身。
- `fields`：指定查询的字段。
- `default_operator`：设置默认操作符（`AND` 或 `OR`）。
- `analyze_wildcard`：启用通配符分析。
- `escape`：启用特殊字符转义。
- `quote_field_suffix`：设置字段后缀，用于短语查询。
- `fuzzy_max_expansions`：限制模糊查询的扩展数量。
- `tie_breaker`：合并多个字段得分时使用的策略。
- `allow_leading_wildcard`：允许通配符以 `*` 开头。
- `minimum_should_match`：设置最小匹配的 `should` 子句数量。

这些功能使得 `query_string` 查询非常适用于需要复杂查询表达式的场景，如全文搜索和多字段匹配等。

------

`query_string` 查询适用于复杂的查询场景，能够处理通配符、布尔操作、短语查询等。如果你希望支持更多自由文本查询，可以选择这种查询类型。但它也容易出错，特别是当查询字符串不正确时，可能会导致解析错误或性能问题。所以在实际使用时要小心，确保查询语法符合预期。

在 Java 中使用 `query_string` 查询，可以通过 Elasticsearch 客户端构建类似的查询。

```java
Query queryStringQuery = Query.of(q -> q.queryString(qs -> qs
        .query("甘肃省 AND (北京 OR 上海)")
        .fields("memberInfo")
        .defaultOperator(QueryStringQuery.Operator.OR)
));
```

**`Query.of(q -> q.queryString(...))`**

这里的 `Query.of()` 是 Elasticsearch 客户端的构建器方法，用来创建一个查询对象。`queryString` 是查询的类型。通过链式调用，你可以为查询指定具体的条件。

**`query("甘肃省 AND (北京 OR 上海)")`**  

`queryString` 查询的核心是 `query` 方法，它接受一个字符串参数，表示查询的文本。该字符串使用 Lucene 查询语法，支持各种查询功能：

- `AND`：表示条件同时满足。
- `OR`：表示条件中至少满足一个。
- 括号：用于分组条件，如 `(北京 OR 上海)`，表示北京或上海中的任何一个。

**`fields("memberInfo.name")`**  

通过 `fields` 方法，可以指定查询的字段。这里查询的字段是 `memberInfo`。这意味着该查询将会匹配文档中 `memberInfo` 字段的内容，而不是全局进行匹配。

`**defaultOperator(QueryStringQuery.Operator.OR)`**  

 `defaultOperator` 指定了默认操作符。Elasticsearch 的 `query_string` 查询支持两个操作符：

 - `OR`（默认）：表示如果查询字符串中没有明确指定操作符，则默认为 OR 操作。例如，查询 `甘肃省 北京 上海` 实际上相当于 `甘肃省 OR 北京 OR 上海`。
 - `AND`：表示如果没有指定操作符，则默认为 AND 操作，所有条件都必须满足。

 通过设置 `QueryStringQuery.Operator.OR`，如果查询中没有指定操作符，则会使用 `OR` 进行默认连接。

##### 短语查询

**`match_phrase` 查询**

`match_phrase` 查询用于精确匹配短语，确保查询的词语顺序和位置与文档中的匹配内容一致。它是执行短语查询时最常用的一种方式。

```json
{
  "query": {
    "match_phrase": {
      "address": "北京 上海"
    }
  }
}
```

该查询将匹配包含精确短语“北京 上海”的文档。词语顺序必须一致，且词语间的空格数量与查询相同。

Java 示例：
```java
Query query = Query.of(q -> q.matchPhrase(mp -> mp
    .field("address")  // 字段名
    .query("北京 上海")  // 短语查询
));
```

**`multi_match` 查询**

`multi_match` 查询支持多个字段的短语查询。它是 `match` 查询的一种扩展，适用于同时在多个字段上进行短语匹配。

```json
{
  "query": {
    "multi_match": {
      "query": "北京 上海",
      "fields": ["address", "description"],
      "type": "phrase"
    }
  }
}
```

该查询将在字段 `address` 和 `description` 上执行短语查询，要求同时匹配“北京 上海”。通过设置 `type: "phrase"`，确保执行的是短语查询。

Java 示例：
```java
Query query = Query.of(q -> q.multiMatch(mm -> mm
    .query("北京 上海")  // 查询短语
    .fields("address", "description")  // 字段名
    .type(MultiMatchQuery.Type.PHRASE)  // 确保是短语查询
));
```

**`query_string` 查询**

`query_string` 查询支持通过语法进行复杂的短语查询，并且提供了更大的灵活性，尤其是在字段限制、操作符、分词等方面。

```json
{
  "query": {
    "query_string": {
      "query": "\"北京 上海\"",
      "fields": ["address"]
    }
  }
}
```

`query_string` 查询支持包含精确短语的查询，使用 `\"\"` 来包裹短语。适合进行多种复杂查询，如使用布尔操作符、通配符等。

Java 示例：

```java
Query query = Query.of(q -> q.queryString(qs -> qs
    .query("\"北京 上海\"")  // 短语查询
    .fields("address")  // 查询字段
));
```

**`span_near` 查询**

`span_near` 查询适用于需要在文档中匹配一组短语，并且短语之间有特定顺序或距离要求的场景。它可以在查询时指定“slop”（允许的词语间距），以及是否要求词语顺序一致。

```json
{
  "query": {
    "span_near": {
      "clauses": [
        { "span_term": { "content": "北京" } },
        { "span_term": { "content": "上海" } }
      ],
      "slop": 2,
      "in_order": true
    }
  }
}
```

该查询要求词语“北京”和“上海”在 `content` 字段中间有最多2个词，并且词语顺序必须一致。

Java 示例：

```java
Query query = Query.of(q -> q.spanNear(sn -> sn
    .clauses(Arrays.asList(
        Query.of(q1 -> q1.spanTerm(st -> st.field("content").term("北京"))),
        Query.of(q2 -> q2.spanTerm(st -> st.field("content").term("上海")))
    ))
    .slop(2)
    .inOrder(true)
));
```

**`phrase_prefix` 查询**

`phrase_prefix` 查询在短语查询的基础上允许部分词语进行前缀匹配。这种查询常用于匹配以某个词为前缀的短语。

```json
{
  "query": {
    "match_phrase_prefix": {
      "address": "天津"
    }
  }
}
```

该查询将匹配所有包含以“天津”开头的短语的文档。

Java 示例：
```java
Query query = Query.of(q -> q.matchPhrasePrefix(mp -> mp
    .field("address")  // 字段名
    .query("天津")  // 前缀匹配
));
```

**`match` 查询 (与 `operator` 配合使用)**

`match` 查询是最常见的查询类型，适用于单个词的查询，但在与 `operator` 配合使用时，它也可以模仿短语查询的行为。通过设置 `operator: AND`，你可以要求查询的所有词语都出现在文档中，但不保证顺序和位置。

```json
{
  "query": {
    "match": {
      "address": {
        "query": "北京 上海",
        "operator": "and"
      }
    }
  }
}
```

该查询将匹配包含“北京”和“上海”的文档，但不要求它们按顺序出现。

Java 示例：

```java
Query query = Query.of(q -> q.match(m -> m
    .field("address")
    .query("北京 上海")
    .operator(MatchQuery.Operator.AND)  // 强制所有词语都必须出现
));
```

以下是支持短语查询的常见查询类型：

1. **`match_phrase`**：最直接的短语查询，确保词语顺序和位置精确匹配。
2. **`multi_match`**：适用于多个字段的短语查询，可以通过设置 `type: "phrase"` 实现短语匹配。
3. **`query_string`**：提供复杂的查询语法，支持短语查询，并允许字段限制和操作符。
4. **`span_near`**：适用于要求短语之间有一定距离或顺序关系的查询。
5. **`phrase_prefix`**：支持短语查询和前缀匹配，适用于词语前缀的情况。
6. **`match`**：可以通过设置 `operator: AND` 来模拟短语查询，但不保证词语顺序。

对于只要求短语匹配且顺序一致的情况，`match_phrase` 和 `multi_match` 是最常见的选择。而如果你有更复杂的需求，如短语之间有间距、顺序要求等，`span_near` 是一个很好的选择。

##### 多字段短语查询

在 Elasticsearch 中，以下几种查询支持短语查询（Phrase Query）并且可以同时查询多个字段：

**`multi_match` 查询**
`multi_match` 查询支持短语查询，并允许在多个字段上执行查询。通过将查询类型设置为 `phrase`，你可以进行短语查询，并且支持多个字段。

```json
{
  "query": {
    "multi_match": {
      "query": "甘肃省 北京",
      "fields": ["address", "description"],
      "type": "phrase"  // 使用短语查询
    }
  }
}
```

- **`query`**：查询内容，支持短语。
- **`fields`**：多个字段。
- **`type`**：查询类型为 `phrase`，表示进行短语查询。

Java 示例：

```java
Query query = Query.of(q -> q.multiMatch(mm -> mm
    .query("甘肃省 北京")  // 查询内容
    .fields("address", "description")  // 查询的多个字段
    .type(MultiMatchQuery.Type.PHRASE)  // 使用短语查询
));
```

**`query_string` 查询**

`query_string` 查询不仅支持复杂的查询语法，还可以进行短语查询，并允许多个字段同时进行匹配。在 `query_string` 查询中，短语查询可以通过引号来指定。

```json
{
  "query": {
    "query_string": {
      "query": "\"甘肃省 北京\"",
      "fields": ["address", "description"]
    }
  }
}
```

- **`query`**：查询内容，使用引号包围以进行短语匹配。
- **`fields`**：多个字段进行匹配。

Java 示例：

```java
Query query = Query.of(q -> q.queryString(qs -> qs
    .query("\"甘肃省 北京\"")  // 短语查询
    .fields("address", "description")  // 多个字段
));
```

**`bool` 查询 (with `should` and `match_phrase`)**

`bool` 查询可以与 `match_phrase` 查询一起使用，支持多个字段进行短语查询。通过 `should` 子句来指定多个字段。

示例：

```json
{
  "query": {
    "bool": {
      "should": [
        { "match_phrase": { "address": "甘肃省 北京" } },
        { "match_phrase": { "description": "甘肃省 北京" } }
      ]
    }
  }
}
```

- **`match_phrase`**：短语查询。
- **`should`**：多个字段的短语查询，只要有一个匹配即满足查询条件。

Java 示例：

```java
Query query = Query.of(q -> q.bool(b -> b
    .should(Arrays.asList(
        Query.of(q1 -> q1.matchPhrase(m -> m.field("address").query("甘肃省 北京"))),
        Query.of(q2 -> q2.matchPhrase(m -> m.field("description").query("甘肃省 北京")))
    ))
));
```

**`dis_max` 查询 (with `match_phrase`)**

`dis_max` 查询可以用于多个短语查询，并返回匹配最强的查询字段。每个查询都可以是短语查询。

```json
{
  "query": {
    "dis_max": {
      "queries": [
        { "match_phrase": { "address": "甘肃省 北京" } },
        { "match_phrase": { "description": "甘肃省 北京" } }
      ],
      "tie_breaker": 0.7
    }
  }
}
```

- **`match_phrase`**：短语查询。
- **`dis_max`**：选择匹配度最高的字段。
- **`tie_breaker`**：多个查询得分时的加权系数。

Java 示例：

```java
Query query = Query.of(q -> q.disMax(dm -> dm
    .queries(Arrays.asList(
        Query.of(q1 -> q1.matchPhrase(m -> m.field("address").query("甘肃省 北京"))),
        Query.of(q2 -> q2.matchPhrase(m -> m.field("description").query("甘肃省 北京")))
    ))
    .tieBreaker(0.7)
));
```

**`span_near` 查询**

`span_near` 查询允许你查找多个短语或单词在文档中的相对位置。如果你希望多个字段之间的短语或单词有特定的顺序或距离，可以使用 `span_near` 查询。

```json
{
  "query": {
    "span_near": {
      "clauses": [
        { "span_term": { "address": "甘肃省" } },
        { "span_term": { "description": "北京" } }
      ],
      "slop": 5,
      "in_order": true
    }
  }
}
```

- **`span_term`**：每个字段的短语查询。
- **`slop`**：允许的词语间距。
- **`in_order`**：是否要求词语顺序一致。

Java 示例：

```java
Query query = Query.of(q -> q.spanNear(sn -> sn
    .clauses(Arrays.asList(
        Query.of(q1 -> q1.spanTerm(st -> st.field("address").term("甘肃省"))),
        Query.of(q2 -> q2.spanTerm(st -> st.field("description").term("北京")))
    ))
    .slop(5)
    .inOrder(true)
));
```

以下查询支持短语查询并且可以应用于多个字段：

1. **`multi_match`** 查询：支持短语查询 (`phrase` 类型)，可以查询多个字段。
2. **`query_string`** 查询：通过引号进行短语查询，可以查询多个字段。
3. **`bool` 查询**：通过结合 `should` 子句和 `match_phrase` 子查询，支持多个字段的短语查询。
4. **`dis_max`** 查询：多个 `match_phrase` 查询，选择得分最高的查询结果。
5. **`span_near`** 查询：支持多个字段的短语查询，并控制词语的顺序和距离。

这些查询方法可以根据不同的业务需求来选择。

实例：

```java
Query memberInfoSearchQuery = Query.of(q->q.bool(b -> {
            String[] fields = FieldUtil.getField(new MemberInfo());
            // 匹配 memberInfo 下的所有字段
            Arrays.stream(fields).forEach(f->b.should(s -> s.matchPhrase(m->m.query(memberInfoSearch).field(f))));
            b.minimumShouldMatch("1");
            return b;
        })
);
Query memberInfoSearchQuery2 = Query.of(q->q.queryString(qs ->
            qs.query("\""+memberInfoSearch+"\"") // 使用短语查询
                    .fields(Arrays.stream(FieldUtil.getField(new MemberInfo())).toList())
        )
);
Query memberInfoSearchQuery3 = Query.of(q -> q.multiMatch(mm -> mm
        .query(memberInfoSearch)  // 查询短语
        .fields(Arrays.stream(FieldUtil.getField(new MemberInfo())).toList())  // 查询多个字段
        .type(TextQueryType.Phrase)  // 使用短语查询
));
// 以上均只能匹配中文 like，英文和数字无法匹配
Query memberInfoSearchQuery4 = Query.of(q->q.bool(b -> {
            String[] fields = FieldUtil.getField(new MemberInfo());
            // 匹配 memberInfo 下的所有字段
            Arrays.stream(fields).map(DatabaseConstants::addKeyword).forEach(f->b.should(s -> s.wildcard(m->m.field(f).value("*"+memberInfoSearch+"*"))));
            b.minimumShouldMatch("1");
            return b;
        })
);
// 为保持性能，可以通过正则使用不同的查询条件
Query memberInfoSearchQuery;
if (memberInfoSearch.matches("[A-Za-z0-9]+")) {
    memberInfoSearchQuery = memberInfoSearchQuery4;
} else {
    memberInfoSearchQuery = memberInfoSearchQuery3;
}
```



#### `Sort`

在 Elasticsearch 8.x 中，`Sort` 用于对查询结果进行排序。以下是常用的字段和方法，使用 Elasticsearch 8.x 的查询 DSL（Domain Specific Language）风格：

**Sort by Field**

可以通过字段名对查询结果进行排序，字段可以是文本、数字、日期等类型。

```java
SortField titleSort = SortField.of(s -> s
    .field(f -> f.field("title"))  // 按照 "title" 字段排序
    .order(SortOrder.ASC)  // 按升序排序
);

SortField priceSort = SortField.of(s -> s
    .field(f -> f.field("price"))  // 按照 "price" 字段排序
    .order(SortOrder.DESC)  // 按降序排序
);
```

使用脚本：

```java
// 创建脚本，用于根据 price 字段的值进行排序
Script script = Script.of(builder -> builder
        .inline(inlineScriptBuilder -> inlineScriptBuilder
                .source("doc['price'].value * 2")  // inline 脚本：字段 'price' 的值乘以 2
        )
);

// 创建排序选项，使用脚本排序
SortOptions scriptSort = SortOptions.of(s -> s
        .script(sc -> sc
                .script(script)  // 使用定义好的脚本进行排序
        )
);

// 使用 SortOptions 创建排序请求
SearchRequest request = SearchRequest.of(s -> s
        .query(q -> q
                .match(m -> m.field("title").query("elasticsearch"))  // 查询条件：匹配 'title' 字段
        )
        .sort(scriptSort)
);
```

地理位置排序、嵌套字段排序...

多条件排序

```java
// 创建按价格升序排序的 SortOptions
SortOptions priceSort = SortOptions.of(s -> s
        .field(f -> f
                .field("price")
                .order(SortOrder.Asc)  // 升序排序
        )
);

// 创建按发布日期降序排序的 SortOptions
SortOptions publishDateSort = SortOptions.of(s -> s
        .field(f -> f
                .field("publish_date")
                .order(SortOrder.Asc)  // 降序排序
        )
);

// 创建按名称升序排序的 SortOptions
SortOptions nameSort = SortOptions.of(s -> s
        .field(f -> f
                .field("name")
                .order(SortOrder.Asc)  // 升序排序
        )
);

// 创建搜索请求，并应用多字段排序
SearchRequest searchRequest = SearchRequest.of(s -> s
        .query(q -> q
                .match(m -> m.field("title").query("elasticsearch"))  // 查询条件：匹配 'title' 字段
        )
        .sort(priceSort,publishDateSort,nameSort)
);
```

#### `search()`

`esClient.search` 是 Elasticsearch 中用于执行搜索操作的常用方法，支持多种查询和配置选项。

`esClient.search` 提供了强大的查询功能，通过不同的构建方式，可以灵活地指定查询条件、分页、排序、字段过滤等。你可以通过 `SearchRequest` 对象或者构建器模式来配置搜索请求，并通过 `SearchResponse` 对象获取查询结果及相关信息。

**`esClient.search(SearchRequest request)`** 方法：

- **功能**：执行搜索查询并返回搜索结果。

- **参数**：`SearchRequest request`，该请求对象包含了查询所需的所有信息。

  **常用字段**：

  - `index`：要搜索的索引名称，可以是一个字符串，也可以是一个字符串数组。
  - `query`：查询条件，用于定义搜索的逻辑，例如使用 `match`, `term`, `bool` 等查询。
  - `source`：源过滤器，用于控制返回哪些字段，支持 `includes` 或 `excludes`。
  - `from`：指定查询的起始位置，用于分页。
  - `size`：指定每页的返回结果数目。
  - `sort`：用于指定排序条件。
  - `trackTotalHits`：控制是否计算总匹配数目。
  - `timeout`：查询超时时间。

**`esClient.search(Function<SearchRequest.Builder, ObjectBuilder<SearchRequest>> fn)`** 方法：

- **功能**：使用一个函数来构建 `SearchRequest`，这是一个函数式编程风格的调用。
- **参数**：一个构建函数 `fn`，将一个 `SearchRequest.Builder` 转换为 `SearchRequest` 对象。

```java
SearchResponse<Map> response = esClient.search(builder -> builder
                .index("products")
                .query(q -> q.match(m -> m.field("v").query(50)))
                .size(10)
                .from(0),
        Map.class
);
HitsMetadata<Map> hits = response.hits();
List<Map> collect = hits.hits().stream().map(Hit::source).toList();
collect.forEach(System.out::println);
```

### 滚动查询

在 Elasticsearch 中，默认情况下，`Search` 查询返回的文档数量是 10 条。这是 Elasticsearch 的分页机制（`from` 和 `size`）的一部分。要返回更多的数据，你需要显式地设置查询的 `size` 参数，或者使用分页（`from` 和 `size`）来获取更多结果。

**增加返回结果的数量 (`size`)**：

你可以通过设置 `size` 参数来改变每次查询返回的文档数量。比如，设置为 100 或更多：

```java
SearchResponse<T> response = esClient.search(s -> s
        .index(indexName)
        .source(source -> source
                .filter(f -> f.includes(includeFields)))
        .query(query)
        .size(100), // 设置返回的结果数量
        clazz
);
```

这样会返回 100 条数据。你可以根据需要调整 `size` 的值。


**使用分页 (from/size)**：

如果数据量较大，可以使用分页来分批次查询。例如，你可以通过 `from` 和 `size` 来控制查询的起始点和每次返回的数量：

```java
int page = 1;  // 页码，第一页为 0，第二页为 1，依此类推
int pageSize = 100;  // 每页返回的数量

SearchResponse<T> response = esClient.search(s -> s
        .index(indexName)
        .source(source -> source
                .filter(f -> f.includes(includeFields)))
        .query(query)
        .from(page * pageSize)  // 分页查询，从第 `page` 页开始
        .size(pageSize),  // 每页返回的数量
        clazz
);
```

这样，你就可以通过增加 `from` 来获取不同的分页数据。

**`scroll` 查询**：

如果你的数据量非常大，可以使用 `scroll` 查询来分页获取数据。`scroll` 是 Elasticsearch 用来高效查询大数据量的一种方式，它会持续保持一个上下文，可以多次请求来获取更多的数据，而不需要重新执行完整的查询。

使用 `scroll` 查询的例子：

```java
SearchResponse<T> response = esClient.search(s -> s
        .index(indexName)
        .scroll("1m")  // 设置 scroll 上下文的有效时间
        .source(source -> source
                .filter(f -> f.includes(includeFields)))
        .query(query)
        .size(100),  // 每次返回 100 条数据
        clazz
);

String scrollId = response.scrollId();
// 处理返回的文档数据，然后根据 scrollId 继续查询下一页的数据
```

通过调整这些参数，可以控制查询结果的数量和分页方式，避免每次只能查询到 10 条数据的问题。

------

在 Elasticsearch 中，默认情况下每个查询的 `size` 最大值是 **10,000** 条。如果你设置了 `size` 参数超过 10,000，Elasticsearch 会返回一个错误，提示不能超过这个限制。

不过，实际上，如果你想要检索超过 10,000 条数据，可以考虑以下两种方法：

**通过 `scroll` 查询批量获取数据**

`scroll` 查询是 Elasticsearch 提供的一种方法，适用于查询大量数据，特别是当你需要返回大量记录时。使用 `scroll` 查询时，Elasticsearch 会保持一个上下文，使得你可以分页查询并逐步获取数据，而不需要一次性返回所有结果。

```java
/**
 * 滚动查询
 * @param indexName 索引名称
 * @param query 查询条件
 * @param includeFields 返回字段
 * @param clazz 返回类型
 * @return
 * @param <T> 返回类型
 * @throws IOException
 */
public   <T> List<T> searchListByScroll(String indexName,  Query query, List<String> includeFields, Class<T> clazz) throws IOException {
    {
        // 首先创建一次查询，获取滚动 ID 和初始结果
        SearchResponse<T> response = esClient.search(s -> s
                        .index(indexName)
                        .scroll(s2->s2.offset(60_000))  // 1分钟滚动上下文
                        .source(source -> source.filter(f -> f.includes(includeFields)))
                        .query(query)
                        .size(1),  // 每次查询返回10000条
                clazz
        );

        // 获取scrollId
        String scrollId = response.scrollId();
        List<T> resultList = new ArrayList<>();
        HitsMetadata<T> hits = response.hits();
        if (hits == null) {
            return List.of();
        }
        handleResult(clazz, hits, resultList);

        // 使用 scrollId 获取后续的数据
        while (true) {
            String finalScrollId = scrollId;
            ScrollResponse<T> scrollResponse = esClient.scroll(scroll -> scroll
                            .scrollId(finalScrollId)  // 使用之前的scrollId继续查询
                            .scroll(s2->s2.offset(60_000))  // 设置scroll上下文有效时间
                    ,clazz
            );
            HitsMetadata<T> hits2 = scrollResponse.hits();
            if (hits2 == null) {
                return List.of();
            }
            handleResult(clazz, hits2, resultList);
            scrollId = scrollResponse.scrollId();  // 更新scrollId
        }
    }
}
private static <T> void handleResult(Class<T> clazz, HitsMetadata<T> hits, List<T> resultList) {
    for (Hit<T> hit : hits.hits()) {
        T source = hit.source();
        try {
            String id = hit.id();
            Field idField = DataUtil.getIdField(clazz);
            idField.setAccessible(true);
            idField.set(source, id);
        }catch (Exception e){
            log.error("设置id字段失败，请检查实体类是否包含id字段，或者id字段类型是否为String类型");
        }
        resultList.add(source);
    }
}
```

------

**使用 `search_after` 分页查询**

`search_after` 是 Elasticsearch 提供的另一种用于分页的方法，它基于上一页查询结果的排序字段来获取下一页的数据。它的优点是可以用于检索比 `from`/`size` 更大的数据量，同时避免了深分页带来的性能问题。

`searchAfter` 是 Elasticsearch 中一个用于实现 **深分页**（deep pagination）或 **基于游标的分页**（cursor-based pagination）的功能。它通过指定前一次查询返回的最后一个文档的排序值来进行分页，从而避免了使用传统的 `from` 和 `size` 参数进行分页时可能遇到的性能问题，特别是在数据量非常大的情况下。

传统的基于 `from` 和 `size` 的分页方法对于大量数据（尤其是深分页，即查询较后面的结果时）会变得低效。每次请求都会跳过前面的大量文档，导致性能下降。而 `searchAfter` 使用一个游标（通常是上一次查询的最后一个文档的排序值），使得查询效率更高，并且可以在深层分页时避免效率低下的问题。

**`searchAfter` 的工作原理**

**排序字段**：为了使用 `searchAfter`，必须对查询结果进行排序，通常是使用一个唯一的字段（如文档的 `_id`）进行排序。排序字段的顺序非常重要，因为 `searchAfter` 会根据这些排序字段来跳过之前的文档并找到接下来的结果。

**提供排序值**：`searchAfter` 需要提供一个排序值，这个值通常是来自上一个查询返回的最后一条文档的排序值。基于这个排序值，Elasticsearch 可以找到从上一次查询之后的下一条记录，并继续查询。

**传统分页（`from` 和 `size`）**

使用 `from` 和 `size` 进行分页时，每次查询都会计算跳过多少文档。例如：

```json
GET /my_index/_search
{
  "from": 1000,
  "size": 10,
  "query": {
    "match_all": {}
  },
  "sort": [
    {"date": "asc"}
  ]
}
```

在这个例子中，`from` 需要计算跳过前 1000 个文档，然后返回 10 个文档。随着 `from` 值的增大，查询效率会降低。



**使用 `searchAfter`**

使用 `searchAfter` 时，你只需要提供上一查询的最后一个排序值。假设你有一个按 `date` 字段升序排序的查询，返回第一个文档后，你可以使用这个文档的 `date` 字段作为 `searchAfter` 的值来进行下一次查询。


假设第一次查询返回了以下文档：

```json
{
  "_id": "1",
  "date": "2021-01-01T00:00:00"
}
```

然后你可以使用返回的 `date` 字段作为 `searchAfter` 参数，来获取接下来的数据：

```json
GET /my_index/_search
{
  "size": 10,
  "query": {
    "match_all": {}
  },
  "sort": [
    {"date": "asc"}
  ],
  "search_after": ["2021-01-01T00:00:00"]
}
```

**多个排序字段**

如果你希望使用多个字段进行排序（例如按时间和 `_id` 排序），你需要在 `searchAfter` 中提供这些排序字段的值的数组。例如：

```json
GET /my_index/_search
{
  "size": 10,
  "query": {
    "match_all": {}
  },
  "sort": [
    {"date": "asc"},
    {"_id": "asc"}
  ],
  "search_after": ["2021-01-01T00:00:00", "1"]
}
```

在这种情况下，`searchAfter` 需要同时传入 `date` 和 `_id` 的值。

**`searchAfter` 与传统分页的区别**

- **性能**：`searchAfter` 在进行深分页时比 `from` 和 `size` 更高效，因为它不需要计算跳过多少文档，避免了大量文档的排序和过滤。
- **依赖排序**：`searchAfter` 必须依赖排序字段，这意味着你的查询必须指定排序字段，并且这些字段需要有唯一性或者能确保正确的顺序。
- **状态保持**：每次使用 `searchAfter` 时，必须保存上次查询的最后一个文档的排序值，进行状态传递。对于传统的基于 `from` 的分页方式，页面状态是由客户端控制的，而 `searchAfter` 基于查询结果本身的排序值来继续查询。

**注意事项**

- **排序字段的一致性**：`searchAfter` 依赖于排序字段的值，确保这些字段的顺序和排序规则一致性非常重要。如果数据发生变化（例如新文档插入或排序字段值更新），可能会导致分页结果不一致。
- **适用场景**：`searchAfter` 最适用于返回大量数据时，特别是需要从查询结果的中间或底部开始获取数据时。
- **限制**：`searchAfter` 不支持 `from` 和 `size`，即它不能与这些参数一起使用。

**总结**

`searchAfter` 是 Elasticsearch 中为了解决深分页时的性能问题而设计的一种更高效的分页机制。它通过传递上一查询返回结果的排序值来继续查询，避免了传统分页中随着数据量增大而导致的效率低下的问题。

------

**通过 `index.max_result_window` 配置提升返回结果的上限**

默认情况下，Elasticsearch 对每次查询的 `size` 限制为 10,000 条，`index.max_result_window` 配置项控制了这一限制。如果你需要返回超过 10,000 条数据，可以通过修改此设置来提升限制。

**注意：** 提升 `max_result_window` 可能会导致性能下降，尤其是在大规模数据集上进行查询时。

配置方法：

修改 `index.max_result_window`：

```json
PUT /your_index/_settings
{
  "settings": {
    "index.max_result_window": 20000  // 设置为所需的最大值
  }
}
```

更新后，您可以在查询时使用 `size` 设置返回数据的数量大于 10,000 条。

> **警告**：增加 `max_result_window` 可能导致内存消耗增加，因此在修改时请确保你的 Elasticsearch 集群有足够的内存来处理大量数据返回。

总结

1. **`scroll` 查询**：用于处理大规模数据集，避免一次性返回大量数据。
2. **`search_after` 分页**：适用于处理排序字段的分页，避免深分页性能问题。
3. **提升 `index.max_result_window`**：直接增加查询结果的返回上限，但需谨慎使用。

通常，建议使用 **`scroll` 查询** 或 **`search_after` 分页** 来处理大数据量查询，尤其是当返回超过 10,000 条数据时。

### 管道

管道通常在 Elasticsearch 中是预先定义好的，它是一个由多个处理步骤组成的过程。你可以通过 Elasticsearch 的 **Ingest Node API** 创建和管理管道。一个管道包含一个或多个处理器（processors），例如：

- **`set processor`**：用于设置或修改字段的值。
- **`rename processor`**：用于重命名字段。
- **`date processor`**：将日期字符串转换为日期类型。

#### 使用 HTTP

假设你想创建一个管道，该管道用于将所有传入文档的 `timestamp` 字段转换为日期类型。可以使用 Elasticsearch 的管道 API 来定义管道。

```json
PUT _ingest/pipeline/my-pipeline
{
  "description": "Pipeline to convert timestamp to date",
  "processors": [
    {
      "date": {
        "field": "timestamp",
        "target_field": "@timestamp",
        "formats": ["yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"]
      }
    }
  ]
}
```

在这个例子中，`my-pipeline` 管道会将所有文档的 `timestamp` 字段转换成 `@timestamp` 字段，格式为 `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`。

这个请求用于在 Elasticsearch 中创建一个名为 `my-pipeline` 的 **ingest pipeline**。Ingest pipeline 是 Elasticsearch 的一种机制，用于在文档被索引之前对文档进行处理。具体到这个例子，它创建了一个管道，该管道使用了一个 **日期处理器（date processor）** 来将 `timestamp` 字段的值转换为一个标准的日期格式，并存储到新的字段 `@timestamp` 中。

**参数解释：**

**`PUT _ingest/pipeline/my-pipeline`**

- 这是创建管道的请求。它使用了 `PUT` 方法，并通过 URL `_ingest/pipeline/my-pipeline` 指定管道名称为 `my-pipeline`。
- 这个请求会在 Elasticsearch 中创建或更新名为 `my-pipeline` 的管道。

**`description`**: `"Pipeline to convert timestamp to date"`:这是对管道的描述。这个字段是可选的，主要用于为管道提供一个简短的描述，帮助用户理解该管道的功能。

**`processors`**: `[...]`

- **processors** 是一个数组，包含多个处理器（processors），用于定义对文档的处理步骤。
- 每个处理器会以特定的方式处理文档中的数据字段。在这个例子中，数组中只有一个处理器——`date` 处理器。

------

**小结：**

**创建 `my-pipeline` 管道**：`PUT _ingest/pipeline/my-pipeline`。如果管道不存在，则会创建一个新的管道。

**删除 `my-pipeline` 管道**：`DELETE _ingest/pipeline/my-pipeline`

**更新 `my-pipeline` 管道**：同创建，如果管道存在则覆盖。

**获取指定管道的详细信息**：`GET /_ingest/pipeline/{pipeline_id}`，其中 `{pipeline_id}` 是查询的管道的名称。

**列出所有管道**：`GET /_ingest/pipeline`。

#### 使用Java

**创建 Ingest 管道**

在 Elasticsearch 中创建管道，需要使用 `PutPipelineRequest` 类来设置管道的配置。

**步骤**：
1. 设置管道的名称和描述。
2. 配置管道中的处理器（例如 `date` 处理器）。
3. 执行 `putPipeline` 请求来创建管道。

```java
// 配置管道请求
PutPipelineRequest request = PutPipelineRequest.of(p -> p
    .pipeline("my-pipeline")  // 设置管道名称
    .description("Pipeline to convert timestamp to date")  // 设置管道描述
    .processors(Arrays.asList(  // 设置处理器
        new DateProcessor("timestamp", "@timestamp", Arrays.asList("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"))
    ))
);

// 执行创建管道请求
PutPipelineResponse response = client.ingest().putPipeline(request);

// 输出创建结果
if (response.acknowledged()) {
    System.out.println("Pipeline created successfully.");
} else {
    System.out.println("Failed to create pipeline.");
}
```

**关键部分**：
- **`PutPipelineRequest.of(p -> p...)`**：这段代码构建了管道请求，指定了管道名称、描述以及处理器。
- **`DateProcessor`**：这是处理日期格式的处理器，它将字段 `timestamp` 的值转换为日期，并将结果存储到 `@timestamp` 字段中。

---

**修改 Ingest 管道**

在 Elasticsearch 中，**没有直接修改管道的 API**，可以直接使用创建 Ingest 管道的方式覆盖。

------

**删除Ingest 管道**

删除管道的操作可以通过 `DeletePipelineRequest` 来实现。

```java
// 创建删除管道请求
DeletePipelineRequest deleteRequest = DeletePipelineRequest.of(r -> r.pipeline("my-pipeline"));

// 执行删除请求
DeletePipelineResponse deleteResponse = client.ingest().deletePipeline(deleteRequest);

// 输出删除结果
if (deleteResponse.acknowledged()) {
    System.out.println("Pipeline deleted successfully.");
} else {
    System.out.println("Failed to delete pipeline.");
}
```

------

**查询指定管道**

```java
// 查询指定管道
GetPipelineRequest request = GetPipelineRequest.of(r -> r.pipeline("my-pipeline"));
// 执行查询
GetPipelineResponse response = client.ingest().getPipeline(request);
// 输出管道的详细信息
System.out.println("Pipeline details: " + response.pipelines());
```

------

**查询所有管道**

```java
// 查询所有管道
GetPipelineRequest request = GetPipelineRequest.of(r -> r);  // 为空表示获取所有管道

// 执行查询
GetPipelineResponse response = client.ingest().getPipeline(request);

// 输出所有管道的详细信息
System.out.println("All pipelines: " + response.pipelines());
```

------

**小结**

- **创建管道**：使用 `PutPipelineRequest` 和 `client.ingest().putPipeline()` 方法。
- **删除管道**：使用 `DeletePipelineRequest` 和 `client.ingest().deletePipeline()` 方法。
- **修改管道**：与创建相同，如果管道存在则覆盖。
- **查询管道**：使用 `GetPipelineRequest` 和 `client.ingest().getPipeline()`。

这些操作可以帮助您灵活管理 Elasticsearch 中的 Ingest 管道，确保数据在被索引之前能按照需求进行处理。

------

#### **处理器**

Elasticsearch 的 **Ingest Pipeline** 提供了多种处理器（processors），用于在文档被索引前对数据进行处理。除了 `set processor`、`rename processor` 和 `date processor` 之外，还有许多其他处理器，每种处理器用于不同的任务。以下是一些常用的处理器及其功能：

**date**: 用于将一个字段的字符串值转换为日期类型。它接收一个或多个输入格式（`formats`），并尝试按照这些格式将该字段解析为日期。**常用场景**: 转换日期字符串为日期类型，便于后续的日期操作。下面是该 `date` 处理器的各个参数的详细解释：

**`field`**: `"timestamp"`，这是要转换为日期格式的字段。也就是文档中的 `timestamp` 字段的值将被处理并转换为日期。如果文档中存在 `timestamp` 字段，处理器会尝试将它的值解析为日期。

**`target_field`**: `"@timestamp"`，这是转换后结果的目标字段。转换后的日期值将被存储在 `@timestamp` 字段中。如果文档中没有 `@timestamp` 字段，Elasticsearch 会自动创建它。如果该字段已经存在，`date` 处理器会覆盖它。

**`formats`**: `["yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"]`

这是一个格式数组，用于定义如何解析 `timestamp` 字段的值。在这个例子中，只有一个格式：`yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`。

这个格式遵循 ISO 8601 日期格式：
- `yyyy`：年份（四位数）
- `MM`：月份（两位数）
- `dd`：日期（两位数）
- `T`：时间分隔符
- `HH`：小时（24小时制，两位数）
- `mm`：分钟（两位数）
- `ss`：秒数（两位数）
- `SSS`：毫秒数（3位数）
- `Z`：表示零时区，通常用于表示 UTC 时间。

 - 例如，`2024-12-07T10:30:00.000Z` 表示 2024 年 12 月 7 日 10:30:00（UTC 时间）。



**Set**: 用于设置或修改字段的值。如果字段已经存在，该字段的值将被覆盖；如果字段不存在，则会创建该字段。**常用场景**: 为文档中的某个字段赋予固定的值。这个例子将字段 `status` 的值设置为 `"active"`:

```json
{
 "set": {
   "field": "status",
   "value": "active"
 }
}
```

**Rename**: 用于重命名字段，将一个字段的值赋给另一个字段并删除原始字段。**常用场景**: 重命名字段，以便后续处理或符合索引的设计。这个例子将 `old_name` 字段重命名为 `new_name`:

```json
{
 "rename": {
   "field": "old_name",
   "target_field": "new_name"
 }
}
```

**Uppercase Processor**: 将字段的值转换为大写形式。**常用场景**: 统一字段值的大小写，便于检索或避免大小写不一致的问题。

```json
{
 "uppercase": {
   "field": "name"
 }
}
```

**Lowercase Processor**: 将字段的值转换为小写形式。**常用场景**: 将文本数据统一为小写，确保大小写一致性。这个例子将 `email` 字段的值转换为小写。:
```json
{
 "lowercase": {
   "field": "email"
 }
}
```

**Trim Processor**: 去掉字段值的前后空白字符。**常用场景**: 去除用户输入字段中的多余空格，确保数据一致性。这个例子会去掉 `username` 字段前后的空格。

```json
{
 "trim": {
   "field": "username"
 }
}
```

**Grok Processor**: 使用 **Grok** 模式（类似正则表达式）从文本中提取信息。**常用场景**: 用于从字段中提取和解析特定模式的数据（如日志文件解析、IP 地址解析等）。这个例子使用 `Grok` 模式从 `message` 字段中提取出 IPv4 地址并将其存储到 `client_ip` 字段。

```json
{
 "grok": {
   "field": "message",
   "patterns": ["%{IPV4:client_ip}"]
 }
}
```

**Remove Processor**: 删除指定的字段。**常用场景**: 清理无用或敏感的字段，减少存储空间。这个例子会删除 `password` 字段。

```json
{
 "remove": {
   "field": "password"
 }
}
```

**Json Processor**:从字符串中提取 JSON 数据，并将其解析为字段。**常用场景**: 将嵌套的 JSON 字符串解析为 JSON 对象。这个例子会将 `json_string` 字段的 JSON 数据解析为 JSON 对象，并将结果存储到 `json_object` 字段。
```json
{
 "json": {
   "field": "json_string",
   "target_field": "json_object"
 }
}
```

**Convert Processor**: 将字段的值转换为指定类型（如字符串、整数、布尔值等）。**常用场景**: 确保字段值的数据类型符合预期。

```json
{
 "convert": {
   "field": "price",
   "type": "float"
 }
}
```

**Script Processor**: 使用脚本动态计算字段的值。**常用场景**: 根据复杂的逻辑动态修改字段值。这个例子通过脚本计算 `discount` 字段的值，依据 `price` 字段的值来设置不同的折扣。

```json
{
 "script": {
   "source": "if (ctx.price < 10) { ctx.discount = 0.1 } else { ctx.discount = 0.05 }"
 }
}
```

**Split Processor**: 将一个字段的值拆分成多个值，通常是通过分隔符。**常用场景**: 将一个字段的多个值拆分到不同的字段中。这个例子将 `full_name` 字段的值按空格拆分，结果存储到 `name_parts` 字段中。

```json
{
 "split": {
   "field": "full_name",
   "separator": " ",
   "target_field": "name_parts"
 }
}
```

**IP Processor**: 解析 IP 地址并将其转换为标准格式。**常用场景**: 用于从字符串中提取并解析 IP 地址。这个例子会解析 `ip_address` 字段中的 IP 地址并将其存储到 `parsed_ip` 字段。

```json
{
 "ip": {
   "field": "ip_address",
   "target_field": "parsed_ip"
 }
}
```

**总结**

Elasticsearch 提供的 **Ingest Pipeline** 处理器允许用户在索引数据之前灵活地处理和转换数据。通过这些处理器，用户可以清洗数据、修改字段、提取信息、转换数据类型等，确保索引中的数据符合预期格式并满足搜索需求。根据具体应用场景，开发人员可以选择合适的处理器组合来实现数据处理流程。

### 批量操作

批量请求允许在一个请求中向 Elasticsearch 发送多个与文档相关的操作。要创建此请求，可以方便地将 builder 对象用于主请求，并为每个操作使用 Fluent DSL。

```java
record Product(String sku, String cityBike, double v) {}
Product product1 = new Product("bk-1", " City bike ", 123.0);
Product product2 = new Product("bk-2", " City bike ", 123.0);
Product product3 = new Product("bk-3", " City bike ", 123.0);
Product product4 = new Product("bk-4", " City bike ", 123.0);

List<Product> list =List.of(product1,product2,product3,product4);
// * 使用 Fluent DSL
BulkRequest.Builder builder = new BulkRequest.Builder();
list.forEach(p-> 
    builder.operations(op->op
        .index( idx -> idx
            .index("products")
            .id(p.sku())
            .document(p)
)));
BulkResponse result = esClient.bulk(builder.build());

if (result.errors()){
    result.items().parallelStream().forEach(i->{
        if (i.error()!=null){
            log.error(i.error().reason());
        }
    });
}
```



#### `BulkRequest`

`BulkRequest` 是 Elasticsearch Java API 提供的用于批量操作的请求类。它允许在一个请求中执行多个操作（如创建、更新、删除）。以下是其常用方法和变量的详细说明：

**主要变量**

**`operations`**：存储所有要在批量操作中执行的操作列表。

- **类型**：`List<BulkOperation>`
- **作用**：每个 `BulkOperation` 对象表示一个具体的操作，例如索引文档、更新文档或删除文档。
- **使用示例**：
  
  ```java
  BulkRequest.Builder builder = new BulkRequest.Builder();
  builder.operations(op -> op.index(idx -> idx.index("products").id("1").document(product)));
  ```



**`timeout`**：设置批量请求的超时时间。

- **类型**：`Time`
- **作用**：如果批量操作未在指定时间内完成，可能会被终止。
- **使用示例**：
  ```java
  builder.timeout("2m"); // 设置超时为 2 分钟
  ```



**`refresh`**：指定是否刷新索引，使文档在批量操作后立即可见，方法同`IndexRequest`。

- **类型**：`Enum`（`true`, `false`, `wait_for`）
- **使用示例**：
  
  ```java
  builder.refresh(Refresh.True); // 操作完成后刷新索引
  ```



------

**常用方法**

**`operations()`**：获取当前 `BulkRequest` 中的所有操作。

- **返回值**：`List<BulkOperation>`
- **使用场景**：可以检查请求中包含的所有操作。
- **示例**：
  
  ```java
  List<BulkOperation> ops = bulkRequest.operations();
  ops.forEach(op -> System.out.println(op.toString()));
  ```



**`operations(BulkOperation operation)`**：添加一个操作到批量请求中。

- **参数**：`operation`：一个 `BulkOperation` 对象。
- **使用场景**：逐个添加操作。
- **示例**：
  
  ```java
  builder.operations(op -> op.index(idx -> idx.index("products").id("1").document(product)));
  ```



**`operations(List<BulkOperation> operations)`**：批量添加多个操作到请求中。

- **参数**：`operations`：一个包含多个 `BulkOperation` 的列表。
- **使用场景**：在一次调用中添加所有操作。
- **示例**：
  ```java
  List<BulkOperation> operations = new ArrayList<>();
  operations.add(new BulkOperation.Builder().index(idx -> idx.index("products").id("1").document(product)).build());
  builder.operations(operations);
  ```



**`timeout(String timeout)`**：设置操作的超时时间。

- **参数**：`timeout`：一个字符串表示的时间值（例如 `"1m"` 表示 1 分钟）。
- **返回值**：`BulkRequest.Builder`
- **使用场景**：控制批量操作的最大耗时。
- **示例**：
  ```java
  builder.timeout("1m"); // 设置超时时间为 1 分钟
  ```



**`refresh(Refresh refresh)`**：设置是否刷新索引，方法同`IndexRequest`。

- **参数**：`refresh`：一个枚举值，可以是 `Refresh.True`, `Refresh.False`, 或 `Refresh.WaitFor`。
- **使用场景**：确保数据在操作完成后立即可见。
- **示例**：
  ```java
  builder.refresh(Refresh.WaitFor); // 等待刷新完成
  ```



**`build()`**：构建一个 `BulkRequest` 对象。

- **返回值**：`BulkRequest`
- **使用场景**：完成对 `BulkRequest.Builder` 的配置后生成请求对象。
- **示例**：
  ```java
  BulkRequest request = builder.build();
  ```



---

**批量操作类型的支持**

`BulkRequest` 支持三种操作类型，通过 `BulkOperation` 设置具体操作类型：

**索引操作（Index）**：用于新增文档。

```java
builder.operations(op -> op.index(idx -> idx.index("products").id("1").document(product)));
```



**更新操作（Update）**：用于更新已有文档。

```java
builder.operations(op -> op.update(upd -> upd.index("products").id("1").doc(updateDoc)));
```



**删除操作（Delete）**：用于删除文档。

```java
builder.operations(op -> op.delete(del -> del.index("products").id("1")));
```



示例：构建一个包含多个操作的 `BulkRequest`

```java
BulkRequest.Builder builder = new BulkRequest.Builder();

// 添加索引操作
builder.operations(op -> op.index(idx -> idx.index("products").id("1").document(new Product("bk-1", "City Bike", 123.0))));

// 添加更新操作
builder.operations(op -> op.update(upd -> upd.index("products").id("2").doc(Map.of("price", 150.0))));

// 添加删除操作
builder.operations(op -> op.delete(del -> del.index("products").id("3")));

// 设置刷新选项和超时时间
builder.refresh(Refresh.WaitFor);
builder.timeout("2m");

// 构建并执行请求
BulkResponse response = esClient.bulk(builder.build());

// 检查响应是否有错误
if (response.errors()) {
    response.items().forEach(item -> {
        if (item.error() != null) {
            System.err.println("Error: " + item.error().reason());
        }
    });
} else {
    System.out.println("Bulk request executed successfully!");
}
```

适用场景
1. 大量文档的增删改操作。
2. 对性能要求较高，减少 HTTP 请求数。
3. 在分布式场景中需要快速处理批量任务。

#### `BulkOperation`

`BulkOperation` 是 Elasticsearch Java API 中批量操作请求的组成部分，用于描述单个操作（如创建、更新或删除）。以下是 `BulkOperation` 的主要变量和方法的详细介绍。

**主要变量**

**`index`**：存储索引操作（`IndexOperation`）的定义。

- **类型**：`IndexOperation<TDocument>`
- **作用**：表示一个文档的新增操作。
- **示例**：
  ```java
  BulkOperation op = new BulkOperation.Builder()
      .index(idx -> idx.index("products").id("1").document(product))
      .build();
  ```



**`update`**：存储更新操作（`UpdateOperation`）的定义。

- **类型**：`UpdateOperation<TDocument, TPartialDocument>`
- **作用**：表示一个文档的更新操作，可以更新部分或全部内容。
- **示例**：
  
  ```java
  BulkOperation op = new BulkOperation.Builder()
      .update(upd -> upd.index("products").id("1").doc(Map.of("price", 150.0)))
      .build();
  ```



**`delete`**：存储删除操作（`DeleteOperation`）的定义。

- **类型**：`DeleteOperation`
- **作用**：表示一个文档的删除操作。
- **示例**：
  
  ```java
  BulkOperation op = new BulkOperation.Builder()
      .delete(del -> del.index("products").id("1"))
      .build();
  ```



**`operationType`**：标识当前操作的类型（`index`、`update`、`delete`）。

- **类型**：`BulkOperation.Kind`
- **作用**：用于区分操作类型。
- **示例**：
  ```java
  BulkOperation.Kind type = op.operationType(); // 返回操作类型
  ```



**常用方法**

**`index(Function<IndexOperation.Builder<TDocument>, ObjectBuilder<IndexOperation<TDocument>>> fn)`**
- **描述**：设置一个索引操作。
- **参数**：`fn`：一个函数，用于配置 `IndexOperation`。
- **返回值**：`BulkOperation.Builder`
- **使用场景**：添加一个文档的索引操作。
- **示例**：
  ```java
  builder.index(idx -> idx.index("products").id("1").document(product));
  ```



**`update(Function<UpdateOperation.Builder<TDocument, TPartialDocument>, ObjectBuilder<UpdateOperation<TDocument, TPartialDocument>>> fn)`**

- **描述**：设置一个更新操作。
- **参数**：`fn`：一个函数，用于配置 `UpdateOperation`。
- **返回值**：`BulkOperation.Builder`
- **使用场景**：对文档进行更新。
- **示例**：
  ```java
  builder.update(upd -> upd.index("products").id("1").doc(Map.of("price", 200.0)));
  ```



**`delete(Function<DeleteOperation.Builder, ObjectBuilder<DeleteOperation>> fn)`**

- **描述**：设置一个删除操作。
- **参数**：`fn`：一个函数，用于配置 `DeleteOperation`。
- **返回值**：`BulkOperation.Builder`
- **使用场景**：删除文档。
- **示例**：
  ```java
  builder.delete(del -> del.index("products").id("1"));
  ```

**`operationType()`**：返回当前操作的类型。
- **返回值**：`BulkOperation.Kind`
- **使用场景**：确定操作的类型（如 `index`, `update`, `delete`）。
- **示例**：
  ```java
  BulkOperation.Kind type = op.operationType();
  if (type == BulkOperation.Kind.Index) {
      System.out.println("This is an index operation");
  }
  ```

**`toJsonp()`**：将当前操作序列化为 JSON。
- **返回值**：`void`
- **使用场景**：调试或记录操作时查看其 JSON 表示。
- **示例**：
  ```java
  op.toJsonp(generator); // 将操作序列化为 JSON 格式
  ```

**`equals()`**：检查两个 `BulkOperation` 是否相等。
- **返回值**：`boolean`
- **使用场景**：判断两个 `BulkOperation` 是否具有相同的内容。
- **示例**：
  ```java
  if (op1.equals(op2)) {
      System.out.println("The operations are the same");
  }
  ```

**`hashCode()`**：返回 `BulkOperation` 的哈希码。
- **返回值**：`int`
- **使用场景**：在集合（如 `HashMap` 或 `HashSet`）中存储 `BulkOperation`。
- **示例**：
  ```java
  int hash = op.hashCode();
  System.out.println("Hash code: " + hash);
  ```

示例：构建不同类型的 `BulkOperation`

```java
// 构建索引操作
BulkOperation indexOp = new BulkOperation.Builder()
    .index(idx -> idx.index("products").id("1").document(new Product("bk-1", "City Bike", 123.0)))
    .build();

// 构建更新操作
BulkOperation updateOp = new BulkOperation.Builder()
    .update(upd -> upd.index("products").id("1").doc(Map.of("price", 150.0)))
    .build();

// 构建删除操作
BulkOperation deleteOp = new BulkOperation.Builder()
    .delete(del -> del.index("products").id("1"))
    .build();

// 使用操作
System.out.println(indexOp.operationType()); // 输出: Index
System.out.println(updateOp.operationType()); // 输出: Update
System.out.println(deleteOp.operationType()); // 输出: Delete
```

**适用场景**
- 在批量操作中细粒度控制单个操作的内容。
- 使用不同操作类型组合复杂的批量请求。
- 动态构建操作类型以适应不同的业务需求。



#### `IndexRequest`和`IndexOperation`

`IndexRequest.Builder<Object>` 和 `co.elastic.clients.elasticsearch.core.bulk.IndexOperation.Builder<Object>` 是 Elasticsearch Java API 中的两个不同类，虽然它们的功能有相似之处，但用途和上下文不同。


**`IndexRequest.Builder<Object>`**

用于构建单个索引请求 (`IndexRequest`)。主要用于执行单个 `index` 操作。

**常用场景**
- 直接通过 `IndexRequest` 插入或更新一个文档。
- 用于非批量的单文档操作。

**关键方法**
- `.index(String index)`：设置索引名称。
- `.id(String id)`：设置文档 ID。
- `.document(Object document)`：设置文档内容。
- `.refresh(String refreshPolicy)`：设置刷新策略。
- `.routing(String routing)`：设置路由。

**示例**

```java
IndexRequest.Builder<Product> builder = new IndexRequest.Builder<>();
IndexRequest<Product> request = builder
    .index("products")
    .id("bk-1")
    .document(new Product("bk-1", "City Bike", 123.0))
    .build();
```

---

**`IndexOperation.Builder<Object>`**

用于构建批量操作中的单个索引操作 (`IndexOperation`)。是 `BulkRequest` 的组成部分，用于处理多文档的批量操作。

**常用场景**
- 在批量操作中添加一个文档的索引操作。
- 用于 `BulkRequest`，支持与其他操作（如 `update`、`delete`）混合使用。

**关键方法**
- `.index(String index)`：设置索引名称。
- `.id(String id)`：设置文档 ID。
- `.document(Object document)`：设置文档内容。

**示例**

```java
IndexOperation.Builder<Product> builder = new IndexOperation.Builder<>();
IndexOperation<Product> operation = builder
    .index("products")
    .id("bk-1")
    .document(new Product("bk-1", "City Bike", 123.0))
    .build();
```

---

**主要区别**

| **特性**             | **IndexRequest.Builder<Object>**                             | **IndexOperation.Builder<Object>**                           |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **用途**             | 用于构建单个索引请求。                                       | 用于构建批量操作中的单个索引操作。                           |
| **适用范围**         | 独立的 `IndexRequest`。                                      | 嵌套在 `BulkRequest` 中作为 `BulkOperation` 的一部分。       |
| **所属类**           | `co.elastic.clients.elasticsearch.core.IndexRequest.Builder` | `co.elastic.clients.elasticsearch.core.bulk.IndexOperation.Builder` |
| **与批量操作的关联** | 不直接用于批量操作。                                         | 专门用于批量操作 (`BulkRequest`) 的子操作。                  |
| **额外设置**         | 支持 `refresh`, `routing` 等请求级别参数设置。               | 更简单，专注于批量操作中必要的字段（索引名、文档 ID、文档内容）。 |

---

**它们是否可以替代？**
- **不可以完全替代**：`IndexRequest.Builder<Object>` 专注于单文档的独立索引操作，而 `IndexOperation.Builder<Object>` 是批量请求的组件之一。
- **共同点**：两者都提供 `.index`、`.id` 和 `.document` 方法用于定义文档的索引行为。

---

**组合使用示例**
```java
// 单个索引请求
IndexRequest<Product> singleIndexRequest = new IndexRequest.Builder<Product>()
    .index("products")
    .id("bk-1")
    .document(new Product("bk-1", "City Bike", 123.0))
    .build();

// 批量操作中的索引请求
BulkRequest.Builder bulkBuilder = new BulkRequest.Builder();
bulkBuilder.operations(op -> op.index(idx -> idx
    .index("products")
    .id("bk-2")
    .document(new Product("bk-2", "Mountain Bike", 456.0))
));

BulkResponse bulkResponse = esClient.bulk(bulkBuilder.build());
```

#### `BulkResponse`

`BulkResponse` 是 Elasticsearch Java API 中用于表示批量操作结果的类，包含了关于批量操作成功与否的详细信息，包括每个操作的状态和可能的错误。

**核心变量**

**`items`**：**类型**: `List<BulkResponseItem>`

- **说明**: 包含每个批量操作的结果列表。每个操作对应一个 `BulkResponseItem`，其中详细记录了操作类型、状态码、错误信息等。
- **用途**:用于逐项检查批量操作是否成功。
- **示例**:

 ```java
 List<BulkResponseItem> items = response.items();
 for (BulkResponseItem item : items) {
     System.out.println("Operation: " + item.operation());
     System.out.println("Status: " + item.status());
 }
 ```

**`errors`**：**类型**: `boolean`

- **说明**: 如果 `true`，则表明批量操作中至少有一个请求失败。
- **用途**:用来快速判断是否需要处理错误。
- **示例**:

 ```java
 if (response.errors()) {
     System.out.println("There were errors in the bulk operation.");
 }
 ```

**`took`**：**类型**: `long`

- **说明**: 批量操作耗时，单位为毫秒。
- **用途**:可用于性能分析和调试。
- **示例**:

 ```java
 System.out.println("Bulk operation took: " + response.took() + " ms");
 ```

---

**主要方法**

**`items()`**：**返回类型**: `List<BulkResponseItem>`

- **作用**:获取批量操作中每个请求的结果。
- **常用场景**:检查每个操作是否成功或失败。
- **示例**:

 ```java
 for (BulkResponseItem item : response.items()) {
     if (item.error() != null) {
         System.out.println("Error: " + item.error().reason());
     }
 }
 ```

**`errors()`**：**返回类型**: `boolean`

- **作用**:检查批量操作中是否有错误。
- **常用场景**:在日志中记录错误，或执行相应的错误处理逻辑。
- **示例**:

 ```java
 if (response.errors()) {
     System.out.println("Some operations failed!");
 }
 ```

**`took()`**：**返回类型**: `long`

- **作用**:获取整个批量操作的耗时。
- **常用场景**:用于性能监控。
- **示例**:

 ```java
 System.out.println("Operation took: " + response.took() + " ms");
 ```

**`toString()`**：**返回类型**: `String`

- **作用**:获取 `BulkResponse` 的字符串表示，包含关键信息（如错误和时间）。
- **常用场景**:调试时查看响应详情。
- **示例**:

 ```java
 System.out.println(response.toString());
 ```

---

#### `BulkResponseItem`

`BulkResponseItem` 是批量操作中每个操作的结果对象，包含了操作的状态和错误信息。

**核心变量**

1. **`index`**:操作目标的索引名。用于标识此次操作涉及的索引。
2. **`id`**:操作目标文档的 ID。确定文档的唯一标识。
3. **`status`**: 返回 HTTP 状态码，表示该操作的执行结果。例如，状态码 `200` 表示成功。
4. **`version`**:文档的版本号。跟踪文档的更新状态。
5. **`operation`**：表示操作类型，例如 `index`、`create`、`update` 或 `delete`。
6. **`error`** : 错误信息，类型为 `ErrorCause`，如果没有错误则为 `null`。
7. **`result`**：操作结果，表示文档的操作状态，常见的值包括：  

   - `"created"`: 文档被成功创建。
   - `"updated"`: 文档被成功更新。
   - `"deleted"`: 文档被成功删除
   - `"not_found"`: 在执行操作时，文档不存在。
   - `"noop"`: 没有操作（例如在某些条件下没有对文档进行更改）。
8. **`shardInfo`**：类型**: `ShardStatistics`，提供有关分片执行信息的统计，例如成功、失败、总分片数。
9. **`seqNo`**: `long`,表示操作对应的序列号（sequence number）。用于跟踪操作顺序。
10. **`primaryTerm`**: `long`。 表示操作发生时的主分片术语（primary term）。与序列号一起用于实现乐观并发控制。

**方法**

要获取这些值，可以通过同名方法获取。

**示例**

```java
for (BulkResponseItem item : response.items()) {
    System.out.println("Index: " + item.index());
    System.out.println("ID: " + item.id());
    System.out.println("Status: " + item.status());
    if (item.error() != null) {
        System.out.println("Error: " + item.error().reason());
    }
}
```



### 复制索引

在建立新索引前，可以指定映射：

`put /索引名`

```json
{
  "mappings": {
    "properties": {
      "memberInfo": {
        "properties": {
          "phone": {
            "type": "text"
          }
        }
      }
    }
  }
}
```

`post /_reindex`

```json
{
  "source": {
    "index": "tb_member_portrait"
  },
  "dest": {
    "index": "tb_member_portrait2"
  }
}
```

完成复制



























