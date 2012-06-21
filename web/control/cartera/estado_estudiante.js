var url_servicios = "../../resources";
var saldo_liquidacion = 0;

$(document).ready(function () {
    
    $('#ventanaListarPagos').modal({show:false,backdrop:true});
    $('#ventanaRegistroPago').modal({show:false,backdrop:true});
    
    var prueba = "hola";
    
    if(sessionStorage.getItem("usua_usuario") == null){
        location.href = "../usuarios/autenticar.html?retorne=../cartera/estado_estudiante.html"
        return;
    }
    else{
        
        var $_GET = {};
        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
            function decode(s) {
                return decodeURIComponent(s.split("+").join(" "));
            }
            $_GET[decode(arguments[1])] = decode(arguments[2]);
        });

        if ($_GET["pege_id"] != null && $_GET["estp_id"] != null) {
           var pege_id = $_GET["pege_id"];
           var estp_id = $_GET["estp_id"];
           CargarPersonaPorPegeId(pege_id);
           CargarHistorialLiquidaciones(estp_id);
        }

        $(document).BarraSuperior({nivel:2,titulo:"Escolme Administrativo"});
        $(document).BarraLateral({link_activo:'liCarteraEstadoAlumno'});
        
        $('#bAgregarPago').button().click(function(){
            ListarTipoPagosLiquidaciones();
            $('#ventanaRegistroPago').modal('show');
        });
        
    }
});

function CargarPersonaPorPegeId(pege_id){
    $("#divDatosEstudiante").empty();
    $('#cargador').Cargador();
    $.ajax({
        type: 'GET',
        url: url_servicios + '/Personas/CargarPersonaPorPegeId/' + pege_id,
        dataType: "json",
        success: function(data){
            $("#divDatosEstudiante").html("<b>" + data.peng_PRIMERNOMBRE + " " + data.peng_SEGUNDONOMBRE + " " + 
                data.peng_PRIMERAPELLIDO + " " + data.peng_SEGUNDOAPELLIDO + " - " + data.pege_DOCUMENTOIDENTIDAD + "</b>");
        }
    });    
    $.ajax({
        type: 'GET',
        url: url_servicios + '/Programas/CargarProgramaPorEstudiantePegeId/' + pege_id,
        dataType: "json",
        success: function(data){
            $("#divDatosEstudiante").append("<br><b>Programa:</b> " + data.prog_NOMBRE);
        }
    });    
}

function CargarHistorialLiquidaciones(estp_id){
    $('#cargador').Cargador();
    $.ajax({
        type: 'GET',
        url: url_servicios + '/Liquidaciones/ListarLiquidacionesPorPersona/' + estp_id,
        dataType: "json",
        success: function(data){
            var plantilla = "<tr><td><a class='btn btn-mini' title='Ver mas detalles' rel='tooltip' href='#' onclick='CargarDetallesLiquidacion(${liqu_ID})' >" + 
                    "<i class='icon-folder-open' ></i></a></td><td><span class='${getColorEstadoPago()}'>${liqu_ESTADO}</span></td><td>${liqu_FECHACAMBIO}</td><td>${liqu_REFERENCIA}</td>" +
                    "<td  style='text-align: right;' >${getFormatoNumero(liqu_TOTALLIQUIDADO)}</td>" +
                    "<td  style='text-align: right;' >${getFormatoNumero(liqu_TOTALDESCUENTO)}</td>" + 
                    "<td  style='text-align: right;' >${getTotalPagar()}</td>" + 
                    "<td  style='text-align: right;' >${getSaldo()}</td></tr>";
            $.template( "plantilla", plantilla );
            if(data.length > 0){
                $.tmpl( "plantilla", data ).appendTo( "#tblLiquidaciones tbody" );
                var saldo_total = 0;
                for(i=0;i<data.length;i++){
                    saldo_total = saldo_total + (data[i].liqu_TOTALLIQUIDADO - data[i].liqu_TOTALDESCUENTO - data[i].liqu_VALORPAGADO);
                }
                $("#tblLiquidaciones tbody").append("<tr><th colspan='7' style='text-align: right;' >TOTAL SALDO:</th><th style='text-align: right;' >" + getFormatoNumero(saldo_total) + "</th></tr>")
            }
            else{
                $("#tblLiquidaciones tbody").append("<tr><td colspan='8'  ><div class='alert alert-info' >No se encontraron liquidaciones</div></td></tr>")
            }
        }
    });   
}

function getColorEstadoPago(){
    if(this.data.liqu_ESTADO == "PENDIENTE" ){
        return "label label-important";
    }
    else{
        return "label label-success";
    }
}

function CargarDetallesLiquidacion(LIQU_ID){
    $("#tblPagosLiquidacion tbody").empty();
    $('#cargador').Cargador();
    $.ajax({
        type: 'GET',
        url: url_servicios + '/Liquidaciones/CargarLiquidacionPorId/' + LIQU_ID,
        dataType: "json",
        async:false,
        success: function(data){
            saldo_liquidacion = data.liqu_TOTALLIQUIDADO - data.liqu_TOTALDESCUENTO - data.liqu_VALORPAGADO;
            $("#divSaldoLiqudacion").html("SALDO ACTUAL: " + getFormatoNumero(saldo_liquidacion));
            if(saldo_liquidacion > 0){
                $("#divSaldoLiqudacion").removeClass("alert-success").addClass("alert-error");
                $('#bAgregarPago').show();
            }else{
                $("#divSaldoLiqudacion").removeClass("alert-error").addClass("alert-success");
                $('#bAgregarPago').hide();
            }
        }
    });   
    $.ajax({
        type: 'GET',
        url: url_servicios + '/PagoLiquidacion/ListarPagosPorLiquidacion/' + LIQU_ID,
        dataType: "json",
        success: function(data){
            var plantilla = "<tr><td>${pali_FECHACAMBIO}</td><td>${tipl_DESCRIPCION}</td><td style='text-align: right;' >${getFormatoNumero(pali_VALOR)}</td></tr>";
            $.template( "plantilla", plantilla );
            if(data.length > 0){
                $.tmpl( "plantilla", data ).appendTo( "#tblPagosLiquidacion tbody" );
            }
            else{
                $("#tblPagosLiquidacion tbody").append("<tr><th colspan='8' >NO HAY PAGOS REGISTRADOS</th></tr>")
            }
            $('#ventanaListarPagos').modal('show');
        }
    });             
}

function getFormatoNumero(valor){
    valor = $.formatNumber(valor, {format:"#,###", locale:"us"});
    return valor != ""? "$" + valor : "$0";
}

function getTotalPagar(){
    return getFormatoNumero(this.data.liqu_TOTALLIQUIDADO - this.data.liqu_TOTALDESCUENTO);
}

function getSaldo(){
    return getFormatoNumero(this.data.liqu_TOTALLIQUIDADO - this.data.liqu_TOTALDESCUENTO - this.data.liqu_VALORPAGADO);
}

function ListarTipoPagosLiquidaciones(){
    $("#cbFormaPago").html('');
    $('#cargador').Cargador();
    $.ajax({
        type: 'GET',
        url: url_servicios + '/TipoPagoLiquidacion',
        dataType: "json",
        success: function(data){
            if(data != null){
                $('#cbFormaPago').get(0).options[$('#cbFormaPago').get(0).options.length] = new Option(" -- Seleccione la forma de pago", "");
                for (var i = 0; i < data.length; i++) {
                    var val = data[i].tipl_ID;
                    var text = data[i].tipl_DESCRIPCION;
                    $('#cbFormaPago').get(0).options[$('#cbFormaPago').get(0).options.length] = new Option(text, val);
                    
                }
            }
        }
    });
}
