import { Instruccion } from "../Instruccion";
import { Expresion } from "../../Expresion/Expresion";
import { NodoAST, ListType } from "../../Entornos/NodoAST";
import { Entorno } from "../../Entornos/Entorno";
import { NodoError } from "../../Estructuras/NodoError";


class IfStatment implements Instruccion{
    condicion:Expresion;
    sentenciasIf:NodoAST[];
    sentenciasElse:NodoAST[];
    fila:number;
    columna:number;

    constructor(condicion:Expresion, sentenciasIf:NodoAST[], sentenciasElse:NodoAST[], fila:number, columna:number){
        this.condicion = condicion;
        this.sentenciasIf = sentenciasIf;
        this.sentenciasElse = sentenciasElse;
        this.fila = fila;
        this.columna = columna
    }

    ejecutar(ent:Entorno, mensajes:ListType[]):any{
        let cond = this.condicion.getValor(ent,mensajes);
        if(typeof cond === "boolean"){
            let entorno = new Entorno(ent);
            let aux;
            if(cond){
                aux=this.sentenciasIf;
            }else{
                aux=this.sentenciasElse;
            }
            for(let x of aux){
                (aux.getData() as Instruccion).ejecutar(entorno,mensajes)
            }
        }else{
            mensajes.push(new NodoError("Sentencia if no recibe booleano", this.fila, this.columna))
        }
    }

}