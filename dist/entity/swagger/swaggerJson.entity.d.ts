import { EndPointType } from "./routes.entity";
export declare class SwaggerJsonInfo {
    title: string;
    version: string;
    description: string;
}
export declare class SwaggerJsonServer {
    url: string;
    description: string;
}
export declare class SwaggerJsonPath {
}
export declare class SwaggerJsonSchema {
}
export declare class SwaggerJsonSecurityScheme {
}
export declare class SwaggerJsonComponents {
    schema: SwaggerJsonSchema;
    response: any;
    parameters: any;
    examples: any;
    requestBodies: any;
    headers: any;
    securitySchemes: SwaggerJsonSecurityScheme;
}
export declare class SwaggerJson {
    config: EndPointType;
    openapi: string;
    info: SwaggerJsonInfo;
    servers: Array<SwaggerJsonServer>;
    paths: SwaggerJsonPath;
    components: SwaggerJsonComponents;
    security: any;
    tags: Array<any>;
}
