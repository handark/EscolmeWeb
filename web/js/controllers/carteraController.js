function LiquidacionesCtrl($scope, $http, $location) {
    ValidarSession($location.path(),$scope);
    var ano = (new Date).getFullYear();
    $scope.parametros = {
        periodoAno: parseInt(ano),
        periodoId:0,
        liquidacionEstado:'TODO'
    };
    
    $scope.ListarPeriodosAcademicos = function(){
        $http({
            method: 'GET',
            headers: 'application/json; charset=utf-8',
            url: url_servicios + '/PeriodoUniversidad/ListarPeriodosUniversidad/' + $scope.parametros.periodoAno
        }).success(function (response) {
            $scope.periodosAcademicos = response;
            console.dir($scope.periodosAcademicos);
        });
    }
    
    $scope.CargarLiquidacionesPorPeriodo = function(){
        $("#tblLiquidaciones tbody").empty();
        $("#tblLiquidaciones tfoot").empty();
        var estado = $scope.parametros.liquidacionEstado;
        var peun_ID = $scope.parametros.periodoId;
        var total_saldos = 0;
        $.ajax({
            type: 'GET',
            url: url_servicios + '/Liquidaciones/ListarLiquidacionesPorPagar/' + peun_ID + '/' + estado,
            dataType: "json",
            success: function(data){

                for(i=0;i<data.length;i++){
                    total_saldos = total_saldos + (data[i].liqu_TOTALLIQUIDADO - data[i].liqu_TOTALDESCUENTO - data[i].liqu_VALORPAGADO);
                }
                var plantilla = "<tr><td style='width:100px' ><a class='btn btn-mini' title='Ver mas detalles para ${getNombreEstudiante()}' rel='tooltip' href='estado_estudiante.html?pege_id=${pege_ID}&estp_id=${estp_ID}&peun_id=${peun_ID}' ><i class='icon-folder-open' ></i></a> <a class='btn btn-mini' title='Adjuntar Archivo' rel='tooltip' onclick='AbrirVentanaAdjuntar(${pege_ID})' ><i class='icon-upload' ></i></a> <a class='btn btn-mini' style='display: ${EstablecerEstadoAdjunto()};' title='Abrir Adjunto' rel='tooltip' target='_blank' href='../../files/${liad_ARCHIVO}' ><i class='icon-file' ></i></a></td>" 
                    + "<td>${getNombreEstudiante()}</td><td><span class='${getColorEstadoPago()}'>${liqu_ESTADO}</span></td><td>${liqu_FECHACAMBIO}</td><td>${liqu_REFERENCIA}</td><td  style='text-align: right;' >${getFormatoNumero(liqu_TOTALLIQUIDADO)}</td><td  style='text-align: right;' >${getFormatoNumero(liqu_TOTALDESCUENTO)}</td><td  style='text-align: right;' >${getTotalPagar()}</td><td  style='text-align: right;' >${getSaldo()}</td></tr>";
                $.template( "plantilla", plantilla );
                if(data.length > 0){
                    $.tmpl( "plantilla", data ).appendTo( "#tblLiquidaciones tbody" );
                    $("#tblLiquidaciones tfoot").append("<tr><th colspan='8' style='text-align: right;' >TOTAL SALDO:</th><th style='text-align: right;' >" + getFormatoNumero(total_saldos) + "</th></tr>");
                }
                else{
                    $("#tblLiquidaciones tbody").append("<tr><td colspan='7' ><div class='alert alert-info' >No se encontraron liquidaciones con pagos pendientes</div></td></tr>")
                }
            }
        });   
    }
    
    //al cargar la vista
    $scope.ListarPeriodosAcademicos();
    
}

function CarteraEstudianteCtrl($scope, $http, $location) {
    ValidarSession($location.path(),$scope);
}
