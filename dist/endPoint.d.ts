import { EndPointType } from "./entity/swagger/routes.entity";
import { SwaggerEndPoint } from "./endpoint/swagger/swaggerEndpoint.service";
export default function getSwaggerEndPoint(endpoint: EndPointType): Promise<SwaggerEndPoint>;
