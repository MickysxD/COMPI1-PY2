import { NodoAST, ExpType, ListType } from "../Entornos/NodoAST";
import { Entorno } from "../Entornos/Entorno";


interface Expresion extends NodoAST{
    getValor(ent:Entorno, mensaje:ListType[]):ExpType;
}

export {Expresion}