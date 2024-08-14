"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendHttpRequestUtil = void 0;
const endPointRequest_util_1 = require("./endPointRequest.util");
class SendHttpRequestUtil {
    static sendRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: request.method,
                headers: request.headers,
                body: JSON.stringify(request.body),
                redirect: undefined,
            };
            let result;
            try {
                result = yield fetch(request.url, options);
                return yield result;
            }
            catch (error) {
                console.log('error :>> ', error);
                return error;
            }
        });
    }
    static sendEndPointRequest(route, routePool, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryParameters = endPointRequest_util_1.EndPointRequestUtil.parseQueryParameters(route, data.queryParameters);
                const tmp = endPointRequest_util_1.EndPointRequestUtil.parseUrlParameters(route, data.urlParameters);
                const url = endPointRequest_util_1.EndPointRequestUtil.formatUrl(tmp, routePool.protocol +
                    '://' +
                    routePool.host +
                    (routePool.port ? ':' + routePool.port : ''), queryParameters);
                const options = {
                    method: route.method,
                    headers: data.headers,
                    body: JSON.stringify(data.body),
                    redirect: undefined,
                };
                return yield fetch(url.toString(), options);
            }
            catch (error) {
                console.log('error :>> ', error);
            }
        });
    }
}
exports.SendHttpRequestUtil = SendHttpRequestUtil;
//# sourceMappingURL=sendHttp.util.js.map