import { RouteEntity, RoutePoolEntity } from "src/entity/swagger/routes.entity";
export declare abstract class AbstractEndPoint {
    item: any;
    name: string;
    description: string;
    endPoint: RoutePoolEntity;
    routes: Array<RouteEntity>;
    url: string;
    type: string;
    constructor(type: string, url: string, name: string, description: string);
    getRoute(name: string): RouteEntity;
    getRoutes(): Array<RouteEntity>;
    getEndpoint(): RoutePoolEntity;
    abstract setSecurity(method: string, security: any): void;
    abstract generate(): Promise<boolean>;
    abstract refresh(): boolean;
}
