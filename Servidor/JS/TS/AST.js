"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Copia_1 = require("./Copia");
var AST = /** @class */ (function () {
    function AST(id, lexema, lista, errores) {
        this.reporte = new Copia_1.Copia();
        this.id = id;
        this.lexema = lexema;
        this.lista = lista;
        this.errores = errores;
    }
    return AST;
}());
exports.AST = AST;
