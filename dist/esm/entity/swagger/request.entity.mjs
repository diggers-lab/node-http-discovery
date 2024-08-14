export class RequestInterface {
    // name: string;
    preparedDate;
    executedDate;
    BaseRequest;
    parameters;
}
export class RequestResult extends RequestInterface {
    name;
    description;
    result;
}
export class BaseRequest {
    type;
    request;
    databaseName;
}
export var RequestTypeEnum;
(function (RequestTypeEnum) {
    RequestTypeEnum["SELECT"] = "SELECT";
    RequestTypeEnum["INSERT"] = "INSERT";
    RequestTypeEnum["UPDATE"] = "UPDATE";
    RequestTypeEnum["DELETE"] = "DELETE";
})(RequestTypeEnum || (RequestTypeEnum = {}));
export class BasicRequestInterface extends RequestInterface {
    url;
    data;
    response;
}
export class RequestDataInterface {
    queryParameters;
    urlParameters;
    headers;
    body;
}
export class BasicDataInterface {
    url;
    method;
    queryParameters;
    headers;
    body;
}
//# sourceMappingURL=request.entity.js.map