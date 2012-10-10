var filters = angular.module('EscolmeWeb.filters', []);

filters.filter('FormatoEstadoIcono', function () {
    return function (d) {
        if(d == 1)
            return "icon-ok";
        else
            return "icon-trash";
    };
});

