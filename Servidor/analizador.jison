/*imports var nombre = require("direccion")*/
%{
    var AST = require("./JS/TS/AST");
    var NodoAST = require("./JS/TS/NodoAST");
    var Error = require("./JS/TS/Error");
    var errores = [];
    var id = 0;
    var er = 0;
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
\"((\\\")?|[^\"])*\"                    return 'TK_CD';
[A-Za-z"_"][A-Za-z"_"0-9]*              return 'TK_ID';
[0-9]+("."[0-9]+)?                      return 'TK_NM';
"'"((\\\")|[^"'"])"'"                   return 'TK_CH';
"true"|"false"                          return 'TK_BOOL';
[A-Za-z][A-Za-z"_"0-9"."]*["*"]?        return 'TK_IM';

//info a oviar
[ \r\t\n]+                      {}


//Terminacion y erroes
.                           { /*var e = new Error.Error(er, yytext, "Lexico", yytext + " no pertenece al lenguaje", yylloc.first_line, yylloc.first_column); errores.push(e); er++; return 'TK_ERROR';*/}
<<EOF>>                     return 'EOF';


/lex


/*Precedencias*/

%left   '||'
%left   '&&'

%left   '!=' '=='
%left   '<' '>' '<=' '>='

%left   '+' '-'
%left   '*' '/'
%left   '^' '%'

%left   '!'

%left   UMINUS

/*analizador sintactico*/
%start S

%%

/*
para erroes sintacticos    error              {errores.push(new Error.Error(er, $1, "Sintactico", @1.first_line, @1.first_column); er++;}
*/

//Comienzo
S: PRIMERO EOF     {id = 0; er = 0; erroes = []; return $1;}
;

PRIMERO: SENTENCIAS     {$$ = new AST.AST(id++, "AST", $1, errores);}
;

//Listado de senetencias
SENTENCIAS: SENTENCIAS SENTENCIA {$$ = $1; $$.push($2);}
          | SENTENCIA            {$$ = []; $$.push($1);}
          /*| error '}'            {errores.push(new Error.Error(er, $1, "Sintactico", @1.first_line, @1.first_column)); er++;}
          /*| error ';'            {errores.push(new Error.Error(er, $1, "Sintactico", @1.first_line, @1.first_column)); er++;}
          | error                {errores.push(new Error.Error(er, $1, "Sintactico", @1.first_line, @1.first_column)); er++;}*/
;

//Tipo de sentencias principales
SENTENCIA: CLASS                        {$$ = new NodoAST.NodoAST( id++, "Clase", @1.first_line, @1.first_column, $1);}
         | IMPORT                       {$$ = new NodoAST.NodoAST( id++, "Import", @1.first_line, @1.first_column, $1);}
         | COMENTARIOS                  {$$ = new NodoAST.NodoAST( id++, "Comentario", @1.first_line, @1.first_column, $1);}
;

//Sentencias principales no derivables
IMPORT: TK_IMPORT TK_IM ';'                 {$$ = [new NodoAST.NodoAST(id++, $2, @1.first_line, @1.first_column, [])];}
;

COMENTARIOS: TK_CM                      {$$ = [new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, [])];}
           | TK_CL                      {$$ = [new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, [])];}
;

//Sentencia principal derivable
CLASS: TK_CLASS TK_ID '{' TODOCLASE '}'         {$$ = [new NodoAST.NodoAST(id++, $2, @1.first_line, @1.first_column, []), $4];}
     | TK_CLASS TK_ID '{' '}'                   {$$ = [new NodoAST.NodoAST(id++, $2, @1.first_line, @1.first_column, [])];}
;            

TODOCLASE: TODOS            {$$ = new NodoAST.NodoAST( id++, "Sentencias", @1.first_line, @1.first_column, $1);}
;

TODOS: TODOS TODO       {$$ = $1; $$.push($2);}
     | TODO             {$$ = []; $$.push($1);}
;

//Todo tipo de funcion posible dentro de sentencia principal
TODO: COMENTARIOS       {$$ = new NodoAST.NodoAST( id++, "Comentario", @1.first_line, @1.first_column, $1);}
    | METODO            {$$ = new NodoAST.NodoAST( id++, "Metodo", @1.first_line, @1.first_column, $1);}
    | FUNCION           {$$ = new NodoAST.NodoAST( id++, "Funcion", @1.first_line, @1.first_column, $1);}
    | MAIN              {$$ = new NodoAST.NodoAST( id++, "Main", @1.first_line, @1.first_column, $1);}
    | DECLARACION       {$$ = new NodoAST.NodoAST( id++, "Declaracion", @1.first_line, @1.first_column, $1);}
    | ASIGNACION        {$$ = new NodoAST.NodoAST( id++, "Asignacion", @1.first_line, @1.first_column, $1);}
;

//Creacion de metodos funicones o main
METODO: TK_VOID TK_ID '(' PARAMETROSGENERAL ')' '{' TODOGENERAL '}'  {$$ = [new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $4, $7];}
      | TK_VOID TK_ID '(' PARAMETROSGENERAL ')' '{' '}'              {$$ = [new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $4];}
      | TK_VOID TK_ID '(' ')' '{' TODOGENERAL '}'                    {$$ = [new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $6];}
      | TK_VOID TK_ID '(' ')' '{' '}'                                {$$ = [new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, [])];}
;

FUNCION: TIPO TK_ID '(' PARAMETROSGENERAL ')' '{' TODOGENERAL '}'  {$$ = [$1, new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $4, $7];}
       | TIPO TK_ID '(' PARAMETROSGENERAL ')' '{' '}'              {$$ = [$1, new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $4];}
       | TIPO TK_ID '(' ')' '{' TODOGENERAL '}'                    {$$ = [$1, new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $6];}
       | TIPO TK_ID '(' ')' '{' '}'                                {$$ = [$1, new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, [])];}
;

MAIN: TK_VOID TK_MAIN '(' ')' '{' TODOGENERAL '}'       {$$ = [new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $6];}
    | TK_VOID TK_MAIN '(' ')' '{' '}'                   {$$ = [new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, [])];}
;

//Estructura de creacion de parametros
PARAMETROSGENERAL: PARAMETROS        {$$ = new NodoAST.NodoAST( id++, "Parametros", @1.first_line, @1.first_column, $1);}
;

PARAMETROS: PARAMETROS ',' PARAMETRO   {$$ = $1; $$.push($3);}
          | PARAMETRO                  {$$ = []; $$.push($1);}
;

PARAMETRO: TIPO TK_ID            {$1.lista = [new NodoAST.NodoAST( id++, $2, @2.first_line, @2.first_column, [])]; $$ = $1;}
;

//Identificacion de tipos de dato
TIPO: TK_INT        {$$ = new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []);}
    | TK_DOUBLE     {$$ = new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []);}
    | TK_BOOLEAN    {$$ = new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []);}
    | TK_STRING     {$$ = new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []);}
    | TK_CHAR       {$$ = new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []);}
;

//Estructura para la obtencion de sentencias no del tipo clase
TODOGENERAL: TODOSDENTRO        {$$ = new NodoAST.NodoAST( id++, "Sentencias", @1.first_line, @1.first_column, $1);}
;

TODOSDENTRO: TODOSDENTRO TODODENTRO       {$$ = $1; $$.push($2);}
           | TODODENTRO                   {$$ = []; $$.push($1);}
;

//todo lo que va dentro de metodos funciones o main
TODODENTRO: COMENTARIOS             {$$ = new NodoAST.NodoAST( id++, "Comentario", @1.first_line, @1.first_column, $1);}
          | ASIGNACION              {$$ = new NodoAST.NodoAST( id++, "Asignacion", @1.first_line, @1.first_column, $1);}
          | DECLARACION             {$$ = new NodoAST.NodoAST( id++, "Declaracion", @1.first_line, @1.first_column, $1);}
          | FOR                     {$$ = new NodoAST.NodoAST( id++, "For", @1.first_line, @1.first_column, $1);}
          | WHILE                   {$$ = new NodoAST.NodoAST( id++, "While", @1.first_line, @1.first_column, $1);}
          | DO                      {$$ = new NodoAST.NodoAST( id++, "Do while", @1.first_line, @1.first_column, $1);}
          | SWITCH                  {$$ = new NodoAST.NodoAST( id++, "Switch", @1.first_line, @1.first_column, $1);}
          | IF                      {$$ = new NodoAST.NodoAST( id++, "If", @1.first_line, @1.first_column, $1);}
;

//Estructura de declaraciones
DECLARACION: TIPO LISTA '=' EXPRECION ';'        {$1.lista = $2; $$ = [$1, $4];}
           | TIPO LISTA ';'                      {$1.lista = $2; $$ = [$1];}
;

LISTA: LISTA ',' TK_ID        {$$ = $1; $$.push(new NodoAST.NodoAST( id++, $3, @3.first_line, @3.first_column, []));}
     | TK_ID                  {$$ = []; $$.push(new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []));}
;

//expreciones
EXPRECION: EXPRECIONES        {$$ = new NodoAST.NodoAST( id++, "=", @1.first_line, @1.first_column, $1);}
;

EXPRECIONES: EXPRECIONES E   {$$ = $1; $$.push($2);}
           | E               {$$ = []; $$.push($1);}   
;

E: E '+' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '-' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '*' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '/' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '^' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '%' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | '(' E ')'                {$$ = $2;}
 | VALORES                  {$$ = $1;}
 //| '-' E %prec UMINUS       {$$ = new NodoAST.NodoAST(id, $1, @1.first_line, @1.first_column, [$2]); id++;}
;

VALORES: TK_CD      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
       | TK_CH      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
       | TK_ID      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
       | TK_NM      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
       | TK_BOOL    {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
;


//Estructura de asignacion
ASIGNACION: TK_ID '=' EXPRECION ';'         {$$ = [new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []), $3];}
;


//estructura for $3, $4, $6, $9
FOR: TK_FOR '(' DECASIG CONDICIONES ';' ITERADORES ')' '{' TODOGENERAL '}'      {$$ = [$3, $4, $6, $9];}
   | TK_FOR '(' DECASIG CONDICIONES ';' ITERADORES ')' '{' '}'                  {$$ = [$3, $4, $6];}
;

//declaracion o asignacion
DECASIG: ASIGNACION              {$$ = new NodoAST.NodoAST( id++, "Asignacion", @1.first_line, @1.first_column, $1);}
       | DECLARACION             {$$ = new NodoAST.NodoAST( id++, "Declaracion", @1.first_line, @1.first_column, $1);}
;   

//condicion de for
CONDICIONES: CONDICION  {$$ = new NodoAST.NodoAST(id++, "Condiciones", @1.first_line, @1.first_column, $1);}
;

CONDICION: CONDICION C  {$$ = $1; $$.push($2);}
         | C            {$$ = []; $$.push($1);} 
;

C: C '&&' C         {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '||' C         {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | '(' C ')'        {$$ = $2}
 | C '<' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '<=' C         {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '>' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '>=' C         {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '!=' C         {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '==' C         {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | '!' C            {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, [$2]);}
 | VALORES          {$$ = $1}
 //| EXPRECIONES      {$$ = new NodoAST.NodoAST(id++, "Exprecion", @1.first_line, @1.first_column, $1);}
;

//iterador de for
ITERADORES: ITERADOR    {$$ = new NodoAST.NodoAST(id++, "Iterador", @1.first_line, @1.first_column, $1);}
;

ITERADOR: TK_ID '+' '+'   {$$ = [new NodoAST.NodoAST(id++, $1+$2+$3, @1.first_line, @1.first_column, [])];}
        | TK_ID '-' '-'   {$$ = [new NodoAST.NodoAST(id++, $1+$2+$3, @1.first_line, @1.first_column, [])];}
;


//estructura de while
WHILE: TK_WHILE '(' ')' '{' TODOGENERAL '}'        {$$ = [ $5]}
     | TK_WHILE '(' ')' '{' '}'                    {$$ = []}
;

