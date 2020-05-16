

class Double{
    private valor:number;

    constructor(valor:number){
        this.valor = valor;
    }

    public getValor():number{
        return this.valor;
    }

    public toString():string{
        return this.valor.toString();
    }
}

export {Double}