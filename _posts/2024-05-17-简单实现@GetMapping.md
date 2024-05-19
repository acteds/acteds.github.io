---
layout: post
title: 简单实现@GetMapping
categories: Java
description: Java笔记
keywords: Java
---
# 简单实现@GetMapping

首先写个`DispatcherServlet`，URL路径为：`/`,表示所有没有指定`Servlet`处理的URL，都映射到此Servlet，然后`DispatcherServlet`再根据路径执行特定的方法。

```java
@WebServlet(urlPatterns = "/")
public class DispatcherServlet extends HttpServlet {
    private Map<String, Get> getMappings;
    @Override
    public void init() {
        // todo 扫描注解
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/html");
        resp.setCharacterEncoding("UTF-8");
        // 根据路径查找GetDispatcher:
        String path = req.getRequestURI().substring(req.getContextPath().length());
        Get get = this.getMappings.get(path);
        if (get == null) {
            // 未找到返回404:
            resp.sendError(404);
            return;
        }
        String s;
        try {
            /*调用使用反射的方法*/
            s = get.invoke(req, resp);
        } catch (InvocationTargetException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
        if (s == null) {
            return;
        }
        if (s.startsWith("redirect:")) {
            resp.sendRedirect(s.substring(9));
            return;
        }
        /*todo 其他处理*/
        req.getRequestDispatcher(s).forward(req,resp);
    }
}
```

然后写个Get类用于通过反射执行指定方法，还需要传入指定方法需要的形参类型的实例，如果形参名字对的上key就尝试获取值：

```java
public class Get {
    private Object instance; // Controller实例
    private Method method; // Controller方法
    private String[] parameterNames; // 方法参数名称
    private Class<?>[] parameterClasses; // 方法参数类型

    public String invoke(HttpServletRequest request, HttpServletResponse response) throws InvocationTargetException, IllegalAccessException {
        Object[] arguments = new Object[parameterClasses.length];
        for (int i = 0; i < parameterClasses.length; i++) {
            String parameterName = parameterNames[i];
            Class<?> parameterClass = parameterClasses[i];
            if (parameterClass == HttpServletRequest.class) {
                arguments[i] = request;
            } else if (parameterClass == HttpServletResponse.class) {
                arguments[i] = response;
            } else if (parameterClass == HttpSession.class) {
                arguments[i] = request.getSession();
            } else if (parameterClass == int.class) {
                arguments[i] = Integer.valueOf(getOrDefault(request, parameterName, "0"));
            } else if (parameterClass == long.class) {
                arguments[i] = Long.valueOf(getOrDefault(request, parameterName, "0"));
            } else if (parameterClass == boolean.class) {
                arguments[i] = Boolean.valueOf(getOrDefault(request, parameterName, "false"));
            } else if (parameterClass == String.class) {
                arguments[i] = getOrDefault(request, parameterName, "");
            } else {
                throw new RuntimeException("缺少类型的处理程序: " + parameterClass);
            }
        }
        return (String) this.method.invoke(this.instance, arguments);
    }

    private String getOrDefault(HttpServletRequest request, String name, String defaultValue) {
        String s = request.getParameter(name);
        return s == null ? defaultValue : s;
    }

    public void setInstance(Object instance) {
        this.instance = instance;
    }

    public void setMethod(Method method) {
        this.method = method;
    }

    public void setParameterNames(String[] parameterNames) {
        this.parameterNames = parameterNames;
    }

    public void setParameterClasses(Class<?>[] parameterClasses) {
        this.parameterClasses = parameterClasses;
    }
}
```

再之后就是写注解了：

```java
@Retention(RUNTIME)
@Target(METHOD)
public @interface GetMapping {
    String value();
}
```

然后需要一个根据指定包扫描注解对应的类，方法，和方法参数：

```java
public class Scan {
    private final Map<String, Get> getMappings=new HashMap<>();
    private final Set<Class<?>> classes = new HashSet<>();
    public Scan(String packageName) {
        this.scanClassFile(packageName);
        try {
            this.workAnnotations();
        } catch (InstantiationException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
    public static String getClasspath() {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        URL resource = classLoader.getResource("");
        if (resource != null) {
            return resource.getPath();
        }
        return null;
    }

    /**
     * 找全部class
     * @param packageName
     */
    private void scanClassFile(String packageName) {
        String basePath= packageName.replace('.','/');
        String classpath = getClasspath();
        List<File> list = new ArrayList<>();
        File baseDir = new File(classpath, basePath);
        list.add(baseDir);

        for (int i=0;i<list.size();i++) {
            File file = list.get(i);
            if (!file.exists()) continue;
            if (file.isDirectory()) {
                list.addAll(Arrays.asList(file.listFiles()));
            } else if (file.getName().endsWith(".class")) {
                String className = packageName + "." + file.getName().replace(".class", "");
                try {
                    Class<?> clazz = Class.forName(className);
                    classes.add(clazz);
                } catch (ClassNotFoundException e) {
                    // 处理异常
                }
            }
        }
    }

    private void workAnnotations() throws InstantiationException, IllegalAccessException {
        /*过滤掉接口*/
        List<Class<?>> collect = classes.parallelStream().filter(x -> !x.isInterface()).collect(Collectors.toList());
        for (Class<?> aClass : collect) {
            Object o=null;
            Method[] methods = aClass.getDeclaredMethods();
            for (Method method : methods) {
                Annotation[] annotations = method.getAnnotations();
                for (Annotation annotation : annotations) {
                    if (annotation instanceof GetMapping){
                        /*共享实例，不然实例变量无效了（因为每个方法都实例化了一个实例对象）*/
                        o=getMappingWork(aClass, method, (GetMapping) annotation,o);
                    }
                }
            }
        }
    }


    private Object getMappingWork(Class<?> aClass, Method method, GetMapping annotation, Object o) throws InstantiationException, IllegalAccessException {
        Parameter[] parameters = method.getParameters();
        String[] parameterNames= new String[parameters.length];
        Class<?>[] parameterClasses= new Class[parameters.length];
        for (int i = 0; i < parameters.length; i++) {
            Parameter parameter = parameters[i];
            parameterNames[i]=parameter.getName();
            parameterClasses[i]=parameter.getType();
        }
        if (o==null) o = aClass.newInstance();
        Get getDispatcher = new Get();
        getDispatcher.setInstance(o);
        getDispatcher.setMethod(method);
        getDispatcher.setParameterClasses(parameterClasses);
        getDispatcher.setParameterNames(parameterNames);
        getMappings.put(annotation.value(),getDispatcher);
        return o;
    }

    public Map<String, Get> getGetMappings() {
        return getMappings;
    }
}
```

最后整合进`DispatcherServlet`：

```java
@Override
public void init() {
    // todo 扫描注解
    Scan test = new Scan("servlet");
    this.getMappings=test.getGetMappings();
}
```

这样就扫描了`servlet`包下的所有`@GetMapping`注解。测试：

```java
public class Test {
    @GetMapping("/test")
    public String test(String key, HttpSession session){
        System.out.println(key);
        session.setAttribute("user",key);
        return "redirect:index.jsp";
    }
}
```

`index.jsp`:

```jsp
<h1>你好!<c:out value="${user}"/></h1>
```

设置程序编译参数：`-parameters`，它的作用是在编译后的类文件中**保留方法参数的名称**。默认情况下，Java编译器在编译过程中会丢弃方法参数的名称，而只保留参数的顺序。

访问：`http://localhost:8080/test?key=bob`正常使用。

------

还可以使用模板引擎渲染内容：

```xml
<!-- https://mvnrepository.com/artifact/io.pebbletemplates/pebble -->
<dependency>
    <groupId>io.pebbletemplates</groupId>
    <artifactId>pebble</artifactId>
    <version>3.2.2</version>
</dependency>
```

```java
public class ViewEngine {
    private final PebbleEngine engine;

    public ViewEngine(ServletContext servletContext) {
        // 定义一个ServletLoader用于加载模板:
        ServletLoader loader = new ServletLoader(servletContext);
        // 模板编码:
        loader.setCharset("UTF-8");
        // 模板前缀，这里默认模板必须放在`/WEB-INF/templates`目录:
        loader.setPrefix("/WEB-INF/templates");
        // 模板后缀:
        loader.setSuffix("");
        // 创建Pebble实例:
        this.engine = new PebbleEngine.Builder()
                .autoEscaping(true) // 默认打开HTML字符转义，防止XSS攻击
                .cacheActive(false) // 禁用缓存使得每次修改模板可以立刻看到效果
                .loader(loader).build();
    }

    public void render(ModelAndView mv, Writer writer) throws IOException {
        // 查找模板:
        PebbleTemplate template = this.engine.getTemplate(mv.getView());
        // 渲染:
        template.evaluate(writer, mv.getModel());
    }
}
```

存储页面URL和映射表：

```java
public class ModelAndView {
    private Map<String, Object> model;
    private String view;

    public Map<String, Object> getModel() {
        return model;
    }

    public void setModel(Map<String, Object> model) {
        this.model = model;
    }

    public String getView() {
        return view;
    }

    public void setView(String view) {
        this.view = view;
    }
}
```

因此，返回值需要从`String`修改为`ModelAndView`：

```java
@WebServlet(urlPatterns = "/")
public class DispatcherServlet extends HttpServlet {
    private Map<String, Get> getMappings;
    private ViewEngine viewEngine;
    @Override
    public void init() {
        // todo 扫描注解
        Scan test = new Scan("servlet2");
        this.getMappings=test.getGetMappings();
        // 模板引擎初始化
        viewEngine=new ViewEngine(this.getServletContext());
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        resp.setContentType("text/html");
        resp.setCharacterEncoding("UTF-8");
        // 根据路径查找GetDispatcher:
        String path = req.getRequestURI().substring(req.getContextPath().length());
        Get get = this.getMappings.get(path);
        if (get == null) {
            // 未找到返回404:
            resp.sendError(404);
            return;
        }
        ModelAndView mv;
        try {
            mv = get.invoke(req, resp);
        } catch (InvocationTargetException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
        // 允许返回null:
        if (mv == null) {
            return;
        }
        // 允许返回`redirect:`开头的view表示重定向:
        if (mv.getView().startsWith("redirect:")) {
            resp.sendRedirect(mv.getView().substring(9));
            return;
        }
        // 将模板引擎渲染的内容写入响应:
        PrintWriter pw = resp.getWriter();
        this.viewEngine.render(mv, pw);
        pw.flush();
    }
}
```

测试：

```java
public class Test {
    @GetMapping("/test")
    public ModelAndView test(String key){
        System.out.println(key);
        ModelAndView modelAndView = new ModelAndView();
        Map<String,Object> map=new HashMap<>();
        map.put("user",key);
        modelAndView.setModel(map);
        modelAndView.setView("test.html");
        return modelAndView;
    }
}
```

`/WEB-INF/templates/test.html`内用双大括号引用变量`user`即：

```html
{{user}}
```

访问：`http://localhost:8080/test?key=bob`正常使用。





