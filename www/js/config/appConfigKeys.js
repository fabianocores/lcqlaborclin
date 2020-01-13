angular.module("arkabPortal").constant("appConfigKeys", {

    googleMapsAPIKey: 'AIzaSyBNeYTBeIZb23_4fE2Ox5a6weXcH6FoS3M',
    googleAnalyticsKey: 'UA-86794666',
    googleMapsAPIUrl: 'https://maps.googleapis.com/maps/api/geocode/json',

    publishVersion: '2019-09-06-1600'


});

angular.module("arkabPortal").constant("appConfigComponents", {

    //daterangepicker
    daterangeoptions: {
        "autoApply": false,
        "autoUpdateInput": true,
        ranges: {
            'Hoje': [moment(), moment()],
            'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Este mês': [moment().startOf('month'), moment().endOf('month')],
            'Mês passado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Últimos 7 dias': [moment().subtract(6, 'days'), moment()],
            'Últimos 30 dias': [moment().subtract(29, 'days'), moment()],
            'Próximos 7 dias': [moment(), moment().add(6, 'days')],
            'Próximos 30 dias': [moment(), moment().add(29, 'days')],
            'Próximo mês': [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')],
            'Este ano': [moment().startOf('year'), moment()],
            'Ano passado': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
        },
        "locale": {
            "format": "DD/MM/YYYY",
            "separator": " até ",
            "applyLabel": "Aplicar",
            "cancelLabel": "Limpar",
            "fromLabel": "De",
            "toLabel": "Até",
            "customRangeLabel": "Especificar",
            "weekLabel": "W",
            "daysOfWeek": [
                "D",
                "S",
                "T",
                "Q",
                "Q",
                "S",
                "S"
            ],
            "monthNames": [
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro"
            ],
            "firstDay": 1
        },
        "linkedCalendars": false,
        "alwaysShowCalendars": false,
        "minDate": moment().subtract(2, 'years'),
        "maxDate": moment().add(2, 'year'),
        "showDropdowns": false,
    }


});

angular.module("arkabPortal").service("urlConfig", ['$window', 'urlConfigParams', function ($window, urlConfigParams) {


    var config = urlConfigParams.config;

    if (isCordovaApp) {
        config.protocol = $window.localStorage.getItem('protocol');
        config.baseUrl = $window.localStorage.getItem('baseUrl');
        config.dataProfile = $window.localStorage.getItem('dataProfile');
        config.googleAnalyticsChild = $window.localStorage.getItem('googleAnalyticsChild');
    }

    this.getUrlConfig = function () {
        return config;
    }

    this.valid = function () {

        if (!config.baseUrl || !config.dataProfile || !config.googleAnalyticsChild)
            return false;
        else
            return true;
    }

}]);