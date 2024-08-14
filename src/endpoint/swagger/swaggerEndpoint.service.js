"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerEndPoint = void 0;
var endPoint_abstract_1 = require("../endPoint.abstract");
var routes_entity_1 = require("src/entity/swagger/routes.entity");
var auth_entity_1 = require("src/entity/swagger/auth.entity");
var sendHttp_util_1 = require("src/util/sendHttp.util");
var SwaggerEndPoint = /** @class */ (function (_super) {
    __extends(SwaggerEndPoint, _super);
    function SwaggerEndPoint(swaggerJson) {
        var _this = _super.call(this, swaggerJson.config.type, swaggerJson.config.url, swaggerJson.config.name, swaggerJson.config.description) || this;
        _this.item = swaggerJson;
        return _this;
    }
    SwaggerEndPoint.prototype.sendRequest = function (routeName, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var route, _i, _a, security, requsetResult, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        route = this.getRoute(routeName);
                        if (route.security && route.security.length > 0) {
                            for (_i = 0, _a = route.security; _i < _a.length; _i++) {
                                security = _a[_i];
                                if (security instanceof auth_entity_1.KeyAuthEntity) {
                                    if (!parameters.headers) {
                                        parameters.headers = new Map();
                                    }
                                    parameters.headers.set(security.name, security.value);
                                }
                            }
                        }
                        return [4 /*yield*/, sendHttp_util_1.SendHttpRequestUtil.sendEndPointRequest(route, this.endPoint, parameters)];
                    case 1:
                        requsetResult = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, requsetResult.json()];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        error_1 = _b.sent();
                        return [4 /*yield*/, requsetResult.text()];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SwaggerEndPoint.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // this.generating = true;
                try {
                    this.getRoutePoolbasics();
                    this.parseSecurityDefinitions();
                    this.endPoint.routes = this.getRoutesFromJson(this.item);
                }
                catch (error) {
                    console.log('error :>> ', error);
                    // this.generating = false;
                    throw new Error('Error while generating the Swagger endPoint');
                }
                // this.generating = false;
                return [2 /*return*/, this.endPoint];
            });
        });
    };
    SwaggerEndPoint.prototype.setSecurity = function (method, security) {
        if (this.endPoint.securities && this.endPoint.securities.length >= 1) {
            var item = this.endPoint.securities.find(function (s) { return s.method === method; });
            if (item) {
                item.setSecurity(security);
            }
        }
        else {
        }
    };
    SwaggerEndPoint.prototype.parseSecurityDefinitions = function () {
        var _a, _b;
        var securityDefinitions = (_a = this.item.components) === null || _a === void 0 ? void 0 : _a.securitySchemes;
        var securityEntities = [];
        if (!securityDefinitions) {
            return securityEntities;
        }
        for (var _i = 0, _c = Object.entries(securityDefinitions); _i < _c.length; _i++) {
            var _d = _c[_i], key = _d[0], definition = _d[1];
            var securityEntity = void 0;
            switch (definition.type) {
                case 'http':
                    if (definition.scheme === 'basic') {
                        securityEntity = new auth_entity_1.BasicAuthEntity('basic', '', '');
                    }
                    else if (definition.scheme === 'bearer') {
                        securityEntity = new auth_entity_1.BearerAuthEntity('bearer', '');
                    }
                    else {
                        securityEntity = new auth_entity_1.CustomAuthEntity('http', definition);
                    }
                    break;
                case 'apiKey':
                    securityEntity = new auth_entity_1.KeyAuthEntity('apiKey', definition.type, definition.in, definition.name, false);
                    break;
                case 'oauth2':
                    securityEntity = new auth_entity_1.CustomAuthEntity('oauth2', (_b = definition.flows) === null || _b === void 0 ? void 0 : _b.authorizationCode);
                    break;
                default:
                    securityEntity = new auth_entity_1.CustomAuthEntity('custom', definition);
                    break;
            }
            securityEntities.push(securityEntity);
        }
        this.endPoint.securities = securityEntities;
        return securityEntities;
    };
    SwaggerEndPoint.prototype.getRoutePoolbasics = function () {
        this.endPoint = new routes_entity_1.RoutePoolEntity();
        this.endPoint.name = this.item.info.title;
        try {
            var urlObj = new URL(this.url);
            // Extract the first segment in the path
            var pathSegments = urlObj.pathname
                .split('/')
                .filter(function (segment) { return segment.length > 0; });
            var suffix = pathSegments.length > 0 ? "/".concat(pathSegments[0], "/") : '';
            // Create the RoutePoolEntity instance
            var entity = new routes_entity_1.RoutePoolEntity();
            entity.host = urlObj.hostname;
            entity.suffix = suffix;
            entity.port = urlObj.port ? parseInt(urlObj.port) : null;
            entity.protocol = urlObj.protocol.replace(':', '');
            this.endPoint = entity;
            return entity;
        }
        catch (e) {
            // Handle invalid URLs
            console.error('Invalid URL provided:', e);
            return null;
        }
    };
    SwaggerEndPoint.prototype.getRoutesFromJson = function (item) {
        var _this = this;
        var routes = [];
        Object.keys(item.paths).forEach(function (path) {
            Object.keys(item.paths[path]).forEach(function (method) {
                var route = new routes_entity_1.RouteEntity();
                route.path = path;
                route.method = method;
                route.operationId = item.paths[path][method].operationId;
                route.parameters = _this.getParametersFromJson(item.paths[path][method].parameters);
                route.response = _this.getResponseFromJson(item.paths[path][method].responses);
                route.security = _this.getSecurityFromJson(item.paths[path][method].security);
                routes.push(route);
            });
        });
        return routes;
    };
    SwaggerEndPoint.prototype.getSecurityFromJson = function (security) {
        var _this = this;
        var securities = [];
        if (!security || security.length === 0)
            return null;
        security.forEach(function (sec) {
            var security = _this.endPoint.securities.find(function (s) { return s.method === Object.keys(sec)[0]; });
            if (security) {
                securities.push(security);
            }
            else {
                var security_1 = _this.endPoint.securities.find(function (s) { return s.name === Object.keys(sec)[0]; });
                securities.push(security_1);
            }
        });
        return securities;
    };
    SwaggerEndPoint.prototype.getParametersFromJson = function (parameters) {
        if (!parameters || parameters.length === 0)
            return null;
        var params = [];
        parameters.forEach(function (param) {
            var parameter = new routes_entity_1.ParameterInterface();
            parameter.name = param.name;
            parameter.in = param.in;
            parameter.required = param.required;
            parameter.type = param.schema.type;
            params.push(parameter);
        });
        return params;
    };
    SwaggerEndPoint.prototype.getResponseFromJson = function (response) {
        var _this = this;
        var responses = [];
        if (!response || response.length === 0)
            return null;
        Object.keys(response).forEach(function (status) {
            var res = new routes_entity_1.ResponseInterface();
            res.status = status;
            res.description = response[status].description;
            if (response[status].content &&
                response[status].content['application/json']) {
                res.type = _this.getSchemaFromRef(response[status].content['application/json']);
            }
            else {
                res.type = undefined;
            }
            responses.push(res);
        });
        return responses;
    };
    SwaggerEndPoint.prototype.getSchemaFromRef = function (content) {
        var toReturn;
        if (content && content.schema && content.schema['$ref']) {
            toReturn = content.schema['$ref'].split('/')[3].replace('Request', '');
        }
        else {
            toReturn = content;
        }
        return toReturn;
    };
    SwaggerEndPoint.prototype.refresh = function () {
        throw new Error('Method not implemented.');
    };
    return SwaggerEndPoint;
}(endPoint_abstract_1.AbstractEndPoint));
exports.SwaggerEndPoint = SwaggerEndPoint;
