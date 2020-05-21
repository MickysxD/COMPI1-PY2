"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Error = /** @class */ (function () {
    function Error(id, lexema, tipo, descripcion, fila, columna) {
        this.id = id;
        this.lexema = lexema;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
    return Error;
}());
exports.Error = Error;
