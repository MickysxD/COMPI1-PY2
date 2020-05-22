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
var AST_1 = require("./TS/AST");
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
    if (resultado instanceof AST_1.AST && (primero == null || primero == undefined)) {
        primero = resultado;
        resultado.reporte = [];
    }
    else if (resultado instanceof AST_1.AST && (segundo == null || segundo == undefined)) {
        segundo = resultado;
        resultado.reporte = verificar();
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
    verificarCopia(lista);
    return lista;
}
function verificarCopia(lista) {
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
                                                            cantidad++;
                                                            var p1 = true;
                                                            var p2 = true;
                                                            for (var _m = 0, _o = aaa.lista; _m < _o.length; _m++) {
                                                                var aaaa = _o[_m];
                                                                if (aaaa.lexema == "Parametros") {
                                                                    p1 = false;
                                                                    for (var _p = 0, _q = bbb.lista; _p < _q.length; _p++) {
                                                                        var bbbb = _q[_p];
                                                                        if (bbbb.lexema == "Parametros") {
                                                                            p2 = false;
                                                                            var j = 0;
                                                                            var listado = "";
                                                                            if (aaaa.lista.length == bbbb.lista.length) {
                                                                                for (var i = 0; i < aaaa.lista.length; i++) {
                                                                                    if (aaaa.lista[i].lexema == bbbb.lista[i].lexema && aaaa.lista[i].lista[0].lexema == bbbb.lista[i].lista[0].lexema) {
                                                                                        j++;
                                                                                        listado = "[" + aaaa.lista[i].lexema + "-" + aaaa.lista[i].lista[0].lexema + "]";
                                                                                    }
                                                                                }
                                                                            }
                                                                            if (j == aaaa.lista.length) {
                                                                                lista.push(new Copia_1.Copia("Funcion/Metodo", "CLASE: " + a.lista[0].lexema + "\nNOMBRE: " + bbb.lista[1].lexema + "\nTIPO: " + bbb.lista[0].lexema + "\nPARAMETROS: " + listado));
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                else if (aaaa.lexema == "Sentencias") {
                                                                    for (var _r = 0, _s = bbb.lista; _r < _s.length; _r++) {
                                                                        var bbbb = _s[_r];
                                                                        if (bbbb.lexema == "Sentencias") {
                                                                            for (var _t = 0, _u = aaaa.lista; _t < _u.length; _t++) {
                                                                                var aaaaa = _u[_t];
                                                                                if (aaaaa.lexema == "Declaracion") {
                                                                                    for (var _v = 0, _w = aaaaa.lista[0].lista; _v < _w.length; _v++) {
                                                                                        var aaaaaa = _w[_v];
                                                                                        for (var _x = 0, _y = bbbb.lista; _x < _y.length; _x++) {
                                                                                            var bbbbb = _y[_x];
                                                                                            if (bbbbb.lexema == "Declaracion") {
                                                                                                for (var _z = 0, _0 = bbbbb.lista[0].lista; _z < _0.length; _z++) {
                                                                                                    var bbbbbb = _0[_z];
                                                                                                    if (bbbbbb.lexema == aaaaaa.lexema && bbbbb.lista[0].lexema == aaaaa.lista[0].lexema) {
                                                                                                        lista.push(new Copia_1.Copia("Variable", "CLASE: " + a.lista[0].lexema + "\nNOMBRE F/M: " + bbb.lista[1].lexema + "\nTIPO: " + bbbbb.lista[0].lexema + "\nVARIABLE: " + bbbbbb.lexema));
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
                                                            if (p1 && p2) {
                                                                lista.push(new Copia_1.Copia("Funcion/Metodo", "CLASE: " + a.lista[0].lexema + "\nNOMBRE: " + bbb.lista[1].lexema + "\nTIPO: " + bbb.lista[0].lexema + "\nPARAMETROS: ninguno"));
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
            if (ca == cb && ca == cantidad && ag) {
                descri += temp + "      \nCANTIDAD M/F: " + ca;
                lista.push(new Copia_1.Copia("Clase", descri));
            }
        }
    }
}
