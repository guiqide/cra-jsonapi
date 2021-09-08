# 本地开发oa域代理配置

### 1. 安装 whitstle

```bash
npm i whistle -g 
```

### 2. 安装Chrome 拓展

Chrome访问地址：[https://chrome.google.com/webstore/category/extensions?hl=zh-CN](https://chrome.google.com/webstore/category/extensions?hl=zh-CN)
搜索：Proxy SwitchyOmega，安装拓展

### 3. 配置proxy

点击 Proxy SwitchyOmega - 选项 进入设置页面，点击 *从备份文件恢复* [OmegaOptions.bak](./OmegaOptions.bak)

![图1](https://imgcache-1251786003.image.myqcloud.com/media/gzhoss/image/20200727/f3622e6e06746930ca4116e0fad18114.png)

导入配置之后，在自己本机的wifi高级配置中找到pac地址:

![图2](https://imgcache-1251786003.image.myqcloud.com/media/gzhoss/image/20200727/671281205a49eafb84a467d43459c5bf.png)

配置到下图中，并保存。

![图3](https://imgcache-1251786003.image.myqcloud.com/media/gzhoss/image/20200727/bc0d681d2fe29b4f8272b203ef9e41aa.png)

### 启动 whistle

```bash
whistle start
```

### 配置 whistle

打开 [http://127.0.0.1:8899/#rules](http://127.0.0.1:8899/#rules)，配置规则：

```
local.insight.imur.oa.com http://localhost:3200
```

![图4](https://imgcache-1251786003.image.myqcloud.com/media/gzhoss/image/20200727/fccf76c5c16845d0740a29e3bf4fad79.png)


然后试试用 local.insight.imur.oa.com 访问吧！