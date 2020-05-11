"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Integer = /** @class */ (function () {
    function Integer(valor) {
        this.valor = valor;
    }
    Integer.prototype.getValor = function () {
        return this.valor;
    };
    Integer.prototype.toString = function () {
        return this.valor.toString();
    };
    return Integer;
}());
exports.Integer = Integer;
