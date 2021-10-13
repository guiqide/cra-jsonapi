class JsonapiFetch {
  default: object;

  constructor(opt = null) {
    if (opt) {
      this.opt = opt;
    }
  }

  config(opt: any) {
    this.opt = opt;
  }

  fetch(url, options) {
    return window.fetch(url, options);
  }

  get(url, options) {
    return this.fetch(url, { method: 'GET', ...options });
  }

  post(url, options) {
    return this.fetch(url, { method: 'POST', ...options });
  }

  put(url, options) {
    return this.fetch(url, { method: 'PUT', ...options });
  }

  patch(url, options) {
    return this.fetch(url, { method: 'PATCH', ...options });
  }

  delete(url, options) {
    return this.fetch(url, { method: 'DELETE', ...options });
  }

  head(url, options) {
    return this.fetch(url, { method: 'HEAD', ...options });
  }

  options(url, options) {
    return this.fetch(url, { method: 'OPTIONS', ...options });
  }
}

function createInstance() {
  return new JsonapiFetch();
}

const jsonapi = createInstance();

export default jsonapi;
