import {Error} from "./Error"

class NodoAST{
    id:number;
    lexema:string;
    fila:number;
    columna:number;
    lista:NodoAST[];

    constructor(id:number, lexema:string, fila:number, columna:number, lista:NodoAST[]){
        this.id = id;
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
        this.lista = lista;
    }
}

export {NodoAST}