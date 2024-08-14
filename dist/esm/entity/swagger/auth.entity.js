export class BaseAuthEntity {
    method;
    name;
    constructor(method) {
        this.method = method;
    }
}
export class BasicAuthEntity extends BaseAuthEntity {
    constructor(method, name, password) {
        super(method);
        this.name = name;
        this.password = password;
    }
    password;
    setSecurity(values) {
        throw new Error('Method not implemented.');
    }
    getSecurity() {
        throw new Error('Method not implemented.');
    }
}
export class KeyAuthEntity extends BaseAuthEntity {
    type;
    in;
    cookie;
    value;
    constructor(method, type, inStr, name, cookie) {
        super(method);
        this.type = type;
        this.in = inStr;
        this.name = name;
        this.cookie = cookie;
    }
    ;
    setSecurity(security) {
        this.value = security;
    }
    getSecurity() {
        return new Map([[this.name, this.value]]);
    }
}
export class BearerAuthEntity extends BaseAuthEntity {
    token;
    constructor(method, token) {
        super(method);
        this.token = token;
    }
    setSecurity(values) {
        throw new Error('Method not implemented.');
    }
    getSecurity() {
        throw new Error('Method not implemented.');
    }
}
export class CustomAuthEntity extends BaseAuthEntity {
    constructor(method, params) {
        super(method);
        const keys = Object.keys(params);
        keys.forEach((key) => {
            this[key] = params[key];
        });
    }
    setSecurity(values) {
        throw new Error('Method not implemented.');
    }
    getSecurity() {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=auth.entity.js.map