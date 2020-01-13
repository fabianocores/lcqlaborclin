angular.module("arkabPortal").service("thermometerService", ['$http', 'urlConfig', '$q', function ($http, urlConfig, $q) {

    this.getTemperature = function (device) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Thermometer/GetTemperature/" + device,
            method: "GET"
        });

    };

    this.getTemperaturePerHour = function (device) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Thermometer/GetTemperaturePerHour/" + device,
            method: "GET"
        });

    };

    this.getThermometers = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Thermometer/GetThermometers",
            method: "GET"
        });

    };

    this.getThermometer = function (device) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Thermometer/GetThermometer/" + device,
            method: "GET"
        });

    };

    this.putThermometer = function (device) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Thermometer/PutThermometer",
            method: "PUT",
            data: device
        });

    };

    this.getTemperatures = function (device) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Thermometer/GetTemperatures/" + device,
            method: "GET"
        });

    };

}]);
