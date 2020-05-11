/*imports var nombre = require("direccion")*/
%{
    
%}

%options case-insensitive

/*analizador lexico*/
%lex
%%

//comentarios
"//"[^\n]*                      return 'TK_CL';
"/*"[^"*/"]*"*/"                return 'TK_CM';


//Texto Id Num Char
\"((\\\")?|[^\"])*\"            return 'TK_CD';
[A-Za-z"_"][A-Za-z"_"0-9]+      return 'TK_ID';
[0-9]+("."[0-9]+)?              return 'TK_NM';
"'"[^"'"]"'"                    return 'TK_CH';


//Tipos de datos
"int"                           return 'TK_INT';
"double"                        return 'TK_DOUBLE';
"boolean"                       return 'TK_BOOLEAN';
"char"                          return 'TK_CHAR';
"String"                        return 'TK_STRING';


//Tipos de operadores
"+"                             return '+';
"-"                             return '-';
"*"                             return '*';
"/"                             return '/';
"^"                             return '^';
"%"                             return '%';
"++"                            return '++';
"--"                            return '--';


//Tipos de relacionales y logicos
"=="                            return '==';
"!="                            return '!=';
">"                             return '>';
">="                            return '>=';
"<"                             return '<';
"<="                            return '<=';
"&&"                            return '&&';
"||"                            return '||';
"!"                             return '!';


//Simbolos
"("                             return '(';
")"                             return ')';
"{"                             return '{';
"}"                             return '}';
";"                             return ';';
","                             return ',';
"="                             return '=';


//Palabras reservadas
"class"                         return 'TK_CLASS';
"import"                        return 'TK_IMPORT';
"true"                          return 'TK_TRUE';
"false"                         return 'TK_FALSE';
"if"                            return 'TK_IF';
"else"                          return 'TK_ELSE';
"switch"                        return 'TK_SWITCH';
"case"                          return 'TK_CASE';
"default"                       return 'TK_DEFAULT';
"break"                         return 'TK_BREAK';
"while"                         return 'TK_WHILE';
"do"                            return 'TK_DO';
"for"                           return 'TK_FOR';
"continue"                      return 'TK_CONTINUE';
"return"                        return 'TK_RETURN';
"void"                          return 'TK_VOID';
"main"                          return 'TK_MAIN';
"System"                        return 'TK_SYSTEM';
"out"                           return 'TK_OUT';
"print"                         return 'TK_PRINT';
"println"                       return 'TK_PRINTLN';


//
[ \r\t\n]+                      {}

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
<<EOF>>    return 'EOF';

/lex

/*analizador sintactico*/
%%


