
class Error{
    id:number;
    lexema:string;
    tipo:string;
    descripcion:string;
    fila:number;
    columna:number;

    constructor(id:number, lexema:string, tipo:string, descripcion:string, fila:number, columna:number){
        this.id = id;
        this.lexema = lexema;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
}

export {Error}