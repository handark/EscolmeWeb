var url_servicios = "../../resources";

$(document).ready(function () {
    
    $('#ventana_lpagos').modal({show:false,backdrop:true});
    
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
    }
});

function CargarPersonaPorPegeId(pege_id){
    $('#cargador').Cargador();
    $.ajax({
        type: 'GET',
        url: url_servicios + '/Personas/CargarPersonaPorPegeId/' + pege_id,
        dataType: "json",
        success: function(data){
            $("#hDatosEstudiante").html(data.peng_PRIMERNOMBRE + " " + data.peng_SEGUNDONOMBRE + " " + 
                data.peng_PRIMERAPELLIDO + " " + data.peng_SEGUNDOAPELLIDO + " - " + data.pege_DOCUMENTOIDENTIDAD);
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
                    "<i class='icon-folder-open' ></i></a></td><td>${liqu_ESTADO}</td><td>${liqu_FECHACAMBIO}</td><td>${liqu_REFERENCIA}</td>" +
                    "<td  style='text-align: right;' >${getFormatoNumero(liqu_TOTALLIQUIDADO)}</td>" +
                    "<td  style='text-align: right;' >${getFormatoNumero(liqu_TOTALDESCUENTO)}</td>" + 
                    "<td  style='text-align: right;' >${getTotalPagar()}</td></tr>";
            $.template( "plantilla", plantilla );
            if(data.length > 0){
                $.tmpl( "plantilla", data ).appendTo( "#tblLiquidaciones tbody" );
            }
            else{
                $("#tblLiquidaciones tbody").append("<tr><td colspan='7' ><div class='alert alert-info' >No se encontraron liquidaciones</div></td></tr>")
            }
        }
    });   
}

function CargarDetallesLiquidacion(LIQU_ID){
    $("#tblPagosLiquidacion tbody").empty();
    $('#cargador').Cargador();
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
            $('#ventana_lpagos').modal('show');
        }
    });         
    
}

function getFormatoNumero(valor){
    valor = $.formatNumber(valor, {format:"#,###", locale:"us"});
    return valor != ""? "$" + valor : "0";
}

function getTotalPagar(){
    return getFormatoNumero(this.data.liqu_TOTALLIQUIDADO - this.data.liqu_TOTALDESCUENTO);
}