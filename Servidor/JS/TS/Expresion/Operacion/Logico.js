"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorSimbolico_1 = require("../../Estructuras/ErrorSimbolico");
var NodoError_1 = require("../../Estructuras/NodoError");
var TipoLogico;
(function (TipoLogico) {
    TipoLogico[TipoLogico["AND"] = 0] = "AND";
    TipoLogico[TipoLogico["OR"] = 1] = "OR";
    TipoLogico[TipoLogico["NOT"] = 2] = "NOT";
})(TipoLogico || (TipoLogico = {}));
var Logico = /** @class */ (function () {
    function Logico(opIzq, opDer, tipoOperacion, fila, columna) {
        this.opIzq = opIzq;
        this.opDer = opDer;
        this.tipoOperacion = tipoOperacion;
        this.fila = fila;
        this.columna = columna;
    }
    Logico.prototype.getValor = function (ent, mensajes) {
        var valIzq = this.opIzq.getValor(ent, mensajes);
        if (valIzq instanceof ErrorSimbolico_1.ErrorSimbolico) {
            return valIzq;
        }
        var valDer = this.opDer.getValor(ent, mensajes);
        if (valDer instanceof ErrorSimbolico_1.ErrorSimbolico) {
            return valDer;
        }
        if (typeof valIzq === "boolean" && typeof valDer === "boolean") {
            if (this.tipoOperacion == TipoLogico.AND) {
                return valIzq && valDer;
            }
            else if (this.tipoOperacion == TipoLogico.OR) {
                return valIzq || valDer;
            }
        }
        mensajes.push(new NodoError_1.NodoError("Operaciones logicas no booleanas", this.fila, this.columna));
        return new ErrorSimbolico_1.ErrorSimbolico();
    };
    return Logico;
}());
exports.Logico = Logico;
