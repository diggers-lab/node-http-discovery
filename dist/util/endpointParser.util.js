"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EndPointparser {
    static async getEndPointData(swaggerEndpoint) {
        switch (swaggerEndpoint.type) {
            case 'Swagger':
                return await this.getSwagger(swaggerEndpoint.url);
        }
    }
    static async getSwagger(url) {
        let request;
        const options = {
            method: 'GET',
        };
        try {
            request = await fetch(url, options);
            const tmp = await request.json();
            return await tmp;
        }
        catch (error) {
            console.log('error :>> ', error);
        }
    }
}
exports.default = EndPointparser;
//# sourceMappingURL=endpointParser.util.js.map