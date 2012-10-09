var ValidarSession = function(raiz,$scope){
    if(sessionStorage.getItem("usua_usuario") == null){
        location.href = "#/usuarios/login?retorne=" + raiz; 
        return;
    }
    else{
        var barraUsuario = '<div class="btn-group pull-right">' +
            '<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">' +
             ' <i class="icon-user"></i> ' + sessionStorage.getItem("usua_nombre")  + 
             ' <span class="caret"></span>' +
            '</a>' +
            '<ul class="dropdown-menu">' +
             ' <li><a href="#">Mis Datos</a></li>' +
            '  <li class="divider"></li>' +
            '  <li><a href="#" onclick="Salir()" >Salida Segura</a></li>' +
            '</ul>' +
            '</div>'
        $('#divBarraUsuario').html(barraUsuario);
        $scope.menuLateral = [
            {titulo:'Liquidaciones',url:'#/liquidaciones',icono:'icon-tasks'},
            {titulo:'Cartera Estudiante',url:'#/cartera-estudiante',icono:'icon-briefcase'},
            {titulo:'Facturas',url:'#/facturas',icono:'icon-shopping-cart'},
            {titulo:'Configuración',url:'#/configuracion',icono:'icon-wrench'}
        ];
    }
}

var Salir = function(){
    sessionStorage.clear();
    $('#divBarraUsuario').html('');
    location.href = "#/";
}


