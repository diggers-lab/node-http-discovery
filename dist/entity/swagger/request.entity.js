"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicDataInterface = exports.RequestDataInterface = exports.BasicRequestInterface = exports.RequestTypeEnum = exports.BaseRequest = exports.RequestResult = exports.RequestInterface = void 0;
class RequestInterface {
}
exports.RequestInterface = RequestInterface;
class RequestResult extends RequestInterface {
}
exports.RequestResult = RequestResult;
class BaseRequest {
}
exports.BaseRequest = BaseRequest;
var RequestTypeEnum;
(function (RequestTypeEnum) {
    RequestTypeEnum["SELECT"] = "SELECT";
    RequestTypeEnum["INSERT"] = "INSERT";
    RequestTypeEnum["UPDATE"] = "UPDATE";
    RequestTypeEnum["DELETE"] = "DELETE";
})(RequestTypeEnum || (exports.RequestTypeEnum = RequestTypeEnum = {}));
class BasicRequestInterface extends RequestInterface {
}
exports.BasicRequestInterface = BasicRequestInterface;
class RequestDataInterface {
}
exports.RequestDataInterface = RequestDataInterface;
class BasicDataInterface {
}
exports.BasicDataInterface = BasicDataInterface;
//# sourceMappingURL=request.entity.js.map