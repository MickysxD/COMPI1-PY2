"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Double = /** @class */ (function () {
    function Double(valor) {
        this.valor = valor;
    }
    Double.prototype.getValor = function () {
        return this.valor;
    };
    Double.prototype.toString = function () {
        return this.valor.toString();
    };
    return Double;
}());
exports.Double = Double;
