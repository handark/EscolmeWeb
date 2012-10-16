var filters = angular.module('EscolmeWeb.filters', []);

filters.filter('FormatoEstadoIcono', function () {
    return function (d) {
        if(d == 1)
            return "icon-ok";
        else
            return "icon-trash";
    };
});

filters.filter('ColorEstadoPago', function () {
    return function (d) {
        switch(d){
            case "PENDIENTE":;
                return "label label-important";
            case "CARTERA":;
                return "label label-info";
            default:
                return "label label-success";
        }
    };
});

filters.filter('FormatoMoneda', function () {
    return function (d) {
        var valor = $.formatNumber(d, {format:"#,###", locale:"us"});
        return valor != ""? "$" + valor : "0";
    };
});

filters.filter('EstiloBotonVerAdjunto', function () {
    return function (d) {
        if(d != null){
           return "inline";
        }
        else{
            return "none";
        }
    };
});

filters.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

