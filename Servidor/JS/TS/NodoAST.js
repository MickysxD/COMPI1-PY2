"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodoAST = /** @class */ (function () {
    function NodoAST(id, lexema, fila, columna, lista) {
        this.id = id;
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
        this.lista = lista;
    }
    return NodoAST;
}());
exports.NodoAST = NodoAST;
