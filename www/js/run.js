angular.module('arkabPortal').run(['$rootScope', '$location', 'identityService', 'blackLists', 'appConfig', 'appConfigKeys', '$window', 'urlConfig', 'configStateService', function ($rootScope, $location, identityService, blackLists, appConfig, appConfigKeys, $window, urlConfig, configStateService) {

    var openRoutes = ['/login', '/remember', '/order/pdf/', '/setup', '/lcq/certificado/'];

    var representativesBlackList = blackLists.representativesBlackList;

    var resellersBlackList = blackLists.resellersBlackList;

    $rootScope.identity = { userName: 'Visitante', isAuthenticated: false, token: {} };

    $rootScope.requested_url = '';

    
    function init() {
        
        $rootScope.$on('$routeChangeStart', function (event, next, current) {

            $("#notificationContainer").fadeOut("fast");

            var path = $location.$$path;

            if (path.substring(0, 11) == '/order/pdf/') {
                path = '/order/pdf/';
            }

            if (path.substring(0, 17) == '/lcq/certificado/') {
                path = '/lcq/certificado/';
            }

            // store location user is trying to visit, for use in auto login rootCtrl, only if in the open routes.
            var foundlast = $.inArray(path, openRoutes) > -1;

            if (!foundlast) {
                $rootScope.requested_url = path;
            }

            // first: authentication check
            if (!$rootScope.identity.isAuthenticated) {

                // verifico cookie do token.
                var found = $.inArray(path, openRoutes) > -1;

                //console.log(path, found);

                if (!found || path == '/') {
                    $location.path('/login');
                    return;
                }
            }
            else {
                // if authenticated, roles check
                var roles = identityService.getUserIdentity().roles;

                if (identityService.getUserIdentity().reseller) {
                    //console.log(path);
                    //console.log(path.substring(1, 9));
                    //if (path.substring(1, 9) != 'reseller') {
                    //    $location.path('/reseller');
                    //}

                    //console.log(path);
                    //console.log(path.substring(1, 10));
                }

                if (roles != null && path != '/') {

                    if (!identityService.getUserIdentity().controlpanel && path.substring(0, 4) == '/adm') {
                        $location.path('/404');
                        return false;
                    }

                    if (roles.toUpperCase() == 'REPRESENTANTE' || roles.toUpperCase() == 'VENDEDOR' || roles.toUpperCase() == 'REVENDA') {

                        $.each(representativesBlackList, function (index, value) {

                            if (value.option == 'path') {

                                // block the specific path
                                if (path.toUpperCase() == value.path.toUpperCase()) {
                                    $location.path('/404');
                                    return false;
                                }
                            }
                            else {
                                // block the hole domain
                                if (path.toUpperCase().indexOf(value.path.toUpperCase()) != -1) {
                                    $location.path('/404');
                                    return false;
                                }
                            }


                        });

                        //var foundBlackList = $.inArray($location.url(), representativesBlackList) > -1;

                        //if (foundBlackList) {
                        //    $location.path('/unauthorized');
                        //    return;
                        //}
                    }

                    if (roles.toUpperCase() == 'REVENDA') {

                        $.each(resellersBlackList, function (index, value) {

                            if (value.option == 'path') {

                                // block the specific path
                                if (path.toUpperCase() == value.path.toUpperCase()) {
                                    $location.path('/404');
                                    return false;
                                }
                            }
                            else {
                                // block the hole domain
                                if (path.toUpperCase().indexOf(value.path.toUpperCase()) != -1) {
                                    $location.path('/404');
                                    return false;
                                }
                            }


                        });

                        //var foundBlackList = $.inArray($location.url(), representativesBlackList) > -1;

                        //if (foundBlackList) {
                        //    $location.path('/unauthorized');
                        //    return;
                        //}
                    }
                }

            }



        });
    }


    init();


    
    




    






}]);