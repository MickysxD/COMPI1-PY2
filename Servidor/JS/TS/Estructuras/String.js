"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var String = /** @class */ (function () {
    function String(valor) {
        this.valor = valor;
    }
    String.prototype.getValor = function () {
        return this.valor;
    };
    String.prototype.toString = function () {
        return this.valor.toString();
    };
    return String;
}());
exports.String = String;
