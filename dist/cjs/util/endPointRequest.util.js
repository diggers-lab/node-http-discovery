"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndPointRequestUtil = void 0;
class EndPointRequestUtil {
    static parseUrlParameters(route, data) {
        let url = route.path;
        const errors = [];
        const expectedParameters = route.parameters.filter((param) => param.in === 'path');
        expectedParameters.forEach((param) => {
            if (!data || !(data instanceof Map) || !data.has(param.name) && param.required) {
                errors.push(`Url Parameter ${param.name} is missing`);
            }
            else {
                url = url.replace(`{${param.name}}`, data.get(param.name));
            }
        });
        if (errors.length) {
            throw new Error(errors.join(', '));
        }
        return url;
    }
    static parseQueryParameters(route, data) {
        const errors = [];
        const query = new URLSearchParams();
        const expectedParameters = route.parameters.filter((param) => param.in === 'query');
        expectedParameters.forEach((param) => {
            if (!data || !(data instanceof Map) || !data.has(param.name) && param.required) {
                errors.push(`Query Parameter ${param.name} is missing`);
            }
            else {
                query.append(param.name, data.get(param.name));
            }
        });
        if (errors.length) {
            throw new Error(errors.join(', '));
        }
        return query;
    }
    static formatUrl(url, baseUrl, query) {
        const urlObject = new URL(url, baseUrl);
        urlObject.search = query.toString();
        return urlObject;
    }
}
exports.EndPointRequestUtil = EndPointRequestUtil;
//# sourceMappingURL=endPointRequest.util.js.map