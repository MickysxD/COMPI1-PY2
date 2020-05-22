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

    if(resultado instanceof AST && (primero == null || primero == undefined)){
        primero = resultado;
        resultado.reporte = [];
    }else if(resultado instanceof AST && (segundo == null || segundo == undefined)){
        segundo = resultado;

        resultado.reporte = verificar();

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
    
    verificarCopia(lista);

    return lista;
}

function verificarCopia(lista:Copia[]){
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
                                                            cantidad++;
                                                            var p1 = true;
                                                            var p2 = true

                                                            for(let aaaa of aaa.lista){
                                                                if(aaaa.lexema == "Parametros"){
                                                                    p1 = false
                                                                    for(let bbbb of bbb.lista){
                                                                        if(bbbb.lexema == "Parametros"){
                                                                            p2 = false;
                                                                            let j = 0;
                                                                            let listado="";
                                                                            if(aaaa.lista.length == bbbb.lista.length){
                                                                                for(let i=0;i<aaaa.lista.length;i++){
                                                                                    if(aaaa.lista[i].lexema == bbbb.lista[i].lexema && aaaa.lista[i].lista[0].lexema == bbbb.lista[i].lista[0].lexema){
                                                                                        j++;
                                                                                        listado = "["+aaaa.lista[i].lexema+"-"+aaaa.lista[i].lista[0].lexema+"]";
                                                                                    }
                                                                                }
                                                                            }

                                                                            if(j == aaaa.lista.length){
                                                                                lista.push(new Copia("Funcion/Metodo", "CLASE: "+a.lista[0].lexema+"\nNOMBRE: "+bbb.lista[1].lexema+"\nTIPO: "+bbb.lista[0].lexema+"\nPARAMETROS: "+listado));
                                                                            }
                                                                        }
                                                                    }
                                                                }else if(aaaa.lexema == "Sentencias"){
                                                                    for(let bbbb of bbb.lista){
                                                                        if(bbbb.lexema == "Sentencias"){
                                                                            
                                                                            for(let aaaaa of aaaa.lista){
                                                                                if(aaaaa.lexema == "Declaracion"){
                                                                                    
                                                                                    for(let aaaaaa of aaaaa.lista[0].lista){
                                                                                        for(let bbbbb of bbbb.lista){
                                                                                            if(bbbbb.lexema == "Declaracion"){
                                                                                                
                                                                                                for(let bbbbbb of bbbbb.lista[0].lista){
                                                                                                    
                                                                                                    if(bbbbbb.lexema == aaaaaa.lexema && bbbbb.lista[0].lexema == aaaaa.lista[0].lexema){
                                                                                                        lista.push(new Copia("Variable", "CLASE: "+a.lista[0].lexema+"\nNOMBRE F/M: "+bbb.lista[1].lexema+"\nTIPO: "+bbbbb.lista[0].lexema+"\nVARIABLE: "+bbbbbb.lexema));
                                                                                                    }
                                                                     
                                                                                                }

                                                                                            }
                                                                                        }

                                                                                    }

                                                                                }
                                                                            }

                                                                        }
                                                                    }
                                                                }
                                                            }

                                                            if(p1 && p2){
                                                                lista.push(new Copia("Funcion/Metodo", "CLASE: "+a.lista[0].lexema+"\nNOMBRE: "+bbb.lista[1].lexema+"\nTIPO: "+bbb.lista[0].lexema+"\nPARAMETROS: ninguno"));
                                                            }
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
