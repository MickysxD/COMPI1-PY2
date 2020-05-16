/*imports var nombre = require("direccion")*/
%{
    var AST = require("./JS/TS/Entornos/AST");
    var NodoAST = require("./JS/TS/Entornos/NodoAST");
    var Instruccion = require("./JS/TS/Instruccion/Instruccion");
    var Asignacion = require("./JS/TS/Instruccion/CambioValor/Asignacion");
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
.                               { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
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

S: SENTENCIAS EOF     {return new AST.AST($1);}
;
/*
SENTENCIAS: SENTENCIAS SENTENCIA    {$$ = $1; $$.push($2);}
          | SENTENCIA               {$$ = []; $$.push($1);}
;

SENTENCIA: TK_FOR               {$$ = $1+" jeje"}
;
*/

SENTENCIAS: SENTENCIAS SENTENCIA {$$ = $1; $$.push($2);}
          | SENTENCIA            {$$ = []; $$.push($1);}
;

SENTENCIA: TK_FOR               {$$ = new Asignacion.Asignacion($1,"xd",@1.first_line,@1.first_column)}
;

/*
S: SENTENCIAS EOF     {return new AST.AST($1);}
;

SENTENCIAS: SENTENCIAS SENTENCIA {$$ = $1; $$.push($2);}
          | SENTENCIA {$$ = NodoAST[]; $$.push($1);}
;

SENTENCIA: TK_CLASS TK_ID { TODOS }  {$$ = $1;}
         | TK_IMPORT TK_STRING {$$ = $1;}
;

TODOS: TODOS TODO {$$ = $1; $$.push($2);}
     | TODO {$$ = NodoAST[]; $$.push($1);}

TODO: METODO {$$ = $1;}
    | FUNCION {$$ = $1;}
    | MAIN {$$ = $1;}
    | DECLARACION {$$ = $1;}
    | ASIGNACION {$$ = $1;}
;

TIPO: TK_INT {$$ = $1;}
    | TK_DOUBLE {$$ = $1;}
    | TK_BOOLEAN {$$ = $1;}
    | TK_STRING {$$ = $1;}
    | TK_CHAR {$$ = $1;}
;

METODO: TK_VOID TK_ID ( PARAMETROS ) {  }
/*

problema:
<script type="text/javascript" src="../js/jquery-1.7.2.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>



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