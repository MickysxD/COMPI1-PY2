import { Expresion } from "../Expresion";
import { ExpType, ListType } from "../../Entornos/NodoAST";
import { ErrorSimbolico } from "../../Estructuras/ErrorSimbolico";
import { Integer } from "../../Estructuras/Integer";
import { Double } from "../../Estructuras/Double";
import { NodoError } from "../../Estructuras/NodoError";
import { Entorno } from "../../Entornos/Entorno"

enum TipoAritmetico{
    SUMA,RESTA,MULTIPLICACION,DIVISION,ELEVACION,MOD    
}

class Aritmetico implements Expresion{
    opIzq?:Expresion;
    opDer:Expresion;
    unario:boolean;
    tipoOperacion?:TipoAritmetico;
    fila:number;
    columna:number;
    

    constructor(opDer:Expresion, fila:number, columna:number, opIzq?:Expresion, operacion?:TipoAritmetico,){
        this.opIzq = opIzq;
        this.opDer = opDer;
        this.tipoOperacion = operacion;
        this.fila = fila;
        this.columna = columna;
    }

    getValor(entorno:Entorno, mensajes:ListType[]):ExpType{
        let valIzq = this.opIzq.getValor(entorno, mensajes);
        if(valIzq instanceof ErrorSimbolico){
            return valIzq;
        }
        let valDer = this.opDer.getValor(entorno, mensajes);
        if(valDer instanceof ErrorSimbolico){
            return valDer;
        }

        if(this.unario){
            if(valDer instanceof Integer || valDer instanceof Double){
                return valDer.getValor()*-1;
            }else{
                mensajes.push(new NodoError("Error de tipo con->"+valDer, this.fila, this.columna));
                return new ErrorSimbolico();
            }
        }else{
            if(this.tipoOperacion == TipoAritmetico.SUMA){
                if(valIzq instanceof Integer && valDer instanceof Integer){
                    return new Integer(valIzq.getValor()+valDer.getValor());
                }else if((valIzq instanceof Integer || valIzq instanceof Double) && (valDer instanceof Integer || valDer instanceof Double)){
                    return new Double(valIzq.getValor()+valDer.getValor());
                }else{
                    if(valIzq == null || valDer == null){
                        mensajes.push(new NodoError("No es posible sumar null"+valDer, this.fila, this.columna));
                        return new ErrorSimbolico();
                    }else{
                        return valIzq.toString()+valDer.toString();
                    }
                }
            }else if(this.tipoOperacion == TipoAritmetico.RESTA){
                if(valIzq instanceof Integer && valDer instanceof Integer){
                    return new Integer(valIzq.getValor()-valDer.getValor());
                }else if((valIzq instanceof Integer || valIzq instanceof Double) && (valDer instanceof Integer || valDer instanceof Double)){
                    return new Double(valIzq.getValor()-valDer.getValor());
                }else{
                    mensajes.push(new NodoError("Operacion resta no soportada "+valDer, this.fila, this.columna))
                    return new ErrorSimbolico()
                }
            }else if(this.tipoOperacion == TipoAritmetico.MULTIPLICACION){
                if(valIzq instanceof Integer && valDer instanceof Integer){
                    return new Integer(valIzq.getValor()*valDer.getValor());
                }else if((valIzq instanceof Integer || valIzq instanceof Double) && (valDer instanceof Integer || valDer instanceof Double)){
                    return new Double(valIzq.getValor()*valDer.getValor());
                }else{
                    mensajes.push(new NodoError("Operacion multiplicacion no soportada "+valDer, this.fila, this.columna))
                    return new ErrorSimbolico()
                }
            }else if(this.tipoOperacion == TipoAritmetico.DIVISION){
                if((valIzq instanceof Integer || valIzq instanceof Double) && (valDer instanceof Integer || valDer instanceof Double)){
                    if(valDer.getValor() != 0){
                        return new Double(valIzq.getValor()/valDer.getValor());
                    }else{
                        mensajes.push(new NodoError("Operacion division entre 0 no soportada ", this.fila, this.columna))
                        return new ErrorSimbolico()
                    }
                }else{
                    mensajes.push(new NodoError("Operacion division no soportada "+valDer, this.fila, this.columna))
                    return new ErrorSimbolico()
                }
            }else if(this.tipoOperacion == TipoAritmetico.ELEVACION){
                if(valIzq instanceof Integer && valDer instanceof Integer){
                    return new Integer(valIzq.getValor()^valDer.getValor());
                }else if((valIzq instanceof Integer || valIzq instanceof Double) && (valDer instanceof Integer || valDer instanceof Double)){
                    return new Double(valIzq.getValor()^valDer.getValor());
                }else{
                    mensajes.push(new NodoError("Operacion elevacion no soportada "+valDer, this.fila, this.columna))
                    return new ErrorSimbolico()
                }
            }else if(this.tipoOperacion == TipoAritmetico.MOD){
                if(valIzq instanceof Integer && valDer instanceof Integer){
                    return new Integer(valIzq.getValor()%valDer.getValor());
                }else if((valIzq instanceof Integer || valIzq instanceof Double) && (valDer instanceof Integer || valDer instanceof Double)){
                    return new Double(valIzq.getValor()%valDer.getValor());
                }else{
                    mensajes.push(new NodoError("Operacion mod no soportada "+valDer, this.fila, this.columna))
                    return new ErrorSimbolico()
                }
            }else{
                mensajes.push(new NodoError("La operacion no exites", this.fila, this.columna))
                return new ErrorSimbolico()
            }
        }
    }
}

export {Aritmetico, TipoAritmetico}