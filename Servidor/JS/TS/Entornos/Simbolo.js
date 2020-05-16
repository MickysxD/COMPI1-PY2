"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo = /** @class */ (function () {
    function Simbolo(type, value, id) {
        this.type = type;
        this.value = value;
        this.id = id;
    }
    Simbolo.prototype.getType = function () {
        return this.type;
    };
    Simbolo.prototype.getId = function () {
        return this.id;
    };
    Simbolo.prototype.getValue = function () {
        return this.value;
    };
    Simbolo.prototype.setValue = function (value) {
        this.value = value;
    };
    return Simbolo;
}());
exports.Simbolo = Simbolo;
