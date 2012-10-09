function LiquidacionesCtrl($scope, $http, $location) {
    ValidarSession($location.path(),$scope);
}

function CarteraEstudianteCtrl($scope, $http, $location) {
    ValidarSession($location.path(),$scope);
}
