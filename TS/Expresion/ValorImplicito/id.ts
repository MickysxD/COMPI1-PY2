import { Expresion } from "../Expresion";
import { Entorno } from "../../Entornos/Entorno";
import { ListType, ExpType } from "../../Entornos/NodoAST";
import { NodoError } from "../../Estructuras/NodoError";
import { ErrorSimbolico } from "../../Estructuras/ErrorSimbolico";


class ID implements Expresion{
    private id:string;
    private fila:number;
    private columna:number;

    constructor(id:string, fila:number, columna:number){
        this.id = id;
        this.fila = fila;
        this.columna = columna;
    }

    getValor(ent:Entorno, mensajes:ListType[]) :ExpType{
        let valor = ent.get(this.id);
        if(valor != null){
            mensajes.push(new NodoError("No existe la variable",this.fila, this.columna));
            return new ErrorSimbolico();
        }
        return valor.getValue();
    }
}

export { ID }