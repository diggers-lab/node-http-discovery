export abstract class BaseAuthEntity {
  method: any;
  name?: string;
  constructor(method: string) {
    this.method = method;
  }

  abstract setSecurity(security: any) : void;
  abstract getSecurity(): Map<string, string>;
}

export class BasicAuthEntity extends BaseAuthEntity {
  constructor(method: string, name: string, password: string) {
    super(method);
    this.name = name;
    this.password = password;
  }
  name: string;
  password: string;
  setSecurity(values: any): void {
    throw new Error('Method not implemented.');
  }

  getSecurity(): Map<string, string> {
    throw new Error('Method not implemented.');
  }
}

export class KeyAuthEntity extends BaseAuthEntity {
  type: string;
  in: string;
  name: string;
  cookie: boolean;
  value?: string;
  constructor(
    method: string,
    type: string,
    inStr: string,
    name: string,
    cookie: boolean,
  ) {
    super(method);
    this.type = type;
    this.in = inStr;
    this.name = name;
    this.cookie = cookie;
  };
  setSecurity(security: string): void {
    this.value = security;
  }
  getSecurity(): Map<string, string> {
    return new Map<string, string>([[this.name, this.value]]);
  }
}

export class BearerAuthEntity extends BaseAuthEntity {
  token: string;
  constructor(method: string, token: string) {
    super(method);
    this.token = token;
  }

  setSecurity(values: any): void {
    throw new Error('Method not implemented.');
  }
  getSecurity(): Map<string, string> {
    throw new Error('Method not implemented.');
  }
}

export class CustomAuthEntity extends BaseAuthEntity {
  constructor(method: string, params: any) {
    super(method);
    const keys = Object.keys(params);
    keys.forEach((key) => {
      this[key] = params[key];
    });
  }

  setSecurity(values: any): void {
    throw new Error('Method not implemented.');
  }
  getSecurity(): Map<string, string> {
    throw new Error('Method not implemented.');
  }
}
