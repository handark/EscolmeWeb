var url_servicios = "../../resources";

$(document).ready(function () {
    if(sessionStorage.getItem("usua_usuario") == null){
        location.href = "../usuarios/autenticar.html?retorne=../cartera/liquidaciones.html"
        return;
    }
    else{
        $(document).BarraSuperior({nivel:2,titulo:"Escolme Administrativo"});
        $(document).BarraLateral({link_activo:'liLiquidaciones'});
        $('#tAnoPeriodo').val((new Date).getFullYear());
        ListarPeriodosAcademicos();
        $('#cbPeriodosAcademicos').change(function(){
            if($(this).val() != ""){
                CargarLiquidacionesPorPeriodo($(this).val());
            }
            else
                $("#tblLiquidaciones tbody").empty();
        });
        $('#cbEstadoLiquidacion').change(function(){
            if($('#cbPeriodosAcademicos').val() != ""){
                CargarLiquidacionesPorPeriodo($('#cbPeriodosAcademicos').val());
            }
            else
                $("#tblLiquidaciones tbody").empty();
        });
//         $('#cbPeriodosAcademicos').change(function(){
//             ListarPeriodosAcademicos();
//         });
    }
});

function CargarLiquidacionesPorPeriodo(peun_ID){
    if($("#tblLiquidaciones").css("display") == "none")
        $("#tblLiquidaciones").show();
    $("#tblLiquidaciones tbody").empty();
    $('#cargador').Cargador();
    var estado = $('#cbEstadoLiquidacion').val();
    $.ajax({
        type: 'GET',
        url: url_servicios + '/Liquidaciones/ListarLiquidacionesPorPagar/' + peun_ID + '/' + estado,
        dataType: "json",
        success: function(data){
            var plantilla = "<tr><td><a class='btn btn-mini' title='Ver mas detalles para ${getNombreEstudiante()}' rel='tooltip' href='estado_estudiante.html?pege_id=${pege_ID}&estp_id=${estp_ID}&peun_id=${peun_ID}' ><i class='icon-folder-open' ></i></a></td>" 
                + "<td>${getNombreEstudiante()}</td><td><span style=color:${getColorEstadoPago()} >${liqu_ESTADO}</span></td><td>${liqu_FECHACAMBIO}</td><td>${liqu_REFERENCIA}</td><td  style='text-align: right;' >${getFormatoNumero(liqu_TOTALLIQUIDADO)}</td><td  style='text-align: right;' >${getFormatoNumero(liqu_TOTALDESCUENTO)}</td><td  style='text-align: right;' >${getTotalPagar()}</td><td  style='text-align: right;' >${getSaldo()}</td></tr>";
            $.template( "plantilla", plantilla );
            if(data.length > 0){
                $.tmpl( "plantilla", data ).appendTo( "#tblLiquidaciones tbody" );
            }
            else{
                $("#tblLiquidaciones tbody").append("<tr><td colspan='7' ><div class='alert alert-info' >No se encontraron liquidaciones con pagos pendientes</div></td></tr>")
            }
        }
    });   
}

function getColorEstadoPago(){
    if(this.data.liqu_ESTADO == "PENDIENTE" ){
        return "red";
    }
    else{
        return "green";
    }
}

function getFormatoNumero(valor){
    valor = $.formatNumber(valor, {format:"#,###", locale:"us"});
    return valor != ""? "$" + valor : "0";
}

function getNombreEstudiante(){
    return this.data.peng_PRIMERNOMBRE + " " + this.data.peng_PRIMERAPELLIDO;
}

function getTotalPagar(){
    return getFormatoNumero(this.data.liqu_TOTALLIQUIDADO - this.data.liqu_TOTALDESCUENTO);
}

function getSaldo(){
    return getFormatoNumero(this.data.liqu_TOTALLIQUIDADO - this.data.liqu_TOTALDESCUENTO - this.data.liqu_VALORPAGADO);
}

function ListarPeriodosAcademicos(){
    var ano = $('#tAnoPeriodo').val();
    $("#cbPeriodosAcademicos").html('');
    $('#cargador').Cargador();
    $.ajax({
        type: 'GET',
        url: url_servicios + '/PeriodoUniversidad/ListarPeriodosUniversidad/' + ano,
        dataType: "json",
        success: function(data){
            if(data != null){
                $('#cbPeriodosAcademicos').get(0).options[$('#cbPeriodosAcademicos').get(0).options.length] = new Option(" -- Seleccione un Periodo Academico", "");
                for (var i = 0; i < data.length; i++) {
                    var val = data[i].peun_ID;
                    var text = data[i].peun_ANO + " - " + data[i].peun_PERIODO + " " + data[i].tppa_DESCRIPCION;
                    $('#cbPeriodosAcademicos').get(0).options[$('#cbPeriodosAcademicos').get(0).options.length] = new Option(text, val);
                    
                }
            }
        }
    });
}


