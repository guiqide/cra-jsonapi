# 编码规范

## 目录规范

目录结构应该和 `router` 定义的结构保持一致，如果业务层需要拆分组件，应该在其目录内新建 `components` 文件夹。

例子： `pages/base/components`

## 文件名

React文件名建议使用 PascalCase，后缀为小写

```js
// bad
import CheckBox from './check-box';
import CheckBox from './checkBox';

// good
import CheckBox from './CheckBox';
```

## css modules

业务组件都使用 css modules，通用组件、布局可以使用全局样式。

## 遵循 antd 设计理念

仔细阅读 [设计](https://ant-design.gitee.io/docs/spec/overview-cn) 中所有的篇幅，理解 antd 的设计理念，并在项目中遵循。

入口文件已经自动引入 antd 的变量、主题，所以应该使用 antd 主题中的 **预设值**（颜色、间距、阴影、尺寸等）

主题 less 文件：
[themes/default.less](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)

颜色 less 文件：
[colors.less](https://github.com/ant-design/ant-design/blob/master/components/style/color/colors.less)

正确的示范：

```less
.tips {
  margin-top: @margin-md * 2;
  color: @text-color-secondary;

  span {
    margin-right: @margin-xss;
  }
}
```

## hook 命令

一般都 `set` 关键字作为第二个参数的前缀，自定义 `hook` 必须用 `use` 作为前缀。

```js
const [value, setValue] = useState();
```