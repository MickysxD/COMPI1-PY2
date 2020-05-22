//import * as express from "express";
//import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as analizador from "../analizador";
import { AST } from "./TS/AST";
import { Copia } from "./TS/Copia";

var express = require('express');
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }));

var primero:AST = null;
var segundo:AST = null;
var p = false;

app.post('/Analizar', function (data, status){
    var entrada = data.body.text;
    var resultado = parser(entrada);

    if(primero == null || primero == undefined){
        console.log("PRIMERO");
        primero = resultado;
        resultado.reporte = [];
    }else if(segundo == null || segundo == undefined){
        console.log("SEGUNDO");
        segundo = resultado;

        resultado.reporte = verificar();

        var json1 = JSON.stringify(primero,null,2);
        var json2 = JSON.stringify(segundo,null,2);
        console.log("PRIMERO"+json1);
        console.log("SEGUNDO"+json2);

        primero = null;
        segundo = null;
    }

    var json = JSON.stringify(resultado,null,2);

    //console.log(json);
    json = json.split('lexema').join('text').split('lista').join('children').split('lista').join('children');
    //console.log(json);
    status.send(json);
});

var server = app.listen(8080, function(){
    console.log('Servidor 8080 listo...');
})

function parser(texto:string){
    try{
        return analizador.parse(texto);
    } catch(e){
        return "Error en el analizador servidor 80 80: "+e.toString();
    }
}

function verificar():Copia[]{
    var lista:Copia[] = [];
    
    verificarClases(lista);

    verificarFuncion(lista);

    verificarVariables(lista);

    return lista;
}

function verificarClases(lista:Copia[]){
    var descri = "";
    for(let a of segundo.lista){
        if(a.lexema == "Clase"){
            var cantidad = 0;
            var temp = "";
            var ca = 0;
            var cb = 0;
            var ag = false
            for(let b of primero.lista){
                if(b.lexema == "Clase"){
                    if(a.lista[0].lexema == b.lista[0].lexema){
                        temp += "CLASE: " + a.lista[0].lexema;

                        for(let aa of a.lista){
                            if(aa.lexema == "Sentencias"){
                                for(let aaa of aa.lista){
                                    if(aaa.lexema == "Funcion" || aaa.lexema == "Metodo" || aaa.lexema == "Main"){
                                        ca++;

                                        for(let bb of b.lista){
                                            if(bb.lexema == "Sentencias"){
                                                cb = 0;
                                                for(let bbb of bb.lista){
                                                    if(bbb.lexema == "Funcion" || bbb.lexema == "Metodo" || aaa.lexema == "Main"){
                                                        cb++;
                                                        if(bbb.lista[0].lexema == aaa.lista[0].lexema && bbb.lista[1].lexema == aaa.lista[1].lexema){
                                                            temp += bbb.lista[0].lexema + aaa.lista[0].lexema + bbb.lista[1].lexema + aaa.lista[1].lexema + "/";
                                                            cantidad++;
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                        ag = true;
                    }
                }

            }
            if(ca == cb && ca == cantidad && ag){
                descri += temp + "      \nCANTIDAD M/F: "+ca;
                lista.push(new Copia("Clase", descri));
            }
        }
    }

}


function verificarFuncion(lista:Copia[]){


}


function verificarVariables(lista:Copia[]){


}