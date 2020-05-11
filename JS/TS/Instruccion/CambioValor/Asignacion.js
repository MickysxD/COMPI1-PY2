"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorSimbolico_1 = require("../../Estructuras/ErrorSimbolico");
var NodoError_1 = require("../../Estructuras/NodoError");
var Tipo_1 = require("../../Entornos/Tipo");
var Integer_1 = require("../../Estructuras/Integer");
var Double_1 = require("../../Estructuras/Double");
var Asignacion = /** @class */ (function () {
    function Asignacion(id, valor, fila, columna) {
        this.id = id;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    Asignacion.prototype.ejecutar = function (ent, mensajes) {
        var val = this.valor.getValor(ent, mensajes);
        if (val instanceof ErrorSimbolico_1.ErrorSimbolico) {
            mensajes.push(new NodoError_1.NodoError("Valor invalido en asignacion", this.fila, this.columna));
            return;
        }
        var s = ent.get(this.id);
        if (s != null) {
            if (s.getType().getPrimitiveType() == Tipo_1.TypeEnum.INTEGER) {
                if (val instanceof Integer_1.Integer) {
                    s.setValue(val);
                }
                else {
                    mensajes.push(new NodoError_1.NodoError("tipo de valo invalido en asignacion", this.fila, this.columna));
                }
            }
            else if (s.getType().getPrimitiveType() == Tipo_1.TypeEnum.DOUBLE) {
                if (val instanceof Double_1.Double) {
                    s.setValue(val);
                }
                else {
                    mensajes.push(new NodoError_1.NodoError("tipo de valo invalido en asignacion", this.fila, this.columna));
                }
            }
            else if (s.getType().getPrimitiveType() == Tipo_1.TypeEnum.STRING) {
                if (val instanceof String) {
                    s.setValue(val);
                }
                else {
                    mensajes.push(new NodoError_1.NodoError("tipo de valo invalido en asignacion", this.fila, this.columna));
                }
            }
        }
    };
    return Asignacion;
}());
exports.Asignacion = Asignacion;
