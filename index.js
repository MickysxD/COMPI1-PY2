
console.log("ptos")

const parser = require("./analizador").parser;

let entrada = "for  \n%";
let response = parser.parse(entrada);
//let respo = response.recorrer();
console.log(response);
