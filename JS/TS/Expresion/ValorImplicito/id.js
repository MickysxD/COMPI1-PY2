"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodoError_1 = require("../../Estructuras/NodoError");
var ErrorSimbolico_1 = require("../../Estructuras/ErrorSimbolico");
var ID = /** @class */ (function () {
    function ID(id, fila, columna) {
        this.id = id;
        this.fila = fila;
        this.columna = columna;
    }
    ID.prototype.getValor = function (ent, mensajes) {
        var valor = ent.get(this.id);
        if (valor != null) {
            mensajes.push(new NodoError_1.NodoError("No existe la variable", this.fila, this.columna));
            return new ErrorSimbolico_1.ErrorSimbolico();
        }
        return valor;
    };
    return ID;
}());
exports.ID = ID;
