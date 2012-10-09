function PrincipalCtrl($scope, $http, $location) {
    ValidarSession($location.path(),$scope);
}
