
console.log("ptos")

const parser = require("./Analisis/gramatica").parser;

let entrada = "jeje";
let response = parser.parse(entrada);
let respo = response.recorrer();
console.log(respo);
