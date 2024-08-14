import { EndPointRequestUtil } from "./endPointRequest.util";
export class SendHttpRequestUtil {
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
            const queryParameters = EndPointRequestUtil.parseQueryParameters(route, data.queryParameters);
            const tmp = EndPointRequestUtil.parseUrlParameters(route, data.urlParameters);
            const url = EndPointRequestUtil.formatUrl(tmp, routePool.protocol +
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
//# sourceMappingURL=sendHttp.util.js.map