class NodoError{
    fila:number;
    columna:number;
    descripcion:string;
    tipoError:string;

    constructor(descripcion:string, fila:number, columna:number, tipoError:string = "Semantico"){
        this.tipoError = tipoError;
        this.descripcion = descripcion;
        this.fila = fila;
        console.log(descripcion + fila);
        this.columna = columna;
    }

    public toString():string{
        return "Error "+this.tipoError+this.descripcion+" en Fila:"+this.fila+", columna:"+this.columna;
    }

    public getFila():number{
        return this.fila;
    }

    public getColumna():number{
        return this.columna;
    }

    public getTipo():string{
        return this.tipoError;
    }

    public getDescripcion():string{
        return this.descripcion;
    }
}

export { NodoError }