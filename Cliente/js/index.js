//import {AST} from "../../Servidor/JS/TS/Entornos/AST";
//import NodoAST from "../../Servidor/JS/TS/Entornos/NodoAST";
//var AST = require("../../Servidor/JS/TS/Entornos/AST"));
//__importStar(require("body-parser"))
//var AST = import("../Servidor/JS/TS/Entornos/AST")
//var AST = require("../../Servidor/JS/TS/Entornos/AST");

//lo de go
var error;
var reporte;

function conect(entrada){
    var texto = document.getElementById(entrada).value;
    if (texto != null && texto != "") {
        console.log( texto + " conectando...\n");
    }
    
    var url = "http://localhost:8080/Analizar/";

    $.post(url,{text:texto},function(data, status){
        if(status.toString() == "success"){
            $('#ast').jstree("destroy");
            $("#infot").html("");
            $("#copias").html("");

            console.log( "respuesta...\n");
            console.log( data + "\n");

            tree(data);

            console.log(" finalizado...\n");
        }else{
            console.log( "Error servidor 8000: "+status);
        }
    });
}

function tree(info){
    var json = JSON.parse(info);
    
    if(json.errores.length > 0){
        error = json.errores;
        errores();
    }

    if(json.reporte.length > 0){
        reporte = json.reporte;
        copias();
    }

    $('#ast').on('changed.jstree', function (e, data) {
            var nodo = data.instance.get_node(data.selected);
    }).jstree({
        core: {
            data: json
        }
    });

}

function errores(){
    var infot = $('#infot');
    var data="";
    

    $.each(error, function(i, k){
        var tr = `<tr>
        <td>`+error[i].id+`</td>
        <td>`+error[i].text+`</td>
        <td>`+error[i].tipo+`</td>
        <td>`+error[i].descripcion+`</td>
        <td>`+error[i].fila+`</td>
        <td>`+error[i].columna+`</td>
        </tr>`;
        data += tr;
        
    });

    infot.append(data);

}

function copias(){
    var infot = $('#copias');
    var data="";
    

    $.each(reporte, function(i, k){
        var tr = `<tr>
        <td>`+reporte[i].tipo+`</td>
        <td>`+reporte[i].descripcion+`</td>
        </tr>`;
        data += tr;
        
    });

    infot.append(data);

}

/* backup
function tree(info){
    var json = 
    JSON.parse(info);
    ;
    
    $('#ast')
      .on('changed.jstree', function (e, data) {
        var nodo = data.instance.get_node(data.selected);
        $('#jstree-result').html('Selected: <br/><strong>' + nodo.id+'-'+nodo.text+'</strong>');
      })
      .jstree({
      core: {
        data: json
      }
    });

}
*/

//pestanas
var contador=0;
function get_cont(){
    return contador++;
}

var vent_focus="pestana1";
function get_vent(){
    return vent_focus;
}

function set_vent(vent){
    vent_focus=vent;
}

var lista=new Array();
function linkedlist(pestana,nombre) {
    var obj=new Object();
    obj.pestana=pestana;
    obj.nombre=nombre;
    lista.push(obj);
}

function deletepes(pestana){
    for(var i=0;i<lista.length;i++){
        if(lista[i].pestana==pestana){
            delete lista[i];
        }
    }
}

/*--------------------------------------Funcion Al Cambiar Ventana---------------------------------------*/
function index(pestanias, pestania) {
    var id=pestania.replace('pestana','');
    set_vent('textarea'+id);

    var pestanna1 = document.getElementById(pestania);
    var listaPestannas = document.getElementById(pestanias);
    var cpestanna = document.getElementById('c'+pestania);
    var listacPestannas = document.getElementById('contenido'+pestanias);

    var i=0;
    while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined'){
        $(document).ready(function(){
            $(listacPestannas.getElementsByTagName('div')[i]).css('display','none');
            $(listaPestannas.getElementsByTagName('li')[i]).css('background','');
            $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom','');
        });
        i += 1;
    }

    $(document).ready(function(){
        $(cpestanna).css('display','');
        $(pestanna1).css('background','dimgray');
        $(pestanna1).css('padding-bottom','2px');
    });

    try {
        var act=document.getElementById('cpestana'+id);
        var tact=document.getElementById('textarea'+id);

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "3024-night",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    }catch(error) {}
}

/*---------------------------------------Funcion Agregar Pestania----------------------------------------*/
function agregar() {
    var x=get_cont();
    var lu=document.getElementById("lista");
    var li=document.createElement("li");
    li.setAttribute('id','pestana'+x);
    var a=document.createElement("a");
    a.setAttribute('id','a'+x);
    a.setAttribute('href', 'javascript:index("pestanas","pestana'+x+'")');
    a.text='pestana'+x;
    li.appendChild(a);
    lu.appendChild(li);
    index("pestanas","pestana"+x);

    var contenido=document.getElementById("contenidopestanas");
    var divp=document.createElement("div");
    divp.setAttribute('id','cpestana'+x);
    var ta=document.createElement("textarea");
    ta.setAttribute('id','textarea'+x);
    ta.setAttribute('name','textarea'+x);
    ta.setAttribute('class','ta');
    ta.setAttribute('style','display:none');
    ta.cols=75;
    ta.rows=20;
    divp.appendChild(ta);
    contenido.appendChild(divp);

    var act=document.getElementById('cpestana'+x);
    var tact=document.getElementById('textarea'+x);
    var editor=CodeMirror(act, {
        lineNumbers: true,
        value: tact.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "3024-night",
        mode: "text/x-java"
    }).on('change', editor => {
        tact.value=editor.getValue();
    });
}

function quitar(){
    try{
        var lu=document.getElementById("lista");
        lu.removeChild(document.getElementById(get_vent().replace("textarea","pestana")));
        var contenido=document.getElementById("contenidopestanas");
        contenido.removeChild(document.getElementById(get_vent().replace("textarea","cpestana")));
        deletepes(get_vent());
    }catch(error){}
}


/*-----------------------------------------------File---------------------------------------------------*/
function AbrirArchivo(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var act=document.getElementById(get_vent().replace("textarea","cpestana"));
        var tact=document.getElementById(get_vent());
        tact.value = e.target.result;

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor=CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "3024-night",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value=editor.getValue();
        });
    };
    reader.readAsText(file);
    file.clear;

    var a=document.getElementById(get_vent().replace("textarea","a"));
    a.text=file.name;
    linkedlist(get_vent(),file.name);

    var file_input=document.getElementById("fileInput");
    document.getElementById('fileInput').value="";
}

function DescargarArchivo(){
    var ta=document.getElementById(get_vent());
    var contenido=ta.value;//texto de vent actual

    //formato para guardar el archivo
    var hoy=new Date();
    var dd=hoy.getDate();
    var mm=hoy.getMonth()+1;
    var yyyy=hoy.getFullYear();
    var HH=hoy.getHours();
    var MM=hoy.getMinutes();
    var formato=get_vent().replace("textarea","")+"_"+dd+"_"+mm+"_"+yyyy+"_"+HH+"_"+MM;

    var nombre="Archivo"+formato+".txt";//nombre del archivo
    var file=new Blob([contenido], {type: 'text/plain'});

    if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, nombre);
    }else{
        var a=document.createElement("a"),url=URL.createObjectURL(file);
        a.href=url;
        a.download=nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        },0); 
    }
}
