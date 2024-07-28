import { EndPointType } from "./routes.entity";

export class SwaggerJsonInfo {
  title: string;
  version: string;
  description: string;
}

export class SwaggerJsonServer {
  url: string;
  description: string;
}

export class SwaggerJsonPath {}

export class SwaggerJsonSchema {}

export class SwaggerJsonSecurityScheme {}

export class SwaggerJsonComponents {
  schema: SwaggerJsonSchema;
  response: any;
  parameters: any;
  examples: any;
  requestBodies: any;
  headers: any;
  securitySchemes: SwaggerJsonSecurityScheme;
}

export class SwaggerJson {
  config: EndPointType;
  openapi: string;
  info: SwaggerJsonInfo;
  servers: Array<SwaggerJsonServer>;
  paths: SwaggerJsonPath;
  components: SwaggerJsonComponents;
  security: any;
  tags: Array<any>;
}
