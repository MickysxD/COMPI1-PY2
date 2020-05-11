"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Primitivo = /** @class */ (function () {
    function Primitivo(valor, tipo) {
        this.valor = valor;
        this.tipo = tipo;
    }
    Primitivo.prototype.getValor = function (entorno, mensajes) {
        if (this.tipo.getType() == TEnum.INT) {
            return new Integer(parseInt(this.valor));
        }
        else if (this.tipo.getType() == TEnum.DOUBLE) {
            return new Double(parseFloat(this.valor));
        }
        else if (this.tipo.getType() == TEnum.STRING) {
            return new String(this.valor.slice(1, -1));
        }
        else if (this.tipo.getType() == TEnum.CHAR) {
            return new CHAR(this.valor.slice(1, -1));
        }
        return null;
    };
    return Primitivo;
}());
exports.Primitivo = Primitivo;
