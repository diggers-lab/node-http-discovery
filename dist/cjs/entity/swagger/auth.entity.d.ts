export declare abstract class BaseAuthEntity {
    method: any;
    name?: string;
    constructor(method: string);
    abstract setSecurity(security: any): void;
    abstract getSecurity(): Map<string, string>;
}
export declare class BasicAuthEntity extends BaseAuthEntity {
    constructor(method: string, name: string, password: string);
    name: string;
    password: string;
    setSecurity(values: any): void;
    getSecurity(): Map<string, string>;
}
export declare class KeyAuthEntity extends BaseAuthEntity {
    type: string;
    in: string;
    name: string;
    cookie: boolean;
    value?: string;
    constructor(method: string, type: string, inStr: string, name: string, cookie: boolean);
    setSecurity(security: string): void;
    getSecurity(): Map<string, string>;
}
export declare class BearerAuthEntity extends BaseAuthEntity {
    token: string;
    constructor(method: string, token: string);
    setSecurity(values: any): void;
    getSecurity(): Map<string, string>;
}
export declare class CustomAuthEntity extends BaseAuthEntity {
    constructor(method: string, params: any);
    setSecurity(values: any): void;
    getSecurity(): Map<string, string>;
}
