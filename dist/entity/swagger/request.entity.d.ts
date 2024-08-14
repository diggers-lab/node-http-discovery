export declare class RequestInterface {
    preparedDate: Date;
    executedDate: Date;
    BaseRequest: any;
    parameters: any;
}
export declare class RequestResult extends RequestInterface {
    name: string;
    description?: string;
    result: any;
}
export declare class BaseRequest {
    type: RequestTypeEnum;
    request: string;
    databaseName: string;
}
export declare enum RequestTypeEnum {
    SELECT = "SELECT",
    INSERT = "INSERT",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}
export declare class BasicRequestInterface extends RequestInterface {
    url: string;
    data: any;
    response: any;
}
export declare class RequestDataInterface {
    queryParameters?: Map<string, string>;
    urlParameters?: Map<string, string>;
    headers?: Map<string, string>;
    body?: any;
}
export declare class BasicDataInterface {
    url: string;
    method: string;
    queryParameters: Map<string, string>;
    headers: Map<string, string>;
    body: any;
}
