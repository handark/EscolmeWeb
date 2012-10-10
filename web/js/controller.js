'use strict';
var url_servicios = "resources";

function jsonp_callback(data) {}

function IndexCtrl($scope, $http,$location) {
    $("#contenedor").css("height", jQuery(window).height() - 70 + "px");
    $("#framePrincipal").css("height", jQuery("#contenedor").height() + "px");
}

function UsuarioLoginCtrl($scope, $http,$location) {
    var retorne = ($location.search()).retorne;
    $scope.maestro = {};
    $scope.Limpiar = function () {
        $scope.form_autenticar = angular.copy($scope.maestro);
    };
    $scope.Autenticar = function(form_autenticar){
        $scope.maestro = angular.copy(form_autenticar);
        
//                    sessionStorage.setItem("usua_usuario",$scope.maestro.usuario);
//                    sessionStorage.setItem("usua_id",1);
//                    sessionStorage.setItem("pege_id",1);
//                    sessionStorage.setItem("usua_nombre",'Jose Orozco');
//                    sessionStorage.setItem("usua_documento",'8127266');
//                    location.href = "#" + retorne;
        
        $.ajax({
            type: 'GET',
            url: url_servicios + '/UsuariosVO/AutenticarUsuario/' + $scope.maestro.usuario + "/" + $scope.maestro.password,
            dataType: "json",
            success: function(data){
                if(data != null){
                    sessionStorage.setItem("usua_usuario",data.usua_usuario);
                    sessionStorage.setItem("usua_id",data.usua_id);
                    sessionStorage.setItem("pege_id",data.pege_id);
                    sessionStorage.setItem("usua_nombre",data.usua_nombre);
                    sessionStorage.setItem("usua_documento",data.usua_documento);
                    location.href = "#" + retorne;
                }
                else{
                    alert("Datos de usuario no son validos");
                }
            }
        });
    }
    $scope.Limpiar();
}

