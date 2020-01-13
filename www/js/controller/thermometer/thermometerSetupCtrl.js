angular.module("arkabPortal").controller("thermometerSetupCtrl", ['$scope', 'thermometerService', '$timeout', 'urlConfig', '$routeParams',
    function ($scope, thermometerService, $timeout, urlConfig, $routeParams) {

        document.title = 'Configurar termômetro';

        $scope.thermometerName = $routeParams.thermometerName;

        $scope.apiURL = urlConfig.getUrlConfig().baseUrl;

        $scope.speech_variations = [
            { code: 1, name: 'Variação 1' },
            { code: 2, name: 'Variação 2' },
            { code: 3, name: 'Variação 3' },
            { code: 4, name: 'Variação 4' },
            { code: 5, name: 'Variação 5' },
        ]

        $scope.getThermometer = function (device) {

            $scope.loading = true;

            thermometerService.getThermometer(device).success(function (response) {

                
                $scope.thermometer = response;

                $scope.loading = false;

            }).error(function (err, status) {
                console.log(err, status);
                $scope.loading = false;
            });
        }

        $scope.putThermometer = function(thermometer)
        {
            thermometerService.putThermometer(thermometer).success(function (response) {
                console.log(response);
            }).error(function (err, status) {
                console.log(err, status);
            });
        }

        $scope.getThermometer($scope.thermometerName);
        
    }]);
