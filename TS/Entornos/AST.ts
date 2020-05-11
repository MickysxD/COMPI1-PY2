import { NodoAST, ListType } from "../Entornos/NodoAST";
import { Entorno } from "../Entornos/Entorno";
import { Instruccion } from "../Instruccion/Instruccion";


class AST{
    instrucciones:NodoAST[];

    constructor(instrucciones:NodoAST[]){
        this.instrucciones = instrucciones;
    }

    public recorrer():string{
        let ent:Entorno = new Entorno(null);
        let mensajes:ListType[] = [];
        for(let aux of this.instrucciones){
            (aux as Instruccion).ejecutar(ent, mensajes);
        }
        return mensajes.toString();
    }

}

export { AST }