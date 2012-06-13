var iconos = "../../recursos/icons/";

//Control Boton con icono personalizado
$.fn.botonmenu = function (opciones) {

    var defecto = {
        titulo: '',icono:'',ruta_icono:iconos
    };
    var opciones = $.extend(defecto, opciones);
    this.empty();

    if(opciones.icono == "" && opciones.titulo==""){
        this.append("<div class='boton_text'>Boton</div>");
    }

    if (opciones.icono != "") {
        this.append("<img src='" + opciones.ruta_icono + opciones.icono + ".png' class='boton_img' alt='" + opciones.titulo + "' />");
    }
    if (opciones.titulo != "") {
        this.append("<div class='boton_text'>" + opciones.titulo + "</div>");
    }

    return this;
}

