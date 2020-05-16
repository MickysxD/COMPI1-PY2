import { Expresion } from "../Expresion";
import { Entorno } from "../../Entornos/Entorno";
import { ListType, ExpType } from "../../Entornos/NodoAST";
import { ErrorSimbolico } from "../../Estructuras/ErrorSimbolico";
import { Integer } from "../../Estructuras/Integer";
import { Double } from "../../Estructuras/Double";
import { NodoError } from "../../Estructuras/NodoError";

enum TipoRelacional {
    MAYOR, MENOR, MAYORIGUAL, MENORIGUAL, IGUALIGUAL, DIFERENTE
}

class Relacional implements Expresion{
    opIzq:Expresion;
    opDer:Expresion;
    tipoOperacion:TipoRelacional;
    fila:number;
    columna:number;

    constructor(opIzq:Expresion, opDer:Expresion, tipoOperacion:TipoRelacional, fila:number, columna:number){
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

        if(this.tipoOperacion == TipoRelacional.MAYOR){
            if((valIzq instanceof Integer || valIzq instanceof Double) && (valDer instanceof Integer || valDer instanceof Double)){
                return valIzq.getValor() > valDer.getValor();
            }else{
                mensajes.push(new NodoError("Error en el operador >",this.fila, this.columna))
                return new ErrorSimbolico();
            }
        }else if(this.tipoOperacion == TipoRelacional.MENOR){
            if((valIzq instanceof Integer || valIzq instanceof Double) && (valDer instanceof Integer || valDer instanceof Double)){
                return valIzq.getValor() < valDer.getValor();
            }else{
                mensajes.push(new NodoError("Error en el operador <",this.fila, this.columna))
                return new ErrorSimbolico();
            }
        }else if(this.tipoOperacion == TipoRelacional.MAYORIGUAL){
            if((valIzq instanceof Integer || valIzq instanceof Double) && (valDer instanceof Integer || valDer instanceof Double)){
                return valIzq.getValor() >= valDer.getValor();
            }else{
                mensajes.push(new NodoError("Error en el operador >=",this.fila, this.columna))
                return new ErrorSimbolico();
            }
        }else if(this.tipoOperacion == TipoRelacional.MENORIGUAL){
            if((valIzq instanceof Integer || valIzq instanceof Double) && (valDer instanceof Integer || valDer instanceof Double)){
                return valIzq.getValor() <= valDer.getValor();
            }else{
                mensajes.push(new NodoError("Error en el operador <=",this.fila, this.columna))
                return new ErrorSimbolico();
            }
        }else if(this.tipoOperacion == TipoRelacional.IGUALIGUAL){
            return valIzq == valDer;
        }else if(this.tipoOperacion == TipoRelacional.DIFERENTE){
            return valIzq != valDer;
        }else{
            mensajes.push(new NodoError("Error operador no existe",this.fila, this.columna))
            return new ErrorSimbolico();
        }
    }
}

export { Relacional }