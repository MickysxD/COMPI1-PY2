"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorSimbolico_1 = require("../../Estructuras/ErrorSimbolico");
var Integer_1 = require("../../Estructuras/Integer");
var Double_1 = require("../../Estructuras/Double");
var NodoError_1 = require("../../Estructuras/NodoError");
var TipoRelacional;
(function (TipoRelacional) {
    TipoRelacional[TipoRelacional["MAYOR"] = 0] = "MAYOR";
    TipoRelacional[TipoRelacional["MENOR"] = 1] = "MENOR";
    TipoRelacional[TipoRelacional["MAYORIGUAL"] = 2] = "MAYORIGUAL";
    TipoRelacional[TipoRelacional["MENORIGUAL"] = 3] = "MENORIGUAL";
    TipoRelacional[TipoRelacional["IGUALIGUAL"] = 4] = "IGUALIGUAL";
    TipoRelacional[TipoRelacional["DIFERENTE"] = 5] = "DIFERENTE";
})(TipoRelacional || (TipoRelacional = {}));
var Relacional = /** @class */ (function () {
    function Relacional(opIzq, opDer, tipoOperacion, fila, columna) {
        this.opIzq = opIzq;
        this.opDer = opDer;
        this.tipoOperacion = tipoOperacion;
        this.fila = fila;
        this.columna = columna;
    }
    Relacional.prototype.getValor = function (ent, mensajes) {
        var valIzq = this.opIzq.getValor(ent, mensajes);
        if (valIzq instanceof ErrorSimbolico_1.ErrorSimbolico) {
            return valIzq;
        }
        var valDer = this.opDer.getValor(ent, mensajes);
        if (valDer instanceof ErrorSimbolico_1.ErrorSimbolico) {
            return valDer;
        }
        if (this.tipoOperacion == TipoRelacional.MAYOR) {
            if ((valIzq instanceof Integer_1.Integer || valIzq instanceof Double_1.Double) && (valDer instanceof Integer_1.Integer || valDer instanceof Double_1.Double)) {
                return valIzq.getValor() > valDer.getValor();
            }
            else {
                mensajes.push(new NodoError_1.NodoError("Error en el operador >", this.fila, this.columna));
            }
        }
        else if (this.tipoOperacion == TipoRelacional.MENOR) {
            if ((valIzq instanceof Integer_1.Integer || valIzq instanceof Double_1.Double) && (valDer instanceof Integer_1.Integer || valDer instanceof Double_1.Double)) {
                return valIzq.getValor() < valDer.getValor();
            }
            else {
                mensajes.push(new NodoError_1.NodoError("Error en el operador <", this.fila, this.columna));
            }
        }
        else if (this.tipoOperacion == TipoRelacional.MAYORIGUAL) {
            if ((valIzq instanceof Integer_1.Integer || valIzq instanceof Double_1.Double) && (valDer instanceof Integer_1.Integer || valDer instanceof Double_1.Double)) {
                return valIzq.getValor() >= valDer.getValor();
            }
            else {
                mensajes.push(new NodoError_1.NodoError("Error en el operador >=", this.fila, this.columna));
            }
        }
        else if (this.tipoOperacion == TipoRelacional.MENORIGUAL) {
            if ((valIzq instanceof Integer_1.Integer || valIzq instanceof Double_1.Double) && (valDer instanceof Integer_1.Integer || valDer instanceof Double_1.Double)) {
                return valIzq.getValor() <= valDer.getValor();
            }
            else {
                mensajes.push(new NodoError_1.NodoError("Error en el operador <=", this.fila, this.columna));
            }
        }
        else if (this.tipoOperacion == TipoRelacional.IGUALIGUAL) {
            if (valIzq != null && valDer != null) {
                return valIzq.toString() == valDer.toString();
            }
            else {
                return valIzq == valDer;
            }
        }
        else if (this.tipoOperacion == TipoRelacional.DIFERENTE) {
            if (valIzq != null && valDer != null) {
                return valIzq.toString() != valDer.toString();
            }
            else {
                return valIzq != valDer;
            }
        }
    };
    return Relacional;
}());
exports.Relacional = Relacional;
