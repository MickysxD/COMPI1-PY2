"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodoError = /** @class */ (function () {
    function NodoError(descripcion, fila, columna, tipoError) {
        if (tipoError === void 0) { tipoError = "Semantico"; }
        this.tipoError = tipoError;
        this.descripcion = descripcion;
        this.fila = fila;
        console.log(descripcion + fila);
        this.columna = columna;
    }
    NodoError.prototype.toString = function () {
        return "Error " + this.tipoError + this.descripcion + " en Fila:" + this.fila + ", columna:" + this.columna;
    };
    NodoError.prototype.getFila = function () {
        return this.fila;
    };
    NodoError.prototype.getColumna = function () {
        return this.columna;
    };
    NodoError.prototype.getTipo = function () {
        return this.tipoError;
    };
    NodoError.prototype.getDescripcion = function () {
        return this.descripcion;
    };
    return NodoError;
}());
exports.NodoError = NodoError;
