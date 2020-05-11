import { Type } from "./Tipo";


class Simbolo{
    private readonly type:Type;
    private readonly id:string;
    private value:any;

    constructor(type:Type, value:any, id:string){
        this.type = type;
        this.value = value;
        this.id = id;
    }

    public getType():Type{
        return this.type
    }

    public getId():string{
        return this.id
    }

    public getValue():any{
        return this.value;
    }

    public setValue(value:any){
        this.value = value;
    }

}

export { Simbolo }