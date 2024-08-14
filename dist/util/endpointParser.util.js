"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class EndPointparser {
    static getEndPointData(swaggerEndpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (swaggerEndpoint.type) {
                case 'Swagger':
                    return yield this.getSwagger(swaggerEndpoint.url);
            }
        });
    }
    static getSwagger(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let request;
            const options = {
                method: 'GET',
            };
            try {
                request = yield fetch(url, options);
                const tmp = yield request.json();
                return yield tmp;
            }
            catch (error) {
                console.log('error :>> ', error);
            }
        });
    }
}
exports.default = EndPointparser;
//# sourceMappingURL=endpointParser.util.js.map