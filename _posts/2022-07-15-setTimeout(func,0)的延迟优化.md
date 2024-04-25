---
layout: post
title: setTimeout(func,0)的延迟优化
categories: JavaScript
description: setTimeout延迟过高
keywords: JavaScript
---
## 引言  
根据[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout#%E5%AE%9E%E9%99%85%E5%BB%B6%E6%97%B6%E6%AF%94%E8%AE%BE%E5%AE%9A%E5%80%BC%E6%9B%B4%E4%B9%85%E7%9A%84%E5%8E%9F%E5%9B%A0%EF%BC%9A%E6%9C%80%E5%B0%8F%E5%BB%B6%E8%BF%9F%E6%97%B6%E9%97%B4)所言，setTimeout函数的最小延迟>=4ms。  

也[有人](https://dbaron.org/log/20100309-faster-timeouts)实现了延迟更小的异步方法：

无参数setZeroTimeout():


```javascript
// 闭包
(function () {
    var timeouts = [];
    var messageName = "zero-timeout-message";

    // 类似于setTimeout，但只接受一个函数参数。
    // 没有时间参数(总是0) ，也没有参数(必须使用闭包) 。
    function setZeroTimeout(fn) {
        timeouts.push(fn);
        window.postMessage(messageName, "*");
    }

    function handleMessage(event) {
        if (event.source == window && event.data == messageName) {
            event.stopPropagation();
            if (timeouts.length > 0) {
                var fn = timeouts.shift();
                fn();
            }
        }
    }
    window.addEventListener("message", handleMessage, true);
    // 添加函数到窗口对象。
    window.setZeroTimeout = setZeroTimeout;
})();
```

## 修改
### 不定参数的setZeroTimeout()
通过一些特性，可以将以上代码变成，能够带参调用：
```javascript
// 闭包
(function () {
    var timeouts = [];
    var messageName = "zero-timeout-message";
    // 带参数的
    function setZeroTimeout(fn,...arg) {
        timeouts.push({func:fn,data:arg});
        window.postMessage(messageName, "*");
    }

    function handleMessage(event) {
        if (event.source == window && event.data == messageName) {
            event.stopPropagation();
            if (timeouts.length > 0) {
                var data = timeouts.shift();
                data.func(...data.data);
            }
        }
    }
    window.addEventListener("message", handleMessage, true);
    // 添加函数到窗口对象。
    window.setZeroTimeout = setZeroTimeout;
})();
```
性能测试：
```javascript
{
    setZeroTimeout(test1);
    let i = 0;
    let startTime = Date.now();

    function test1() {
        if (++i == 100) {
            let endTime = Date.now();
            console.log('100次调用setZeroTimeout()耗时:' + (endTime - startTime) + 'ms');
            //开始setTimeout测试
            i = 0;
            startTime = Date.now();
            setTimeout(test2, 0);
            function test2() {
                if (++i == 100) {
                    let endTime = Date.now();
                    console.log('100次调用setTimeout()耗时:' + (endTime - startTime) + 'ms');
                } else {
                    setTimeout(test2, 0);
                }
            }
        } else {
            //递归
            setZeroTimeout(test1);
        }
    }
}

```
控制台：
```
100次调用setZeroTimeout()耗时:4ms
100次调用setTimeout()耗时:466ms
```

### 不定参数的setZeroInterval()
顺便拓展一下setInterval()  

因为需要考虑取消执行，因此会需要处理多线程问题。

```javascript
// 闭包
(function () {
    let interval = [];
    let messageName = "zero-Interval-message";
    let idcount = 0;
    let run = true;
    let clearIndex = 0;
    let p = -1;
    // 带参数的
    function setZeroInterval(fn, ...arg) {
        interval.push({
            func: fn,
            data: arg,
            id: ++idcount
        });
        window.postMessage(messageName, "*");
        return idcount;
    }

    function handleMessage(event) {
        if (event.source == window && event.data == messageName) {
            event.stopPropagation();
            if (interval.length > 0) {
                if (run) {
                    p++;
                    p = p % interval.length;
                    let data = interval[p];
                    data.func(...data.data);
                }else {
                    interval.splice(clearIndex, 1);
                    run = true;
                };
                //循环调用
                window.postMessage(messageName, "*");
            }
        }
    }
    function clearZeroInterval(id) {
        let index = interval.findIndex((item) => {
            return item.id == id;
        });
        if (index != -1) {
            clearIndex = index;
            run = false;
        }
    }
    window.addEventListener("message", handleMessage, true);
    // 添加函数到窗口对象
    window.setZeroInterval = setZeroInterval;
    window.clearZeroInterval = clearZeroInterval;
})();
```
性能测试：  

单次测试：

```javascript
{
    let count = 0;
    let startTime = Date.now();
    let id1 = setZeroInterval(() => {
        if (++count == 100) {
            var endTime = Date.now();
            console.log('id:'+id1+',100次调用setZeroInterval()耗时:' + (endTime - startTime) + 'ms');
            clearZeroInterval(id1);
            //开始setInterval测试
            count = 0;
            startTime = Date.now();
            let id2 = setInterval(() => {
                if (++count == 100) {
                    var endTime = Date.now();
                    console.log('id:'+id2+',100次调用setInterval()耗时:' + (endTime - startTime) + 'ms');
                    clearInterval(id2);
                }
            });
        }
    });
}
```
控制台：
```
id:1,100次调用setZeroInterval()耗时:4ms
id:112,100次调用setInterval()耗时:391ms
```
多次测试：
```javascript
//多次测试setZeroInterval(),请单独分别复制运行
for (let i = 0; i < 130;i++)
{
    let count = 0;
    let startTime = Date.now();
    let id1 = setZeroInterval(() => {
        if (++count == 100) {
            var endTime = Date.now();
            console.log('id:'+id1+',100次调用setZeroInterval()耗时:' + (endTime - startTime) + 'ms');
            clearZeroInterval(id1);
        }
    });
}

//多次测试setInterval(),请单独分别复制运行
for (let i = 0; i < 130;i++)
{
    let count = 0;
    let startTime = Date.now();
    let id2 = setInterval(() => {
        if (++count == 100) {
            var endTime = Date.now();
            console.log('id:'+id2+',100次调用setInterval()耗时:' + (endTime - startTime) + 'ms');
            clearInterval(id2);
        }
    });
}

```
控制台：
```
id:7,100次调用setZeroInterval()耗时:348ms
id:266,100次调用setInterval()耗时:408ms
```
根据电脑性能不同，循环次数越多，setZeroInterval()越慢。
