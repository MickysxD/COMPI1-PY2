import { Instruccion } from "../Instruccion";
import { Expresion } from "../../Expresion/Expresion";
import { NodoAST, ListType } from "../../Entornos/NodoAST";
import { Entorno } from "../../Entornos/Entorno";
import { NodoError } from "../../Estructuras/NodoError";


class WhileStatement implements Instruccion{
    condicion:Expresion;
    instrucciones:NodoAST[];
    fila:number;
    columna:number;

    constructor(condicion:Expresion, instrucciones:NodoAST[], fila:number, columna:number){
        this.columna = columna;
        this.fila = fila;
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    ejecutar(ent:Entorno, mensajes:ListType[]):any{
        let t=0;
        while(t++<500){
            let cond = this.condicion.getValor(ent,mensajes);
            if(typeof cond === "boolean"){
                let entorno:Entorno = new Entorno(ent);
                if(cond){
                    for(let aux of this.instrucciones){
                        (aux.getData() as Instruccion).ejecutar(entorno,mensajes);
                    }
                }else{
                    break;
                }
            }else{
                mensajes.push(new NodoError("sentencia while no recibe valor booleano",this.fila, this.columna))
            }
        }

        if(t == 501){
            mensajes.push(new NodoError("La sentencia while se encicla",this.fila, this.columna))
        }
    }
}

