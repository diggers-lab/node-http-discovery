
import { SwaggerJson } from '../../entity/swagger/swaggerJson.entity';
import { AbstractEndPoint } from '../endPoint.abstract';
import { ParameterInterface, ResponseInterface, RouteEntity, RoutePoolEntity } from '../../entity/swagger/routes.entity';
import { BaseAuthEntity, BasicAuthEntity, BearerAuthEntity, CustomAuthEntity, KeyAuthEntity } from '../../entity/swagger/auth.entity';
import { RequestDataInterface } from '../../entity/swagger/request.entity';
import { SendHttpRequestUtil } from '../../util/sendHttp.util';

export class SwaggerEndPoint extends AbstractEndPoint {
  item: SwaggerJson;
  constructor(swaggerJson: SwaggerJson) {
    super(
      swaggerJson.config.type,
      swaggerJson.config.url,
      swaggerJson.config.name,
      swaggerJson.config.description,
    );
    this.item = swaggerJson;
  }
  
  async sendRequest<T>(routeName: string, parameters: RequestDataInterface): Promise<T | string> {
    const route = this.getRoute(routeName);
    if (route.security && route.security.length > 0) {
      for(const security of route.security) {
        if (security instanceof KeyAuthEntity) {
          if (!parameters.headers) {
            parameters.headers = new Map<string, string>();
          }
          parameters.headers.set(security.name, security.value);
        }
      }
    }
    const requsetResult = await SendHttpRequestUtil.sendEndPointRequest(route, this.endPoint, parameters);
    try {
      return await requsetResult.json() as T;
    } catch (error) {
      return await requsetResult.text();
    }
  }

  async generate(): Promise<any> {
    // this.generating = true;
    try {
      this.getRoutePoolbasics();
      this.parseSecurityDefinitions();
      this.endPoint.routes = this.getRoutesFromJson(this.item);
    } catch (error) {
      console.log('error :>> ', error);
      // this.generating = false;
      throw new Error('Error while generating the Swagger endPoint');
    }
    // this.generating = false;
    return this.endPoint;
  }

  setSecurity(method: string, security: any): void {
    if (this.endPoint.securities && this.endPoint.securities.length >= 1) {
      const item = this.endPoint.securities.find((s) => s.method === method);
      if (item) {
        item.setSecurity(security);
      }
    } else {

    }
    

  }

  private parseSecurityDefinitions(): BaseAuthEntity[] {
    const securityDefinitions = this.item.components?.securitySchemes;
    const securityEntities: BaseAuthEntity[] = [];

    if (!securityDefinitions) {
      return securityEntities;
    }

    for (const [key, definition] of Object.entries(securityDefinitions)) {
      let securityEntity: BaseAuthEntity;
      switch (definition.type) {
        case 'http':
          if (definition.scheme === 'basic') {
            securityEntity = new BasicAuthEntity('basic', '', '');
          } else if (definition.scheme === 'bearer') {
            securityEntity = new BearerAuthEntity('bearer', '');
          } else {
            securityEntity = new CustomAuthEntity('http', definition);
          }
          break;
        case 'apiKey':
          securityEntity = new KeyAuthEntity(
            'apiKey',
            definition.type,
            definition.in,
            definition.name,
            false,
          );
          break;
        case 'oauth2':
          securityEntity = new CustomAuthEntity(
            'oauth2',
            definition.flows?.authorizationCode,
          );
          break;
        default:
          securityEntity = new CustomAuthEntity('custom', definition);
          break;
      }

      securityEntities.push(securityEntity);
    }
    this.endPoint.securities = securityEntities;
    return securityEntities;
  }

  private getRoutePoolbasics() {
    this.endPoint = new RoutePoolEntity();
    this.endPoint.name = this.item.info.title;
    try {
      const urlObj = new URL(this.url);
      // Extract the first segment in the path
      const pathSegments = urlObj.pathname
        .split('/')
        .filter((segment) => segment.length > 0);
      const suffix = pathSegments.length > 0 ? `/${pathSegments[0]}/` : '';

      // Create the RoutePoolEntity instance
      const entity = new RoutePoolEntity();
      entity.host = urlObj.hostname;
      entity.suffix = suffix;
      entity.port = urlObj.port ? parseInt(urlObj.port) : null;
      entity.protocol = urlObj.protocol.replace(':', '');
      this.endPoint = entity;
      return entity;
    } catch (e) {
      // Handle invalid URLs
      console.error('Invalid URL provided:', e);
      return null;
    }
  }

  private getRoutesFromJson(item: any): Array<RouteEntity> {
    const routes: Array<RouteEntity> = [];
    Object.keys(item.paths).forEach((path) => {
      Object.keys(item.paths[path]).forEach((method) => {
        const route = new RouteEntity();
        route.path = path;
        route.method = method;
        route.operationId = item.paths[path][method].operationId;
        route.parameters = this.getParametersFromJson(
          item.paths[path][method].parameters,
        );
        route.response = this.getResponseFromJson(
          item.paths[path][method].responses,
        );
        route.security = this.getSecurityFromJson(
          item.paths[path][method].security,
        );
        routes.push(route);
      });
    });
    return routes;
  }

  private getSecurityFromJson(security: Array<any>): Array<BaseAuthEntity> {
    const securities: Array<BaseAuthEntity> = [];
    if (!security || security.length === 0) return null;
    security.forEach((sec) => {
      const security = this.endPoint.securities.find(
        (s) => s.method === Object.keys(sec)[0],
      );
      if (security) {
        securities.push(security);
      } else {
        const security = this.endPoint.securities.find(
          (s) => s.name === Object.keys(sec)[0],
        );
        securities.push(security);
      }
    });
    return securities;
  }

  private getParametersFromJson(parameters: any): Array<ParameterInterface> {
    if (!parameters || parameters.length === 0) return null;
    const params: Array<ParameterInterface> = [];
    parameters.forEach((param) => {
      const parameter = new ParameterInterface();
      parameter.name = param.name;
      parameter.in = param.in;
      parameter.required = param.required;
      parameter.type = param.schema.type;
      params.push(parameter);
    });
    return params;
  }

  private getResponseFromJson(response: any): Array<ResponseInterface> {
    const responses: Array<ResponseInterface> = [];
    if (!response || response.length === 0) return null;
    Object.keys(response).forEach((status) => {
      const res = new ResponseInterface();
      res.status = status;
      res.description = response[status].description;
      if (
        response[status].content &&
        response[status].content['application/json']
      ) {
        res.type = this.getSchemaFromRef(
          response[status].content['application/json'],
        );
      } else {
        res.type = undefined;
      }

      responses.push(res);
    });
    return responses;
  }

  private getSchemaFromRef(content: any): string {
    let toReturn: string;
    if (content && content.schema && content.schema['$ref']) {
      toReturn = content.schema['$ref'].split('/')[3].replace('Request', '');
    } else {
      toReturn = content;
    }
    return toReturn;
  }

  refresh(): boolean {
    throw new Error('Method not implemented.');
  }
}
