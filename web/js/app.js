angular.module('EscolmeWeb', []).config(['$routeProvider', function ($routeProvider,$locationProvider) {
      $routeProvider.
          when('/', { templateUrl: 'vistas/index.html', controller: IndexCtrl }).
          when('/usuarios/login', { templateUrl: 'vistas/usuarios/login.html', controller: UsuarioLoginCtrl }).
          when('/principal', { templateUrl: 'vistas/principal.html',controller:PrincipalCtrl}).
          when('/liquidaciones', { templateUrl: 'vistas/cartera/liquidaciones.html', controller: LiquidacionesCtrl }).
          when('/cartera-estudiante', { templateUrl: 'vistas/cartera/cartera_estudiante.html', controller: CarteraEstudianteCtrl }).
          when('/facturas', { templateUrl: 'vistas/facturas/facturas.html', controller: CarteraEstudianteCtrl }).
          when('/configuracion', { templateUrl: 'vistas/configuracion/configuracion.html', controller: CarteraEstudianteCtrl }).
          otherwise({ redirectTo: '/' });
}]);
