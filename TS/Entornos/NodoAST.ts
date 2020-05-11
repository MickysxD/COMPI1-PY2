import { NodoError } from "../Estructuras/NodoError";
import { ErrorSimbolico } from "../Estructuras/ErrorSimbolico";
import { Integer } from "../Estructuras/Integer";
import { Double } from "../Estructuras/Double";
//import { Boolean } from "../Estructuras/Boolean";
//import { String } from "../Estructuras/String";
//import { Char } from "../Estructuras/Char";


type ExpType = Integer | Double | string /*| Boolean /*| Char*/ | null | number | ErrorSimbolico;
type ListType = NodoError | ExpType;

interface NodoAST{
}

export {NodoAST, ExpType, ListType}