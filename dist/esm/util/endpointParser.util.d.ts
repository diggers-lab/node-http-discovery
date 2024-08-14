import { EndPointType } from "../entity/swagger/routes.entity";
export default class EndPointparser {
    static getEndPointData(swaggerEndpoint: EndPointType): Promise<any>;
    static getSwagger(url: string): Promise<any>;
}
