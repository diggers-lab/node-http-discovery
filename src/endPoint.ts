import { EndPointType } from "./entity/swagger/routes.entity";
import { SwaggerJson } from "./entity/swagger/swaggerJson.entity";
import { SwaggerEndPoint } from "./endpoint/swagger/swaggerEndpoint.service";

export default async function getSwaggerEndPoint(endpoint: EndPointType): Promise<SwaggerEndPoint> {
    let tmp = await getSwagger(endpoint.url, endpoint.security ? endpoint.security : undefined);
    tmp.config = endpoint;
    
    const endPoint = extractSwagger(tmp);
    endPoint.generate();
    if (endpoint.security) {
        endPoint.setSecurity(endpoint.security.key, endpoint.security.value);
    }
    return endPoint;
}

async function getSwagger(url: string, security?: { key: string, value: string }): Promise<any> {
    let request;
    const options = {
      method: 'GET',
      headers: {}
    };
    if (security) {
        options.headers = {
            [security.key]: security.value
        }
    }
    try {
      request = await fetch(url, options);
      const tmp = await request.json();
      return await tmp;
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  function extractSwagger(
    swaggerJson: SwaggerJson,
  ): SwaggerEndPoint {
    return new SwaggerEndPoint(swaggerJson);
  }