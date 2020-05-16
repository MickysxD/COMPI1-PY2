"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entorno_1 = require("../../Entornos/Entorno");
var NodoError_1 = require("../../Estructuras/NodoError");
var WhileStatement = /** @class */ (function () {
    function WhileStatement(condicion, instrucciones, fila, columna) {
        this.columna = columna;
        this.fila = fila;
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    WhileStatement.prototype.ejecutar = function (ent, mensajes) {
        var t = 0;
        while (t++ < 500) {
            var cond = this.condicion.getValor(ent, mensajes);
            if (typeof cond === "boolean") {
                var entorno = new Entorno_1.Entorno(ent);
                if (cond) {
                    for (var _i = 0, _a = this.instrucciones; _i < _a.length; _i++) {
                        var aux = _a[_i];
                        aux.ejecutar(entorno, mensajes);
                    }
                }
                else {
                    break;
                }
            }
            else {
                mensajes.push(new NodoError_1.NodoError("sentencia while no recibe valor booleano", this.fila, this.columna));
            }
        }
        if (t == 501) {
            mensajes.push(new NodoError_1.NodoError("La sentencia while se encicla", this.fila, this.columna));
        }
    };
    return WhileStatement;
}());
