import { randomUUID } from 'crypto';
import {RequestInterface} from "../entity/swagger/request.entity";

export class RequestLogService {
    requests: Map<string, any>;
    externalLogger?: Function;


    constructor() {
        this.requests = new Map();
    }

    attachLogger(logger: Function) {
        this.externalLogger = logger;
    }

    prepareRequest(request: RequestInterface): string {
        const id = randomUUID();

        const preparedRequest = {
            ...request,
            id,
            preparedDate: new Date(),
        };
        this.requests.set(id, preparedRequest);
        return id;
    }

    executedRequest(id: string, result: any) {
        if (result instanceof Error) {
            if (this.externalLogger) {
                this.externalLogger(`Request: ${id} ` + result);
            }
        }
        const request = this.requests.get(id);
        request.executedDate = new Date();
        request.result = result;
    }

    getRequest(id: string) {
        return this.requests.get(id);
    }

    mapToObject(map) {
        const obj = {};
        for (const [key, value] of map) {
            obj[key] = value;
        }
        return obj;
    }

    dumpRequest(id: string) {
        const request = this.requests.get(id);
        const jsonifiedRequest = request;
        jsonifiedRequest.data.data.queryParameters = this.mapToObject(
            request.data.data.queryParameters,
        );
        jsonifiedRequest.data.data.urlParameters = this.mapToObject(
            request.data.data.urlParameters,
        );
        jsonifiedRequest.data.data.headers = this.mapToObject(
            request.data.data.headers,
        );
        return jsonifiedRequest;
    }

    getRequests(): Map<string, any> {
        return this.requests;
    }

    removeRequest(id: string) {
        this.requests.delete(id);
    }
}
