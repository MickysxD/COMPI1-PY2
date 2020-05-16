"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tipo_1 = require("../../Entornos/Tipo");
var Integer_1 = require("../../Estructuras/Integer");
var Double_1 = require("../../Estructuras/Double");
var Primitivo = /** @class */ (function () {
    function Primitivo(valor, tipo) {
        this.valor = valor;
        this.tipo = tipo;
    }
    Primitivo.prototype.getValor = function (ent, mensajes) {
        if (this.tipo.getPrimitiveType() == Tipo_1.TypeEnum.INTEGER) {
            return new Integer_1.Integer(parseInt(this.valor));
        }
        else if (this.tipo.getPrimitiveType() == Tipo_1.TypeEnum.DOUBLE) {
            return new Double_1.Double(parseFloat(this.valor));
        }
        else if (this.tipo.getPrimitiveType() == Tipo_1.TypeEnum.STRING) {
            return new String(this.valor.slice(1, -1));
        } /*else if(this.tipo.getType() == TypeEnum.CHAR){
            return new Char(this.valor.slice(1, -1));
        }*/
        return null;
    };
    return Primitivo;
}());
exports.Primitivo = Primitivo;
