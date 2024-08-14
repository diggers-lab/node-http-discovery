export class AbstractEndPoint {
    item;
    name;
    description;
    endPoint;
    routes;
    url;
    type;
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
//# sourceMappingURL=endPoint.abstract.js.map