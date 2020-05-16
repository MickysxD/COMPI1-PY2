"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorSimbolico_1 = require("../../Estructuras/ErrorSimbolico");
var Integer_1 = require("../../Estructuras/Integer");
var Double_1 = require("../../Estructuras/Double");
var NodoError_1 = require("../../Estructuras/NodoError");
var TipoAritmetico;
(function (TipoAritmetico) {
    TipoAritmetico[TipoAritmetico["SUMA"] = 0] = "SUMA";
    TipoAritmetico[TipoAritmetico["RESTA"] = 1] = "RESTA";
    TipoAritmetico[TipoAritmetico["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoAritmetico[TipoAritmetico["DIVISION"] = 3] = "DIVISION";
    TipoAritmetico[TipoAritmetico["ELEVACION"] = 4] = "ELEVACION";
    TipoAritmetico[TipoAritmetico["MOD"] = 5] = "MOD";
})(TipoAritmetico || (TipoAritmetico = {}));
exports.TipoAritmetico = TipoAritmetico;
var Aritmetico = /** @class */ (function () {
    function Aritmetico(opDer, fila, columna, opIzq, operacion) {
        this.opIzq = opIzq;
        this.opDer = opDer;
        this.tipoOperacion = operacion;
        this.fila = fila;
        this.columna = columna;
    }
    Aritmetico.prototype.getValor = function (entorno, mensajes) {
        var valIzq = this.opIzq.getValor(entorno, mensajes);
        if (valIzq instanceof ErrorSimbolico_1.ErrorSimbolico) {
            return valIzq;
        }
        var valDer = this.opDer.getValor(entorno, mensajes);
        if (valDer instanceof ErrorSimbolico_1.ErrorSimbolico) {
            return valDer;
        }
        if (this.unario) {
            if (valDer instanceof Integer_1.Integer || valDer instanceof Double_1.Double) {
                return valDer.getValor() * -1;
            }
            else {
                mensajes.push(new NodoError_1.NodoError("Error de tipo con->" + valDer, this.fila, this.columna));
                return new ErrorSimbolico_1.ErrorSimbolico();
            }
        }
        else {
            if (this.tipoOperacion == TipoAritmetico.SUMA) {
                if (valIzq instanceof Integer_1.Integer && valDer instanceof Integer_1.Integer) {
                    return new Integer_1.Integer(valIzq.getValor() + valDer.getValor());
                }
                else if ((valIzq instanceof Integer_1.Integer || valIzq instanceof Double_1.Double) && (valDer instanceof Integer_1.Integer || valDer instanceof Double_1.Double)) {
                    return new Double_1.Double(valIzq.getValor() + valDer.getValor());
                }
                else {
                    if (valIzq == null || valDer == null) {
                        mensajes.push(new NodoError_1.NodoError("No es posible sumar null" + valDer, this.fila, this.columna));
                        return new ErrorSimbolico_1.ErrorSimbolico();
                    }
                    else {
                        return valIzq.toString() + valDer.toString();
                    }
                }
            }
            else if (this.tipoOperacion == TipoAritmetico.RESTA) {
                if (valIzq instanceof Integer_1.Integer && valDer instanceof Integer_1.Integer) {
                    return new Integer_1.Integer(valIzq.getValor() - valDer.getValor());
                }
                else if ((valIzq instanceof Integer_1.Integer || valIzq instanceof Double_1.Double) && (valDer instanceof Integer_1.Integer || valDer instanceof Double_1.Double)) {
                    return new Double_1.Double(valIzq.getValor() - valDer.getValor());
                }
                else {
                    mensajes.push(new NodoError_1.NodoError("Operacion resta no soportada " + valDer, this.fila, this.columna));
                    return new ErrorSimbolico_1.ErrorSimbolico();
                }
            }
            else if (this.tipoOperacion == TipoAritmetico.MULTIPLICACION) {
                if (valIzq instanceof Integer_1.Integer && valDer instanceof Integer_1.Integer) {
                    return new Integer_1.Integer(valIzq.getValor() * valDer.getValor());
                }
                else if ((valIzq instanceof Integer_1.Integer || valIzq instanceof Double_1.Double) && (valDer instanceof Integer_1.Integer || valDer instanceof Double_1.Double)) {
                    return new Double_1.Double(valIzq.getValor() * valDer.getValor());
                }
                else {
                    mensajes.push(new NodoError_1.NodoError("Operacion multiplicacion no soportada " + valDer, this.fila, this.columna));
                    return new ErrorSimbolico_1.ErrorSimbolico();
                }
            }
            else if (this.tipoOperacion == TipoAritmetico.DIVISION) {
                if ((valIzq instanceof Integer_1.Integer || valIzq instanceof Double_1.Double) && (valDer instanceof Integer_1.Integer || valDer instanceof Double_1.Double)) {
                    if (valDer.getValor() != 0) {
                        return new Double_1.Double(valIzq.getValor() / valDer.getValor());
                    }
                    else {
                        mensajes.push(new NodoError_1.NodoError("Operacion division entre 0 no soportada ", this.fila, this.columna));
                        return new ErrorSimbolico_1.ErrorSimbolico();
                    }
                }
                else {
                    mensajes.push(new NodoError_1.NodoError("Operacion division no soportada " + valDer, this.fila, this.columna));
                    return new ErrorSimbolico_1.ErrorSimbolico();
                }
            }
            else if (this.tipoOperacion == TipoAritmetico.ELEVACION) {
                if (valIzq instanceof Integer_1.Integer && valDer instanceof Integer_1.Integer) {
                    return new Integer_1.Integer(valIzq.getValor() ^ valDer.getValor());
                }
                else if ((valIzq instanceof Integer_1.Integer || valIzq instanceof Double_1.Double) && (valDer instanceof Integer_1.Integer || valDer instanceof Double_1.Double)) {
                    return new Double_1.Double(valIzq.getValor() ^ valDer.getValor());
                }
                else {
                    mensajes.push(new NodoError_1.NodoError("Operacion elevacion no soportada " + valDer, this.fila, this.columna));
                    return new ErrorSimbolico_1.ErrorSimbolico();
                }
            }
            else if (this.tipoOperacion == TipoAritmetico.MOD) {
                if (valIzq instanceof Integer_1.Integer && valDer instanceof Integer_1.Integer) {
                    return new Integer_1.Integer(valIzq.getValor() % valDer.getValor());
                }
                else if ((valIzq instanceof Integer_1.Integer || valIzq instanceof Double_1.Double) && (valDer instanceof Integer_1.Integer || valDer instanceof Double_1.Double)) {
                    return new Double_1.Double(valIzq.getValor() % valDer.getValor());
                }
                else {
                    mensajes.push(new NodoError_1.NodoError("Operacion mod no soportada " + valDer, this.fila, this.columna));
                    return new ErrorSimbolico_1.ErrorSimbolico();
                }
            }
            else {
                mensajes.push(new NodoError_1.NodoError("La operacion no exites", this.fila, this.columna));
                return new ErrorSimbolico_1.ErrorSimbolico();
            }
        }
    };
    return Aritmetico;
}());
exports.Aritmetico = Aritmetico;
