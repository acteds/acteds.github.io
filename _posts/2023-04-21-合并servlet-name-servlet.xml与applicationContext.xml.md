---
layout: post
title: 合并servlet-name-servlet.xml与applicationContext.xml
categories: Spring,Java
description: Spring配置文件的合并
keywords: Spring,Java
---
## 引言
&emsp;&emsp;在Spring MVC中，可以将`DispatcherServlet`所需的所有配置信息都包含在根`ApplicationContext`中，这样就不需要单独为`DispatcherServlet`创建一个XML文件了。   


## 详解   
&emsp;&emsp;实际上，在使用Spring MVC时，**建议**将所有Bean定义和配置信息都放在**一个**名为`applicationContext.xml`的文件中，以便于管理和维护。然后，在`web.xml`文件中配置`DispatcherServlet`，并将其`contextConfigLocation`参数设置为`classpath:/applicationContext.xml`，这样就可以让`DispatcherServlet`自动加载应用程序的所有Bean定义和配置信息了。  
&emsp;&emsp;总之，虽然需要在`web.xml`文件中配置`DispatcherServlet`并指定其`contextConfigLocation`参数所需的XML文件，但是这个XML文件里面的**所有内容**都可以转移到根`ApplicationContext`中，以便于更好地管理和维护Spring应用程序。 
&emsp;&emsp;下面是一个示例`web.xml`文件的配置，其中`DispatcherServlet`的`contextConfigLocation`参数被设置为`classpath:/applicationContext.xml`：  
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         version="3.0">
    <!-- 配置Spring MVC的DispatcherServlet -->
    <servlet>
        <servlet-name>myDispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:/applicationContext.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>myDispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```
&emsp;&emsp;在这个示例中，我们配置了一个名为`myDispatcherServlet`的`DispatcherServlet`，并将其`contextConfigLocation`参数设置为`classpath:/applicationContext.xml`。这意味着在应用程序启动时，`DispatcherServlet`会自动加载位于类路径上的`applicationContext.xml`文件，并使用其中定义的Bean来处理所有的请求。同时，我们将`DispatcherServlet`映射到了应用程序的根路径“/”，这意味着所有的请求都将由它来处理。  
&emsp;&emsp;重要的是要确保`DispatcherServlet`的`contextConfigLocation`参数正确指向了包含所有Bean定义和配置信息的XML文件。  

&emsp;&emsp;在这个web.xml文件的配置中，已经在`servlet`中指定了`Servlet`上下文的位置，因此**不需要**再添加`<context-param>`元素来指定Spring应用程序上下文的位置。  
&emsp;&emsp;如果已通过此方法配置`applicationContext.xml`在应用程序中只使用一个`ApplicationContext.xml`文件来配置Spring bean,则**不需要**添加`<context-param>`元素到`web.xml`文件中,即不需要使用:  
```xml
context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:/applicationContext.xml</param-value><!--加载src目录下的applicationContext.xml文件-->
</context-param>
```
&emsp;&emsp;当然,自动加载也不要再用:  
```xml
<listener><listener-class>org.springframework.web.context.ContextLoaderListener</listener-class></listener>
```
&emsp;&emsp;该代码表示 Spring 将尝试从默认路径(如果定义了context-param就从你指定的xml读取) `/WEB-INF/applicationContext.xml` 中加载应用程序上下文配置，即使在`servlet` 的 `init-param` 中已经显式指定了另一个配置文件的路径。这是因为 `ContextLoaderListener` 将在应用程序启动时创建和初始化根应用程序上下文。  
&emsp;&emsp;另外，这个`web.xml`文件只适用于Spring MVC框架，如果同时使用其他的Spring组件或框架（如Spring Security），则可能需要在`web.xml`中添加其他的`<context-param>`元素来指定其他的上下文配置文件位置。  
