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

  fetch(resource: string | Request, options: RequestInit) {
    const opt = { ...this.default, ...options };

    return fetch(resource, opt).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }

      return response.json().then((err) => {
        throw err;
      });
    });
  }

  get(url: string | Request, options: RequestInit = {}) {
    return this.fetch(url, { ...options, method: 'GET' });
  }

  post(url: string | Request, options: RequestInit = {}) {
    return this.fetch(url, { ...options, method: 'POST' });
  }

  put(url: string | Request, options: RequestInit = {}) {
    return this.fetch(url, { ...options, method: 'PUT' });
  }

  patch(url: string | Request, options: RequestInit = {}) {
    return this.fetch(url, { ...options, method: 'PATCH' });
  }

  delete(url: string | Request, options: RequestInit = {}) {
    return this.fetch(url, { ...options, method: 'DELETE' });
  }

  head(url: string | Request, options: RequestInit = {}) {
    return this.fetch(url, { ...options, method: 'HEAD' });
  }

  options(url: string | Request, options: RequestInit = {}) {
    return this.fetch(url, { ...options, method: 'OPTIONS' });
  }
}

export function interceptor(config: Params) {
  return JsonapiFetch.getInstance(config);
}

export default JsonapiFetch;
