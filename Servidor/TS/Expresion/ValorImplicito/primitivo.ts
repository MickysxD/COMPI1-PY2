import { Expresion } from "../Expresion";
import { Type, TypeEnum } from "../../Entornos/Tipo";
import { ExpType } from "../../Entornos/NodoAST";
import { Integer } from "../../Estructuras/Integer";
import { Double } from "../../Estructuras/Double";
import { Entorno } from "../../Entornos/Entorno";
import { ListType } from "../../Entornos/NodoAST";


class Primitivo implements Expresion{
    private valor:string;
    private tipo:Type;

    constructor(valor:string, tipo:Type){
        this.valor = valor;
        this.tipo = tipo;
    }

    getValor(ent:Entorno, mensajes:ListType[]):ExpType{
        if(this.tipo.getPrimitiveType() == TypeEnum.INTEGER){
            return new Integer(parseInt(this.valor));
        }else if(this.tipo.getPrimitiveType() == TypeEnum.DOUBLE){
            return new Double(parseFloat(this.valor));
        }else if(this.tipo.getPrimitiveType() == TypeEnum.STRING){
            return new String(this.valor.slice(1, -1));
        }/*else if(this.tipo.getType() == TypeEnum.CHAR){
            return new Char(this.valor.slice(1, -1));
        }*/
        
        return null;
    }

}

export { Primitivo }