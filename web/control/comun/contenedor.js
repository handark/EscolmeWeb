var raiz_sitio = "";
$.fn.BarraSuperior = function(opciones){
    var defecto = {
        nivel: 0,
        titulo:'',
        url_portales:'#',
        url_campusadmin:'campusadmin/',
        raiz:'',
        li1_estilo:'active',
        li2_estilo:''
    };
    var opciones = $.extend(defecto, opciones);
    if(opciones.nivel > 0){
        for(var i = 0;i<opciones.nivel;i++){
            opciones.raiz = opciones.raiz + "../";
        }
        opciones.li1_estilo = "";
        opciones.li2_estilo = "active";
    }

    raiz_sitio = opciones.raiz;
    opciones.url_portales = opciones.raiz;
    opciones.url_campusadmin = opciones.raiz + "campusadmin/";
    
    var barra_usuario = "";
    if(sessionStorage.getItem("usua_usuario") != null)
    {
        var usua_nombre = sessionStorage.getItem("usua_nombre").toString();
       
        barra_usuario = '<div class="btn-group pull-right">' +
            '<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">' +
             ' <i class="icon-user"></i> ' + usua_nombre + 
             ' <span class="caret"></span>' +
            '</a>' +
            '<ul class="dropdown-menu">' +
             ' <li><a href="#">Mis Datos</a></li>' +
            '  <li class="divider"></li>' +
            '  <li><a href="#" onclick="Salir()" >Salida Segura</a></li>' +
            '</ul>' +
            '</div>'
    }
    
    var body = '    <div class="navbar navbar-inverse navbar-fixed-top">' +
      '<div class="navbar-inner">' +
        '<div class="container-fluid">' +
          '<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">' +
            '<span class="icon-bar"></span>' +
            '<span class="icon-bar"></span>' +
            '<span class="icon-bar"></span>' +
          '</a>' +
          '<a class="brand" href="' + opciones.raiz + '"><img src="' + opciones.raiz + 'recursos/imagenes/icono_escolme.png" style="width: 20px; height: 20px;" alt="Escolme" > ' + opciones.titulo + '</a>' + barra_usuario +
          '<div class="nav-collapse">' +
            '<ul class="nav">' +
              '<li id="l1" class="' + opciones.li1_estilo + '" ><a href="' + opciones.url_portales + '">Campus Academico</a></li>' +
              '<li id="l2" class="' + opciones.li2_estilo + '" ><a href="' + opciones.url_campusadmin + '" >Campus Administrativo</a></li>' +
              '<li id="l3" ><a href="http://www.escolmevirtual.edu.co/" target="_blank"  >Escolme Virtual</a></li>' +
              '<li id="l4" ><a href="#PortalEscolme" >Portal Escolme</a></li>' +
              '<li id="l5" ><a href="http://mail.google.com/a/escolme.edu.co" target="_blank" >Correo Institucional</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
    $("#BarraSuperior").html(body);
}

$.fn.BarraLateral = function(opciones){
    var defecto = {link_activo:''};
    var opciones = $.extend(defecto, opciones);
    var body = '<div>' +
            '<ul class="nav nav-tabs nav-stacked" >' +
            AgregarItemLi('liLiquidaciones',opciones.link_activo,'Liquidaciones','/EscolmeWeb/campusadmin/cartera/liquidaciones.html','icon-tasks') +
            AgregarItemLi('liCarteraEstadoAlumno',opciones.link_activo,'Cartera Estudiante','/EscolmeWeb/campusadmin/cartera/estado_estudiante.html','icon-briefcase') +
            AgregarItemLi('liFacturas',opciones.link_activo,'Facturas','#','icon-shopping-cart') +
            AgregarItemLi('liConfiguracion',opciones.link_activo,'Configuración','#','icon-wrench') +
            '</ul>' +
          '</div>';
    $("#BarraLateral").html(body);
}

function GenerarBarraInferior(){
    
}

var AgregarItemLi = function(id,link_activo,titulo,url,icono){
    var estilo = "";
    if(id == link_activo){
        estilo = "class='active'";
        url = "#";
    }
    return '<li id="' + id + '" ' + estilo + ' ><a href="' + url + '"><i class="' + icono + '" ></i> ' + titulo + '</a></li>';
}

function Salir(){
    sessionStorage.clear();
    location.href = raiz_sitio;
}


