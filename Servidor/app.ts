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

var primero:AST;
var segundo:AST;
var p = false;

app.post('/Analizar', function (data, status){
    var entrada = data.body.text;
    var resultado = parser(entrada);

    /*
    if(primero == null){
        primero = resultado;
    }else if(segundo == null){
        segundo = resultado;

        resultado.reporte = verificar();

        primero = null;
        segundo = null;
    }*/

    var json = JSON.stringify(resultado,null,2);

    console.log(json);
    json = json.split('lexema').join('text').split('lista').join('children').split('lista').join('children');
    console.log(json);
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

function verificar():Copia{

    return null;
}