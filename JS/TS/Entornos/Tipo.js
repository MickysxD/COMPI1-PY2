"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeEnum;
(function (TypeEnum) {
    TypeEnum[TypeEnum["INTEGER"] = 0] = "INTEGER";
    TypeEnum[TypeEnum["DOUBLE"] = 1] = "DOUBLE";
    TypeEnum[TypeEnum["STRING"] = 2] = "STRING";
})(TypeEnum || (TypeEnum = {}));
exports.TypeEnum = TypeEnum;
var PrimitiveType = /** @class */ (function () {
    function PrimitiveType(type) {
        this.type = type;
    }
    PrimitiveType.prototype.getPrimitiveType = function () {
        return this.type;
    };
    return PrimitiveType;
}());
exports.PrimitiveType = PrimitiveType;
