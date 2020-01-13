//angular.module('arkabPortal').config(function ($compileProvider) {

//    $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
//});

angular.module("arkabPortal").config(['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider',
    function ($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

        //var version = "24";

        $routeProvider.when('/login', { templateUrl: 'view/login.html', controller: 'rootCtrl' })
            .when('/about', { templateUrl: 'view/about.html', controller: 'aboutCtrl', })
            .when('/unauthorized', { templateUrl: 'view/unauthorized.html', controller: 'unauthorizedCtrl' })
            .when('/404', { templateUrl: 'view/unauthorized.html', controller: 'unauthorizedCtrl' })
            .when('/remember', { templateUrl: 'view/public/remember.html', controller: 'rememberCtrl' })
            .when('/setup', { templateUrl: 'view/public/setup.html', controller: 'setupCtrl' })
            .when('/remember?token=":token"&email=":email"', { templateUrl: 'view/public/remember.html', controller: 'rememberCtrl' })
            .when('/adm', { templateUrl: 'view/adm/adm.html', controller: 'admCtrl' })
            //.when('/adm/newuser', { templateUrl: 'view/adm/newuser.html', controller: 'admNewUserCtrl' })

            .when('/adm/lcq', { templateUrl: 'view/adm/lcq/lcq.html', controller: 'admLcqCtrl' })
            .when('/adm/lcq/permissions', { templateUrl: 'view/adm/lcq/permissions.html', controller: 'admLcqPermissionsCtrl' })
            .when('/adm/lcq/statuslote', { templateUrl: 'view/adm/lcq/statuslote.html', controller: 'admLcqStatusLoteCtrl' })
            .when('/adm/industry', { templateUrl: 'view/adm/industry/industry.html', controller: 'admIndustryCtrl' })
            .when('/adm/industry/permissions', { templateUrl: 'view/adm/industry/permissions.html', controller: 'admIndustryPermissionsCtrl' })
            .when('/', { templateUrl: 'view/home.html', controller: 'homeCtrl' })
            .when('/home', { templateUrl: 'view/home.html', controller: 'homeCtrl' })

            .when('/adm/userprofile/:userid', { templateUrl: 'view/adm/userProfile.html', controller: 'admUserCtrl' })
            .when('/adm/userprofile', { templateUrl: 'view/adm/userProfile.html', controller: 'admUserCtrl' })

            .when('/profile', { templateUrl: 'view/userProfile.html', controller: 'userProfileCtrl' })
            .when('/lcq/ficha/:code', { templateUrl: 'view/lcq/lcq.html', controller: 'lcqFichaCtrl' })
            .when('/lcq', { templateUrl: 'view/lcq/lcq.html', controller: 'lcqCtrl' })
            .when('/lcq/ficha/:code', { templateUrl: 'view/lcq/lcqFicha.html', controller: 'lcqFichaCtrl' })
            .when('/lcq/ficha/:code', { templateUrl: 'view/lcq/lcqFicha.html', controller: 'lcqFichaCtrl' })
            .when('/lcq/certificado/:code', { templateUrl: 'view/lcq/lcqCertificado.html', controller: 'lcqCertificadoCtrl' })
            .when('/thermometer', { templateUrl: 'view/thermometer/thermometer.html', controller: 'thermometerCtrl' })
            .when('/thermometer/:thermometerName', { templateUrl: 'view/thermometer/thermometer.html', controller: 'thermometerCtrl' })
            .when('/thermometer/:thermometerName/temperatures', { templateUrl: 'view/thermometer/temperatures.html', controller: 'temperaturesCtrl' })
            .when('/thermometer/:thermometerName/setup', { templateUrl: 'view/thermometer/setup.html', controller: 'thermometerSetupCtrl' })
            .when('/industry/mrp', { templateUrl: 'view/industry/mrp.html', controller: 'industryMRPCtrl' })
            .when('/industry/mrp/products', { templateUrl: 'view/industry/mrp/products.html', controller: 'industryMRPProductsCtrl' })
            .when('/industry/mrp/materials', { templateUrl: 'view/industry/mrp/materials.html', controller: 'industryMRPMaterialsCtrl' })
            .when('/industry/mrp/exec', { templateUrl: 'view/industry/mrp/exec.html', controller: 'mrpExecCtrl' })
            .otherwise({ redirectTo: '/' });

        //$locationProvider.html5Mode(false).hashPrefix('!');

        $httpProvider.interceptors.push('httpInterceptor');

        //$compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
    }
]);
