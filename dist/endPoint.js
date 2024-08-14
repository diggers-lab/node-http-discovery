"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSwaggerEndPoint;
const swaggerEndpoint_service_1 = require("src/endpoint/swagger/swaggerEndpoint.service");
async function getSwaggerEndPoint(endpoint) {
    let tmp = await getSwagger(endpoint.url, endpoint.security ? endpoint.security : undefined);
    tmp.config = endpoint;
    const endPoint = extractSwagger(tmp);
    endPoint.generate();
    if (endpoint.security) {
        endPoint.setSecurity(endpoint.security.key, endpoint.security.value);
    }
    return endPoint;
}
async function getSwagger(url, security) {
    let request;
    const options = {
        method: 'GET',
        headers: {}
    };
    if (security) {
        options.headers = {
            [security.key]: security.value
        };
    }
    try {
        request = await fetch(url, options);
        const tmp = await request.json();
        return await tmp;
    }
    catch (error) {
        console.log('error :>> ', error);
    }
}
function extractSwagger(swaggerJson) {
    return new swaggerEndpoint_service_1.SwaggerEndPoint(swaggerJson);
}
//# sourceMappingURL=endPoint.js.map