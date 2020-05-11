"use strict";
console.log("ptos");
var parser = require("./Analisis/gramatica").parser;
var entrada = "jeje";
var response = parser.parse(entrada);
var respo = response.recorrer();
console.log(respo);
