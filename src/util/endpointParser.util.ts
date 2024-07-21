import { EndPointType } from "src/entity/swagger/routes.entity";

export default class EndPointparser {
    static async getEndPointData(swaggerEndpoint: EndPointType) {
        switch (swaggerEndpoint.type) {
          case 'Swagger':
            return await this.getSwagger(
              swaggerEndpoint.url,
            );
        }
      }

      static async getSwagger(url: string): Promise<any> {
        let request;
        const options = {
          method: 'GET',
        };
        try {
          request = await fetch(url, options);
          const tmp = await request.json();
          return await tmp;
        } catch (error) {
          console.log('error :>> ', error);
        }
      }
}