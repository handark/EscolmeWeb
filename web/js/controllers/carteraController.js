function LiquidacionesCtrl($scope, $http, $location) {
    ValidarSession($location.path(),$scope);
    var ano = (new Date).getFullYear();

    $scope.currentPage = 0;
    $scope.pageSize = 25;
    $scope.listaLiquidaciones =[];

    $scope.parametros = {
        periodoAno: parseInt(ano),
        periodoId:0,
        liquidacionEstado:''
    };
    
    $scope.ListarPeriodosAcademicos = function(){
        $http({
            method: 'GET',
            headers: 'application/json; charset=utf-8',
            url: url_servicios + '/PeriodoUniversidad/ListarPeriodosUniversidad/' + $scope.parametros.periodoAno
        }).success(function (response) {
            $scope.periodosAcademicos = response;
//            $('.unitprice').each(function(index) {
//                totalUnitPrice += $(this).val();
//            });
        });
    }
    
    $scope.CargarLiquidacionesPorPeriodo = function(){
        var estado = $scope.parametros.liquidacionEstado;
        var peun_ID = $scope.parametros.periodoId;
        var saldo = 0;
        $scope.totalSaldos = saldo;

        if(estado != ""){
            $http({
                method: 'GET',
                headers: 'application/json; charset=utf-8',
                url: url_servicios + '/Liquidaciones/ListarLiquidacionesPorPagar/' + peun_ID + '/' + estado
            }).success(function (response) {
                $scope.listaLiquidaciones = response;
                $.each($scope.listaLiquidaciones, function(index, value) { 
                    saldo = saldo + (value.liqu_TOTALLIQUIDADO - value.liqu_TOTALDESCUENTO - value.liqu_VALORPAGADO); 
                });
                $scope.totalSaldos = saldo;
               // $scope.totalSaldos.$digest();
            });
        }
    }
    
    $scope.numberOfPages=function(){
        return Math.ceil($scope.listaLiquidaciones.length/$scope.pageSize);                
    }
    
    //al cargar la vista
    $scope.ListarPeriodosAcademicos();
    
}

function CarteraEstudianteCtrl($scope, $http, $location) {
    ValidarSession($location.path(),$scope);
}
