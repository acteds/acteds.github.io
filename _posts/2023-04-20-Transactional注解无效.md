---
layout: post
title: Transactional注解无效
categories: Java
description: Spring的容器访问权限
keywords: Spring,Java
---
## 引言
在使用`Transactional`注解方法时没有产生应有的效果,通过排除发现`Transactional`注解是无效状态.  

## 详解  
SSM架构下，Spring是一个容器，通过`applicationContext.xml`配置。  

SpringMVC算子容器，通过`spring-mvc.xml`配置。  

当注解所在的类在`spring-mvc.xml`中扫描配置,而事务管理bean在`applicationContext.xml`中配置会导致子容器可以访问父容器中的bean，而父容器不能访问子容器的bean。所以父容器中定义的事务管理bean就不知道子容器中扫描配置内容。因此事务`@Transactional`注解无法正常使用。  

实际上，在使用Spring MVC时，建议将所有Bean定义和配置信息都放在一个名为`applicationContext.xml`的文件中，以便于管理和维护。  