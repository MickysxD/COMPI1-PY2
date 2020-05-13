/*imports var nombre = require("direccion")*/
%{
    //import var AST = require("../TS/Entornos/AST");
%}

%options case-insensitive

/*analizador lexico*/
%lex
%%

//comentarios
"//"[^\n]*                      return 'TK_CL';
"/*"[^"*/"]*"*/"                return 'TK_CM';

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

//Texto Id Num Char
\"((\\\")?|[^\"])*\"            return 'TK_CD';
[A-Za-z"_"][A-Za-z"_"0-9]*      return 'TK_ID';
[0-9]+("."[0-9]+)?              return 'TK_NM';
"'"((\\\")|[^"'"])"'"           return 'TK_CH';
"true"|"false"                  return 'TK_BOOL';

//info a oviar
[ \r\t\n]+                      {}


//Terminacion y erroes
.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
<<EOF>>    return 'EOF';


/lex


/*Precedencias*/

%left   '||'
%left   '&&'

%left   '!=' '=='
%left   '<' '>' '<=' '>='

%left   '+' '-'
%left   '*' '/'
%left   '^' '%'
%left UMENOS

%left   '!'


/*analizador sintactico*/
%start S

%%

S: SENTENCIAS EOF     {return $1;}
;

SENTENCIAS: SENTENCIA SENTENCIAS {$$ = $1+$2}
          | SENTENCIA {$$ = $1}
;

SENTENCIA: TK_FOR  {$$ = $1}
;

/*
C: CLASS SENTENCIAS {}
    | IMPORT SENTENCIAS {}
;

IMPORT: TK_IMPORT TK_ID     {}
      | TK_IMPORT TK_CD {}
;

CLASS: TK_CLASS TK_ID '{' TCLASS '}'    {}
;

DECLARACION: TIPO LISTA '=' EXPRECION ';' {}
           | TIPO LISTA ';' {}
;

TIPO: TK_STRING {}
    | TK_INT {}
    | TK_CHAR {}
    | TK_DOUBLE {}
    | TK_BOOLEAN {}
;

EXPRECION: EXPRECION '+' EXPRECION {}
         | EXPRECION '-' EXPRECION {}
         | EXPRECION '*' EXPRECION {}
         | EXPRECION '/' EXPRECION {}
         | EXPRECION '%' EXPRECION {}
         | EXPRECION '^' EXPRECION {}
         | '(' EXPRECION ')' {}
         | '-' EXPRECION %prec UMENOS {}
         | TK_ID {}
         | TK_CH {}
         | TK_CD {}
         | TK_NM {}
         | TK_BOOL {}
;
*/