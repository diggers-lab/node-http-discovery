import { EndPointType } from "src/entity/swagger/routes.entity";
import { SwaggerEndPoint } from "src/endpoint/swagger/swaggerEndpoint.service";
export default function getSwaggerEndPoint(endpoint: EndPointType): Promise<SwaggerEndPoint>;
