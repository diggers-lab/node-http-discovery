import { SwaggerJson } from '../../entity/swagger/swaggerJson.entity';
import { AbstractEndPoint } from '../endPoint.abstract';
import { RequestDataInterface } from '../../entity/swagger/request.entity';
export declare class SwaggerEndPoint extends AbstractEndPoint {
    item: SwaggerJson;
    constructor(swaggerJson: SwaggerJson);
    sendRequest<T>(routeName: string, parameters: RequestDataInterface): Promise<T | string>;
    generate(): Promise<any>;
    setSecurity(method: string, security: any): void;
    private parseSecurityDefinitions;
    private getRoutePoolbasics;
    private getRoutesFromJson;
    private getSecurityFromJson;
    private getParametersFromJson;
    private getResponseFromJson;
    private getSchemaFromRef;
    refresh(): boolean;
}
