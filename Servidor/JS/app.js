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
var Copia_1 = require("./TS/Copia");
var express = require('express');
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
var primero = null;
var segundo = null;
var p = false;
app.post('/Analizar', function (data, status) {
    var entrada = data.body.text;
    var resultado = parser(entrada);
    if (primero == null || primero == undefined) {
        console.log("PRIMERO");
        primero = resultado;
        resultado.reporte = [];
    }
    else if (segundo == null || segundo == undefined) {
        console.log("SEGUNDO");
        segundo = resultado;
        resultado.reporte = verificar();
        var json1 = JSON.stringify(primero, null, 2);
        var json2 = JSON.stringify(segundo, null, 2);
        console.log("PRIMERO" + json1);
        console.log("SEGUNDO" + json2);
        primero = null;
        segundo = null;
    }
    var json = JSON.stringify(resultado, null, 2);
    //console.log(json);
    json = json.split('lexema').join('text').split('lista').join('children').split('lista').join('children');
    //console.log(json);
    status.send(json);
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
function verificar() {
    var lista = [];
    verificarClases(lista);
    verificarFuncion(lista);
    verificarVariables(lista);
    return lista;
}
function verificarClases(lista) {
    var descri = "";
    for (var _i = 0, _a = segundo.lista; _i < _a.length; _i++) {
        var a = _a[_i];
        if (a.lexema == "Clase") {
            var cantidad = 0;
            var temp = "";
            var ca = 0;
            var cb = 0;
            var ag = false;
            for (var _b = 0, _c = primero.lista; _b < _c.length; _b++) {
                var b = _c[_b];
                if (b.lexema == "Clase") {
                    if (a.lista[0].lexema == b.lista[0].lexema) {
                        temp += "CLASE: " + a.lista[0].lexema;
                        for (var _d = 0, _e = a.lista; _d < _e.length; _d++) {
                            var aa = _e[_d];
                            if (aa.lexema == "Sentencias") {
                                for (var _f = 0, _g = aa.lista; _f < _g.length; _f++) {
                                    var aaa = _g[_f];
                                    if (aaa.lexema == "Funcion" || aaa.lexema == "Metodo" || aaa.lexema == "Main") {
                                        ca++;
                                        for (var _h = 0, _j = b.lista; _h < _j.length; _h++) {
                                            var bb = _j[_h];
                                            if (bb.lexema == "Sentencias") {
                                                cb = 0;
                                                for (var _k = 0, _l = bb.lista; _k < _l.length; _k++) {
                                                    var bbb = _l[_k];
                                                    if (bbb.lexema == "Funcion" || bbb.lexema == "Metodo" || aaa.lexema == "Main") {
                                                        cb++;
                                                        if (bbb.lista[0].lexema == aaa.lista[0].lexema && bbb.lista[1].lexema == aaa.lista[1].lexema) {
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
            if (ca == cb && ca == cantidad && ag) {
                descri += temp + "      \nCANTIDAD M/F: " + ca;
                lista.push(new Copia_1.Copia("Clase", descri));
            }
        }
    }
}
function verificarFuncion(lista) {
}
function verificarVariables(lista) {
}
