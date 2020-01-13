angular.module("arkabPortal").service("industryService", ['$http', 'urlConfig', '$q', function ($http, urlConfig, $q) {

    this.getPermissions = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Industry/GetPermissions",
            method: "GET"
        });

    };

    this.getUserPermissions = function (userid) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Industry/GetUserPermissions/" + userid,
            method: "GET"
        });

    };

    this.putPermission = function (permission) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Industry/PutPermission",
            method: "PUT",
            data: permission
        });

    }

    this.getProductMRP = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Industry/MRP/Products",
            method: "GET"
        });

    };

    this.postWorkOrders = function (postops) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Industry/PostWorkOrders",
            method: "POST",
            data: {
                oplist: postops
            }
        });

    };

    this.postWorkOrder = function (wo) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Industry/PostWorkOrder",
            method: "POST",
            data: wo
        });

    };

    this.getWorkingOrderIntegrationStatus = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Industry/GetWorkingOrderIntegrationStatus/" + id,
            method: "GET"
        });

    };

    this.getMaterialMRP = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Industry/MRP/Materials",
            method: "GET"
        });
    };

    this.getScenarios = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Industry/MRP/Scenarios",
            method: "GET"
        });
    };

    this.getMRPWarehouses = function (ordertype) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Industry/MRP/Warehouses/" + ordertype,
            method: "GET"
        });
    };

    this.getRecommendations = function (p) {

        var params = angular.copy(p);

        if (params.startdate) {
            params.startdate = formatPtBrDate(params.startdate);
        }
        if (params.enddate) {
            params.enddate = formatPtBrDate(params.enddate);
        }

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Industry/MRP/GetRecommendations",
            method: "POST",
            data: params
        });
    };


}]);
