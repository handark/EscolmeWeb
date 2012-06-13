$(document).ready(function () {
    if(sessionStorage.getItem("usua_usuario") == null){
        location.href = "usuarios/autenticar.html?retorne=../"
        return;
    }
    else{
        $(document).BarraSuperior({nivel:1,titulo:"Escolme Administrativo"});
        $(document).BarraLateral();
        $(".container-fluid").show();
    }
});
