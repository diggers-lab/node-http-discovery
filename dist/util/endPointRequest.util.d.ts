import { RouteEntity } from "src/entity/swagger/routes.entity";
export declare class EndPointRequestUtil {
    static parseUrlParameters(route: RouteEntity, data: Map<string, string>): string;
    static parseQueryParameters(route: RouteEntity, data: Map<string, string>): URLSearchParams;
    static formatUrl(url: string, baseUrl: string, query: URLSearchParams): URL;
}
