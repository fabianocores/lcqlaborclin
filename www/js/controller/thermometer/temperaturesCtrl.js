angular.module("arkabPortal").controller("temperaturesCtrl", ['$scope', 'thermometerService', '$timeout', 'urlConfig', '$routeParams',
    function ($scope, thermometerService, $timeout, urlConfig, $routeParams) {

        document.title = 'Temperaturas';

        $scope.thermometerName = $routeParams.thermometerName;

        $scope.apiURL = urlConfig.getUrlConfig().baseUrl;

        $scope.getTemperatures = function (device) {

            $scope.temperaturesPerHourChart = null;
            
            $scope.loading = true;

            thermometerService.getTemperatures(device).success(function (response) {

                
                var temperaturePerHourChartData = [];
                var temperaturePerHourChartData2 = [];

                $.each(response, function (index, value) {

                    var localOffset = (-1) * new Date().getTimezoneOffset() * 60000;

                    temperaturePerHourChartData2.push([

                        new Date(value.createdate).getTime() + localOffset, value.temperature
                    ]);


                });

                $scope.temperatures = response;

                
                $scope.temperaturesPerHourChart = {
                    ranges: temperaturePerHourChartData,
                    temperatures: temperaturePerHourChartData2
                }

                //$scope.temperaturePerHourChartData = temperaturePerHourChartData;

                $scope.loading = false;

                $timeout(function () {
                    if (typeof $scope.getTemperatures === 'function') {
                        $scope.getTemperatures($scope.thermometerName);
                    }
                    
                }, 60000*5)

            }).error(function (err, status) {
                console.log(err, status);
                $scope.loading = false;
            });
        }

        $scope.getTemperatures($scope.thermometerName);


        $scope.$on('$destroy', function () {
            $scope.getTemperatures = null;
        });
        
    }]);
