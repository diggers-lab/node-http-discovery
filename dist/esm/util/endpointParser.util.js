export default class EndPointparser {
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
//# sourceMappingURL=endpointParser.util.js.map