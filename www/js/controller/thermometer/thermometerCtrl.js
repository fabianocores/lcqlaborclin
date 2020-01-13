angular.module("arkabPortal").controller("thermometerCtrl", ['$scope', 'thermometerService', '$timeout', 'urlConfig', '$routeParams',
    function ($scope, thermometerService, $timeout, urlConfig, $routeParams) {

        document.title = 'Termômetros';

        $scope.thermometerName = $routeParams.thermometerName;

        $scope.temperature = null;

        $scope.apiURL = urlConfig.getUrlConfig().baseUrl;

        $scope.picindex = -1;

        $scope.images = [];

        $scope.getTemperature = function (device, auto) {

            thermometerService.getTemperature(device).success(function (response) {

                $scope.images.push(
                    {
                        index: $scope.images.length + 1,
                        picture: response.picture
                    });

                //if ($scope.picindex == -1) {
                //    showPics();
                //}
                $scope.temperature = response;

                //$timeout(function () {
                    
                //    $scope.$apply();
                //    //console.log(response);
                //})



                //if (auto) {
                //    $timeout(function () {
                //        $scope.getTemperature(device, auto);
                        
                //    }, 60000);
                //}

            }).error(function (err, status) {
                console.log(err, status);
            });
        }

        function showPics()
        {
            if ($scope.picindex == -1) {
                $scope.picindex = 0;
            }

            if ($scope.picindex == $scope.images.length-1) {
                $scope.picindex = 0;
            }
            else
            {
                $scope.picindex = $scope.picindex + 1;
                
            }

            $scope.selectedpic = $scope.images[$scope.picindex];

            $timeout(function () { showPics(); }, 3000);

        }

        $scope.getTemperaturePerHour = function (device) {



            thermometerService.getTemperaturePerHour(device).success(function (response) {

                $scope.temperaturePerHour = response;

                var temperaturePerHourChartData = [];
                var temperaturePerHourChartData2 = [];

                $.each(response, function (index, value) {

                    var localOffset = (-1) * new Date().getTimezoneOffset() * 60000;

                    temperaturePerHourChartData.push([

                        new Date(value.createdate).getTime() + localOffset, value.mintemp, value.maxtemp
                    ]);
                    temperaturePerHourChartData2.push([

                        new Date(value.createdate).getTime() + localOffset, value.avgtemp
                    ]);


                });
                $scope.temperaturesPerHourChart = null;
                $scope.temperaturesPerHourChart = {
                    ranges: temperaturePerHourChartData,
                    temperatures: temperaturePerHourChartData2
                }

                //$scope.temperaturePerHourChartData = temperaturePerHourChartData;

            }).error(function (err, status) {
                console.log(err, status);
            });
        }



        function temperatureLoop() {
            $scope.getTemperature($scope.thermometerName, true);
            $scope.getTemperaturePerHour($scope.thermometerName);

            $timeout(function () {
                if (typeof temperatureLoop === 'function' && $scope.thermometerName) {
                    temperatureLoop();
                }
            }, 10000);

        }


        function thermometersLoop() {

            $scope.getThermometers();

            $timeout(function () {
                if (typeof thermometersLoop === 'function' && !$scope.thermometerName) {
                    thermometersLoop();
                }
            }, 10000);

        }


        $scope.getThermometers = function () {
            thermometerService.getThermometers().success(function (response) {

                $scope.thermometers = response;

            }).error(function (err, status) {
                console.log(err, status);
            });
        }

        if ($scope.thermometerName) {

            temperatureLoop();

        }
        else {
            thermometersLoop();
        }



        $scope.$on('$destroy', function () {
            temperatureLoop = null;
            thermometersLoop = null;
        });

        
    }]);
