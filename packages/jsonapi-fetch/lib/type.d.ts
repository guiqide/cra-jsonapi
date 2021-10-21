export interface Params extends RequestInit {
    preFetchCallback?: Function;
    finishFetchCallback?: Function;
}
export interface JsonError {
    id?: number;
    links?: object;
    status: number;
    code: number;
    title: string;
    detail: string;
    source?: object;
    meta?: object;
}
export interface JsonApi {
    data?: any;
    error?: JsonError;
    meta?: object;
    links?: object;
    included?: any;
}
