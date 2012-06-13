var url_servicios = "../../resources/UsuariosVO";
var url_modulo = "../index.html";

$(document).ready(function () {
    
    var $_GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if ($_GET["retorne"] != null) {
        url_modulo = $_GET["retorne"];
    }
    
    $(document).BarraSuperior({nivel:2,titulo:"Escolme Administrativo"});
    ConfigurarPagina();
});

function ConfigurarPagina(){
    $("#errores").hide();
    $("#tUsuario").focus().keypress(function(event) {
        if (event.which == 13) {
            if($("#tContrasena").val() != "")
                AutenticarUsuarioGeneral();
            else
                $("#tContrasena").focus();
        }
    });
//    $('input:text').blur(function(){
//        var div = "#div_" + $(this).attr("id");
//        var info = "#s_" + $(this).attr("id");
//        if($(this).val().length == 0){
//            $(div).removeClass("success").addClass("error");
//            $(info).html("El campo " + $(this).attr("title") + " es requerido")
//        }
//        else{
//            $(div).removeClass("error");
//            $(info).html("")  
//        }
//    });
    
    $("#tContrasena").keypress(function(event) {
        if (event.which == 13) 
            AutenticarUsuarioGeneral();
    });
    $('#bAutenticar').click(function() {
        AutenticarUsuarioGeneral();
    });   
}

function AutenticarUsuarioGeneral(){
    if($("#tUsuario").val() == "" || $("#tContrasena").val() == ""){
        MostrarMensajeError("Por favor ingrese todos los campos");
        return;
    }
    
    $("#bAutenticar").BotonCargador();
    
    $.ajax({
        type: 'GET',
        url: url_servicios + '/AutenticarUsuario/' + $("#tUsuario").val() + "/" + $("#tContrasena").val(),
        dataType: "json",
        success: function(data){
            if(data != null){
                sessionStorage.setItem("usua_usuario",data.usua_usuario);
                sessionStorage.setItem("usua_id",data.usua_id);
                sessionStorage.setItem("pege_id",data.pege_id);
                sessionStorage.setItem("usua_nombre",data.usua_nombre);
                sessionStorage.setItem("usua_documento",data.usua_documento);
                location.href = url_modulo;
            }
            else{
                MostrarMensajeError("Datos de usuario no son validos");
            }
        }
    });
}

function MostrarMensajeError(mensaje){
    $("#errores_msn").empty().append("<h4 class='alert-heading'>" + mensaje + "</h4>");
    $("#errores").show("blind");   
}