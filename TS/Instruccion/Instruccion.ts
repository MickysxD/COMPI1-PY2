import { NodoAST, ListType } from "../Entornos/NodoAST";
import { Entorno } from "../Entornos/Entorno";


interface Instruccion extends NodoAST{
    ejecutar(ent:Entorno,mesajes:ListType[]):any;
}

export {Instruccion}