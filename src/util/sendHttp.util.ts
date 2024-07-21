import { BasicDataInterface, RequestDataInterface } from "src/entity/swagger/request.entity";
import { RouteEntity, RoutePoolEntity } from "src/entity/swagger/routes.entity";
import { EndPointRequestUtil } from "./endPointRequest.util";


export class SendHttpRequestUtil {
  static async sendRequest(request: BasicDataInterface): Promise<any | string> {
    const options = {
      method: request.method,
      headers: request.headers,
      body: JSON.stringify(request.body),
      redirect: undefined,
    } as unknown as RequestInit;
    let result;
    try {
      result = await fetch(request.url, options);
      return await result;
    } catch (error) {
      console.log('error :>> ', error);
      return error;
    }
  }

  static async sendEndPointRequest(
    route: RouteEntity,
    routePool: RoutePoolEntity,
    data: RequestDataInterface,
  ): Promise<Response> {
    try {
      const queryParameters = EndPointRequestUtil.parseQueryParameters(
        route,
        data.queryParameters,
      );
      const tmp = EndPointRequestUtil.parseUrlParameters(
        route,
        data.urlParameters,
      );
      const url: URL = EndPointRequestUtil.formatUrl(
        tmp,
        routePool.protocol +
          '://' +
          routePool.host +
          (routePool.port ? ':' + routePool.port : ''),
        queryParameters,
      );
      const options = {
        method: route.method,
        headers: data.headers,
        body: JSON.stringify(data.body),
        redirect: undefined,
      } as unknown as RequestInit;
      return await fetch(url.toString(), options);
    } catch (error) {
      console.log('error :>> ', error);
    }
  }
}
