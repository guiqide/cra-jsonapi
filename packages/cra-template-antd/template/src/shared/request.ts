import JsonApiFetch from 'json-api-fetch';
import configs from 'configs';
import { message } from 'antd';
import history from './history';

const REQUEST = JsonApiFetch.create({
  baseURL: configs('app.server'),

  errorInterceptor(errorJson) {
    if (errorJson) {
      const { error } = errorJson;
      console.log('%c json api errors message: ', 'color:#ff4d4f;font-size:18px;');
      console.table(error);

      if (error?.status === 403) {
        history.push('/exception/forbidden');
      }
      if (error?.status === 500) {
        message.error(error?.detail || '网络错误!');
      }
    }
  },
});

REQUEST.setDefaultOptions({
  credentials: 'include',
});

export default REQUEST;
