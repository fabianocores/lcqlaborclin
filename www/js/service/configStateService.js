angular.module("arkabPortal").service("configStateService", [function () {

    var appConfigState = {
        preparing: true
    };

    this.getAppConfigState = function () {
        return appConfigState;
    }

    this.setAppConfigState = function (newState) {
        appConfigState = newState;
        appConfigState.preparing = false;
    }


}]);

angular.module("arkabPortal").service("appConfig", ['configStateService', function (configStateService) {

    this.getAppConfig = function () {
        return configStateService.getAppConfigState();
    }


}]);





//if (!configStateService.getAppConfigState()) {


//    $http({
//        url: urlConfig.getUrlConfig().baseUrl + "Adm/GetWebAPPConfig/" + urlConfig.getUrlConfig().dataProfile,
//        method: "GET"
//    }).success(function (response) {

//        console.log(response);

//        configStateService.setAppConfigState(response);

//        return configStateService.getAppConfigState();


//    }).error(function (err, status) {
//        $location.path('/404');
//        console.log(err, status);
//    });

           
//}
//else
//{
//    return configStateService.getAppConfigState();
//}
