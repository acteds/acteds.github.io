---
layout: post
title: Java集合-List和Map常用实现类
categories: Java
description: Java笔记
keywords: Java
---
# 引言
&emsp;&emsp;java集合List和Map常用实现类，还包括函数式接口，方法引用笔记。  



# 集合
&emsp;&emsp;在Java中，如果一个Java对象可以在内部持有若干其他Java对象，并对外提供访问接口，我们把这种Java对象称为集合。很显然，Java的数组可以看作是一种集合：  
```java
String[] ss = new String[10]; // 可以持有10个String对象
ss[0] = "Hello"; // 可以放入String对象
String first = ss[0]; // 可以获取String对象
```
&emsp;&emsp;既然Java提供了数组这种数据类型，可以充当集合，那么，我们为什么还需要其他集合类？这是因为数组有如下限制：  
- 数组初始化后大小不可变；
- 数组只能按索引顺序存取。

&emsp;&emsp;因此，我们需要各种不同类型的集合类来处理不同的数据，例如：  
- 可变大小的顺序链表；
- 保证无重复元素的集合；

# Collection
&emsp;&emsp;Java标准库自带的`java.util`包提供了集合类：`Collection`，它是除`Map`外所有其他集合类的根接口。Java的`java.util`包主要提供了以下三种类型的集合：  
- `List`：一种有序列表的集合，例如，按索引排列的`Student`的`List`；
- `Set`：一种保证没有重复元素的集合，例如，所有无重复名称的`Student`的`Set`；
- `Map`：一种通过键值（key-value）查找的映射表集合，例如，根据`Student`的`name`查找对应`Student`的`Map`。

&emsp;&emsp;Java集合的设计有几个特点：一是实现了接口和实现类相分离，例如，有序表的接口是`List`，具体的实现类有`ArrayList`，`LinkedList`等，二是支持泛型，我们可以限制在一个集合中只能放入同一种数据类型的元素，例如：  
```
List<String> list = new ArrayList<>(); // 只能放入String类型
```
&emsp;&emsp;最后，Java访问集合总是通过统一的方式——迭代器（Iterator）来实现，它最明显的好处在于无需知道集合内部元素是按什么方式存储的。  
&emsp;&emsp;由于Java的集合设计非常久远，中间经历过大规模改进，我们要注意到有一小部分集合类是遗留类，不应该继续使用：  
- `Hashtable`：一种线程安全的`Map`实现；
- `Vector`：一种线程安全的`List`实现；
- `Stack`：基于`Vector`实现的`LIFO`的栈。

&emsp;&emsp;还有一小部分接口是遗留接口，也不应该继续使用：  
- `Enumeration<E>`：已被`Iterator<E>`取代。

# List
&emsp;&emsp;**`List`的子接口**除了`List`接口外，还有`Deque`（双端队列）和`Queue`（队列）等接口，它们分别代表具有不同特性的列表。`Deque`支持在两端添加和删除元素，而`Queue`通常采用先进先出（FIFO）的方式管理元素。  
&emsp;&emsp;在Java 8中，集合框架引入了一些新的特性，如`forEach()`方法、`stream`流操作、函数式接口等，可以更方便地对集合进行操作和处理。  
&emsp;&emsp;在实际应用中，需要增删元素的有序列表，我们使用最多的是`ArrayList`。  
&emsp;&emsp;`ArrayList`把添加和删除的操作封装起来，让我们操作`List`类似于操作数组，却不用关心内部元素如何移动。  
&emsp;&emsp;`List<E>`接口有几个主要的接口方法：  
- 在末尾添加一个元素：`boolean add(E e)`
- 在指定索引添加一个元素：`boolean add(int index, E e)`
- 删除指定索引的元素：`E remove(int index)`
- 删除某个元素：`boolean remove(Object e)`
- 获取指定索引的元素：`E get(int index)`
- 获取链表大小（包含元素的个数）：`int size()`

&emsp;&emsp;实现`List`接口并非只能通过数组（即`ArrayList`的实现方式）来实现，另一种`LinkedList`通过“链表”也实现了List接口。在`LinkedList`中，它的内部每个元素都指向在`LinkedList`中，它的内部每个元素都指向下一个元素：  
```ascii
        ┌───┬───┐   ┌───┬───┐   ┌───┬───┐   ┌───┬───┐
HEAD ──>│ A │ ●─┼──>│ B │ ●─┼──>│ C │ ●─┼──>│ D │   │
        └───┴───┘   └───┴───┘   └───┴───┘   └───┴───┘
```

&emsp;&emsp;我们来比较一下`ArrayList`和`LinkedList`：  

|                     | ArrayList    | LinkedList           |
| :------------------ | :----------- | :------------------- |
| 获取指定元素        | 速度很快     | 需要从头开始查找元素 |
| 添加元素到末尾      | 速度很快     | 速度很快             |
| 在指定位置添加/删除 | 需要移动元素 | 不需要移动元素       |
| 内存占用            | 少           | 较大                 |

&emsp;&emsp;`ArrayList`适合随机访问，而`LinkedList`适合插入和删除操作频繁的场景。  
&emsp;&emsp;通常情况下，我们总是优先使用`ArrayList`。`List`接口**允许**添加**重复**的元素，`List`还**允许添加**`null`。  
&emsp;&emsp;除了使用`ArrayList`和`LinkedList`，我们还可以通过`List`接口提供的`of()`方法，根据给定元素快速创建`List`：  
```java
List<Integer> list = List.of(1, 2, 5);
```
&emsp;&emsp;但是`List.of()`方法不接受`null`值，如果传入`null`，会抛出`NullPointerException`异常。  
## 遍历List
&emsp;&emsp;可以用`for`循环根据索引配合`get(int)`方法遍历，但这种方式并不推荐，一是代码复杂，二是因为`get(int)`方法只有`ArrayList`的实现是高效的，换成`LinkedList`后，索引越大，访问速度越慢。  
&emsp;&emsp;迭代器`Iterator`本身也是一个对象，但它是由`List`的**实例**调用`iterator()`方法的时候创建的。`Iterator`对象知道如何遍历一个`List`，并且不同的`List`类型，返回的`Iterator`对象实现也是不同的，但**总是**具有**最高**的访问效率。  

&emsp;&emsp;`Iterator`对象有两个方法：  
- `boolean hasNext()`判断是否有下一个元素
- `E next()`返回下一个元素。

&emsp;&emsp;使用`Iterator`遍历`List`代码如下：  
```java
List<Integer> list = List.of(1, 2, 5);
for (Iterator<Integer> iterator = list.iterator(); iterator.hasNext(); ) {
    Integer next = iterator.next();
    System.out.println(next);
}
```
&emsp;&emsp;由于`Iterator`遍历是如此常用，所以，Java的`for each`循环本身就可以帮我们使用`Iterator`遍历。  
```java
List<Integer> list = List.of(1, 2, 5);
for (Integer next : list) {
    System.out.println(next);
}
```
&emsp;&emsp;只要实现了`Iterable`接口的集合类都可以直接用`for each`循环来遍历，Java编译器本身并不知道如何遍历集合对象，但它会自动把`for each`循环变成`Iterator`的调用，原因就在于`Iterable`接口定义了一个`Iterator<E> iterator()`方法，强迫集合类必须返回一个`Iterator`实例。  
&emsp;&emsp;在使用迭代器遍历集合时，如果在遍历过程中**修改**了集合的结构（例如添加或删除元素），会导致`ConcurrentModificationException`异常。为了避免这种情况，可以使用迭代器的`remove()`方法来删除元素，而不是直接调用集合的删除方法。  
## List和Array转换
&emsp;&emsp;把`List`变为`Array`有三种方法：  
&emsp;&emsp;**1.**调用`toArray()`方法直接返回一个`Object[]`数组，这种方法会丢失类型信息，所以实际应用很少。  
&emsp;&emsp;**2.**给`toArray(T[])`传入一个类型相同的`Array`，`List`内部自动把元素复制到传入的`Array`中：  

```java
    List<Integer> list = List.of(12, 34, 56);
    Integer[] array = list.toArray(new Integer[3]);
    for (Integer n : array) {
        System.out.println(n);
    }
```
&emsp;&emsp;`toArray(T[])`是泛型方法，因此`T`是**独立**的，可以传入其他类型的数组，比如`Number`类型，如果传入不兼容类型的数组，则会抛出`ArrayStoreException`，如果传入的数组长度小了，则会自动创建一个刚好够大的数组，如果多了则对多的部分填`null`。  
&emsp;&emsp;最常用的是传入一个“恰好”大小的数组：  
```java
Integer[] array = list.toArray(new Integer[list.size()]);
```
&emsp;&emsp;**3.**更简洁的写法是使用`List`接口定义的`T[] toArray(IntFunction<T[]> generator)`方法：  

```java
Integer[] array = list.toArray(Integer[]::new);
```
&emsp;&emsp;当使用 `toArray(IntFunction<A[]> generator)` 方法时，它会使用传入的 `generator` 函数来创建一个新的 `Integer` 数组，数组的大小通常为列表的大小。`IntFunction<A[]> generator` 是一个函数式接口，接受一个整数参数并返回一个泛型数组。可以通过方法引用 `Integer[]::new` 来指定生成的数组类型。[详细解释请看这里](#方法引用)。  
&emsp;&emsp;反过来，把`Array`变为`List`就简单多了，通过`List.of(T...)`方法最简单：  
```java
Integer[] array = { 1, 2, 3 };
List<Integer> list = List.of(array);
```
&emsp;&emsp;对于JDK 11之前的版本，可以使用`Arrays.asList(T...)`方法把数组转换成`List`。  
&emsp;&emsp;因为返回的`List`不一定就是`ArrayList`或者`LinkedList`，因此转换后返回的是一个**只读**`List`。  

## equals()方法
&emsp;&emsp;`boolean contains(Object o)`方法判断`List`是否包含某个指定元素。  
&emsp;&emsp;`int indexOf(Object o)`方法返回某个元素的索引，如果元素不存在，就返回`-1`。  
&emsp;&emsp;实际上`contains()`内部也是调用的`indexOf()`,`indexOf()`内部**会使用**`equals()`**判断是否相等**而不是使用`==`判断。`ArrayList<>`的`indexOf()`的源码如下：  
```java
public int indexOf(Object o) {
    E[] a = this.a;
    int i;
    if (o == null) {
        for(i = 0; i < a.length; ++i) {
            if (a[i] == null) {
                return i;
            }
        }
    } else {
        for(i = 0; i < a.length; ++i) {
            if (o.equals(a[i])) {
                return i;
            }
        }
    }
    return -1;
}
```
&emsp;&emsp;因此如果**要使用**`List`的`contains()`、`indexOf()`方法，**必须**正确覆写`equals()`方法，否则，放进去的实例的`equals()`方法就是继承自`Object`的`equals()`，也就是`==`，因此永远不相等。  

------

 **编写equals**
&emsp;&emsp;`equals()`方法必须满足以下条件：  
- 自反性（Reflexive）：对于非`null`的`x`来说，`x.equals(x)`必须返回`true`；
- 对称性（Symmetric）：对于非`null`的`x`和`y`来说，如果`x.equals(y)`为`true`，则`y.equals(x)`也必须为`true`；
- 传递性（Transitive）：对于非`null`的`x`、`y`和`z`来说，如果`x.equals(y)`为`true`，`y.equals(z)`也为`true`，那么`x.equals(z)`也必须为`true`；
- 一致性（Consistent）：对于非`null`的`x`和`y`来说，只要`x`和`y`状态不变，则`x.equals(y)`总是一致地返回`true`或者`false`；
- 对`null`的比较：即`x.equals(null)`永远返回`false`。

&emsp;&emsp;以`Person`类为例：  
```java
public class Person {
    public String name;
    public int age;
}
```
&emsp;&emsp;首先，定义“相等”的逻辑含义。对于`Person`类，如果`name`相等，并且`age`相等，我们就认为两个`Person`实例相等。对于**引用字段**比较，使用`equals()`，对于**基本类型字段**的比较，使用`==`。  
```java
public boolean equals(Object o) {
    if (o instanceof Person p) {
        boolean nameEquals = false;
        //如果都是null则相等
        if (this.name == null && p.name == null) {
            nameEquals = true;
        }
        //如果this.name不是null则调用它的equals
        if (this.name != null) {
            nameEquals = this.name.equals(p.name);
        }
        return nameEquals && this.age == p.age;
    }
    return false;
}
```
&emsp;&emsp;如果`Person`有好几个引用类型的字段，上面的写法就太复杂了。要简化引用类型的比较，我们使用`Objects.equals()`静态方法，注意不是`Object`而是`Objects`：  
```java
public boolean equals(Object o) {
    if (this == o) return true;
    if (o instanceof Person p) {
        return Objects.equals(this.name, p.name) && this.age == p.age;
    }
    return false;
}
```
&emsp;&emsp;`Objects.equals()`静态方法：  
```java
a == b || a != null && a.equals(b);
```
&emsp;&emsp;是同一个对象或都是`null`，`a`不是`null`则调用`a`的`equals`  
&emsp;&emsp;要求是同一个类的写法：  
```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Person p = (Person) o;

    if (age != p.age) return false;
    return Objects.equals(name, p.name);
}
```
# Map
&emsp;&emsp;通过一个键去查询对应的值。使用`List`来实现存在效率非常低的问题，因为平均需要扫描一半的元素才能确定，而`Map`这种键值（key-value）映射表的数据结构，作用就是能高效通过`key`快速查找`value`（元素）。  
&emsp;&emsp;`Map`也是一个接口，最常用的实现类是`HashMap`。除了`HashMap`外，还有`TreeMap`（基于红黑树实现）和`LinkedHashMap`（保持插入顺序或访问顺序）等`Map`的实现类，它们可以根据具体的需求选择合适的实现类。  
&emsp;&emsp;`HashMap`之所以能根据`key`直接拿到`value`，原因是它内部通过空间换时间的方法，用一个大数组存储所有`value`，并根据key直接计算出`value`应该存储在哪个索引。  
&emsp;&emsp;`Map`的`key`不能重复，`value`可以重复。`Map`**不保证顺序**。  

| 方法                           | 说明                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| V put(K key, V value)          | 把`key`和`value`做了映射并放入`Map`。如果放入的`key`**已经存在**，则会更新`value`并返回被删除的旧的`value`，否则，返回`null`。 |
| V get(K key)                   | 通过`key`获取到对应的`value`。如果`key`不存在，则返回`null`。 |
| boolean containsKey(K key)     | 查询某个`key`是否存在。                                      |
| boolean containsValue(V value) | 查询某个`value`是否存在。                                    |
| keySet()                       | 返回`key`的`Set`集合。                                       |
| entrySet()                     | 返回此地图中包含的映射的`Set`视图。                          |

**遍历**

```java
Map<String,String> map=new HashMap<>();
map.put("k1","v1");
map.put("k2","v2");
map.put("k3","v3");
for (Map.Entry<String, String> stringStringEntry : map.entrySet()) {
    String key = stringStringEntry.getKey();
    String value = stringStringEntry.getValue();
    System.out.println("value = " + value);
}
for (String k : map.keySet()) {
    System.out.println("value = "+map.get(k));
}
```

------

&emsp;&emsp;使用`key`存取`value`的时候，就会引出一个问题：  
&emsp;&emsp;获取`Map`的`value`时，传入的`key`不一定就是放入的那个`key`对象。而`Map`依然能够正常读取。换句话讲，取`value`时，两个`key`应该内容相同，但不一定是同一个对象。  
&emsp;&emsp;因为在`Map`的内部，对`key`做比较是通过`equals()`实现的，这一点和`List`查找元素需要正确覆写`equals()`是一样的，即正确使用`Map`**必须保证**：作为`key`的对象必须**正确覆写**`equals()`和`hashCode()`方法。  
&emsp;&emsp;通过`key`计算索引的方式就是调用`key`对象的`hashCode()`方法，它返回一个`int`整数。`HashMap`正是通过这个方法直接定位`key`对应的`value`的索引，继而直接返回`value`。  
&emsp;&emsp;`hashCode()`方法要严格遵循以下规范：  
1. 如果两个对象**相等**，则两个对象的`hashCode()`**必须**相等；
2. 如果两个对象**不相等**，则两个对象的`hashCode()`**尽量**不要相等。
3. `equals()`用到的用于比较的每一个字段，都必须在`hashCode()`中用于计算；`equals()`中没有使用到的字段，绝不可放在`hashCode()`中计算。

&emsp;&emsp;而第二条如果尽量满足，则可以保证查询效率，因为不同的对象，如果返回相同的`hashCode()`，会造成`Map`内部存储冲突，即**哈希冲突**，使存取的效率下降。  
&emsp;&emsp;示例：  
```java
@Override
public int hashCode() {
    int result = firstName != null ? firstName.hashCode() : 0;
    result = 31 * result + (lastName != null ? lastName.hashCode() : 0);
    result = 31 * result + age;
    return result;
}
```
&emsp;&emsp;也可以直接使用`Objects.hash()`  
```java
@Override
public int hashCode() {
    return Objects.hash(firstName,lastName,age);
}
```
&emsp;&emsp;对于放入`HashMap`的`value`对象，没有任何要求。  
```java
HashMap<Object, Object> map = new HashMap<>();
map.put(null,"123");
System.out.println(map.get(null));
```
&emsp;&emsp;在` HashMap` 中使用 `null` 作为键是可以编译通过的，因为 `HashMap` 的实现允许键为 `null`。在这种情况下，`null` 的哈希码会被计算为 0，并存储在哈希表的第一个位置。因此，当你调用 `map.get(null)` 时，会返回键为 `null` 对应的值 "123"。但需要注意的是，在使用 `null `作为键时要格外小心，因为它可能会导致混淆和错误。  
## 哈希冲突
&emsp;&emsp;如果不同的两个`key`，例如`"a"`和`"b"`，它们的`hashCode()`恰好是相同的，就会造成**哈希冲突**。  
```java
map.put("a", new Person("Xiao Ming"));
map.put("b", new Person("Xiao Hong"));
```
&emsp;&emsp;假设`"a"`和`"b"`这两个`key`最终计算出的索引都是5，造成哈希冲突，那么在`HashMap`的数组中，实际存储的不是一个`Person`实例，而是一个`List`，它包含两个`Entry`，一个是`"a"`的映射，一个是`"b"`的映射：  
```ascii
  ┌───┐
0 │   │
  ├───┤
1 │   │
  ├───┤
2 │   │
  ├───┤
3 │   │
  ├───┤
4 │   │
  ├───┤
5 │ ●─┼───> List<Entry<String, Person>>
  ├───┤
6 │   │
  ├───┤
7 │   │
  └───┘
```
&emsp;&emsp;在查找的时候，例如：  
```java
Person p = map.get("a");
```
&emsp;&emsp;HashMap内部通过`"a"`找到的实际上是`List<Entry<String, Person>>`，它还需要遍历这个`List`，并找到一个`Entry`，它的`key`字段是`"a"`，才能返回对应的`Person`实例。  
&emsp;&emsp;我们把不同的`key`具有相同的`hashCode()`的情况称之为**哈希冲突**。在冲突的时候，一种最简单的解决办法是用`List`存储`hashCode()`相同的`key-value`。显然，如果冲突的概率越大，这个`List`就越长，`Map`的`get()`方法效率就越低，这就是为什么要尽量满足条件二：如果两个对象不相等，则两个对象的`hashCode()`尽量不要相等。  
&emsp;&emsp;HashMap中依据`key`的hash值来确定`value`存储位置，所以**一定**要重写`hashCode`方法，而重写`equals`方法，是为了解决`hash`**冲突**，如果两个`key`的`hash`值相同，就会调用`equals`方法，比较`key`值是否相同。  
&emsp;&emsp;在存储时：如果`hash`值相同，且`equals`结果相同就覆盖更新`value`值，如果`equals`结果不同，即不是同一个`key`，`HashMap`会将这两个`key-value`对以链表或红黑树的形式存储在同一个位置上。  
&emsp;&emsp;在取值时：如果计算的`hash`值所指的索引位置有多个值，则根据`equals`方法找到对应的`key-value`对。如果`equals`结果相同就返回当前`value`值，如果不同就遍历`List`中下一个元素。即要`key`与`hash`同时匹配才会认为是同一个`key`。  
&emsp;&emsp;JDK中源码:  
```java
if(e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k)))){ops;}
```
## 扩容
&emsp;&emsp;`HashMap`初始化时**默认**的**数组大小**为16，任何`key`，无论它的`hashCode()`有多大，都可以简单地通过：  
```java
int index = key.hashCode() & 0xf; // 0xf = 15
```
&emsp;&emsp;把索引确定在0～15，即永远不会超出数组范围，上述算法只是一种最简单的实现。  
&emsp;&emsp;这里的**数组大小指哈希桶的数量**，**不等于**键值对的数量，而是指的是可以容纳的哈希桶的数量。每个哈希桶可以存储**多个键值对**（链表，红黑树），因此即使存储了大量的键值对，如果它们的**哈希值冲突**导致它们应该存储在同一个哈希桶中，实际上只会占用一个哈希桶的空间。`HashMap`会根据键值对的数量动态调整数组的大小，以保持较低的**填充因子**，从而保证较好的性能。  
&emsp;&emsp;`HashMap`的**填充因子**超过一定阈值时，`HashMap`会在内部自动扩容，每次**扩容一倍**。  
&emsp;&emsp;阈值根据**负载因子**确定,默认为**0.75f**。  
&emsp;&emsp;如果初始容量为 1024，那么当 `HashMap` 的 size 超过 1024 * 负载因子（默认是 0.75f）= 768 时，就会触发扩容操作，此时新的数组大小将是原来的两倍，即 2048。  
&emsp;&emsp;扩容操作包括以下步骤：  
1. 创建一个新的数组，大小是原数组的两倍。
2. 将原数组中的元素**重新计算哈希值**，并根据新数组的大小**重新分配位置**。
3. 将重新计算位置后的元素放入新数组中。
4. 将新数组设置为 `HashMap` 的数组，替换原数组。

&emsp;&emsp;`HashMap` 的扩容操作是一个比较**耗时**的操作，因为需要重新计算哈希值并重新分配位置。因此，尽量在初始化时指定 `HashMap` 的**初始容量**和**负载因子**，避免频繁扩容，提高性能。  
&emsp;&emsp;在 **HashMap** 中，每个数组元素（哈希桶）可以存储一个链表或红黑树头节点。当**链表**的元素数量**超过**一定阈值（**默认为 8**）时，链表会转换为红黑树，以提高查找效率。当**红黑树**中的节点数量**少于**一个阈值（**默认为6**）时，红黑树会转换回链表结构。这种转换是为了避免在红黑树中维护的额外开销，因为当节点数量较少时，链表可能比红黑树更有效率。  
&emsp;&emsp;红黑树在`HashMap`中是从**JDK 8**开始引入的。**在JDK 8之前**，`HashMap`使用的是**数组+链表**的方式来处理哈希冲突。  
&emsp;&emsp;通常**建议将容量设置为 2 的幂次方**，如果设置的容量不是 2 的幂次方，`HashMap` 会自动向上取最接近的 2 的幂次方作为实际的容量。负载因子应该是一个大于0且小于1的浮点数，注意加f。  
&emsp;&emsp;只能在初始化时设置容量和扩容因子  
```java
HashMap<K, V> map = new HashMap<>(16, 0.75f);
```
## 线程安全问题
&emsp;&emsp;`ArrayList`和`HashMap`等集合类是非线程安全的，这意味着如果多个线程同时访问这些集合并且至少一个线程修改了集合，就可能导致不确定的结果，比如数据丢失、数据不一致等问题。为了在多线程环境中安全地使用集合，可以使用`Collections`工具类提供的`SynchronizedList`和`SynchronizedMap`方法来获取线程安全的集合：  
```java
List<String> synchronizedList = Collections.synchronizedList(new ArrayList<>());
Map<String, String> synchronizedMap = Collections.synchronizedMap(new HashMap<>());
```
&emsp;&emsp;这样就可以确保在多线程环境中对集合的操作是安全的。需要注意的是，虽然这些方法提供了线程安全的集合，但在高并发的情况下仍然需要谨慎处理，以避免出现性能问题。  

# 其他
## 方法引用
&emsp;&emsp;展开`Integer[]::new`后：  
```java
IntFunction<Integer[]> generator = new IntFunction<Integer[]>() {
    public Integer[] apply(int size) {
        return new Integer[size];
    }
};
Integer[] array = list.toArray(generator);
```
&emsp;&emsp;在这里，`IntFunction<Integer[]>` 是一个函数式接口，它定义了一个`IntFunction<Integer[]>`的匿名实现，实现了`apply`方法来创建一个指定大小的`Integer`数组。然后，通过`toArray`方法将列表转换为该数组。  
&emsp;&emsp;通过lambda 表达式简化后变成：  
```java
IntFunction<Integer[]> generator = size -> new Integer[size];
Integer[] array = list.toArray(generator);
```
&emsp;&emsp;这个 lambda 表达式接受一个整数参数 `size`，并返回一个新的 `Integer` 数组，长度为 `size`。  
&emsp;&emsp;通过方法引用再次简化后变成：  
```java
IntFunction<Integer[]> generator = Integer[]::new;
Integer[] array = list.toArray(generator);
```
&emsp;&emsp;`Integer[]::new` 表示一个构造函数引用，它接受一个整数参数（数组的长度）并返回一个 `Integer` 数组。这样，`toArray(Integer[]::new)` 将生成一个与 `list` 大小相同的 `Integer` 数组，并将 `list` 中的元素复制到这个数组中。  

## 函数式接口
&emsp;&emsp;函数式接口是Java中的一个概念，它是指只包含一个抽象方法的接口。函数式接口可以用作Lambda表达式的类型，从而支持函数式编程的特性。在Java中，函数式接口可以通过`@FunctionalInterface`注解来标识，确保接口只包含一个抽象方法。  
&emsp;&emsp;当使用函数式接口时，编译器会根据**Lambda表达式**或**方法引用**的上下文，将其**转换为函数式接口的实**例，并在需要时调用相应的方法。这些实例可以在运行时被JVM执行。  
&emsp;&emsp;因此，函数式接口的调用是在运行时由**JVM执行**的，**编译器**负责将**Lambda表达式**或**方法引用**转换为**函数式接口**的实例，以便在程序运行时进行调用。  

### **方法引用：**

| 引用类型         | 方法引用示例           | 对应调用示例               |
| ---------------- | ---------------------- | -------------------------- |
| 静态方法引用     | `Main::staticMethod`   | `Main.staticMethod(...)`   |
| 实例方法引用     | `main::instanceMethod` | `main.instanceMethod(...)` |
| 构造方法引用     | `Main::new`            | `new Main(...)`            |
| 数组构造方法引用 | `Main[]::new`          | `new Main[?]`              |

&emsp;&emsp;这些方法引用可以简化代码，使其更易读和易维护。  

### **无参引用调用：**

| 类型     | 接口        | 代码                                            | 等效调用                 |
| -------- | ----------- | ----------------------------------------------- | ------------------------ |
| 静态方法 | Runnable    | `Runnable r=Main::staticMethod;r.run();`        | `Main.staticMethod();`   |
| 实例方法 | Runnable    | `Runnable r=main::instanceMethod;r.run();`      | `main.instanceMethod();` |
| 构造方法 | Supplier    | `Supplier<Main> s=Main::new;s.get();`           | `new Main();`            |
| 数组     | IntFunction | `IntFunction<Main[]> g=Main[]::new;g.apply(5);` | `new Main[5];`           |

&emsp;&emsp;实例：  
```java
package com.aotmd;
import java.util.function.IntFunction;
import java.util.function.Supplier;
public class Main {
    public static void staticMethod() {System.out.println("静态方法");}
    public void instanceMethod() {System.out.println("实例方法");}
    public Main() {System.out.println("构造方法");}
    public static void main(String[] args) {
        // 静态方法引用
        Runnable r1 = Main::staticMethod;//只能调用无参
        r1.run();//Main.staticMethod()
        // 实例方法引用
        Main main = new Main();
        Runnable r2 = main::instanceMethod;//只能调用无参
        r2.run();//main.instanceMethod()
        // 构造方法引用
        Supplier<Main> supplier = Main::new;//只能调用无参
        Main main2 = supplier.get();//new Main()
        // 数组构造方法引用
        IntFunction<Main[]> generator = Main[]::new;//只能调用无参
        Main[] array = generator.apply(5);//new Main[5]
    }
}
```

------

### **带参引用调用方法：**

| 类型       | 接口                                           | 说明              |
| ---------- | ---------------------------------------------- | ----------------- |
| 无参方法   | Runnable                                       | `run()`调用       |
| 一个参数   | Consumer`<T>`                                  | `.accept(T)`调用  |
| 两个参数   | BiConsumer<T,U>                                | `accept(T,U)`调用 |
| 更多个参数 | 自定义函数式接口，并使用`@FunctionalInterface` | 调用随便          |

&emsp;&emsp;实例：  
```java
package com.aotmd;

import java.util.Arrays;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Function;

public class Main {
    public static void staticMethod(Object ... s) {
        System.out.println("静态方法:"+ Arrays.toString(s));
    }
    public static void main(String[] args) {
        // 方法引用
        Runnable a=Main::staticMethod;
        a.run();
        
        Consumer<String> c = Main::staticMethod;
        c.accept("Hello");
        
        BiConsumer<String,String> b=Main::staticMethod;
        b.accept("123","123");
        
        自定义接口<String,String,String> t=Main::staticMethod;
        t.随便("123","345","456");
        
        // 柯里化（currying）的技巧，将一个多参数的方法转换为一系列单参数的方法。
        Function<Integer, Runnable> cr2 =
                (v1) -> () -> Main.staticMethod(v1);
        cr2.apply(1).run();
        
        Function<Integer, Function<Integer, Consumer<String>>> cr3 =
                (v1) -> (v2) -> (v3) -> Main.staticMethod(v1, v2, v3);
        cr3.apply(1).apply(2).accept("Consumer");
        
        Function<Integer, 自定义接口<Integer, Integer, Integer>> cr =
                (v1) -> (v4, v5, v6) -> Main.staticMethod(v1, v4, v5, v6);
        cr.apply(1).随便(3, 4, 5);
    }
}
@FunctionalInterface
interface 自定义接口<T, U, V> {
    void 随便(T t, U u, V v);
}
```

&emsp;&emsp;柯里化是一种函数式编程的技术，通过这种技巧可以将多参数函数转换为一系列接受单个参数的函数。  
1. `cr2`是一个`Function<Integer, Runnable>`，它接受一个整数参数，并返回一个`Runnable`，这个`Runnable`调用了`Main.staticMethod`方法。
2. `cr3`是一个`Function<Integer, Function<Integer, Consumer<String>>>`，它接受两个整数参数，并返回一个`Consumer<String>`，这个`Consumer<String>`调用了`Main.staticMethod`方法。
3. `cr`是一个`Function<Integer, 自定义接口<Integer, Integer, Integer>>`，它接受一个整数参数，并返回一个自定义接口的实例，这个自定义接口接受三个整数参数，并调用了`Main.staticMethod`方法。

&emsp;&emsp;通过柯里化，可以更灵活地使用多参数方法，将其转换为一系列单参数方法，使得代码更加模块化和易于理解。  

------

### **带参引用调用构造方法：**

| 类型       | 接口                                           | 说明             |
| ---------- | ---------------------------------------------- | ---------------- |
| 无参方法   | Supplier<类名>                                 | `get()`调用      |
| 一个参数   | Function<T,类名>                               | `apply(T)`调用   |
| 两个参数   | BiFunction<T,U,类名>                           | `apply(T,U)`调用 |
| 更多个参数 | 自定义函数式接口，并使用`@FunctionalInterface` | 调用随便         |

```java
package com.aotmd;

import java.util.Arrays;
import java.util.function.*;

public class Main {
    public Main(Object ...s) {
        System.out.println("构造方法："+Arrays.toString(s));
    }

    public static void main(String[] args) {
        // 构造方法引用
        Supplier<Main> supplier = Main::new;
        Main main1 = supplier.get();

        Function<String, Main> constructor = Main::new;
        Main main2 = constructor.apply("你好");

        BiFunction<Integer, String, Main> constructor2 = Main::new;
        Main main3 = constructor2.apply(1, "你好");

        自定义接口<Integer, String, Boolean, Main> constructor3 = Main::new;
        Main main4 = constructor3.随便(1, "你好", true);
        //柯里化
        自定义接口<Integer, String, Boolean, 自定义接口<Integer, String, Boolean, Main>> cr4 =
                (v1, v2, v3) -> (v4, v5, v6) -> new Main(v1, v2, v3, v4, v5, v6);
        Main main5 = cr4.随便(1, "你好", true).随便(1, "你好", true);
    }
}
@FunctionalInterface
interface 自定义接口<T, U, V, R> {
    R 随便(T t, U u, V v);
}
```

------

### 展开一个`Main::new;`
```java
package com.aotmd;

import java.util.Arrays;

public class Main {
    public Main(Object ...s) {
        System.out.println("构造方法："+Arrays.toString(s));
    }
    public static void main(String[] args) {
        // 方法引用
        接口<String,Main> f1=Main::new;
        // Lambda
        接口<String, Main> f2 = (s) -> {
            return new Main(s);
        };
        // 匿名内部类
        接口<String, Main> f3 = new 接口<String, Main>() {
            @Override
            public Main 方法(String s) {
                return new Main(s);
            }
        };
        // 普通内部类
        接口<String, Main> f4 =new Main().new A();
        // 静态内部类
        接口<String, Main> f5 =new Main.B();
        // 外部类
        接口<String, Main> f6 =new C();

        f1.方法(String.valueOf(f1.getClass()));
        f2.方法(String.valueOf(f2.getClass()));
        f3.方法(String.valueOf(f3.getClass()));
        f4.方法(String.valueOf(f4.getClass()));
        f5.方法(String.valueOf(f5.getClass()));
        f6.方法(String.valueOf(f6.getClass()));
    }
    class A implements 接口<String, Main> {
        @Override
        public Main 方法(String s) {
            return new Main(s);
        }
    }
    static class B implements 接口<String, Main> {
        @Override
        public Main 方法(String s) {
            return new Main(s);
        }
    }
}
class C implements 接口<String, Main> {
    @Override
    public Main 方法(String s) {
        return new Main(s);
    }
}
@FunctionalInterface
interface 接口<T, R> {
    R 方法(T t);
}
```
&emsp;&emsp;控制台：  
```java
构造方法：[]
构造方法：[class com.aotmd.Main$$Lambda$14/0x00000008000c0b40]
构造方法：[class com.aotmd.Main$$Lambda$15/0x00000008000c0d80]
构造方法：[class com.aotmd.Main$1]
构造方法：[class com.aotmd.Main$A]
构造方法：[class com.aotmd.Main$B]
构造方法：[class com.aotmd.C]
```
&emsp;&emsp;从上到下，越来越“low“。  



