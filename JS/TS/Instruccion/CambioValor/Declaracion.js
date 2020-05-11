"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorSimbolico_1 = require("../../Estructuras/ErrorSimbolico");
var NodoError_1 = require("../../Estructuras/NodoError");
var Simbolo_1 = require("../../Entornos/Simbolo");
var Declaracion = /** @class */ (function () {
    function Declaracion(id, valor, tipo, fila, columna) {
        this.id = id;
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
    Declaracion.prototype.ejecutar = function (ent, mensajes) {
        var val = this.valor.getValor(ent, mensajes);
        if (val instanceof ErrorSimbolico_1.ErrorSimbolico) {
            mensajes.push(new NodoError_1.NodoError("Valor invalido en declaracion", this.fila, this.columna, "semantico"));
            return;
        }
        var s = new Simbolo_1.Simbolo(this.tipo, val, this.id);
        if (!ent.put(s)) {
            mensajes.push(new NodoError_1.NodoError("Ya existe la variable:" + this.id, this.fila, this.columna));
        }
    };
    return Declaracion;
}());
exports.Declaracion = Declaracion;
