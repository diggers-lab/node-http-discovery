"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendHttpRequestUtil = void 0;
const endPointRequest_util_1 = require("./endPointRequest.util");
class SendHttpRequestUtil {
    static async sendRequest(request) {
        const options = {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(request.body),
            redirect: undefined,
        };
        let result;
        try {
            result = await fetch(request.url, options);
            return await result;
        }
        catch (error) {
            console.log('error :>> ', error);
            return error;
        }
    }
    static async sendEndPointRequest(route, routePool, data) {
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
            return await fetch(url.toString(), options);
        }
        catch (error) {
            console.log('error :>> ', error);
        }
    }
}
exports.SendHttpRequestUtil = SendHttpRequestUtil;
//# sourceMappingURL=sendHttp.util.js.map