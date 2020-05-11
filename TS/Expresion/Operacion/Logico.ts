import { Expresion } from "../Expresion";
import { ErrorSimbolico } from "../../Estructuras/ErrorSimbolico";
import { NodoError } from "../../Estructuras/NodoError";
import { ExpType, ListType } from "../../Entornos/NodoAST";
import { Entorno } from "../../Entornos/Entorno";

enum TipoLogico {
    AND, OR, NOT
}

class Logico implements Expresion{
    opIzq:Expresion;
    opDer:Expresion;
    tipoOperacion:TipoLogico;
    fila:number;
    columna:number;

    constructor(opIzq:Expresion, opDer:Expresion, tipoOperacion:TipoLogico, fila:number, columna:number){
        this.opIzq = opIzq;
        this.opDer = opDer;
        this.tipoOperacion = tipoOperacion;
        this.fila = fila;
        this.columna = columna;
    }

    getValor(ent:Entorno, mensajes:ListType[]):ExpType{
        let valIzq = this.opIzq.getValor(ent, mensajes);
        if(valIzq instanceof ErrorSimbolico){
            return valIzq;
        }

        let valDer = this.opDer.getValor(ent, mensajes);
        if(valDer instanceof ErrorSimbolico){
            return valDer;
        }

        if(typeof valIzq === "boolean" && typeof valDer === "boolean"){
            if(this.tipoOperacion == TipoLogico.AND){
                return valIzq && valDer;
            }else if(this.tipoOperacion == TipoLogico.OR){
                return valIzq || valDer;
            }
        }

        mensajes.push(new NodoError("Operaciones logicas no booleanas",this.fila, this.columna));
        return new ErrorSimbolico();
    }
}

export { Logico }