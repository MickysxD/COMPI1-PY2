"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entorno_1 = require("../Entornos/Entorno");
var AST = /** @class */ (function () {
    function AST(instrucciones) {
        this.instrucciones = instrucciones;
    }
    AST.prototype.recorrer = function () {
        var ent = new Entorno_1.Entorno(null);
        var mensajes = [];
        for (var _i = 0, _a = this.instrucciones; _i < _a.length; _i++) {
            var aux = _a[_i];
            aux.ejecutar(ent, mensajes);
        }
        return mensajes.toString();
    };
    return AST;
}());
exports.AST = AST;
