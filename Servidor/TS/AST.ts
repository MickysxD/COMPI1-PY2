import { NodoAST } from "./NodoAST";
import { Error } from "./Error";
import { Copia } from "./Copia";


class AST{
    id:number;
    lexema:string;
    lista:NodoAST[];
    errores:Error[];
    reporte?:Copia[];

    constructor(id:number, lexema:string, lista:NodoAST[], errores:Error[]){
        this.id = id;
        this.lexema = lexema;
        this.lista = lista;
        this.errores = errores;
    }

 
}

export { AST }