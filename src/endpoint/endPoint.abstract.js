"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractEndPoint = void 0;
var AbstractEndPoint = /** @class */ (function () {
    function AbstractEndPoint(type, url, name, description) {
        this.url = url;
        this.type = type;
        this.name = name;
        this.description = description;
    }
    AbstractEndPoint.prototype.getRoute = function (name) {
        return this.endPoint.routes.find(function (route) { return route.operationId === name; });
    };
    AbstractEndPoint.prototype.getRoutes = function () {
        return this.endPoint.routes;
    };
    AbstractEndPoint.prototype.getEndpoint = function () {
        return this.endPoint;
    };
    return AbstractEndPoint;
}());
exports.AbstractEndPoint = AbstractEndPoint;
