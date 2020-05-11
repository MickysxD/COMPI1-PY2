"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entorno = /** @class */ (function () {
    function Entorno(padre) {
        this.padre = padre;
        this.variables = [];
    }
    Entorno.prototype.get = function (id) {
        var tmp = this;
        while (tmp != null) {
            for (var _i = 0, _a = tmp.variables; _i < _a.length; _i++) {
                var aux = _a[_i];
                if (aux.getId() == id) {
                    return aux;
                }
            }
            tmp = tmp.padre;
        }
        return null;
    };
    Entorno.prototype.put = function (simbolo) {
        for (var _i = 0, _a = this.variables; _i < _a.length; _i++) {
            var aux = _a[_i];
            if (aux.getId() == simbolo.getId()) {
                return false;
            }
        }
        this.variables.push(simbolo);
        return true;
    };
    return Entorno;
}());
exports.Entorno = Entorno;
