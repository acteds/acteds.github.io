---
layout: post
title: OpenFeign的使用
categories: Java
description: Java笔记
keywords: Java
---

# 引言

**OpenFeign** 是一个声明式的 HTTP 客户端，主要用于简化微服务之间的通信。它通过注解和接口的形式定义远程服务的调用，帮助开发者省去了编写大量 HTTP 请求的样板代码。在 Spring Cloud 中，OpenFeign 与 Spring Boot 和 Spring Cloud 集成良好，能够与负载均衡、断路器等组件搭配使用。

# OpenFeign

在微服务架构中，不同的服务通过 HTTP 进行通信。常规做法是手动使用 `RestTemplate` 或 `HttpClient` 发起 HTTP 请求，这样的代码通常冗长且容易出错。**OpenFeign** 的优势在于它通过接口与注解的形式，使得调用远程服务就像调用本地方法一样简单。

**使用场景：**

- **简化服务调用**：你不需要手动构造 HTTP 请求，而是通过调用本地接口来完成服务的远程调用。
- **更好的集成性**：OpenFeign 可以与其他 Spring Cloud 组件（如 Ribbon、Hystrix 等）无缝集成，提供负载均衡、超时、断路器等功能。

**OpenFeign 的优点**：

1. **声明式的编程风格**：使用注解（例如 `@FeignClient`、`@RequestMapping` 等）定义远程服务调用，使代码简洁、易读。调用远程服务就像调用本地方法一样，无需关心底层的 HTTP 请求细节。
2. **自动集成负载均衡**：通过与 Spring Cloud Ribbon 集成，OpenFeign 可以自动实现对多个实例的负载均衡。你只需定义服务名，它会根据服务注册中心的实例列表选择目标。
3. **与 Hystrix 结合**：OpenFeign 可以与 Hystrix 集成，实现熔断和降级策略。在微服务架构中，当某个服务不可用时，Hystrix 可以帮助服务调用快速失败，避免级联故障。
4. **与 Spring Boot 深度集成**：OpenFeign 在 Spring Cloud 中具有很好的集成支持，能够通过注解、配置文件等方式轻松配置超时、重试等策略。
5. **自定义配置**：OpenFeign 允许你自定义拦截器、编码器、解码器、日志等，来满足个性化需求。

**OpenFeign 的缺点**：

1. **依赖反射，性能稍差**：OpenFeign 是基于反射的声明式框架，性能上比手写的 HTTP 客户端（如 `RestTemplate`、`HttpClient`）稍差，适用于业务较轻或中等的服务调用场景。
2. **缺少部分高级 HTTP 控制**：OpenFeign 的简洁性是它的优势，但它也使得一些高级的 HTTP 请求控制（例如复杂的请求头操作、流式数据处理等）不如手动编写 HTTP 客户端灵活。
3. **调试相对复杂**：在使用 OpenFeign 时，问题调试（例如网络问题、超时等）比手写 HTTP 请求更加抽象，出错时可能需要深入了解 Feign 的工作机制。
4. **依赖服务注册中心**：在分布式系统中，OpenFeign 通常依赖服务注册中心（如 Eureka、Consul 等）来发现服务实例，因此在服务注册中心出现故障时可能会影响服务调用。

------

导入依赖：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

程序入口添加注解：`@EnableFeignClients`。

可以配置超时时间：

```yaml
feign:
  client:
    config:
      default:
        connectTimeout: 20000 # feign 的超时设置
        readTimeout: 60000
```

使用：

```java
@FeignClient(name = "domainresourcesservice", fallback = ResourcesServiceFallBack.class,configuration = {FeginConfig.class})
public interface ResourcesService {
    @RequestMapping(value ="/resources/rolePersionInfo/savePersionRoleAndGroupV2")
    Wrapper savePersionRoleAndGroup(
        @RequestParam("persionId") String persionId, 
        @RequestParam("groupIds") String groupIds, 
        @RequestParam("roleIds") String roleIds, 
        @RequestParam("jiean_projectName") String jiean_projectName
    );
}
```

注意：**`@RequestMapping` 注解不能直接用于 `@FeignClient` 接口**。`FeignClient` 接口不允许在类级别使用 `@RequestMapping`，应该仅在方法级别使用 `@GetMapping`、`@PostMapping`、`@RequestParam` 等注解来定义 HTTP 请求。

配置类：

```java
import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeginConfig {
    @Bean
    Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
}
```

回滚类：

```java
@Service
public class ResourcesServiceFallBack implements ResourcesService {
    /**
     * 新增人员和角色关系表
     * @param jiean_projectName
     * @param persionId
     * @param groupIds
     * @return
     */
    @Override
    public Wrapper savePersionRoleAndGroup(
        @RequestParam("persionId") String persionId,
        @RequestParam("groupIds") String groupIds,
        @RequestParam("roleIds") String roleIds,
        @RequestParam("jiean_projectName") String jiean_projectName
    ) {
        return WrapMapper.error(5001,"Feign 新增人员和角色关系失败");
    }   
}
```

**`@FeignClient`**：用于声明一个 Feign 客户端，并指定该客户端要调用的服务。

- **`name = "domainresourcesservice"`**：指定服务的名称。Feign 会根据这个名称从服务注册中心（如 Consul 或 Eureka）获取服务实例的地址，并发起请求。这个名字应该与注册中心中的服务名一致。
- **`fallback = ResourcesServiceFallBack.class`**：指定一个回退类，当远程调用失败时会执行 `ResourcesServiceFallBack` 中定义的回退逻辑。回退类通常用于实现熔断或降级功能，以提高服务的稳定性。
- **`configuration = {FeginConfig.class}`**：指定 Feign 客户端的配置类 `FeginConfig`，该类可以包含自定义的 Feign 配置，如超时时间、编码器、解码器、拦截器等。

**`@RequestMapping`**：表示这个接口方法对应的 HTTP 请求。`value = "/resources/rolePersionInfo/savePersionRoleAndGroupV2"` 表示该方法将发送到路径 `/resources/rolePersionInfo/savePersionRoleAndGroupV2` 的请求。

- 默认情况下，这是一个 `POST` 或 `GET` 请求（具体取决于 Feign 的配置），可以根据需求指定请求方法。

这段代码是一个 Feign 客户端的接口，它用于调用名为 `domainresourcesservice` 的微服务下的 `/resources/rolePersionInfo/savePersionRoleAndGroupV2` 接口，执行保存某个用户的角色和组信息操作。

------

在使用 Feign 客户端时，有以下几点需要特别注意：

**服务名要一致**：`@FeignClient(name = "domainresourcesservice")` 中指定的服务名称 **`domainresourcesservice`** 必须与服务注册中心（如 Consul、Eureka）中的服务名称一致。否则，Feign 客户端将无法找到目标服务的实例，导致请求失败。

**回退类 `fallback`**：`fallback = ResourcesServiceFallBack.class` 指定了降级处理类，当远程服务不可用或者超时时，Feign 会自动调用回退方法。这有助于增强系统的容错性，防止服务故障蔓延到整个系统。

- 确保 `ResourcesServiceFallBack` 类已经实现了 `ResourcesService` 接口，并提供了具体的回退逻辑。
- 如果没有正确配置 Hystrix 或 Resilience4j 等熔断器，回退逻辑可能无法生效。

**请求参数**

- **参数类型**：确保所有参数在远程服务的 API 中是匹配的。这里使用 `@RequestParam` 注解，表示参数会被作为查询参数或表单数据传递。对应的远程服务也应该相应处理这些参数。
- **参数格式和验证**：确保传递的参数格式正确。例如，`groupIds` 和 `roleIds` 可能是逗号分隔的字符串。如果后端要求某种特殊格式，确保在调用时传递的值是正确的。

**自定义配置**

**Feign 配置 `FeginConfig.class`**：如果你有自定义的 Feign 配置（如超时设置、重试机制、编码解码器等），确保 `FeginConfig` 配置正确，并且 Feign 客户端能够应用这些配置。

比如，可以在 `FeginConfig` 中指定连接超时、读取超时等，以防止因网络延迟导致的请求失败。

**错误处理**

- **错误响应处理**：`Wrapper` 是接口的返回类型，确保你能够处理远程服务可能返回的错误响应。需要检查 `Wrapper` 类是否能处理错误码、错误消息等，并且调用方能够正确处理错误。
- **异常处理**：Feign 在请求失败时可能抛出各种异常（如 `FeignException`、`ConnectException` 等），在接口的实现类中应做好异常捕获和处理，避免应用崩溃。

**日志与调试**

- **启用 Feign 日志**：如果需要调试 Feign 请求，可以在配置中启用 Feign 的详细日志功能，查看请求和响应的完整信息。
  
  ```java
  feign:
    client:
      config:
        default:
          loggerLevel: FULL
  ```
- 这样可以帮助你调试 Feign 请求的问题，尤其是遇到请求失败或响应不符合预期时。

**超时和重试**

- **超时设置**：如果目标服务响应较慢，可能会导致 Feign 请求超时，导致熔断触发。确保 Feign 配置中设置了适当的超时时间，以平衡性能和可用性。
  ```java
  @Bean
  public Request.Options feignOptions() {
      return new Request.Options(5000, 10000); // 连接超时 5 秒，读取超时 10 秒
  }
  ```

**服务健康检查与负载均衡**

- **服务健康检查**：确保目标服务在注册中心是健康的，否则 Feign 会找不到可用的实例。可以定期检查目标服务的健康状态。
- **负载均衡**：Feign 通常与 Ribbon 一起使用，支持负载均衡调用多实例服务。确保注册中心中的服务实例都能够被正确负载均衡。

**版本兼容性**

- **服务接口版本兼容**：远程服务的接口可能会发生变更，因此需要定期检查服务接口是否有变化，确保调用方和提供方之间的接口保持兼容性，尤其是请求参数或返回值格式的变化。

确保这些关键点能够帮助你在使用 Feign 客户端时避免常见的错误，并确保系统的健壮性和可扩展性。

------

一个简单的完整实例：

假设服务`A`，有如下接口：

```java
@RestController
@RequestMapping("/pi")
public class ProductInventoryController {
    @Autowired
    private ProductInventoryMapper productInventoryMapper;

    @GetMapping("/getAll")
    public List<ProductInventory> getAllUsers() {
        return productInventoryMapper.selectAll();
    }
    @PostMapping("/add")
    public int addUser(@RequestBody ProductInventory productInventory) {
        return productInventoryMapper.insert(productInventory);
    }
}
```

则服务`B`，如果需要调用服务`A`的接口，可以这样定义Feign：

```java
@FeignClient(name = "A", fallback = DemoServiceFeignFallBack.class,configuration = {FeginConfig.class})
public interface DemoServiceFeign {
    @GetMapping("/pi/getAll")
    List<ProductInventory> getAllUsers();
    @PostMapping("/pi/add")
    int addUser(@RequestBody ProductInventory productInventory);
}
```

注意`ProductInventory`类结构要保持一致。

然后可以这样调用Feign：

```java
@RestController
@RequestMapping("/feign")
public class FeignTestController {
    @Autowired
    private DemoServiceFeign demoServiceFeign;

    @GetMapping("/getAll")
    public List<ProductInventory> getAllUsers() {
        return demoServiceFeign.getAllUsers();
    }
    @PostMapping("/add")
    public int addUser(@RequestBody ProductInventory productInventory) {
        return demoServiceFeign.addUser(productInventory);
    }
}
```

如果不希望在服务 `B` 中创建 `ProductInventory` 类，可以使用 `Map<String, Object>` 或 `JSONObject` 来代替对象传递数据。这样，`Feign` 接口可以通过动态对象来进行调用。

修改后的 Feign 接口：

```java
@FeignClient(name = "A", fallback = DemoServiceFeignFallBack.class, configuration = {FeginConfig.class})
public interface DemoServiceFeign {
    @GetMapping("/pi/getAll")
    List<Map<String, Object>> getAllUsers();  // 使用 Map 代替 ProductInventory

    @PostMapping("/pi/add")
    int addUser(@RequestBody Map<String, Object> productInventory);  // 使用 Map 传递数据
}
```

修改后的调用方法：

```java
@RestController
@RequestMapping("/feign")
public class FeignTestController {
    @Autowired
    private DemoServiceFeign demoServiceFeign;

    @GetMapping("/getAll")
    public List<Map<String, Object>> getAllUsers() {
        return demoServiceFeign.getAllUsers();  // 获取 Map 类型的结果
    }

    @PostMapping("/add")
    public int addUser(@RequestBody Map<String, Object> productInventory) {
        return demoServiceFeign.addUser(productInventory);  // 传递 Map 类型的数据
    }
}
```

**优点**：避免了在服务 `B` 中定义 `ProductInventory` 类。

**缺点**：使用 `Map` 或 `JSONObject` 使代码的类型检查变得不那么严格，容易出错，并且不如直接使用实体类那么清晰和安全。

