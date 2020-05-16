"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import * as express from "express";
//import * as cors from "cors";
var bodyParser = __importStar(require("body-parser"));
var analizador = __importStar(require("../analizador"));
//import {AST} from "../TS/Entornos/AST";
//import { Instruccion } from "../TS/Instruccion/Instruccion";
//import { Asignacion } from "../TS/Instruccion/CambioValor/Asignacion";
//import { NodoAST } from "../TS/Entornos/NodoAST";
var express = require('express');
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/Analizar', function (data, status) {
    var entrada = data.body.text;
    var resultado = parser(entrada);
    //var res:NodoAST[] = resultado.instrucciones;
    //console.log(res.length)
    for (var _i = 0, _a = resultado.instrucciones; _i < _a.length; _i++) {
        var x = _a[_i];
        console.log(x);
        //status.send(x);
    }
    status.send(resultado);
});
var server = app.listen(8080, function () {
    console.log('Servidor 8080 listo...');
});
function parser(texto) {
    try {
        return analizador.parse(texto);
    }
    catch (e) {
        return "Error en el analizador servidor 80 80: " + e.toString();
    }
}
