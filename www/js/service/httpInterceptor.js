angular.module("arkabPortal").factory('httpInterceptor', ['$q', '$location', '$injector', 'appConfigKeys', 'urlConfig', function ($q, $location, $injector, appConfigKeys, urlConfig) {
    var httpInterceptor = {
        request: function (config) {

            // marco o início do request.
           
            var url = config.url;

            // identifico se a chamada é para a web api e incluo o token.
            if(url.indexOf(urlConfig.getUrlConfig().baseUrl) >= 0)
            {

                var identityService = $injector.get('identityService');
                var token = identityService.getUserIdentity().access_token;
                if (token != null)
                    config.headers['Authorization'] = 'Bearer ' + token

            }

            // desabilitar, CloudFlare cuida do cache agora.
            //if (url.indexOf('view/') > -1) {
            //    var separator = config.url.indexOf('?') === -1 ? '?' : '&';
            //    config.url = config.url + separator + 'c=' + appConfigKeys.publishVersion;
            //}

            return config;
        },
        response: function(response) {
            
            return response;
        },
        responseError: function(response){

            if (!isCordovaApp) {
                if (response.status == 401 || response.status == -1) {
                    var identityService = $injector.get('identityService');
                    var rootScope = $injector.get('$rootScope');
                    identityService.resetUserData();
                    rootScope.identity = identityService.getUserIdentity();
                    $location.path("/login");
                }
                 
            }

            

          return $q.reject(response);

        }
    };
    return httpInterceptor;
}]);
