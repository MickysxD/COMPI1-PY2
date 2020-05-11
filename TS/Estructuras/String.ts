class String{
    private valor:string;

    constructor(valor:string){
        this.valor = valor;
    }

    public getValor():string{
        return this.valor;
    }

    public toString():string{
        return this.valor.toString();
    }
}

export {String}