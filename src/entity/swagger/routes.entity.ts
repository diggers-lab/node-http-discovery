import { BaseAuthEntity } from "./auth.entity";

export class RoutePoolEntity {
  name: string;
  routes: Array<RouteEntity>;
  host: string;
  suffix: string;
  port: number;
  protocol: string;
  securities: Array<BaseAuthEntity>;
}

export class RouteEntity {
  path: string;
  operationId: string;
  method: string;
  parameters: Array<ParameterInterface>;
  response: Array<ResponseInterface>;
  security: Array<BaseAuthEntity>;
}


export class ResponseInterface {
  status: string;
  type: string;
  description: string;
}

export class ParameterInterface {
  name: string;
  in: string;
  required: boolean;
  type: string;
  value?: any;
}

export class EndPointType {
  name: string;
  description: string;
  url: string;
  type: string;
  security?: { key: string, value: string };
}
