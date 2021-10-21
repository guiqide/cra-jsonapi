var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.interceptor = void 0;
    var JsonapiFetch = /** @class */ (function () {
        function JsonapiFetch(config) {
            this.default = config;
        }
        JsonapiFetch.getInstance = function (config) {
            if (!JsonapiFetch.instance) {
                JsonapiFetch.instance = new JsonapiFetch(config);
            }
            return JsonapiFetch.instance;
        };
        JsonapiFetch.prototype.fetch = function (resource, options) {
            var opt = __assign(__assign({}, this.default), options);
            if (options.preFetchCallback) {
                options.preFetchCallback();
            }
            return fetch(resource, opt).then(function (response) {
                if (options.finishFetchCallback) {
                    options.finishFetchCallback();
                }
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                return response.json().then(function (err) {
                    throw err;
                });
            });
        };
        JsonapiFetch.prototype.get = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.fetch(url, __assign(__assign({}, options), { method: 'GET' }));
        };
        JsonapiFetch.prototype.post = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.fetch(url, __assign(__assign({}, options), { method: 'POST' }));
        };
        JsonapiFetch.prototype.put = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.fetch(url, __assign(__assign({}, options), { method: 'PUT' }));
        };
        JsonapiFetch.prototype.patch = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.fetch(url, __assign(__assign({}, options), { method: 'PATCH' }));
        };
        JsonapiFetch.prototype.delete = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.fetch(url, __assign(__assign({}, options), { method: 'DELETE' }));
        };
        JsonapiFetch.prototype.head = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.fetch(url, __assign(__assign({}, options), { method: 'HEAD' }));
        };
        JsonapiFetch.prototype.options = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.fetch(url, __assign(__assign({}, options), { method: 'OPTIONS' }));
        };
        return JsonapiFetch;
    }());
    function interceptor(config) {
        return JsonapiFetch.getInstance(config);
    }
    exports.interceptor = interceptor;
    exports.default = JsonapiFetch;
});
