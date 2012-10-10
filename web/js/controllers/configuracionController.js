function ConfiguracionTipoDocumentosCtrl($scope, $http, $location) {
    ValidarSession($location.path(),$scope);
    $scope.maestro = {};
    
    $scope.Limpiar = function () {
        $scope.tipoDocumentos = angular.copy($scope.maestro);
        $scope.tipoDocumentos.contipdoc_id = 0;
        $scope.tipoDocumentos.contipdoc_estado = 1;
        $('#inputTipoDocumentos').focus();
    };
    
    $scope.Guardar = function(tipoDocumentos){
        
        $scope.maestro = angular.copy(tipoDocumentos);
        
        var json_tipodocumentos = JSON.stringify($scope.maestro);
        console.dir(json_tipodocumentos);
        $http({
            method: 'POST',
            headers: 'application/json; charset=utf-8',
            url: url_servicios + '/ConfiguracionTipoDocumentos',
            data: json_tipodocumentos
        }).success(function (response) {
            alert(response.mensaje);
            $scope.maestro = {};
            $scope.Limpiar(); 
            $scope.ListarTipoDocumentos();
        });
    }
    
    $scope.ListarTipoDocumentos = function(){
        $http({
            method: 'GET',
            headers: 'application/json; charset=utf-8',
            url: url_servicios + '/ConfiguracionTipoDocumentos/ListarConfiguracionTipoDocumentos'
        }).success(function (response) {
            $scope.listaTipoDocumentos = response;
        });
    }
    
    $scope.CargarTipoDocumento = function(tipo){
        $scope.tipoDocumentos.contipdoc_id = tipo.contipdoc_id;
        $scope.tipoDocumentos.contipdoc_nombre = tipo.contipdoc_nombre;
        $scope.tipoDocumentos.contipdoc_estado = tipo.contipdoc_estado;
        console.dir($scope.tipoDocumentos);
    }
    
    $scope.Limpiar();
    $scope.ListarTipoDocumentos();
}

function ConfiguracionConceptosPagoCtrl($scope, $http, $location){
    ValidarSession($location.path(),$scope);
    $scope.maestro = {};
    
    $scope.Limpiar = function () {
        $scope.conceptosPago = angular.copy($scope.maestro);
        $scope.conceptosPago.conconpag_id = 0;
        $scope.conceptosPago.contipdoc_estado = 1;
        $('#inputTipoDocumentos').focus();
    };
    
    $scope.ListarTipoDocumentosActivos = function(){
        $http({
            method: 'GET',
            headers: 'application/json; charset=utf-8',
            url: url_servicios + '/ConfiguracionTipoDocumentos/ListarConfiguracionTipoDocumentosActivos'
        }).success(function (response) {
            $scope.listaTipoDocumentos = response;
        });
    }
    
    $scope.ListarTipoDocumentosActivos();
    $scope.Limpiar();
}


