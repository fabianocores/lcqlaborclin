angular.module("arkabPortal").controller("homeCtrl", ['$scope', 'identityService', 'appConfig', '$location', 'urlConfig', 'lcqService', 'appConfigKeys',
    function ($scope, identityService, appConfig, $location, urlConfig, lcqService, appConfigKeys) {

        document.title = 'Home';

        $scope.isCordovaApp = isCordovaApp;

        //console.log('Home', appConfig.getAppConfig());

        $scope.appConfig = appConfig.getAppConfig();

        $scope.appConfigKeys = appConfigKeys;

        $scope.identity = identityService.getUserIdentity();

        $scope.apiURL = urlConfig.getUrlConfig().baseUrl;

        $scope.myInterval = (appConfig.getAppConfig().carouselSlideTimer ? appConfig.getAppConfig().carouselSlideTimer : 6000);

        $scope.init = function()
        {

            var chartStatusLote = [];
            var chartStatusLoteFechado = [];
            var chartTipoAnalise = [];
            var chartGrupo = [];
            
            lcqService.getIndicadoresLCQ().success(function (response) {
                $scope.indicadores = response;

                $.each(response.statuslote, function (index, value) {
                    chartStatusLote.push({
                        name: value.label, y: value.quantity
                    });
                });

                $.each(response.statuslotefechado, function (index, value) {
                    chartStatusLoteFechado.push({
                        name: value.label, y: value.quantity
                    });
                });

                $.each(response.tipoanalise, function (index, value) {
                    chartTipoAnalise.push({
                        name: value.label, y: value.quantity
                    });
                });

                $.each(response.grupo, function (index, value) {
                    chartGrupo.push({
                        name: value.label, y: value.quantity
                    });
                });

                $scope.chartStatusLote = chartStatusLote;

                $scope.chartStatusLoteFechado = chartStatusLoteFechado;

                $scope.chartTipoAnalise = chartTipoAnalise;

                $scope.chartGrupo = chartGrupo;

            }).error(function (err, status) {
                console.log(err, status);
            });
        }


        $scope.init();

    }]);
