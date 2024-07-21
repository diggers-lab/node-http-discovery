import { RouteEntity, RoutePoolEntity } from "src/entity/swagger/routes.entity";


export abstract class AbstractEndPoint {
  item: any;
  name: string;
  description: string;
  endPoint: RoutePoolEntity;
  routes: Array<RouteEntity>;
  url: string;
  type: string;

  constructor(type: string, url: string, name: string, description: string) {
    this.url = url;
    this.type = type;
    this.name = name;
    this.description = description;
  }

  getRoute(name: string): RouteEntity {
    return this.endPoint.routes.find((route) => route.operationId === name);
  }

  getRoutes(): Array<RouteEntity> {
    return this.endPoint.routes;
  }
  getEndpoint(): RoutePoolEntity {
    return this.endPoint;
  }

  abstract setSecurity(method: string, security: any): void;
  abstract generate(): Promise<boolean>;
  abstract refresh(): boolean;
}
