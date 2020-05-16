"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Asignacion = /** @class */ (function () {
    function Asignacion(id, valor, fila, columna) {
        this.id = id;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    Asignacion.prototype.ejecutar = function ( /*ent:Entorno, mensajes:ListType[]*/) {
        return this.id + " " + this.valor + " " + this.fila + " " + this.columna;
        /*let val = this.valor.getValor(ent, mensajes);
        if(val instanceof ErrorSimbolico){
            mensajes.push(new NodoError("Valor invalido en asignacion",this.fila,this.columna));
            return;
        }

        let s = ent.get(this.id);
        if(s != null){
            if(s.getType().getPrimitiveType() == TypeEnum.INTEGER){
                if(val instanceof Integer){
                    s.setValue(val);
                }else{
                    mensajes.push(new NodoError("tipo de valo invalido en asignacion",this.fila,this.columna));
                }
            }else if(s.getType().getPrimitiveType() == TypeEnum.DOUBLE){
                if(val instanceof Double){
                    s.setValue(val);
                }else{
                    mensajes.push(new NodoError("tipo de valo invalido en asignacion",this.fila,this.columna));
                }
            }else if(s.getType().getPrimitiveType() == TypeEnum.STRING){
                if(val instanceof String){
                    s.setValue(val);
                }else{
                    mensajes.push(new NodoError("tipo de valo invalido en asignacion",this.fila,this.columna));
                }
            }
        }
        */
    };
    return Asignacion;
}());
exports.Asignacion = Asignacion;
