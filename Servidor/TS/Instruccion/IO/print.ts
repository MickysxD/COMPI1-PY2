import { Expresion } from "../../Expresion/Expresion";
import { Instruccion } from "../Instruccion";
import { Entorno } from "../../Entornos/Entorno";
import { ListType } from "../../Entornos/NodoAST";
import { ErrorSimbolico } from "../../Estructuras/ErrorSimbolico";
import { NodoError } from "../../Estructuras/NodoError";
import { Double } from "../../Estructuras/Double";
import { Integer } from "../../Estructuras/Integer";



class Print implements Instruccion{
    valor:Expresion;
    fila:number;
    columna:number;

    constructor(valor:Expresion, fila:number, columna:number){
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }

    ejecutar(ent:Entorno, mensajes:ListType[]){
        let val = this.valor.getValor(ent, mensajes);
        if(val instanceof ErrorSimbolico || val == null){
            mensajes.push(new NodoError("Exprecion invalida ", this.fila, this.columna));
        }else{
            if(val instanceof Integer || val instanceof Double){
                mensajes.push(val.getValor);
            }else{
                mensajes.push(val)
            }
        }
    }

}

export { Print }