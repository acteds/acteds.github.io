---
layout: post
title: SecureRandom
categories: [Java,IDEA]
description: Java笔记
keywords: Java,IDEA
---

# 引言

`SecureRandom`随机数的坑，java8版本与java17版本的该类底层原理不同。

# SecureRandom

##  问题复现

场景：需要对存入数据库的敏感数据进行非对称加密，对于不涉及加密数据的查询，无所谓随机数是否固定，但对于涉及加密数据的查询，就需要固定随机数了。因此有如下方法用来加密：

```java
    /**
     * SM2加密
     *
     * @param data      待加密数据
     * @return 加密后的数据
     */
    public static String sm2Encrypt( String data){
        try {
            if (!StringUtil.isNotNull(data)){
                return data;
            }
            //使用固定随机数
            SecureRandom random = new SecureRandom();
            random.setSeed(data.getBytes());
            ECPublicKeyParameters publicKeyParam = (ECPublicKeyParameters) PublicKeyFactory.createKey(getPublicKey().getEncoded());
            CipherParameters parameters = new ParametersWithRandom(publicKeyParam, random);
            byte[] encrypt = iniSmUtil().encrypt(data.getBytes(),parameters);
            String base64String = Base64.encodeBase64String(encrypt);
            //转16进制后返回
            return HexUtil.encodeHexStr(base64String, CharsetUtil.CHARSET_UTF_8);
        }catch (Exception e){
            log.error("SM2数据加密异常:", e);
            return data;
        }
    }
```

这里的：

```java
SecureRandom random = new SecureRandom();
random.setSeed(data.getBytes());
```

就是固定随机数。测试在Java8中相同种子是否返回相同的随机数：

```java
//使用固定随机数
Set<Integer> set = new HashSet<>();
for (int i = 0; i < 10000; i++) {
    SecureRandom random = new SecureRandom();
    random.setSeed(1);
    set.add(random.nextInt());
}
System.out.println(set);//[-1765061395]
```

**相同**，在Java17中：

```java
Set<Integer> set = new HashSet<>();
for (int i = 0; i < 10000; i++) {
    SecureRandom random = new SecureRandom();
    random.setSeed(1);
    set.add(random.nextInt());
}
System.out.println(set.size());//10000
```

**不相同**。实际上是`SecureRandom`的底层随机数算法发生了变化。

## 基本用法

`SecureRandom` 是一个提供加密强随机数生成器（RNG）的类，用于生成符合加密要求的随机数。

**加密强随机数**：
- 加密强随机数是指符合统计随机数生成器测试要求的随机数，满足 FIPS 140-2 和 RFC 4086 的要求，必须生成不可预测的输出。
- `SecureRandom` 必须生成非确定性输出，即每次生成的结果应该是随机且难以预测的。

**伪随机数生成器（PRNG）与真随机数**：
- 大多数 `SecureRandom` 的实现是基于伪随机数生成器（PRNG），即使用确定性的算法从随机种子生成伪随机数序列。
- 也有一些实现通过硬件或环境噪声等物理方式生成真随机数。
- 还有一些实现会结合这两种技术。

**获取 `SecureRandom` 实例**：

可以通过无参构造函数或 `getInstance` 方法获取 `SecureRandom` 实例，并指定具体的随机数生成算法。

```java
SecureRandom r1 = new SecureRandom(); // 默认
SecureRandom r2 = SecureRandom.getInstance("NativePRNG"); // 使用特定算法
SecureRandom r3 = SecureRandom.getInstance("DRBG", DrbgParameters.instantiation(128, RESEED_ONLY, null)); // 使用 DRBG 算法
```

**生成随机字节**：

常用的方法是通过 `nextBytes(byte[] bytes)` 生成随机字节数组。

```java
SecureRandom random = new SecureRandom();
byte[] bytes = new byte[20];
random.nextBytes(bytes);
```

**生成种子**：

`generateSeed` 方法可以用来生成一定数量的种子字节，通常用于给其他随机数生成器提供种子。

```java
byte[] seed = random.generateSeed(20);
```

**自我播种**：
- 新创建的 PRNG `SecureRandom` 对象不会自动播种，除非是通过 `SecureRandom(byte[])` 构造函数创建的。
- 如果没有显式调用 `setSeed`，第一次调用 `nextBytes` 时，它会自动从实现特定的熵源播种自己。

**重播种**：
- 可以通过 `reseed` 或 `setSeed` 方法对 `SecureRandom` 进行重播种。`reseed` 方法会从熵源读取输入进行重播种，而 `setSeed` 方法则需要显式提供种子。
- 需要注意的是，并非所有实现都支持 `reseed`。

**支持的实现和线程安全性**：
- 一些 `SecureRandom` 实现可能会接受 `SecureRandomParameters` 参数来进一步控制方法行为。
- 根据实现的不同，`generateSeed`、`reseed` 和 `nextBytes` 方法可能会阻塞，尤其是当熵源是 `/dev/random`（在类 Unix 操作系统上）时。
- `SecureRandom` 对象是线程安全的，可以在多个并发线程中使用。

**线程安全**：
- 如果 `SecureRandom` 服务提供者支持线程安全，则会在服务提供者注册时设置“ThreadSafe”属性为“true”。
- 如果没有声明线程安全，`SecureRandom` 会通过同步来确保以下方法的线程安全：
 - `engineSetSeed(byte[])`
 - `engineNextBytes(byte[])`
 - `engineGenerateSeed(int)`
 - `engineReseed(SecureRandomParameters)`

`SecureRandom` 是 Java 提供的一个加密强度的随机数生成器，它可以生成适用于加密、密码学和其他安全应用的随机数。该类支持多种随机数生成算法，包括伪随机数生成算法和真随机数生成算法。用户可以通过不同的方式获取 `SecureRandom` 实例，并生成随机字节或种子。`SecureRandom` 对象是线程安全的，可以在多线程环境中使用。

## 数字生成算法

SecureRandom 有如下数字生成算法：[Java Security Standard Algorithm Names](https://docs.oracle.com/en/java/javase/17/docs/specs/security/standard-names.html#securerandom-number-generation-algorithms)

| 算法名称                  | 描述                                                         |
| ------------------------- | ------------------------------------------------------------ |
| **NativePRNG**            | 从底层操作系统获取随机数。没有对生成这些数字的阻塞性质做出任何声明。 |
| **NativePRNGBlocking**    | 从底层操作系统获取随机数，必要时会阻塞。例如，类 UNIX 系统中的 `/dev/random`。 |
| **NativePRNGNonBlocking** | 从底层操作系统获取随机数，不会阻塞，避免应用程序过度停顿。例如，类 UNIX 系统中的 `/dev/urandom`。 |
| **PKCS11**                | 从底层已安装并配置的 PKCS #11 库获取随机数。                 |
| **DRBG**                  | 使用 NIST SP 800-90Ar1 中定义的 DRBG 机制的算法。            |
| **SHA1PRNG**              | 使用 SUN 提供的伪随机数生成（PRNG）算法。该算法使用 SHA-1 作为 PRNG 的基础。通过对一个真实随机种子值和一个 64 位计数器进行 SHA-1 哈希计算，每次操作时计数器递增 1。 从 160 位的 SHA-1 输出中，仅使用 64 位。 |
| **Windows-PRNG**          | 从底层 Windows 操作系统获取随机数。                          |

这些算法各自具有不同的实现方式和用途，可以根据安全需求和平台特性选择合适的算法。

通过 `new SecureRandom()` 创建的 `SecureRandom` 实例使用的算法是 **平台默认的伪随机数生成算法**。该算法通常依赖于操作系统提供的随机数生成机制，但具体算法的选择会根据操作系统和 Java 实现的不同而有所变化。

常见的实现和算法：
1. **Unix-like 操作系统（Linux、macOS等）**：
   - `SecureRandom` 默认会使用基于 `/dev/urandom` 或 `/dev/random` 的随机数生成器。
   - `/dev/urandom`：非阻塞的伪随机数生成器，它会不断使用系统熵池中的数据生成随机数。
   - `/dev/random`：阻塞的伪随机数生成器，只有当系统熵池中的数据足够时才能生成随机数。

2. **Windows 操作系统**：`SecureRandom` 默认会使用 **Windows-PRNG**（基于 Windows 操作系统的随机数生成器）。

3. **其他平台**：在一些平台上，`SecureRandom` 可能会使用类似 **NativePRNG** 的伪随机数生成算法。

实现原理：
- **NativePRNG**：一种伪随机数生成算法，通常会依赖于操作系统提供的底层熵源。在 Unix-like 系统中，它通过 `dev/urandom` 提供一个快速的、非阻塞的随机数生成方式。
- **DRBG（Deterministic Random Bit Generator）**：如果平台不提供足够的熵源，或者要求更强的加密性质，`SecureRandom` 会使用 DRBG 算法，它是一个基于确定性算法的伪随机数生成器。常用于满足更严格的安全需求。

通过 `new SecureRandom()` 创建的 `SecureRandom` 实例使用的是平台默认的算法，它通常依赖于操作系统提供的熵源。在类 Unix 操作系统中，它通常基于 `/dev/urandom`，而在 Windows 操作系统中，它会使用 Windows 提供的 `Windows-PRNG` 算法。具体使用哪种算法，可以通过 `SecureRandom.getInstance()` 方法显式指定。

下面是几个示例代码，展示了如何选择不同的随机数生成算法并输出其生成的随机数。

**使用 `NativePRNG` 算法**

```java
import java.security.SecureRandom;

public class SecureRandomExample {
    public static void main(String[] args) throws Exception {
        // 使用 NativePRNG 算法
        SecureRandom random = SecureRandom.getInstance("NativePRNG");
        System.out.println("NativePRNG Random Number: " + random.nextInt());
    }
}
```

**预期结果：**

输出的随机数将来自底层操作系统的随机数源，没有对阻塞性质做任何声明。不同操作系统的行为可能不同。

------

**使用 `NativePRNGBlocking` 算法**

```java
import java.security.SecureRandom;

public class SecureRandomExample {
    public static void main(String[] args) throws Exception {
        // 使用 NativePRNGBlocking 算法
        SecureRandom random = SecureRandom.getInstance("NativePRNGBlocking");
        System.out.println("NativePRNGBlocking Random Number: " + random.nextInt());
    }
}
```

**预期结果：**

该算法会从底层操作系统的 `blocking` 随机数源获取随机数。在 Linux 系统上，通常会从 `/dev/random` 获取，可能会在系统缺少足够的熵时导致阻塞。

------

**使用 `NativePRNGNonBlocking` 算法**

```java
import java.security.SecureRandom;

public class SecureRandomExample {
    public static void main(String[] args) throws Exception {
        // 使用 NativePRNGNonBlocking 算法
        SecureRandom random = SecureRandom.getInstance("NativePRNGNonBlocking");
        System.out.println("NativePRNGNonBlocking Random Number: " + random.nextInt());
    }
}
```

**预期结果：**

该算法将从非阻塞的随机数源获取随机数，例如 `/dev/urandom`，即使系统缺乏熵，也不会阻塞，能保证更快的响应时间。

------

**使用 `PKCS11` 算法**

```java
import java.security.SecureRandom;

public class SecureRandomExample {
    public static void main(String[] args) throws Exception {
        // 使用 PKCS11 算法（需要配置并且支持 PKCS11 提供者）
        SecureRandom random = SecureRandom.getInstance("PKCS11");
        System.out.println("PKCS11 Random Number: " + random.nextInt());
    }
}
```

**预期结果：**

该算法将使用已安装的 PKCS#11 加密模块提供的随机数生成器。如果没有安装支持的硬件加密模块或配置正确的 PKCS#11 提供者，可能会抛出异常。

------

**使用 `DRBG` 算法**

```java
import java.security.SecureRandom;
import org.bouncycastle.crypto.prng.DrbgParameters;

public class SecureRandomExample {
    public static void main(String[] args) throws Exception {
        // 使用 DRBG 算法
       SecureRandom random = SecureRandom.getInstance("DRBG", DrbgParameters.instantiation(128, DrbgParameters.Capability.RESEED_ONLY, null));
        System.out.println("DRBG Random Number: " + random.nextInt());
    }
}
```

**预期结果：**

该算法使用 DRBG（Deterministic Random Bit Generator）机制，通常基于哈希函数或加密算法（例如 SHA-256）生成随机数。需要合适的参数进行初始化。此算法通常提供高安全性，并且能够生成高质量的随机数。

**"DRBG"** 

这里指定了使用的算法为 **DRBG**（Deterministic Random Bit Generator）。它是基于特定标准（如 NIST SP 800-90A）定义的伪随机数生成算法。DRBG 主要通过一个确定性算法（通常是基于哈希函数或者加密算法）来生成伪随机数序列，并且可以通过一定的种子输入和系统熵来源进行初始化。

**`DrbgParameters.instantiation(int securityStrength, DrbgParameters.Capability capability, byte[] personalizationString)`** 

(DRBG 参数实例化)这个方法用于指定 DRBG 的生成方式，通常包括以下三个重要参数：

**`securityStrength`** (安全强度)

- `securityStrength` 是 DRBG 算法的安全强度，以位为单位。例如，`128` 表示 DRBG 的输出应该具有 128 位的安全强度，通常是为了保证随机数生成的强度和质量。这意味着生成的随机数在算法层面上应该至少提供 128 位的安全保障。
- 一般来说，安全强度是基于预期的用途来选择的。如果你需要更高的安全性，可以选择更高的安全强度（比如 256 位）。例如：
 - 128：适用于一般的加密操作和安全应用。
 - 256：适用于高安全性的要求。



**`capability`** (能力)

**`PR_AND_RESEED`**:

- 这个值表示所请求的 `DRBG` 实例 **同时支持预测抗性** 和 **重种子功能**。
- **预测抗性（Prediction Resistance）**：确保通过某些途径预测随机数生成器的输出变得极其困难，增加安全性。对于加密应用，通常需要预测抗性来防止攻击者通过某些方式推测后续生成的随机数。
- **重种子（Reseed）**：DRBG 需要定期重新引入熵源（例如，新的随机输入），以保持生成的随机数的质量。重种子是为了避免长期使用同一种子产生的随机数序列趋向于可预测。

**`RESEED_ONLY`**:
- 这个值表示所请求的 `DRBG` 实例 **仅支持重种子功能**，而 **不支持预测抗性**。
- 这种能力适用于需要定期刷新或更新种子的场景，但不要求具备强大的抗预测性。在一些不那么敏感的应用中，可能只需要重种子来保证随机数的质量，而不一定要求具有预测抗性。

**`NONE`**:
- 这个值表示所请求的 `DRBG` 实例 **既不支持预测抗性，也不支持重种子功能**。
- 在某些情况下，可能仅需要生成一次性的随机数，而不需要进行任何后续的重种子或抗预测性保护。例如，一些简单的随机数生成应用可能不要求具有特别高的安全标准。


不同的请求能力与可能的实际能力之间的关系：
- 请求 **NONE** 能力时，实际返回的能力可能是 `NONE`、`RESEED_ONLY` 或 `PR_AND_RESEED`。
- 请求 **RESEED_ONLY** 时，实际返回的能力可能是 `RESEED_ONLY` 或 `PR_AND_RESEED`。
- 请求 **PR_AND_RESEED** 时，实际返回的能力一定是 `PR_AND_RESEED`。

总结：
- `PR_AND_RESEED`：支持重种子和预测抗性。
- `RESEED_ONLY`：仅支持重种子，不支持预测抗性。
- `NONE`：既不支持预测抗性，也不支持重种子。

这种能力控制机制提供了灵活性，允许开发者根据实际安全需求选择最合适的 `DRBG` 配置。



**`personalizationString`** (个性化字符串)
- 这个参数用于初始化 DRBG 时的个性化字符串，通常是额外的输入数据，用于增强生成随机数的多样性和不可预测性。传入 `null` 表示没有使用个性化字符串。
- 个性化字符串有助于在特定上下文中初始化 DRBG，确保在不同场景中生成的随机数是不同的。
- 如果你希望在初始化时根据特定的上下文或环境（如设备ID、时间戳等）来生成不同的随机数种子，可以使用个性化字符串。



**整体效果**

综合来看，这行代码通过 `DrbgParameters.instantiation(128, DrbgParameters.Capability.RESEED_ONLY, null)` 来创建一个 `DRBG` 实例，它有以下特点：
- **128 位安全强度**，生成的随机数序列具有较高的安全性。
- **RESEED_ONLY** 能力，意味着该实例不直接生成随机数，而是在需要时执行重种子操作。
- **没有个性化字符串**，即 DRBG 使用的是默认的熵源，而不是特定上下文的数据。

这种配置通常适用于需要安全随机数生成、定期重种子的场景，尤其是在要求较高安全性的加密应用中。

------

**使用 `SHA1PRNG` 算法**

```java
import java.security.SecureRandom;

public class SecureRandomExample {
    public static void main(String[] args) throws Exception {
        // 使用 SHA1PRNG 算法
        SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
        System.out.println("SHA1PRNG Random Number: " + random.nextInt());
    }
}
```

**预期结果：**

SHA1PRNG 是一个基于 SHA-1 哈希的伪随机数生成器。其生成的随机数会受到初始种子和计数器的影响，生成的随机数相对较为可预测，但对于大多数非安全应用场景是足够的。

------

**使用 `Windows-PRNG` 算法**

```java
import java.security.SecureRandom;

public class SecureRandomExample {
    public static void main(String[] args) throws Exception {
        // 使用 Windows-PRNG 算法
        SecureRandom random = SecureRandom.getInstance("Windows-PRNG");
        System.out.println("Windows-PRNG Random Number: " + random.nextInt());
    }
}
```

**预期结果：**

该算法将从 Windows 操作系统的随机数源（例如通过 Windows Cryptographic API）生成随机数。

------

总结

1. **NativePRNG** 和 **Windows-PRNG** 会依赖操作系统的原生随机数生成机制，通常比较快，但可能不太适合高安全性需求。
2. **NativePRNGBlocking** 会阻塞直到足够的随机数可用，适合用于高安全性的环境，但可能会延迟。
3. **NativePRNGNonBlocking** 适用于不希望阻塞的环境，会优先使用 `/dev/urandom`。
4. **PKCS11** 和 **DRBG** 提供硬件加速和更高的安全性，但依赖于相应的硬件和配置。
5. **SHA1PRNG** 是基于 SHA-1 的伪随机数生成器，适用于一般用途，但不适合高安全性的要求。

根据具体需求选择合适的算法。

## 解决

在Java8中相同种子是否返回相同的随机数：

```java
//使用固定随机数
Set<Integer> set = new HashSet<>();
for (int i = 0; i < 10000; i++) {
    SecureRandom random = new SecureRandom();
    random.setSeed(1);
    set.add(random.nextInt());
}
System.out.println(set);//[-1765061395]
```

在Java17中，指定`SHA1PRNG`随机数生成器：

```java
//使用固定随机数
Set<Integer> set = new HashSet<>();
for (int i = 0; i < 10000; i++) {
    SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
    random.setSeed(1);
    set.add(random.nextInt());
}
System.out.println(set);//[-1765061395]
```

进一步测试：

java17：

```java
Set<Integer> set = new HashSet<>();
for (int j = 1; j <= 10; j++) {
    for (int i = 0; i < 10000; i++) {
        SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
        random.setSeed(j);
        set.add(random.nextInt());
    }
}
System.out.println(set);//[1171630791, -70273684, -1765061395, -786090109, 1560068868, 1762545591, 1861147253, -551574285, 1891309446, -1389656251]
```

java8：

```java
Set<Integer> set = new HashSet<>();
for (int j = 1; j <= 10; j++) {
    for (int i = 0; i < 10000; i++) {
        SecureRandom random = new SecureRandom();
        random.setSeed(j);
        set.add(random.nextInt());
    }
}
System.out.println(set);//[1171630791, -70273684, -1765061395, -786090109, 1560068868, 1762545591, 1861147253, -551574285, 1891309446, -1389656251]
```

可以看出结果一致，实际上只要保证指定种子返回固定的随机数序列即可。

然后将之前的数据重新指定算法加密即可。

