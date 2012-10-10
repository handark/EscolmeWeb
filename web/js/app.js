angular.module('SharedServices', ['EscolmeWeb.filters'])
    .config(function ($httpProvider) {
        $httpProvider.responseInterceptors.push('myHttpInterceptor');
        var spinnerFunction = function (data, headersGetter) {
            // todo start the spinner here
            //alert('start spinner');
            $('#divCargador').show();
            return data;
        };
        $httpProvider.defaults.transformRequest.push(spinnerFunction);
    })
// register the interceptor as a service, intercepts ALL angular ajax http calls
    .factory('myHttpInterceptor', function ($q, $window) {
        return function (promise) {
            return promise.then(function (response) {
                // do something on success
                // todo hide the spinner
                $('#divCargador').hide();
                return response;

            }, function (response) {
                // do something on error
                // todo hide the spinner
                $('#divCargador').hide();
                return $q.reject(response);
            });
        };
    })

angular.module('EscolmeWeb', ['SharedServices']).config(['$routeProvider', function ($routeProvider,$locationProvider) {
      $routeProvider.
          when('/', { templateUrl: 'vistas/index.html', controller: IndexCtrl }).
          when('/usuarios/login', { templateUrl: 'vistas/usuarios/login.html', controller: UsuarioLoginCtrl }).
          when('/principal', { templateUrl: 'vistas/principal.html',controller:PrincipalCtrl}).
          when('/liquidaciones', { templateUrl: 'vistas/cartera/liquidaciones.html', controller: LiquidacionesCtrl }).
          when('/cartera-estudiante', { templateUrl: 'vistas/cartera/cartera_estudiante.html', controller: CarteraEstudianteCtrl }).
          when('/facturas', { templateUrl: 'vistas/facturas/facturas.html', controller: CarteraEstudianteCtrl }).
          when('/configuracion/tipo-documentos', { templateUrl: 'vistas/configuracion/tipo_documentos.html', controller: ConfiguracionTipoDocumentosCtrl }).
          when('/configuracion/conceptos-pago', { templateUrl: 'vistas/configuracion/conceptos_pago.html', controller: ConfiguracionConceptosPagoCtrl }).
          otherwise({ redirectTo: '/' });
}]);
