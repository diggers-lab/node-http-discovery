import { BasicDataInterface, RequestDataInterface } from "src/entity/swagger/request.entity";
import { RouteEntity, RoutePoolEntity } from "src/entity/swagger/routes.entity";
export declare class SendHttpRequestUtil {
    static sendRequest(request: BasicDataInterface): Promise<any | string>;
    static sendEndPointRequest(route: RouteEntity, routePool: RoutePoolEntity, data: RequestDataInterface): Promise<Response>;
}
