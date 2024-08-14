"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSwaggerEndPoint;
const swaggerEndpoint_service_1 = require("./endpoint/swagger/swaggerEndpoint.service.cjs");
function getSwaggerEndPoint(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        let tmp = yield getSwagger(endpoint.url, endpoint.security ? endpoint.security : undefined);
        tmp.config = endpoint;
        const endPoint = extractSwagger(tmp);
        endPoint.generate();
        if (endpoint.security) {
            endPoint.setSecurity(endpoint.security.key, endpoint.security.value);
        }
        return endPoint;
    });
}
function getSwagger(url, security) {
    return __awaiter(this, void 0, void 0, function* () {
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
            request = yield fetch(url, options);
            const tmp = yield request.json();
            return yield tmp;
        }
        catch (error) {
            console.log('error :>> ', error);
        }
    });
}
function extractSwagger(swaggerJson) {
    return new swaggerEndpoint_service_1.SwaggerEndPoint(swaggerJson);
}
//# sourceMappingURL=endPoint.js.map