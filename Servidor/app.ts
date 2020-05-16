//import * as express from "express";
//import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as analizador from "../analizador";
//import {AST} from "../TS/Entornos/AST";
//import { Instruccion } from "../TS/Instruccion/Instruccion";
//import { Asignacion } from "../TS/Instruccion/CambioValor/Asignacion";
//import { NodoAST } from "../TS/Entornos/NodoAST";

var express = require('express');
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }));



app.post('/Analizar', function (data, status){
    var entrada = data.body.text;
    var resultado = parser(entrada);
    //var res:NodoAST[] = resultado.instrucciones;
    //console.log(res.length)
    for(let x of resultado.instrucciones){
        console.log(x);
        //status.send(x);
    }
    status.send(resultado);
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
