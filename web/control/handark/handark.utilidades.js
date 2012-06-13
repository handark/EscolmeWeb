/*!
* Utilidades y funciones comunes
* Autor: Jose Luis Orozco - jorozco@afianzamientosolidario.com.
*/
var raiz_web = "../../";

$(document).ready(function () {
    $('body').append("<div id='alertas-handark' ></div>");
});

jQuery.fn.SoloDigitos = function () {
    this.val("0");
    this.keypress(function (event) {
        if (event.which && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    return this;
};


var AlertaHandark = function (mensaje, icono) {
    $("#alertas-handark").empty().append("<p><span class='ui-icon ui-icon-" + icono + "' style='float: left; margin-right: .3em;'></span>" + mensaje + "</p>");
    $("#alertas-handark").dialog('open').show('blind');
}

var MostrarAjaxCargador = function (mensaje, icono) {
    $("#mensaje_ajax_contenido").empty().append(mensaje);
}

$.fn.Cargador = function (opciones) {
    var defecto = {
        mensaje:'Cargando',
        icono:'icon-refresh',
        div_ocultar:''
    };
    var opciones = $.extend(defecto, opciones);
    opciones.div_ocultar = "#" + opciones.div_ocultar;
    $(this).ajaxStart(function () {
       $(this).empty().append('<i class="' + opciones.icono + ' icon-white" ></i>' + opciones.mensaje).show();
       if(opciones.div_ocultar != "#"){
           $(opciones.div_ocultar).hide();
       }
    });
    $(this).ajaxStop(function () {
        $(this).empty().hide();
        if(opciones.div_ocultar != "#"){
           $(opciones.div_ocultar).show();
        }
    });
}

$.fn.BotonCargador = function (opciones) {
    var defecto = {
        div_ocultar:''
    };
    var opciones = $.extend(defecto, opciones);
    opciones.div_ocultar = "#" + opciones.div_ocultar;
    $(this).ajaxStart(function () {
        $(this).button('loading');
        if(opciones.div_ocultar != "#"){
           $(opciones.div_ocultar).hide();
        }
    });
    $(this).ajaxStop(function () {
        $(this).button('reset');
        if(opciones.div_ocultar != "#"){
           $(opciones.div_ocultar).show();
        }
    });
}

//Devuelve la hora actual en formato hh:mm
var GetHoraActual = function () {

    var _hora = new Date().getHours();
    if (_hora < 10)
        hora = "0" + _hora;
    else
        hora = _hora;

    var _minutos = new Date().getMinutes();
    if (_minutos < 10)
        minutos = "0" + _minutos;
    else
        minutos = _minutos;

    return hora + ":" + minutos;
}

//Devuelve la fecha actual en formato yyyy-mm-dd
var GetFechaActual = function () {

    var _mes = new Date().getMonth() + 1;
    if (_mes < 10)
        mes = "0" + _mes;
    else
        mes = _mes;

    var _dia = new Date().getDate();
    if (_dia < 10)
        dia = "0" + _dia;
    else
        dia = _dia;

    return new Date().getFullYear() + "-" + mes + "-" + dia;

}

//Devuelve una fecha en formato yyyy-mm-dd
var GetFechaConFormato= function (fecha) {

    var _mes = new Date().getMonth() + 1;
    if (_mes < 10)
        mes = "0" + _mes;
    else
        mes = _mes;

    var _dia = new Date().getDate();
    if (_dia < 10)
        dia = "0" + _dia;
    else
        dia = _dia;

    return new Date().getFullYear() + "-" + mes + "-" + dia;

}

//Devuelve una lista de parametros enviados en una url por el metodo get
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {};
    var tokens;

    while (tokens = /[?&]?([^=]+)=([^&]*)/g.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

function ValidarCorreo(campo) {
    if (campo.value != '') {
        var RegExPattern = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
        var errorMessage = 'Correo electronico no valido.';
        if (campo.value.match(RegExPattern)) {

        } else {
            alert(errorMessage);
            campo.value = '';
            campo.focus();
        }
    }
}

function ValidarSoloNumeros(campo) {
    if (campo.value != '') {
        var RegExPattern = /^(?:\+|-)?\d+$/;
        var errorMessage = 'Solo se permiten numeros en este campo.';
        var valor = campo.value.substr(0, 1);
        if (valor=="-") {
            alert("No se permiten valores negativos");
            campo.focus();
            campo.value = '0';
        }

        if (campo.value.match(RegExPattern)) {

        } else {
            alert(errorMessage);
            campo.focus();
            campo.value = '0';
            
        }
    }
}

function ValidarFecha(campo) {
    if (campo.value != '') {
        var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
        var errorMessage = 'Formato de Fecha no Valido.';
        if (campo.value.match(RegExPattern)) {

        } else {
            alert(errorMessage);
            campo.focus();
            campo.value = '';

        }
    }
}

function ValidarRangoHoras(HoraInicial, HoraFinal) {
    var hora = HoraInicial.split(':');
    var hora_inicio = hora[0];
    var minutos_inicio = hora[1];

    var hora2 = HoraFinal.split(':');
    var hora_final = hora2[0];
    var minutos_final = hora2[1];

    if (hora_inicio > hora_final) {
        return false;
    }
    if (hora_inicio == hora_final) {
        if (minutos_inicio > minutos_final) {
            return false;
        }
    }

    return true;
}

var RestarFechaMesesWS = function(meses) {
	var url = raiz_web + "resources/ayudas/RestarFechaMeses/" + meses ;
	var fecha = GetFechaActual();
    $.ajax({
        type: 'GET',
        url: url,
        async:false,
        dataType: "text",
        success: function(data){
        	fecha =  data.toString();
        }
    });
    
    return fecha;
}
