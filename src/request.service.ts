import {EndPointType} from "./entity/swagger/routes.entity";
import getSwaggerEndPoint from "./endpoint/endPoint";
import {RequestLogService} from "./log/log.service";
import {RequestDataInterface, RequestInterface} from "./entity/swagger/request.entity";
import {SwaggerEndPoint} from "./endpoint/endpoint/swagger/swaggerEndpoint.service";
import {SwaggerJson} from "./entity/swagger/swaggerJson.entity";

export interface RequestConfig {
    name: string;
    operationId: string;
    data: PreRequestDataInterface
}

export interface PreRequestDataInterface {
    queryParameters: Object;
    urlParameters: Object;
    headers: Object;
    body: Object;
}

export class RequestService {
    endPoints: Array<SwaggerEndPoint>;
    logService: RequestLogService;
    attachLogger: Function;

    constructor() {
        this.endPoints = [];
        this.logService = new RequestLogService();
        this.attachLogger = this.logService.attachLogger.bind(this.logService);
    }

    async addEndPoint(endPointConfig: EndPointType) {
        if (endPointConfig.type === "Swagger") {
            try {
                const tmp = await getSwaggerEndPoint(endPointConfig);
                this.endPoints.push(tmp);
            } catch (error) {
                throw new Error(`Error while adding endPoint ${endPointConfig.name}`);
            }
        }
    }

    getEndPoint(name: string): SwaggerEndPoint {
        return this.endPoints.find((endPoint) => endPoint.name === name);
    }

    getEndPointOpenAPIDefinition(name: string): SwaggerJson {
        return this.endPoints.find((endPoint) => endPoint.name === name).item;
    }

    isEndPointExist(name: string): boolean {
        return this.endPoints.some((endPoint) => endPoint.name === name);
    }


    prepareRequest(requestConfig: RequestConfig): string {
        if (!this.isEndPointExist(requestConfig.name)) {
            throw new Error(`EndPoint ${requestConfig.name} not found`);
        }
        const request = {
            name: requestConfig.name,
            operationId: requestConfig.operationId,
            data: RequestService.preRequestToRequest(requestConfig.data)
        } as RequestInterface;
        return this.logService.prepareRequest(request);
    }

    async executePreparedRequest(id: string) {
        const request = this.logService.getRequest(id);
        if (!request) {
            throw new Error(`Request ${id} not found`);
        }
        const endPoint = this.getEndPoint(request.name);
        try {
            console.log('request :>> ', request);
            const result = await endPoint.sendRequest(request.operationId, request.data);
            this.logService.executedRequest(id, result);
            return result;
        } catch (error) {
            this.logService.executedRequest(id, error);
            return error;
        }
    }

    async executeRequest(requestConfig: RequestConfig) {
        const endPoint = this.getEndPoint(requestConfig.name);
        if (!endPoint) {
            throw new Error(`Request ${requestConfig.name} not found`);
        }
        const requestParameters: RequestDataInterface = RequestService.preRequestToRequest(requestConfig.data);

        try {
            return await endPoint.sendRequest<any>(requestConfig.operationId, requestParameters);
        } catch (error) {
            return error;
        }
    }

    static preRequestToRequest(requestConfig: PreRequestDataInterface) {
        return {
            queryParameters: new Map(Object.entries(requestConfig.queryParameters)),
            urlParameters: new Map(Object.entries(requestConfig.urlParameters)),
            headers: new Map(Object.entries(requestConfig.headers)),
            body: requestConfig.body
        }
    }
}