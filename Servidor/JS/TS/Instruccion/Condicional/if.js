"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entorno_1 = require("../../Entornos/Entorno");
var NodoError_1 = require("../../Estructuras/NodoError");
var IfStatment = /** @class */ (function () {
    function IfStatment(condicion, sentenciasIf, sentenciasElse, fila, columna) {
        this.condicion = condicion;
        this.sentenciasIf = sentenciasIf;
        this.sentenciasElse = sentenciasElse;
        this.fila = fila;
        this.columna = columna;
    }
    IfStatment.prototype.ejecutar = function (ent, mensajes) {
        var cond = this.condicion.getValor(ent, mensajes);
        if (typeof cond === "boolean") {
            var entorno = new Entorno_1.Entorno(ent);
            var aux = void 0;
            if (cond) {
                aux = this.sentenciasIf;
            }
            else {
                aux = this.sentenciasElse;
            }
            for (var _i = 0, aux_1 = aux; _i < aux_1.length; _i++) {
                var x = aux_1[_i];
                x.ejecutar(entorno, mensajes);
            }
        }
        else {
            mensajes.push(new NodoError_1.NodoError("Sentencia if no recibe booleano", this.fila, this.columna));
        }
    };
    return IfStatment;
}());
