"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerEndPoint = void 0;
const endPoint_abstract_1 = require("../endPoint.abstract");
const routes_entity_1 = require("src/entity/swagger/routes.entity");
const auth_entity_1 = require("src/entity/swagger/auth.entity");
const sendHttp_util_1 = require("src/util/sendHttp.util");
class SwaggerEndPoint extends endPoint_abstract_1.AbstractEndPoint {
    constructor(swaggerJson) {
        super(swaggerJson.config.type, swaggerJson.config.url, swaggerJson.config.name, swaggerJson.config.description);
        this.item = swaggerJson;
    }
    async sendRequest(routeName, parameters) {
        const route = this.getRoute(routeName);
        if (route.security && route.security.length > 0) {
            for (const security of route.security) {
                if (security instanceof auth_entity_1.KeyAuthEntity) {
                    if (!parameters.headers) {
                        parameters.headers = new Map();
                    }
                    parameters.headers.set(security.name, security.value);
                }
            }
        }
        const requsetResult = await sendHttp_util_1.SendHttpRequestUtil.sendEndPointRequest(route, this.endPoint, parameters);
        try {
            return await requsetResult.json();
        }
        catch (error) {
            return await requsetResult.text();
        }
    }
    async generate() {
        try {
            this.getRoutePoolbasics();
            this.parseSecurityDefinitions();
            this.endPoint.routes = this.getRoutesFromJson(this.item);
        }
        catch (error) {
            console.log('error :>> ', error);
            throw new Error('Error while generating the Swagger endPoint');
        }
        return this.endPoint;
    }
    setSecurity(method, security) {
        if (this.endPoint.securities && this.endPoint.securities.length >= 1) {
            const item = this.endPoint.securities.find((s) => s.method === method);
            if (item) {
                item.setSecurity(security);
            }
        }
        else {
        }
    }
    parseSecurityDefinitions() {
        const securityDefinitions = this.item.components?.securitySchemes;
        const securityEntities = [];
        if (!securityDefinitions) {
            return securityEntities;
        }
        for (const [key, definition] of Object.entries(securityDefinitions)) {
            let securityEntity;
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
                    securityEntity = new auth_entity_1.CustomAuthEntity('oauth2', definition.flows?.authorizationCode);
                    break;
                default:
                    securityEntity = new auth_entity_1.CustomAuthEntity('custom', definition);
                    break;
            }
            securityEntities.push(securityEntity);
        }
        this.endPoint.securities = securityEntities;
        return securityEntities;
    }
    getRoutePoolbasics() {
        this.endPoint = new routes_entity_1.RoutePoolEntity();
        this.endPoint.name = this.item.info.title;
        try {
            const urlObj = new URL(this.url);
            const pathSegments = urlObj.pathname
                .split('/')
                .filter((segment) => segment.length > 0);
            const suffix = pathSegments.length > 0 ? `/${pathSegments[0]}/` : '';
            const entity = new routes_entity_1.RoutePoolEntity();
            entity.host = urlObj.hostname;
            entity.suffix = suffix;
            entity.port = urlObj.port ? parseInt(urlObj.port) : null;
            entity.protocol = urlObj.protocol.replace(':', '');
            this.endPoint = entity;
            return entity;
        }
        catch (e) {
            console.error('Invalid URL provided:', e);
            return null;
        }
    }
    getRoutesFromJson(item) {
        const routes = [];
        Object.keys(item.paths).forEach((path) => {
            Object.keys(item.paths[path]).forEach((method) => {
                const route = new routes_entity_1.RouteEntity();
                route.path = path;
                route.method = method;
                route.operationId = item.paths[path][method].operationId;
                route.parameters = this.getParametersFromJson(item.paths[path][method].parameters);
                route.response = this.getResponseFromJson(item.paths[path][method].responses);
                route.security = this.getSecurityFromJson(item.paths[path][method].security);
                routes.push(route);
            });
        });
        return routes;
    }
    getSecurityFromJson(security) {
        const securities = [];
        if (!security || security.length === 0)
            return null;
        security.forEach((sec) => {
            const security = this.endPoint.securities.find((s) => s.method === Object.keys(sec)[0]);
            if (security) {
                securities.push(security);
            }
            else {
                const security = this.endPoint.securities.find((s) => s.name === Object.keys(sec)[0]);
                securities.push(security);
            }
        });
        return securities;
    }
    getParametersFromJson(parameters) {
        if (!parameters || parameters.length === 0)
            return null;
        const params = [];
        parameters.forEach((param) => {
            const parameter = new routes_entity_1.ParameterInterface();
            parameter.name = param.name;
            parameter.in = param.in;
            parameter.required = param.required;
            parameter.type = param.schema.type;
            params.push(parameter);
        });
        return params;
    }
    getResponseFromJson(response) {
        const responses = [];
        if (!response || response.length === 0)
            return null;
        Object.keys(response).forEach((status) => {
            const res = new routes_entity_1.ResponseInterface();
            res.status = status;
            res.description = response[status].description;
            if (response[status].content &&
                response[status].content['application/json']) {
                res.type = this.getSchemaFromRef(response[status].content['application/json']);
            }
            else {
                res.type = undefined;
            }
            responses.push(res);
        });
        return responses;
    }
    getSchemaFromRef(content) {
        let toReturn;
        if (content && content.schema && content.schema['$ref']) {
            toReturn = content.schema['$ref'].split('/')[3].replace('Request', '');
        }
        else {
            toReturn = content;
        }
        return toReturn;
    }
    refresh() {
        throw new Error('Method not implemented.');
    }
}
exports.SwaggerEndPoint = SwaggerEndPoint;
//# sourceMappingURL=swaggerEndpoint.service.js.map