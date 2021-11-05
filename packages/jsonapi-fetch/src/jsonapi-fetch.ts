import { Params } from './type';

class JsonapiFetch {
  private static instance: JsonapiFetch;

  default: Params;

  constructor(config: Params) {
    this.default = config;
  }

  public static getInstance(config: Params): JsonapiFetch {
    if (!JsonapiFetch.instance) {
      JsonapiFetch.instance = new JsonapiFetch(config);
    }

    return JsonapiFetch.instance;
  }

  async checkStatus(res: any) {
    const parsed = await res.json();

    const { status } = res;

    if (status >= 200 && status < 300) {
      return parsed;
    }

    return Promise.reject(new Error(parsed));
  }

  fetch(resource: string | Request, options: Params) {
    const opt = { ...this.default, ...options };
    console.log(opt);

    if (opt.preFetchCallback) {
      opt.preFetchCallback();
    }
    return fetch(resource, opt)
      .then(this.checkStatus)
      .then((resp) => {
        if (opt.finishFetchCallback) {
          opt.finishFetchCallback();
        }
        return resp;
      })
      .catch((err) => {
        if (opt.errorFetchCacllback) {
          opt.errorFetchCacllback(err);
        }
        throw err;
      });
  }

  get(url: string | Request, options: Params = {}) {
    return this.fetch(url, { ...options, method: 'GET' });
  }

  post(url: string | Request, options: Params = {}) {
    return this.fetch(url, { ...options, method: 'POST' });
  }

  put(url: string | Request, options: Params = {}) {
    return this.fetch(url, { ...options, method: 'PUT' });
  }

  patch(url: string | Request, options: Params = {}) {
    return this.fetch(url, { ...options, method: 'PATCH' });
  }

  delete(url: string | Request, options: Params = {}) {
    return this.fetch(url, { ...options, method: 'DELETE' });
  }

  head(url: string | Request, options: Params = {}) {
    return this.fetch(url, { ...options, method: 'HEAD' });
  }

  options(url: string | Request, options: Params = {}) {
    return this.fetch(url, { ...options, method: 'OPTIONS' });
  }
}

export function interceptor(config: Params) {
  return JsonapiFetch.getInstance(config);
}

export default JsonapiFetch;
