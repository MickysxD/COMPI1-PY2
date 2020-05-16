interface Type{
    getPrimitiveType():TypeEnum;
}

enum TypeEnum{
    INTEGER,DOUBLE,STRING
}

class PrimitiveType implements Type{
    private type:TypeEnum;

    constructor(type:TypeEnum){
        this.type = type;
    }

    public getPrimitiveType():TypeEnum{
        return this.type;
    }
}

export {Type, TypeEnum, PrimitiveType}