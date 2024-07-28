export class RequestInterface {
  name: string;
  operationId: string;
  preparedDate: Date;
  executedDate: Date;
  BaseRequest: any;
  data: any;
  // poolName?: string;
  // group?: string;
  // groupOrder?: number;
}

export class RequestResult extends RequestInterface {
  name: string;
  description?: string;
  result: any;
}

export class BaseRequest {
  type: RequestTypeEnum;
  request: string;
  databaseName: string;
}

export enum RequestTypeEnum {
  SELECT = 'SELECT',
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class BasicRequestInterface extends RequestInterface {
  url: string;
  data: any;
  response: any;
}

export class RequestDataInterface {
  queryParameters?: Map<string, string>;
  urlParameters?: Map<string, string>;
  headers?: Map<string, string>;
  body?: any;
}

export class BasicDataInterface {
  url: string;
  method: string;
  queryParameters: Map<string, string>;
  headers: Map<string, string>;
  body: any;
}