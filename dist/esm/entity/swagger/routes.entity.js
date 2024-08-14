export class RoutePoolEntity {
    name;
    routes;
    host;
    suffix;
    port;
    protocol;
    securities;
}
export class RouteEntity {
    path;
    operationId;
    method;
    parameters;
    response;
    security;
}
export class ResponseInterface {
    status;
    type;
    description;
}
export class ParameterInterface {
    name;
    in;
    required;
    type;
    value;
}
export class EndPointType {
    name;
    description;
    url;
    type;
    security;
}
//# sourceMappingURL=routes.entity.js.map