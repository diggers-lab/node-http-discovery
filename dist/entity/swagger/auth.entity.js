"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAuthEntity = exports.BearerAuthEntity = exports.KeyAuthEntity = exports.BasicAuthEntity = exports.BaseAuthEntity = void 0;
class BaseAuthEntity {
    constructor(method) {
        this.method = method;
    }
}
exports.BaseAuthEntity = BaseAuthEntity;
class BasicAuthEntity extends BaseAuthEntity {
    constructor(method, name, password) {
        super(method);
        this.name = name;
        this.password = password;
    }
    setSecurity(values) {
        throw new Error('Method not implemented.');
    }
    getSecurity() {
        throw new Error('Method not implemented.');
    }
}
exports.BasicAuthEntity = BasicAuthEntity;
class KeyAuthEntity extends BaseAuthEntity {
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
exports.KeyAuthEntity = KeyAuthEntity;
class BearerAuthEntity extends BaseAuthEntity {
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
exports.BearerAuthEntity = BearerAuthEntity;
class CustomAuthEntity extends BaseAuthEntity {
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
exports.CustomAuthEntity = CustomAuthEntity;
//# sourceMappingURL=auth.entity.js.map