import { Expresion } from "../../Expresion/Expresion";
import { Entorno } from "../../Entornos/Entorno";
import { ListType, ExpType } from "../../Entornos/NodoAST";
import { ErrorSimbolico } from "../../Estructuras/ErrorSimbolico";
import { NodoError } from "../../Estructuras/NodoError";
import { Simbolo } from "../../Entornos/Simbolo";
import { Type } from "../../Entornos/Tipo";



class Declaracion{
    id:string;
    valor:Expresion;
    tipo:Type;
    fila:number;
    columna:number;

    constructor(id:string, valor:Expresion, tipo:Type, fila:number, columna:number){
        this.id = id;
        this.valor = valor;
        this.tipo = tipo;
        this.fila =fila;
         this.columna = columna;
    }

    ejecutar(ent:Entorno, mensajes:ListType[]){
        let val = this.valor.getValor(ent, mensajes);
        if(val instanceof ErrorSimbolico){
            mensajes.push(new NodoError("Valor invalido en declaracion",this.fila,this.columna,"semantico"));
            return;
        }

        let s = new Simbolo(this.tipo,val,this.id);
        if(!ent.put(s)){
            mensajes.push(new NodoError("Ya existe la variable:"+this.id,this.fila, this.columna));
        }
    }
}

export { Declaracion }