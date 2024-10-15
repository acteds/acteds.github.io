---
layout: post
title: GitLabSSH认证
categories: [Git, GitLab]
description: GITLabSSH认证
keywords: Git, GitLab
---

# 引言
对于GitLab的SSH认证，和GitHub认证步骤差不多，主要是SSH密钥可能需要指定的版本。



# GitLab

> 要使用 SSH 与 GitLab 通信，您需要：
>
> - OpenSSH 客户端，预装在 GNU/Linux、macOS 和 Windows 10 上。
> - SSH 版本 6.5 或更高版本。早期版本使用 MD5 签名，这并不安全。
>
> 要查看系统上安装的 SSH 版本，请运行 `ssh -V`。
>
> 支持的 SSH 密钥类型
>
> 要与 GitLab 通信，您可以使用以下 SSH 密钥类型：
>
> - [ED25519](#ed25519-ssh-keys)
> - [RSA](#rsa-ssh-keys)
> - 
>   DSA（在 11.0 版本中[已弃用](https://about.gitlab.com/releases/2018/06/22/gitlab-11-0-released/#support-for-dsa-ssh-keys)。
> - 
>   ECDSA（如 [Practical Cryptography With Go](https://leanpub.com/gocrypto/read#leanpub-auto-ecdsa) 中所述，与 DSA 相关的安全问题也适用于 ECDSA。
>

对于RSA算法，需要至少2048位密钥，首选ED25519算法。

## 生成SSH密钥对

对于 ED25519：

```shell
ssh-keygen -t ed25519 -C "<comment>"
```

对于 2048 位 RSA：

```shell
ssh-keygen -t rsa -b 2048 -C "<comment>"
```

## 配置 SSH 以指向不同的目录

如果未将 SSH 密钥对保存在默认目录中，请将 SSH 客户端配置为指向存储私钥的目录。

打开终端并运行以下命令：

```shell
eval $(ssh-agent -s)
ssh-add <directory to private SSH key>
```

将这些设置保存在 ~/.ssh/config 文件中。例如：

```conf
# GitLab.com
Host gitlab.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/gitlab_com_rsa

# Private GitLab instance
Host gitlab.company.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/example_com_rsa
```

公共 SSH 密钥对于 GitLab 必须是唯一的，因为它们绑定到您的帐户。当使用 SSH 推送代码时，SSH 密钥是唯一标识符。它必须唯一地映射到单个用户。









