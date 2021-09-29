# antd主题样式开发指南


## 本地开发调试

1、打开   文件，按照下面的例子注释掉相应代码：

```js
fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    // style: true,
}),

addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      // modifyVars: theme,
    },
    implementation: require('less'),
}),
```

2、打开 `styles/antd.less` ，并去掉该行注释：

```less
@import "antd-default.dev";

.ant-menu-horizontal {
  border-bottom: 0;
}

.ant-menu-item,
.ant-menu-submenu-title {
  margin: 0 20px;
}
```

3、调试完成，应该将 `styles/antd-default.dev.less` 中的自定义变量，提交之前写入到 `theme.js` 中。并还原 `config-overrides.js` 、 `styles/antd.less` 的注释。

这样能避免引入全部样式，达到按需引入的效果。