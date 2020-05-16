import { NodoAST, ListType } from "../Entornos/NodoAST";
import { Entorno } from "../Entornos/Entorno";


interface Instruccion extends NodoAST{
    ejecutar(/*ent:Entorno,mensajes:ListType[]*/):any;
}

export {Instruccion}