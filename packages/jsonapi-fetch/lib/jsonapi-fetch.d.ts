import { Params } from './type';
declare class JsonapiFetch {
    private static instance;
    default: Params;
    constructor(config: Params);
    static getInstance(config: Params): JsonapiFetch;
    fetch(resource: string | Request, options: Params): Promise<any>;
    get(url: string | Request, options?: Params): Promise<any>;
    post(url: string | Request, options?: Params): Promise<any>;
    put(url: string | Request, options?: Params): Promise<any>;
    patch(url: string | Request, options?: Params): Promise<any>;
    delete(url: string | Request, options?: Params): Promise<any>;
    head(url: string | Request, options?: Params): Promise<any>;
    options(url: string | Request, options?: Params): Promise<any>;
}
export declare function interceptor(config: Params): JsonapiFetch;
export default JsonapiFetch;
