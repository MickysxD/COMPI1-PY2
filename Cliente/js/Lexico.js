"use strict";
var TokenLexico = /** @class */ (function () {
    function TokenLexico(id, tipo, idTipo, lexema, fila, columna) {
        this.id = id;
        this.tipo = tipo;
        this.idTipo = idTipo;
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
    }
    TokenLexico.prototype.to_string = function () {
        return "Id:" + this.id + " Tipo:" + this.tipo + " IDTipo:" + this.idTipo + " Lexema:" + this.lexema + " Fila:" + this.fila + " Columna:" + this.columna;
    };
    return TokenLexico;
}());
var ErrorLexico = /** @class */ (function () {
    function ErrorLexico(id, tipo, lexema, fila, columna) {
        this.id = id;
        this.tipo = tipo;
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
    }
    ErrorLexico.prototype.to_string = function () {
        return "Id:" + this.id + " Tipo:\"" + this.tipo + "\" Lexema:" + this.lexema + " Fila:" + this.fila + " Columna:" + this.columna;
    };
    return ErrorLexico;
}());
var indiceTK = 0;
var tabulador = 0;
var entro = false;
var tokens = [];
var errores = [];
var salida = document.getElementById('txtSalida');
var consola = document.getElementById("txtConsola");
var salidaj = document.getElementById("salidaJson");
var cadHTML = "";
var Lexico = /** @class */ (function () {
    function Lexico() {
    }
    Lexico.prototype.analisis = function (entrada) {
        var cadena = document.getElementById(entrada).value;
        if (cadena != null && cadena != "") {
            this.analisisTodo(cadena);
        }
    };
    //ya
    Lexico.prototype.analisisTodo = function (cadena) {
        //let cadena = (document.getElementById(entrada) as HTMLInputElement).value;salidaJson
        salida = document.getElementById('txtSalida');
        consola = document.getElementById("txtConsola");
        salidaj = document.getElementById("salidaJson");
        indiceTK = 0;
        tabulador = 0;
        tokens = [];
        errores = [];
        var posicion = 0;
        var idToken = 0;
        var idError = 0;
        var fila = 0;
        var columna = 0;
        var estado = 0;
        var lexema = "";
        while (posicion < cadena.length) {
            var caracter = cadena[posicion];
            switch (estado) {
                case 0:
                    if (caracter == "\n") {
                        estado = 0;
                        columna = 0;
                        fila++;
                        posicion++;
                    }
                    else if (caracter == "\t" || caracter == " ") {
                        estado = 0;
                        posicion++;
                    }
                    else if (caracter == "+") {
                        tokens.push(new TokenLexico(idToken, "Signo mas", 1, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "-") {
                        tokens.push(new TokenLexico(idToken, "Signo menos", 2, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "*") {
                        tokens.push(new TokenLexico(idToken, "Signo de multiplicacion", 4, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "<") {
                        lexema += caracter;
                        estado = 8;
                        posicion++;
                    }
                    else if (caracter == ">") {
                        lexema += caracter;
                        estado = 9;
                        posicion++;
                    }
                    else if (caracter == ";") {
                        tokens.push(new TokenLexico(idToken, "Punto y coma", 7, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == ":") {
                        tokens.push(new TokenLexico(idToken, "Doble punto", 8, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == ",") {
                        tokens.push(new TokenLexico(idToken, "Coma", 9, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "(") {
                        tokens.push(new TokenLexico(idToken, "Parentesis que habre", 10, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == ")") {
                        tokens.push(new TokenLexico(idToken, "Parentesis que cierra", 11, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "{") {
                        tokens.push(new TokenLexico(idToken, "Corchete que habre", 12, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "}") {
                        tokens.push(new TokenLexico(idToken, "Corchete que cierra", 13, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "!") {
                        lexema += caracter;
                        estado = 11;
                        posicion++;
                    }
                    else if (caracter == ".") {
                        tokens.push(new TokenLexico(idToken, "Punto", 19, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "/") {
                        estado = 1;
                        posicion++;
                    }
                    else if (caracter == "_" || this.tiene_minuscula(caracter) || this.tiene_miyuscula(caracter)) {
                        lexema += caracter;
                        estado = 5;
                        posicion++;
                    }
                    else if (caracter == "\"") {
                        estado = 6;
                        posicion++;
                    }
                    else if (caracter == "'") {
                        estado = 7;
                        posicion++;
                    }
                    else if (caracter == "=") {
                        lexema += caracter;
                        estado = 10;
                        posicion++;
                    }
                    else if (caracter == "&") {
                        lexema += caracter;
                        estado = 12;
                        posicion++;
                    }
                    else if (caracter == "|") {
                        lexema += caracter;
                        estado = 13;
                        posicion++;
                    }
                    else if (this.tiene_numero(caracter)) {
                        estado = 14;
                    }
                    else {
                        estado = 100;
                    }
                    break;
                case 1:
                    if (caracter == "/") {
                        estado = 2;
                        posicion++;
                    }
                    else if (caracter == "*") {
                        estado = 3;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "signo de division", 3, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;
                case 2:
                    if (caracter != "\n") {
                        lexema += caracter;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Comentario de linea", 15, lexema, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;
                case 3:
                    if (caracter != "*") {
                        lexema += caracter;
                        posicion++;
                    }
                    else {
                        estado = 4;
                        posicion++;
                    }
                    break;
                case 4:
                    if (caracter == "/") {
                        tokens.push(new TokenLexico(idToken, "Comentario multilinea", 16, lexema, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else {
                        estado = 3;
                        lexema += "*";
                        posicion++;
                    }
                    break;
                case 5:
                    if (caracter == "_" || this.tiene_minuscula(caracter) || this.tiene_miyuscula(caracter) || this.tiene_numero(caracter)) {
                        lexema += caracter;
                        estado = 5;
                        posicion++;
                    }
                    else {
                        if (this.es_reservada(lexema)) {
                            tokens.push(new TokenLexico(idToken, "Palabra reservada", 17, lexema, fila, columna));
                        }
                        else {
                            tokens.push(new TokenLexico(idToken, "Identificador", 18, lexema, fila, columna));
                        }
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                    }
                    break;
                case 6:
                    if (caracter != "\"") {
                        lexema += caracter;
                        estado = 6;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Cadena", 20, lexema, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;
                case 7:
                    if (caracter != "'") {
                        lexema += caracter;
                        estado = 7;
                        posicion++;
                    }
                    else {
                        if (lexema.length == 1) {
                            tokens.push(new TokenLexico(idToken, "Caracter", 21, lexema, fila, columna));
                            idToken++;
                        }
                        else {
                            var dp = lexema.split("<html");
                            if (dp.length < 1) {
                                errores.push(new ErrorLexico(idError, "No es caracter", lexema, fila, columna));
                                idError++;
                            }
                            else {
                                cadHTML = lexema;
                                tokens.push(new TokenLexico(idToken, "Cadena especial", 20, lexema, fila, columna));
                                idToken++;
                            }
                        }
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    break;
                case 8:
                    if (caracter == "=") {
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo menor o igual que", 22, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Signo menor que", 5, lexema, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                    }
                    break;
                case 9:
                    if (caracter == "=") {
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo mayor o igual que", 23, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Signo mayor que", 6, lexema, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                    }
                    break;
                case 10:
                    if (caracter == "=") {
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo igual igual", 25, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Signo igual", 24, lexema, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                    }
                    break;
                case 11:
                    if (caracter == "=") {
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo diferente de", 26, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Signo not", 14, lexema, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                    }
                    break;
                case 12:
                    if (caracter == "&") {
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo and", 27, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    else {
                        posicion--;
                        estado = 100;
                    }
                    break;
                case 13:
                    if (caracter == "|") {
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo or", 28, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    else {
                        posicion--;
                        estado = 100;
                    }
                    break;
                case 14:
                    if (this.tiene_numero(caracter)) {
                        estado = 14;
                        lexema += caracter;
                        posicion++;
                    }
                    else if (caracter == ".") {
                        estado = 15;
                        lexema += caracter;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Numero", 29, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                    }
                    break;
                case 15:
                    if (this.tiene_numero(caracter)) {
                        estado = 14;
                        lexema += caracter;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Numero", 29, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                    }
                    break;
                case 100:
                    errores.push(new ErrorLexico(idError, "No pertenece al lenguaje", caracter, fila, columna));
                    idError++;
                    estado = 0;
                    lexema = "";
                    columna++;
                    posicion++;
                    break;
            }
        }
        salida.value = "";
        consola.value = "";
        salidaj.value = "";
        consola.value += "                      Tokens\n";
        tokens.forEach(function (element) {
            consola.value += element.to_string() + "\n";
        });
        consola.value += "\n\n";
        if (errores.length > 0) {
            consola.value += "                      Errores\n";
            errores.forEach(function (element) {
                consola.value += element.to_string() + "\n";
            });
        }
        consola.value += "\n\n";
        this.analisis_sin();
        cadHTML = cadHTML.split("html>").join("html>\n");
        cadHTML = cadHTML.split("head>").join("head>\n");
        cadHTML = cadHTML.split("/title>").join("/title>\n");
        cadHTML = cadHTML.split("/head>").join("/head>\n");
        cadHTML = cadHTML.split("/h1>").join("/h1>\n");
        cadHTML = cadHTML.split("body>").join("body>\n");
        cadHTML = cadHTML.split("div>").join("div>\n");
        cadHTML = cadHTML.split("/p>").join("/p>\n");
        cadHTML = cadHTML.split("label>").join("label>\n");
        cadHTML = cadHTML.split("input>").join("input>\n");
        cadHTML = cadHTML.split("/button>").join("/button>\n");
        cadHTML = cadHTML.split("\">").join("\">\n");
        salidaj.value += "                  HTML\n" + cadHTML + "\n\n";
        salidaj.value += "                  JSON\n";
        salidaj.value += this.json();
        ;
    };
    Lexico.prototype.json = function () {
        var cd = cadHTML;
        cd = cd.split("<html>").join("\"HTML\":{");
        cd = cd.split("</html>").join("}");
        cd = cd.split("<head>").join("\"HEAD\":{");
        cd = cd.split("</head>").join("}");
        cd = cd.split("<title>").join("\"TITLE\":{\n\"TEXTO\":\"");
        cd = cd.split("</title>").join("\"\n}");
        cd = cd.split("<br>").join("/n\"BR\":{}/n");
        cd = cd.split("<p>").join("\"P\":{\n\"TEXTO\":\"");
        cd = cd.split("</p>").join("\"\n}");
        cd = cd.split("<h1>").join("\"H1\":{\n\"TEXTO\":\"");
        cd = cd.split("</h1>").join("\"\n}");
        cd = cd.split("<button>").join("\"BUTTON\":{\n\"TEXTO\":\"");
        cd = cd.split("</button>").join("\"\n}");
        cd = cd.split("<laber>").join("\"LABEL\":{\n\"TEXTO\":\"");
        cd = cd.split("</laber>").join("\"\n}");
        cd = cd.split("<input").join("\"IMPUT\":{}");
        cd = cd.split("<body>").join("\"BODY\":{");
        cd = cd.split("</body>").join("}");
        cd = cd.split("<body").join("\"BODY\":{\n\"STYLE\":");
        cd = cd.split("</body>").join("}");
        cd = cd.split("<div>").join("\"DIV\":{");
        cd = cd.split("</div>").join("}");
        cd = cd.split("<div").join("\"DIV\":{\n\"STYLE\":");
        cd = cd.split("</div>").join("}");
        cd = cd.split("style=").join("");
        cd = cd.split("\">").join("\",");
        return cd;
    };
    Lexico.prototype.analisis_sin = function () {
        var cd = "";
        try {
            while (indiceTK < tokens.length) {
                cd += this.comienzo() + "\n";
            }
            if (entro) {
                //salida.value = "";
            }
        }
        catch (error) {
            salida.value = "\n\nERROR FATAL\n";
        }
        salida.value += cd;
    };
    Lexico.prototype.recuperar = function () {
        while (indiceTK < tokens.length && tokens[indiceTK].lexema != ";" && tokens[indiceTK].lexema != "}") { //vas a reccorer la lista hasta encontrar un ;
            indiceTK++;
        }
        if (tokens[indiceTK].lexema == ";") {
            indiceTK++;
        }
    };
    Lexico.prototype.tabulacion = function () {
        var cd = "";
        for (var i = 0; i < tabulador; i++) {
            cd += "\t";
        }
        return cd;
    };
    Lexico.prototype.comienzo = function () {
        if (tokens[indiceTK].idTipo == 15 || tokens[indiceTK].idTipo == 16) { //comentario linea o multi
            return this.comentario();
        }
        else if (tokens[indiceTK].lexema == "Console") { //entra a imprimir
            return this.consoleWrite();
        }
        else if (tokens[indiceTK].lexema == "void") { //entra a void o main
            return this.metodo();
        }
        else if (this.tipo()) { //entra crear funcion o declaracion
            return this.dobleTipo();
        }
        else if (tokens[indiceTK].idTipo == 18) { //comentario linea o multi
            return this.tipoAsignacion();
        }
        else {
            this.errorSin();
            return "";
        }
    };
    Lexico.prototype.todoMetodos = function () {
        if (tokens[indiceTK].lexema == "Console") { //imprime
            return this.consoleWrite();
        }
        else if (tokens[indiceTK].lexema == "if") { //imprime
            return this.if();
        }
        else if (tokens[indiceTK].lexema == "do") { //imprime
            return this.do();
        }
        else if (tokens[indiceTK].lexema == "while") { //imprime
            return this.while();
        }
        else if (tokens[indiceTK].lexema == "for") { //imprime
            return this.for();
        }
        else if (tokens[indiceTK].lexema == "switch") { //imprime
            return this.switch();
        }
        else if (tokens[indiceTK].idTipo == 15 || tokens[indiceTK].idTipo == 16) {
            return this.comentario();
        }
        else if (tokens[indiceTK].idTipo == 18) {
            return this.tipoAsignacion();
        }
        else if (this.tipo()) {
            return this.tipoDeclaracion();
        }
        else {
            this.errorSin();
            return "";
        }
    };
    Lexico.prototype.todoFunciones = function () {
        if (tokens[indiceTK].lexema == "Console") { //imprime
            return this.consoleWrite();
        }
        else if (tokens[indiceTK].lexema == "if") { //imprime
            return this.if();
        }
        else if (tokens[indiceTK].lexema == "do") { //imprime
            return this.do();
        }
        else if (tokens[indiceTK].lexema == "while") { //imprime
            return this.while();
        }
        else if (tokens[indiceTK].lexema == "for") { //imprime
            return this.for();
        }
        else if (tokens[indiceTK].lexema == "switch") { //imprime
            return this.switch();
        }
        else if (tokens[indiceTK].lexema == "return") { //imprime
            return this.return();
        }
        else if (tokens[indiceTK].idTipo == 15 || tokens[indiceTK].idTipo == 16) {
            return this.comentario();
        }
        else if (tokens[indiceTK].idTipo == 18) {
            return this.tipoAsignacion();
        }
        else if (this.tipo()) {
            return this.tipoDeclaracion();
        }
        else {
            this.errorSin();
            return "";
        }
    };
    Lexico.prototype.todoIW = function () {
        if (tokens[indiceTK].lexema == "Console") { //imprime
            return this.consoleWrite();
        }
        else if (tokens[indiceTK].lexema == "if") { //imprime
            return this.if();
        }
        else if (tokens[indiceTK].lexema == "do") { //imprime
            return this.do();
        }
        else if (tokens[indiceTK].lexema == "while") { //imprime
            return this.while();
        }
        else if (tokens[indiceTK].lexema == "for") { //imprime
            return this.for();
        }
        else if (tokens[indiceTK].lexema == "switch") { //imprime
            return this.switch();
        }
        else if (tokens[indiceTK].lexema == "break") { //imprime
            return this.break();
        }
        else if (tokens[indiceTK].idTipo == 15 || tokens[indiceTK].idTipo == 16) {
            return this.comentario();
        }
        else if (tokens[indiceTK].idTipo == 18) {
            return this.tipoAsignacion();
        }
        else if (this.tipo()) {
            return this.tipoDeclaracion();
        }
        else {
            this.errorSin();
            return "";
        }
    };
    Lexico.prototype.todoFW = function () {
        if (tokens[indiceTK].lexema == "Console") { //imprime
            return this.consoleWrite();
        }
        else if (tokens[indiceTK].lexema == "if") { //imprime
            return this.if();
        }
        else if (tokens[indiceTK].lexema == "do") { //imprime
            return this.do();
        }
        else if (tokens[indiceTK].lexema == "while") { //imprime
            return this.while();
        }
        else if (tokens[indiceTK].lexema == "for") { //imprime
            return this.for();
        }
        else if (tokens[indiceTK].lexema == "switch") { //imprime
            return this.switch();
        }
        else if (tokens[indiceTK].lexema == "break") { //imprime
            return this.break();
        }
        else if (tokens[indiceTK].lexema == "continue") { //imprime
            return this.continue();
        }
        else if (tokens[indiceTK].idTipo == 15 || tokens[indiceTK].idTipo == 16) {
            return this.comentario();
        }
        else if (tokens[indiceTK].idTipo == 18) {
            return this.tipoAsignacion();
        }
        else if (this.tipo()) {
            return this.tipoDeclaracion();
        }
        else {
            this.errorSin();
            return "";
        }
    };
    Lexico.prototype.dobleTipo = function () {
        var cd = this.tabulacion();
        if (this.tipo()) {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        var idtemp = "";
        if (tokens[indiceTK].idTipo == 18) {
            idtemp = tokens[indiceTK].lexema;
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "(") {
            indiceTK++;
            cd += "def " + idtemp + "(";
            if (tokens[indiceTK].lexema != ")") {
                while (indiceTK < tokens.length && tokens[indiceTK].lexema != ")") {
                    if (this.tipo()) { //si es un int etc...
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                    if (tokens[indiceTK].idTipo == 18) { //si es id
                        cd += tokens[indiceTK].lexema;
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                    if (tokens[indiceTK].lexema == ",") { //si vienen mas con ,
                        cd += ", ";
                        indiceTK++;
                        if (tokens[indiceTK].lexema == ")") { //si entra lo siguiente no debe ser )
                            this.errorSin();
                            return "";
                        }
                    }
                    else if (tokens[indiceTK].lexema != ")") {
                        this.errorSin();
                        return "";
                    }
                }
            }
            if (tokens[indiceTK].lexema == ")") {
                cd += ")";
                indiceTK++;
            }
            else {
                this.errorSin();
                return "";
            }
            if (tokens[indiceTK].lexema == "{") {
                cd += ":\n";
                indiceTK++;
            }
            else {
                this.errorSin();
                return "";
            }
            tabulador++;
            while (indiceTK < tokens.length && tokens[indiceTK].lexema != "}") {
                cd += this.todoFunciones();
            }
            tabulador--;
            if (tokens[indiceTK].lexema == "}") {
                cd += "\n";
                indiceTK++;
            }
            else {
                this.errorSin();
                return "";
            }
        }
        else if (tokens[indiceTK].lexema == "," || tokens[indiceTK].lexema == ";") {
            cd += idtemp;
            if (tokens[indiceTK].lexema != ";") {
                while (indiceTK < tokens.length && tokens[indiceTK].lexema != ";") {
                    if (tokens[indiceTK].lexema == ",") {
                        cd += ", ";
                        indiceTK++;
                        if (tokens[indiceTK].idTipo == 18) {
                            cd += tokens[indiceTK].lexema;
                            indiceTK++;
                        }
                        else {
                            this.errorSin();
                            return "";
                        }
                        if (tokens[indiceTK].lexema == "=") {
                            cd += " = ";
                            indiceTK++;
                            if (tokens[indiceTK].idTipo == 18 || tokens[indiceTK].idTipo == 20 ||
                                tokens[indiceTK].idTipo == 21 || tokens[indiceTK].idTipo == 29 ||
                                tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false") {
                                cd += tokens[indiceTK].lexema;
                                indiceTK++;
                            }
                            else {
                                this.errorSin();
                                return "";
                            }
                            if (tokens[indiceTK].lexema != ";") {
                                this.errorSin();
                                return "";
                            }
                        }
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                }
            }
            if (tokens[indiceTK].lexema == ";") {
                cd += ";";
                indiceTK++;
            }
            else {
                this.errorSin();
                return "";
            }
        }
        else {
            this.errorSin();
            return "";
        }
        return cd;
    };
    Lexico.prototype.tipoDeclaracion = function () {
        var cd = this.tabulacion();
        if (this.tipo()) {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].idTipo == 18) {
            cd += tokens[indiceTK].lexema;
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema != ";") {
            while (indiceTK < tokens.length && tokens[indiceTK].lexema != ";") {
                if (tokens[indiceTK].lexema == "=") {
                    cd += " = ";
                    indiceTK++;
                    while (indiceTK < tokens.length && tokens[indiceTK].lexema != ";") {
                        if (tokens[indiceTK].idTipo == 18 || tokens[indiceTK].idTipo == 20 ||
                            tokens[indiceTK].idTipo == 21 || tokens[indiceTK].idTipo == 29 ||
                            tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false") {
                            cd += tokens[indiceTK].lexema;
                            indiceTK++;
                            if (tokens[indiceTK].idTipo == 1 || tokens[indiceTK].idTipo == 2 ||
                                tokens[indiceTK].idTipo == 3 || tokens[indiceTK].idTipo == 4) {
                                cd += tokens[indiceTK].lexema;
                                indiceTK++;
                                if (tokens[indiceTK].lexema == ";") {
                                    this.errorSin();
                                    return "";
                                }
                            }
                            else if (tokens[indiceTK].lexema != ";") {
                                this.errorSin();
                                return "";
                            }
                        }
                        else {
                            this.errorSin();
                            return "";
                        }
                    }
                }
                else if (tokens[indiceTK].lexema == ",") {
                    cd += ", ";
                    indiceTK++;
                    if (tokens[indiceTK].idTipo == 18) {
                        cd += tokens[indiceTK].lexema;
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                    if (tokens[indiceTK].lexema == ";") {
                        this.errorSin();
                        return "";
                    }
                }
                else {
                    this.errorSin();
                    return "";
                }
            }
        }
        if (tokens[indiceTK].lexema == ";") {
            cd += "\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        return cd;
    };
    Lexico.prototype.tipoAsignacion = function () {
        var cd = this.tabulacion();
        if (tokens[indiceTK].idTipo == 18) {
            cd += tokens[indiceTK].lexema;
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "=") {
            cd += tokens[indiceTK].lexema;
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema != ";") {
            while (indiceTK < tokens.length && tokens[indiceTK].lexema != ";") {
                if (tokens[indiceTK].idTipo == 18 || tokens[indiceTK].idTipo == 20 ||
                    tokens[indiceTK].idTipo == 21 || tokens[indiceTK].idTipo == 29 ||
                    tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false") {
                    cd += tokens[indiceTK].lexema;
                    indiceTK++;
                    if (tokens[indiceTK].idTipo == 1 || tokens[indiceTK].idTipo == 2 ||
                        tokens[indiceTK].idTipo == 3 || tokens[indiceTK].idTipo == 4) {
                        cd += tokens[indiceTK].lexema;
                        indiceTK++;
                        if (tokens[indiceTK].lexema == ";") {
                            this.errorSin();
                            return "";
                        }
                    }
                    else if (tokens[indiceTK].lexema != ";") {
                        this.errorSin();
                        return "";
                    }
                }
                else {
                    this.errorSin();
                    return "";
                }
            }
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ";") {
            cd += "\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        return cd;
    };
    Lexico.prototype.metodo = function () {
        var cd = this.tabulacion();
        if (tokens[indiceTK].lexema == "void") {
            cd += "def ";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        var main = false;
        if (tokens[indiceTK].lexema == "main") {
            cd += "main";
            main = true;
            indiceTK++;
        }
        else if (tokens[indiceTK].idTipo == 18) {
            cd += tokens[indiceTK].lexema;
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "(") {
            cd += "(";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (!main) {
            if (tokens[indiceTK].lexema != ")") {
                while (indiceTK < tokens.length && tokens[indiceTK].lexema != ")") {
                    if (this.tipo()) { //si es un int etc...
                        //cd += "var";
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                    if (tokens[indiceTK].idTipo == 18) { //si es id
                        cd += tokens[indiceTK].lexema;
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                    if (tokens[indiceTK].lexema == ",") { //si vienen mas con ,
                        cd += ", ";
                        indiceTK++;
                        if (tokens[indiceTK].lexema == ")") { //si entra lo siguiente no debe ser )
                            this.errorSin();
                            return "";
                        }
                    }
                    else if (tokens[indiceTK].lexema != ")") {
                        this.errorSin();
                        return "";
                    }
                }
            }
        }
        if (tokens[indiceTK].lexema == ")") {
            cd += ")";
            indiceTK++;
        }
        else {
            this.errorSin();
            tabulador--;
            return "";
        }
        if (tokens[indiceTK].lexema == "{") {
            cd += ":\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        tabulador++;
        while (indiceTK < tokens.length && tokens[indiceTK].lexema != "}") {
            cd += this.todoMetodos();
        }
        tabulador--;
        if (tokens[indiceTK].lexema == "}") {
            cd += "\n";
            if (main) {
                cd += this.tabulacion();
                cd += "if __name__=\"__main__\":\n";
                tabulador++;
                cd += this.tabulacion();
                tabulador--;
                cd += "main()\n";
            }
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        return cd;
    };
    Lexico.prototype.sentencias = function () {
        if (tokens[indiceTK].lexema == "if") {
            return this.if();
        }
        else if (tokens[indiceTK].lexema == "for") {
            return this.for();
        }
        else if (tokens[indiceTK].lexema == "do") {
            return this.do();
        }
        else if (tokens[indiceTK].lexema == "while") {
            return this.while();
        }
        else if (tokens[indiceTK].lexema == "switch") {
            return "";
        }
        else if (tokens[indiceTK].lexema == "Console") {
            return this.consoleWrite();
        }
        else {
            this.errorSin();
            return "";
        }
    };
    Lexico.prototype.if = function () {
        var cd = this.tabulacion();
        if (tokens[indiceTK].lexema == "if") {
            cd += "if ";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "(") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema != ")") {
            while (indiceTK < tokens.length && tokens[indiceTK].lexema != ")") {
                if (tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false" ||
                    tokens[indiceTK].idTipo == 18) {
                    cd += tokens[indiceTK].lexema + " ";
                    indiceTK++;
                    if (tokens[indiceTK].idTipo == 5 || tokens[indiceTK].idTipo == 6 ||
                        tokens[indiceTK].idTipo == 22 || tokens[indiceTK].idTipo == 23 ||
                        tokens[indiceTK].idTipo == 25 || tokens[indiceTK].idTipo == 26) {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                        if (tokens[indiceTK].idTipo == 18 || tokens[indiceTK].idTipo == 29 ||
                            tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false") {
                            cd += tokens[indiceTK].lexema + " ";
                            indiceTK++;
                        }
                        else if (tokens[indiceTK].idTipo == 20) {
                            cd += "\"" + tokens[indiceTK].lexema + "\" ";
                            indiceTK++;
                        }
                        else if (tokens[indiceTK].idTipo == 21) {
                            cd += "'" + tokens[indiceTK].lexema + "' ";
                            indiceTK++;
                        }
                        else {
                            this.errorSin();
                            return "";
                        }
                    }
                }
                else {
                    if (tokens[indiceTK].idTipo == 29) {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 20) {
                        cd += "\"" + tokens[indiceTK].lexema + "\" ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 21) {
                        cd += "\"" + tokens[indiceTK].lexema + "\" ";
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                    if (tokens[indiceTK].idTipo == 5 || tokens[indiceTK].idTipo == 6 ||
                        tokens[indiceTK].idTipo == 22 || tokens[indiceTK].idTipo == 23 ||
                        tokens[indiceTK].idTipo == 25 || tokens[indiceTK].idTipo == 26) {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                    if (tokens[indiceTK].idTipo == 18 || tokens[indiceTK].idTipo == 29 ||
                        tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false") {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 20) {
                        cd += "\"" + tokens[indiceTK].lexema + "\" ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 21) {
                        cd += "'" + tokens[indiceTK].lexema + "' ";
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                }
                if (tokens[indiceTK].lexema == "||" || tokens[indiceTK].lexema == "&&") {
                    cd += tokens[indiceTK].lexema + " ";
                    indiceTK++;
                }
                else if (tokens[indiceTK].lexema != ")") {
                    this.errorSin();
                    return "";
                }
            }
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ")") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "{") {
            cd += ":\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        tabulador++;
        while (indiceTK < tokens.length && tokens[indiceTK].lexema != "}") {
            cd += this.todoIW();
        }
        tabulador--;
        if (tokens[indiceTK].lexema == "}") {
            cd += "\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "else") {
            indiceTK++;
            if (tokens[indiceTK].lexema == "if") {
                cd += this.elseif();
            }
            else {
                if (tokens[indiceTK].lexema == "{") {
                    cd += this.tabulacion() + "else:\n";
                    indiceTK++;
                }
                else {
                    this.errorSin();
                    return "";
                }
                tabulador++;
                while (indiceTK < tokens.length && tokens[indiceTK].lexema != "}") {
                    cd += this.todoIW();
                }
                tabulador--;
                if (tokens[indiceTK].lexema == "}") {
                    cd += "\n";
                    indiceTK++;
                }
                else {
                    this.errorSin();
                    return "";
                }
            }
        }
        return cd;
    };
    Lexico.prototype.elseif = function () {
        var cd = this.tabulacion();
        if (tokens[indiceTK].lexema == "if") {
            cd += "elif ";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "(") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema != ")") {
            while (indiceTK < tokens.length && tokens[indiceTK].lexema != ")") {
                if (tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false" ||
                    tokens[indiceTK].idTipo == 18) {
                    cd += tokens[indiceTK].lexema + " ";
                    indiceTK++;
                    if (tokens[indiceTK].idTipo == 5 || tokens[indiceTK].idTipo == 6 ||
                        tokens[indiceTK].idTipo == 22 || tokens[indiceTK].idTipo == 23 ||
                        tokens[indiceTK].idTipo == 25 || tokens[indiceTK].idTipo == 26) {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                        if (tokens[indiceTK].idTipo == 18 || tokens[indiceTK].idTipo == 29 ||
                            tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false") {
                            cd += tokens[indiceTK].lexema + " ";
                            indiceTK++;
                        }
                        else if (tokens[indiceTK].idTipo == 20) {
                            cd += "\"" + tokens[indiceTK].lexema + "\" ";
                            indiceTK++;
                        }
                        else if (tokens[indiceTK].idTipo == 21) {
                            cd += "'" + tokens[indiceTK].lexema + "' ";
                            indiceTK++;
                        }
                        else {
                            this.errorSin();
                            return "";
                        }
                    }
                }
                else {
                    if (tokens[indiceTK].idTipo == 29) {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 20) {
                        cd += "\"" + tokens[indiceTK].lexema + "\" ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 21) {
                        cd += "\"" + tokens[indiceTK].lexema + "\" ";
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                    if (tokens[indiceTK].idTipo == 5 || tokens[indiceTK].idTipo == 6 ||
                        tokens[indiceTK].idTipo == 22 || tokens[indiceTK].idTipo == 23 ||
                        tokens[indiceTK].idTipo == 25 || tokens[indiceTK].idTipo == 26) {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                    if (tokens[indiceTK].idTipo == 18 || tokens[indiceTK].idTipo == 29 ||
                        tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false") {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 20) {
                        cd += "\"" + tokens[indiceTK].lexema + "\" ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 21) {
                        cd += "'" + tokens[indiceTK].lexema + "' ";
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                }
                if (tokens[indiceTK].lexema == "||" || tokens[indiceTK].lexema == "&&") {
                    cd += tokens[indiceTK].lexema + " ";
                    indiceTK++;
                }
                else if (tokens[indiceTK].lexema != ")") {
                    this.errorSin();
                    return "";
                }
            }
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ")") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "{") {
            cd += ":\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        tabulador++;
        while (indiceTK < tokens.length && tokens[indiceTK].lexema != "}") {
            cd += this.todoIW();
        }
        tabulador--;
        if (tokens[indiceTK].lexema == "}") {
            cd += "\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "else") {
            indiceTK++;
            if (tokens[indiceTK].lexema == "if") {
                cd += this.elseif();
            }
            else {
                if (tokens[indiceTK].lexema == "{") {
                    cd += this.tabulacion() + "else:\n";
                    indiceTK++;
                }
                else {
                    this.errorSin();
                    return "";
                }
                tabulador++;
                while (indiceTK < tokens.length && tokens[indiceTK].lexema != "}") {
                    cd += this.todoIW();
                }
                tabulador--;
                if (tokens[indiceTK].lexema == "}") {
                    cd += "\n";
                    indiceTK++;
                }
                else {
                    this.errorSin();
                    return "";
                }
            }
        }
        return cd;
    };
    Lexico.prototype.for = function () {
        var cd = this.tabulacion();
        if (tokens[indiceTK].lexema == "for") {
            cd += "for ";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "(") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (this.tipo()) {
            indiceTK++;
        }
        if (tokens[indiceTK].idTipo == 18) {
            cd += tokens[indiceTK].lexema;
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "=") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].idTipo == 29 || tokens[indiceTK].idTipo == 18) {
            cd += " in range (" + tokens[indiceTK].lexema + ", ";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ";") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].idTipo == 18) {
            indiceTK++;
            if (tokens[indiceTK].idTipo == 5 || tokens[indiceTK].idTipo == 6 ||
                tokens[indiceTK].idTipo == 22 || tokens[indiceTK].idTipo == 23) {
                indiceTK++;
            }
            else {
                this.errorSin();
                return "";
            }
            if (tokens[indiceTK].idTipo == 29) {
                cd += tokens[indiceTK].lexema;
                indiceTK++;
            }
            else {
                this.errorSin();
                return "";
            }
        }
        else if (tokens[indiceTK].idTipo == 29) {
            cd += tokens[indiceTK].lexema;
            indiceTK++;
            if (tokens[indiceTK].idTipo == 5 || tokens[indiceTK].idTipo == 6 ||
                tokens[indiceTK].idTipo == 22 || tokens[indiceTK].idTipo == 23) {
                indiceTK++;
            }
            else {
                this.errorSin();
                return "";
            }
            if (tokens[indiceTK].idTipo == 18) {
                indiceTK++;
            }
            else {
                this.errorSin();
                return "";
            }
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ";") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].idTipo == 18) {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "+") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "+") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ")") {
            cd += ")";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "{") {
            cd += ":\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        tabulador++;
        while (indiceTK < tokens.length && tokens[indiceTK].lexema != "}") {
            cd += this.todoFW();
        }
        tabulador--;
        if (tokens[indiceTK].lexema == "}") {
            cd += "\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        return cd;
    };
    Lexico.prototype.while = function () {
        var cd = this.tabulacion();
        if (tokens[indiceTK].lexema == "while") {
            cd += "while ";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "(") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema != ")") {
            while (indiceTK < tokens.length && tokens[indiceTK].lexema != ")") {
                if (tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false" ||
                    tokens[indiceTK].idTipo == 18) {
                    cd += tokens[indiceTK].lexema + " ";
                    indiceTK++;
                    if (tokens[indiceTK].idTipo == 5 || tokens[indiceTK].idTipo == 6 ||
                        tokens[indiceTK].idTipo == 22 || tokens[indiceTK].idTipo == 23 ||
                        tokens[indiceTK].idTipo == 25 || tokens[indiceTK].idTipo == 26) {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                        if (tokens[indiceTK].idTipo == 18 || tokens[indiceTK].idTipo == 29 ||
                            tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false") {
                            cd += tokens[indiceTK].lexema + " ";
                            indiceTK++;
                        }
                        else if (tokens[indiceTK].idTipo == 20) {
                            cd += "\"" + tokens[indiceTK].lexema + "\" ";
                            indiceTK++;
                        }
                        else if (tokens[indiceTK].idTipo == 21) {
                            cd += "'" + tokens[indiceTK].lexema + "' ";
                            indiceTK++;
                        }
                        else {
                            this.errorSin();
                            return "";
                        }
                    }
                }
                else {
                    if (tokens[indiceTK].idTipo == 29) {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 20) {
                        cd += "\"" + tokens[indiceTK].lexema + "\" ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 21) {
                        cd += "\"" + tokens[indiceTK].lexema + "\" ";
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                    if (tokens[indiceTK].idTipo == 5 || tokens[indiceTK].idTipo == 6 ||
                        tokens[indiceTK].idTipo == 22 || tokens[indiceTK].idTipo == 23 ||
                        tokens[indiceTK].idTipo == 25 || tokens[indiceTK].idTipo == 26) {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                    if (tokens[indiceTK].idTipo == 18 || tokens[indiceTK].idTipo == 29 ||
                        tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false") {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 20) {
                        cd += "\"" + tokens[indiceTK].lexema + "\" ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 21) {
                        cd += "'" + tokens[indiceTK].lexema + "' ";
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                }
                if (tokens[indiceTK].lexema == "||" || tokens[indiceTK].lexema == "&&") {
                    cd += tokens[indiceTK].lexema + " ";
                    indiceTK++;
                }
                else if (tokens[indiceTK].lexema != ")") {
                    this.errorSin();
                    return "";
                }
            }
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ")") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "{") {
            cd += ":\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        tabulador++;
        while (indiceTK < tokens.length && tokens[indiceTK].lexema != "}") {
            cd += this.todoFW();
        }
        tabulador--;
        if (tokens[indiceTK].lexema == "}") {
            cd += "\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        return cd;
    };
    Lexico.prototype.do = function () {
        var cd = this.tabulacion();
        if (tokens[indiceTK].lexema == "do") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "{") {
            cd += "while true:\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        tabulador++;
        while (indiceTK < tokens.length && tokens[indiceTK].lexema != "}") {
            cd += this.todoFW();
        }
        tabulador--;
        if (tokens[indiceTK].lexema == "}") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "while") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "(") {
            tabulador++;
            cd += this.tabulacion() + "if ";
            indiceTK++;
            tabulador--;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema != ")") {
            while (indiceTK < tokens.length && tokens[indiceTK].lexema != ")") {
                if (tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false" ||
                    tokens[indiceTK].idTipo == 18) {
                    cd += tokens[indiceTK].lexema + " ";
                    indiceTK++;
                    if (tokens[indiceTK].idTipo == 5 || tokens[indiceTK].idTipo == 6 ||
                        tokens[indiceTK].idTipo == 22 || tokens[indiceTK].idTipo == 23 ||
                        tokens[indiceTK].idTipo == 25 || tokens[indiceTK].idTipo == 26) {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                        if (tokens[indiceTK].idTipo == 18 || tokens[indiceTK].idTipo == 29 ||
                            tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false") {
                            cd += tokens[indiceTK].lexema + " ";
                            indiceTK++;
                        }
                        else if (tokens[indiceTK].idTipo == 20) {
                            cd += "\"" + tokens[indiceTK].lexema + "\" ";
                            indiceTK++;
                        }
                        else if (tokens[indiceTK].idTipo == 21) {
                            cd += "'" + tokens[indiceTK].lexema + "' ";
                            indiceTK++;
                        }
                        else {
                            this.errorSin();
                            return "";
                        }
                    }
                }
                else {
                    if (tokens[indiceTK].idTipo == 29) {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 20) {
                        cd += "\"" + tokens[indiceTK].lexema + "\" ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 21) {
                        cd += "\"" + tokens[indiceTK].lexema + "\" ";
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                    if (tokens[indiceTK].idTipo == 5 || tokens[indiceTK].idTipo == 6 ||
                        tokens[indiceTK].idTipo == 22 || tokens[indiceTK].idTipo == 23 ||
                        tokens[indiceTK].idTipo == 25 || tokens[indiceTK].idTipo == 26) {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                    if (tokens[indiceTK].idTipo == 18 || tokens[indiceTK].idTipo == 29 ||
                        tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false") {
                        cd += tokens[indiceTK].lexema + " ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 20) {
                        cd += "\"" + tokens[indiceTK].lexema + "\" ";
                        indiceTK++;
                    }
                    else if (tokens[indiceTK].idTipo == 21) {
                        cd += "'" + tokens[indiceTK].lexema + "' ";
                        indiceTK++;
                    }
                    else {
                        this.errorSin();
                        return "";
                    }
                }
                if (tokens[indiceTK].lexema == "||" || tokens[indiceTK].lexema == "&&") {
                    cd += tokens[indiceTK].lexema + " ";
                    indiceTK++;
                }
                else if (tokens[indiceTK].lexema != ")") {
                    this.errorSin();
                    return "";
                }
            }
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ")") {
            tabulador++;
            tabulador++;
            cd += ":\n" + this.tabulacion() + "break\n";
            indiceTK++;
            tabulador--;
            tabulador--;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ";") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        return cd;
    };
    Lexico.prototype.switch = function () {
        var cd = this.tabulacion();
        if (tokens[indiceTK].lexema == "switch") {
            cd += "def switch";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "(") {
            cd += "(";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].idTipo == 18) {
            cd += tokens[indiceTK].lexema;
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ")") {
            cd += ")";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "{") {
            cd += ":\n";
            tabulador++;
            cd += this.tabulacion() + "switcher={\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "case") {
            cd += "(";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        return cd;
    };
    Lexico.prototype.return = function () {
        var cd = this.tabulacion();
        if (tokens[indiceTK].lexema == "return") {
            cd += "return ";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "true" || tokens[indiceTK].lexema == "false") {
            cd += tokens[indiceTK].lexema;
            indiceTK++;
            if (tokens[indiceTK].lexema != ";") {
                this.errorSin();
                return "";
            }
        }
        else if (tokens[indiceTK].lexema != ";") {
            while (indiceTK < tokens.length && tokens[indiceTK].lexema != ";") {
                if (tokens[indiceTK].idTipo == 18 || tokens[indiceTK].idTipo == 29 ||
                    tokens[indiceTK].idTipo == 21 || tokens[indiceTK].idTipo == 20) {
                    cd += tokens[indiceTK].lexema + " ";
                    indiceTK++;
                }
                else {
                    this.errorSin();
                    return "";
                }
                if (tokens[indiceTK].idTipo == 1 || tokens[indiceTK].idTipo == 2 ||
                    tokens[indiceTK].idTipo == 4 || tokens[indiceTK].idTipo == 3) {
                    cd += tokens[indiceTK].lexema + " ";
                    indiceTK++;
                    if (tokens[indiceTK].lexema == ";") {
                        this.errorSin();
                        return "";
                    }
                }
            }
        }
        if (tokens[indiceTK].lexema == ";") {
            cd += "\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        return cd;
    };
    Lexico.prototype.continue = function () {
        var cd = this.tabulacion();
        if (tokens[indiceTK].lexema == "continue") {
            cd += "continue ";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ";") {
            cd += "\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        return cd;
    };
    Lexico.prototype.break = function () {
        var cd = this.tabulacion();
        if (tokens[indiceTK].lexema == "break") {
            cd += "break ";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ";") {
            cd += "\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        return cd;
    };
    Lexico.prototype.comentario = function () {
        var cd = this.tabulacion();
        if (tokens[indiceTK].idTipo == 15) {
            cd += "#" + tokens[indiceTK].lexema + "\n";
        }
        else if (tokens[indiceTK].idTipo == 16) {
            cd += "'''" + tokens[indiceTK].lexema + "'''\n";
        }
        indiceTK++;
        return cd;
    };
    Lexico.prototype.consoleWrite = function () {
        var cd = this.tabulacion();
        if (tokens[indiceTK].lexema == "Console") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ".") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "Write") {
            cd += "print";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == "(") {
            indiceTK++;
            cd += "(";
        }
        else {
            this.errorSin();
            return "";
        }
        while (tokens[indiceTK].lexema != ")") {
            if (tokens[indiceTK].idTipo == 20 || tokens[indiceTK].idTipo == 21) {
                cd += "\"" + tokens[indiceTK].lexema + "\"";
                indiceTK++;
            }
            else if (tokens[indiceTK].idTipo == 29 || tokens[indiceTK].idTipo == 18) {
                cd += tokens[indiceTK].lexema;
                indiceTK++;
            }
            else {
                this.errorSin();
                return "";
            }
            if (tokens[indiceTK].lexema == "+") {
                indiceTK++;
                cd += "+";
                if (tokens[indiceTK].lexema == ")") {
                    this.errorSin();
                    return "";
                }
            }
            else if (tokens[indiceTK].lexema != ")") {
                this.errorSin();
                return "";
            }
        }
        if (tokens[indiceTK].lexema == ")") {
            indiceTK++;
            cd += ")";
        }
        else {
            this.errorSin();
            return "";
        }
        if (tokens[indiceTK].lexema == ";") {
            cd += "\n";
            indiceTK++;
        }
        else {
            this.errorSin();
            return "";
        }
        return cd;
    };
    Lexico.prototype.tipo = function () {
        if (tokens[indiceTK].lexema == "int" || tokens[indiceTK].lexema == "double" ||
            tokens[indiceTK].lexema == "char" || tokens[indiceTK].lexema == "string" ||
            tokens[indiceTK].lexema == "bool") {
            return true;
        }
        else {
            return false;
        }
    };
    Lexico.prototype.errorSin = function () {
        var consola = document.getElementById("txtConsola");
        consola.value += "Error sintactico->" + tokens[indiceTK].to_string() + "\n";
        indiceTK++;
        this.recuperar();
        entro = true;
    };
    Lexico.prototype.es_reservada = function (texto) {
        var letras = ["int", "double", "char", "bool", "string", "void", "main", "if",
            "else", "switch", "case", "break", "default", "for", "while", "do",
            "return", "continue", "Console", "Write", "class", "true", "false", "Main"];
        for (var i = 0; i < letras.length; i++) {
            if (letras[i] == texto) {
                return true;
            }
        }
        return false;
    };
    Lexico.prototype.tiene_minuscula = function (texto) {
        var letras = "abcdefghijklmnñopqrstuvwxyz";
        for (var i = 0; i < letras.length; i++) {
            if (letras[i] == texto) {
                return true;
            }
        }
        return false;
    };
    Lexico.prototype.tiene_miyuscula = function (texto) {
        var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = 0; i < letras.length; i++) {
            if (letras[i] == texto) {
                return true;
            }
        }
        return false;
    };
    Lexico.prototype.tiene_numero = function (texto) {
        var letras = "0123456789";
        for (var i = 0; i < letras.length; i++) {
            if (letras[i] == texto) {
                return true;
            }
        }
        return false;
    };
    return Lexico;
}());
