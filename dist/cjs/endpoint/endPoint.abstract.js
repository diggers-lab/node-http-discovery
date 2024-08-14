"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractEndPoint = void 0;
class AbstractEndPoint {
    constructor(type, url, name, description) {
        this.url = url;
        this.type = type;
        this.name = name;
        this.description = description;
    }
    getRoute(name) {
        return this.endPoint.routes.find((route) => route.operationId === name);
    }
    getRoutes() {
        return this.endPoint.routes;
    }
    getEndpoint() {
        return this.endPoint;
    }
}
exports.AbstractEndPoint = AbstractEndPoint;
//# sourceMappingURL=endPoint.abstract.js.map