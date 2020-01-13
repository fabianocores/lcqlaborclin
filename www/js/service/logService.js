angular.module("arkabPortal").service("logService", ['$http', 'appConfig', 'urlConfig', function ($http, appConfig, urlConfig) {

    this.info = function (value, params) {
        if (appConfig.getAppConfig().development) {
            if (params) {
                console.info(value, params);
            }
            else {
                console.info(value);
            }
        }




    }
    this.xhrerror = function (op, err, status) {
        if (appConfig.getAppConfig().development) {
            console.error('XHR ' + op + ' returned code ' + status, err);
        }
    }
    this.error = function (err, params) {
        if (appConfig.getAppConfig().development) {
            if (params) {
                console.error(err, params);
            }
            else {
                console.error(err);
            }
        }


    }


}]);



// angular.module("arkabPortal").service("queueService", function ($rootScope, $http, appConfig) {

//   this.getQueueList = function()
//   {

//       var token = $rootScope.identity.token.access_token;

//       if(token == undefined)
//       {
//           return null;
//       }

//       return $http({
//                 url: urlConfig.getUrlConfig().baseUrl + "Queue/GetQueueList",
//                 method: "GET",
//                 headers: { 'Authorization': 'Bearer ' + token }
//     });

//   };



// });
