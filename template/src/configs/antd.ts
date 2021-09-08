/* eslint-disable @typescript-eslint/quotes, no-template-curly-in-string */

// antd 全局配置
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';

const formTypeTemplate = '不是合法的 ${type} 类型';

export default {
  form: {
    validateMessages: {
      default: "Validation error on field '${name}'",
      required: "请填写 '${label}'",
      types: {
        string: formTypeTemplate,
        method: formTypeTemplate,
        array: formTypeTemplate,
        object: formTypeTemplate,
        number: formTypeTemplate,
        date: formTypeTemplate,
        boolean: formTypeTemplate,
        integer: formTypeTemplate,
        float: formTypeTemplate,
        regexp: formTypeTemplate,
        email: formTypeTemplate,
        url: formTypeTemplate,
        hex: formTypeTemplate,
      },
    },
  },
  locale: zhCN,
};
