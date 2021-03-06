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
"/*"("*"|"/"|[^"*/"])*"*/"      return 'TK_CM';

//Tipos de datos
"int"                           return 'TK_INT';
"double"                        return 'TK_DOUBLE';
"boolean"                       return 'TK_BOOLEAN';
"char"                          return 'TK_CHAR';
"String"                        return 'TK_STRING';

//Tipos de operadores
"++"                            return '++';
"--"                            return '--';
"+"                             return '+';
"-"                             return '-';
"*"                             return '*';
"/"                             return '/';
"^"                             return '^';
"%"                             return '%';

//Tipos de relacionales y logicos
"=="                            return '==';
"!="                            return '!=';
">="                            return '>=';
">"                             return '>';
"<="                            return '<=';
"<"                             return '<';
"&&"                            return '&&';
"||"                            return '||';
"!"                             return '!';

//Simbolos
"("                             return '(';
")"                             return ')';
"{"                             return '{';
"}"                             return '}';
";"                             return ';';
":"                             return ':';
","                             return ',';
"="                             return '=';
"."                             return '.';

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

//info a oviar
[ \r\t\n]+                      {}


//Terminacion y erroes
.                           {errores.push(new Error.Error(er++, yytext, "Lexico", "No pertenece al lenguaje", yylloc.first_line, yylloc.first_column));}
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

//Comienzo
S: PRIMERO EOF     {id = 0; er = 0; errores = []; return $1;}
;

PRIMERO: SENTENCIAS     {$$ = new AST.AST(id++, "AST", $1, errores);}
;

ERR: error '}'              {$$ = new Error.Error(er++, $2, "Sintactico", $1.yyreport_syntax_error, @1.first_line, @1.first_column);}
   | error ';'              {$$ = new Error.Error(er++, $2, "Sintactico", $1.yyreport_syntax_error, @1.first_line, @1.first_column);}
;

//Listado de senetencias
SENTENCIAS: SENTENCIAS SENTENCIA  {$$ = $1; $$.push($2);}
          | SENTENCIA             {$$ = []; $$.push($1);}
;

//Tipo de sentencias principales
SENTENCIA: CLASS                        {$$ = new NodoAST.NodoAST( id++, "Clase", @1.first_line, @1.first_column, $1);}
         | IMPORT                       {$$ = new NodoAST.NodoAST( id++, "Import", @1.first_line, @1.first_column, $1);}
         | COMENTARIOS                  {$$ = new NodoAST.NodoAST( id++, "Comentario", @1.first_line, @1.first_column, $1);}
         | ERR                          {$$ = new NodoAST.NodoAST( id++, "ERROR", @1.first_line, @1.first_column, []); errores.push($1);}
;

//Sentencias principales no derivables
IMPORT: TK_IMPORT TK_ID ';'                 {$$ = [new NodoAST.NodoAST(id++, $2, @1.first_line, @1.first_column, [])];}
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
    | ERR               {$$ = new NodoAST.NodoAST( id++, "ERROR", @1.first_line, @1.first_column, []); errores.push($1);}
;

//Creacion de metodos funicones o main
METODO: VOID TK_ID '(' PARAMETROSGENERAL ')' '{' TODOGENERAL '}'  {$$ = [$1,new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $4, $7];}
      | VOID TK_ID '(' PARAMETROSGENERAL ')' '{' '}'              {$$ = [$1,new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $4];}
      | VOID TK_ID '(' ')' '{' TODOGENERAL '}'                    {$$ = [$1,new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $6];}
      | VOID TK_ID '(' ')' '{' '}'                                {$$ = [$1,new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, [])];}
;

FUNCION: TIPO TK_ID '(' PARAMETROSGENERAL ')' '{' TODOGENERAL '}'  {$$ = [$1, new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $4, $7];}
       | TIPO TK_ID '(' PARAMETROSGENERAL ')' '{' '}'              {$$ = [$1, new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $4];}
       | TIPO TK_ID '(' ')' '{' TODOGENERAL '}'                    {$$ = [$1, new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $6];}
       | TIPO TK_ID '(' ')' '{' '}'                                {$$ = [$1, new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, [])];}
;

MAIN: VOID TK_MAIN '(' ')' '{' TODOGENERAL '}'       {$$ = [$1,new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, []), $6];}
    | VOID TK_MAIN '(' ')' '{' '}'                   {$$ = [$1,new NodoAST.NodoAST( id++, $2, @1.first_line, @1.first_column, [])];}
;

VOID: TK_VOID           {$$ = new NodoAST.NodoAST( id++, $1, @1.first_line, @1.first_column, []);}
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
           | TODODENTRO                   {$$ = [$1];}
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
          | BCR                     {$$ = $1;}
          | LLAMADAF                {$$ = new NodoAST.NodoAST( id++, "Llamada funcion", @1.first_line, @1.first_column, [$1]);}
          | PRINT                   {$$ = new NodoAST.NodoAST( id++, "Print", @1.first_line, @1.first_column, [$1]);}
          | ERR                     {$$ = new NodoAST.NodoAST( id++, "ERROR", @1.first_line, @1.first_column, []); errores.push($1);}
;

BCR: TK_BREAK ';'                  {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
   | TK_CONTINUE ';'               {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
   | TK_RETURN SEXPRECION ';'      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, [$2]);}
;

PRINT: TK_SYSTEM '.' TK_OUT '.' TK_PRINT '(' SEXPRECION ')' ';'         {$$ = $7;}
     | TK_SYSTEM '.' TK_OUT '.' TK_PRINTLN '(' SEXPRECION ')' ';'       {$$ = $7;}
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
           | E               {$$ = [$1];}   
;

E: E '+' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '-' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '*' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '/' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '^' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | E '%' E                  {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 //| '-' E %prec UMINUS       {$$ = new NodoAST.NodoAST(id, $1, @1.first_line, @1.first_column, [$2]); id++;}
 | '(' E ')'                {$$ = $2;}
 | VALORES                  {$$ = $1;}
;

VALORES: TK_CD      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
       | TK_CH      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
       | TK_ID      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
       | TK_NM      {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
       | TK_BOOL    {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
;

//llamada de funciones no implementado
LLAMADAF: TK_ID '(' SEXPRECION ')' ';'     {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, [$3]);}
        | TK_ID '(' ')' ';'                 {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, []);}
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
         | C            {$$ = [$1];} 
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
 | C '+' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '-' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '*' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '/' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '^' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | C '%' C          {$$ = new NodoAST.NodoAST(id++, $2, @2.first_line, @2.first_column, [$1, $3]);}
 | '!' C            {$$ = new NodoAST.NodoAST(id++, $1, @1.first_line, @1.first_column, [$2]);}
 | VALORES          {$$ = $1}
 //| EXPRECIONES      {$$ = new NodoAST.NodoAST(id++, "Exprecion", @1.first_line, @1.first_column, $1);}
;

//iterador de for
ITERADORES: ITERADOR    {$$ = new NodoAST.NodoAST(id++, "Iterador", @1.first_line, @1.first_column, $1);}
;

ITERADOR: TK_ID '++'   {$$ = [new NodoAST.NodoAST(id++, $1+$2, @1.first_line, @1.first_column, [])];}
        | TK_ID '--'   {$$ = [new NodoAST.NodoAST(id++, $1+$2, @1.first_line, @1.first_column, [])];}
;


//estructura de while
WHILE: TK_WHILE '(' CONDICIONES ')' '{' TODOGENERAL '}'        {$$ = [$3, $6]}
     | TK_WHILE '(' CONDICIONES ')' '{' '}'                    {$$ = [$3]}
;

//estructura do while
DO: TK_DO '{' TODOGENERAL '}' TK_WHILE '(' CONDICIONES ')' ';'       {$$ = [$3, $7]}
  | TK_DO '{' '}' TK_WHILE '(' CONDICIONES ')' ';'                   {$$ = [$6]}
;


//estructura if
IF: TKIF ELSEL        {$$ = $2; $$.unshift($1);}
  | TKIF              {$$ = [$1];}
;

TKIF: TK_IF '(' CONDICIONES ')' '{' TODOGENERAL '}'            {$$ = new NodoAST.NodoAST(id++, "if", @1.first_line, @1.first_column, [$3, $6]);}
    | TK_IF '(' CONDICIONES ')' '{' '}'                        {$$ = new NodoAST.NodoAST(id++, "if", @1.first_line, @1.first_column, [$3]);}
;

ELSEL: ELSEL ELSE           {$$ = $1; $$.push($2);}
     | ELSE                 {$$ = [$1];}
;

ELSE: TK_ELSE TKIF                      {$$ = new NodoAST.NodoAST(id++, "else if", @1.first_line, @1.first_column, $2.lista);}
    | TK_ELSE '{' TODOGENERAL '}'       {$$ = new NodoAST.NodoAST(id++, "else", @1.first_line, @1.first_column, [$3]);}
    | TK_ELSE '{' '}'                   {$$ = new NodoAST.NodoAST(id++, "else", @1.first_line, @1.first_column, []);}
;

//estructura whitch
SWITCH: TK_SWITCH '(' SEXPRECION ')' '{' CASS '}'      {$$ = [$3, $6];}
      | TK_SWITCH '(' SEXPRECION ')' '{' '}'            {$$ = [$3];}
;

SEXPRECION: EXPRECIONES        {$$ = new NodoAST.NodoAST( id++, "Exprecion", @1.first_line, @1.first_column, $1);}
;

CASS: CASES        {$$ = new NodoAST.NodoAST( id++, "Cases", @1.first_line, @1.first_column, $1);}
;

CASES: CASES CASE       {$$ = $1; $$.push($2);}
     | CASE             {$$ = [$1];}
;

CASE: TK_CASE VALORES ':' TODOGENERAL   {$$ = new NodoAST.NodoAST( id++, "Case", @1.first_line, @1.first_column, [$2, $4]);}
    | TK_CASE VALORES ':'               {$$ = new NodoAST.NodoAST( id++, "Case", @1.first_line, @1.first_column, [$2]);}
    | TK_DEFAULT ':' TODOGENERAL        {$$ = new NodoAST.NodoAST( id++, "Default", @1.first_line, @1.first_column, [$3]);}
    | TK_DEFAULT ':'                    {$$ = new NodoAST.NodoAST( id++, "Default", @1.first_line, @1.first_column, []);}
;
