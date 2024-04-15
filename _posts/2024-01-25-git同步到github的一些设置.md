---
layout: post
title: Git推送到Github的一些设置
categories: [Git, GitHub]
description: Git推送到Github的一些设置
keywords: Git, GitHub
---

## 引言
记录一些通常设置。  


## 详解  
* 下载[Git](https://git-scm.com/downloads)  
* 设置Git环境变量  
* 配置SSH，完成GitHub身份验证  
终端输入：`ssh-keygen -t rsa -C 邮箱地址`，邮箱地址为GitHub的邮箱地址。  
找到公钥文件(id_rsa.pub)，打开文件,复制内容  
在GitHub上添加SSH keys(头像-Settings-SSH and GPG keys-New SSH key)，标题随便，key内填公钥内容。  
* 验证是否成功：`ssh -T git@github.com`  
若出现ssh: connect to host github.com port 22: Connection timed out  
可以尝试修改SSH主机名：  
在.ssh文件夹中新建config文件，无扩展名，并写入以下内容：  
```  
Host github.com
User 你的GitHub账号名称或邮箱地址
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443
```
重新验证是否成功：`ssh -T git@github.com`  
输入yes即可。  

## 额外操作  
在使用 Git 进行代码托管和版本控制的过程中，如果你想在提交代码时被正确的识别和归属，那么需要设置正确的 Git 邮箱地址。如果不设置邮箱，那么提交代码的作者将会是默认的 Git 用户，这会导致代码历史不可读，并且无法更好地识别谁提交的代码。  
配置 git config：  
```
git config --global user.name github_name
git config --global user.email github_email
```
显示带有颜色和图形的 Git 日志：  
```
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```
参数解析：  
* --color： 启用彩色输出。  
* --graph： 以图形的方式展示分支和合并历史。  
* --pretty=format： 定制输出格式，使用一系列的占位符表示不同的信息。  
* %Cred%h%Creset： 以红色显示短的提交哈希。  
* -%C(yellow)%d%Creset： 显示分支和标签信息，并使用黄色。  
* %s： 显示提交信息。  
* %Cgreen(%cr)%Creset： 以绿色显示相对的提交时间。  
* %C(bold blue)<%an>%Creset： 以粗体蓝色显示作者。  

全局配置文件在用户根目录下的.gitconfig文件，也可直接修改这个文件进行配置  
若只想作用于单个仓库，只需要去掉--global参数  
单个仓库配置文件在.git/config文件。  
## 推送代码  
```
git init
git add .
git commit -m "init"
git remote add github git@github.com:[id]/[库名].git
git push -u origin [远程分支名]
```
