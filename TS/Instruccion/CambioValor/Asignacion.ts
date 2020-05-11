import { Instruccion } from "../Instruccion";
import { Expresion } from "../../Expresion/Expresion";
import { Entorno } from "../../Entornos/Entorno";
import { ListType } from "../../Entornos/NodoAST";
import { ErrorSimbolico } from "../../Estructuras/ErrorSimbolico";
import { NodoError } from "../../Estructuras/NodoError";
import { TypeEnum } from "../../Entornos/Tipo";
import { Integer } from "../../Estructuras/Integer";
import { Double } from "../../Estructuras/Double";


class Asignacion implements Instruccion{
    private id:string;
    private valor:Expresion;
    private fila:number;
    private columna:number;

    constructor(id:string, valor:Expresion, fila:number, columna:number){
        this.id = id;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }

    ejecutar(ent:Entorno, mensajes:ListType[]){
        let val = this.valor.getValor(ent, mensajes);
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
    }
}

export { Asignacion }