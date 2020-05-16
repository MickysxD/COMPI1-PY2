"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorSimbolico_1 = require("../../Estructuras/ErrorSimbolico");
var NodoError_1 = require("../../Estructuras/NodoError");
var Double_1 = require("../../Estructuras/Double");
var Integer_1 = require("../../Estructuras/Integer");
var Print = /** @class */ (function () {
    function Print(valor, fila, columna) {
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    Print.prototype.ejecutar = function (ent, mensajes) {
        var val = this.valor.getValor(ent, mensajes);
        if (val instanceof ErrorSimbolico_1.ErrorSimbolico || val == null) {
            mensajes.push(new NodoError_1.NodoError("Exprecion invalida ", this.fila, this.columna));
        }
        else {
            if (val instanceof Integer_1.Integer || val instanceof Double_1.Double) {
                mensajes.push(val.getValor);
            }
            else {
                mensajes.push(val);
            }
        }
    };
    return Print;
}());
exports.Print = Print;
