angular.module("arkabPortal").controller("rememberCtrl", ['$scope', 'identityService', '$routeParams', '$location', '$rootScope', 'urlConfig', '$timeout', 'appConfig', 'configStateService', function ($scope, identityService, $routeParams, $location, $rootScope, urlConfig, $timeout, appConfig, configStateService) {

    $scope.message = '';

    $scope.dataProfile = urlConfig.getUrlConfig().dataProfile;

    $scope.loadingSettings = true;

    $scope.rememberParams = {
        company: urlConfig.getUrlConfig().dataProfile,
        email: ''
    }

    
    $scope.appConfig = appConfig.getAppConfig();

    console.log($scope.appConfig);

    if ($scope.appConfig.preparing) {

        identityService.getWebAPPConfigAS(urlConfig.getUrlConfig().dataProfile).success(function (response) {

            configStateService.setAppConfigState(response);

            $scope.appConfig = appConfig.getAppConfig();

            $scope.loadingSettings = false;

        }).error(function (err, status) {
            $location.path('/404');
            console.log(err, status);
            $scope.loadingSettings = false;
        });


    }
    else {
        $scope.loadingSettings = false;
    }
    
    $scope.urlConfig = urlConfig.getUrlConfig();


    //$scope.logos = {
    //    apiURL: urlConfig.getUrlConfig().baseUrl,
    //    appLogo: appConfig.getAppConfig().logo,
    //    companyLogo: urlConfig.getUrlConfig().baseUrl + 'Adm/GetLogo/' + appConfig.getAppConfig().logo + '-256px'
    //}


    $scope.changeParams = {
        NewPassword: '',
        ConfirmPassword: '',
        Token: $routeParams.token,
        Email: $routeParams.email
    }

    if ($scope.changeParams.Token != null) {
        $scope.changeParams.Token = $scope.changeParams.Token.replace('"', '').replace('"', '');
    }

    if ($scope.changeParams.Email != null) {
        $scope.changeParams.Email = $scope.changeParams.Email.replace('"', '').replace('"', '');
    }

    function prepare() {
        if ($scope.changeParams.Token == null) {
            $scope.view = 'request';
        }
        else {
            $scope.view = 'change'
        }
    }

    $scope.changePassword = function () {
        $scope.message = '';
        if ($scope.changeParams.NewPassword == '') {
            $scope.message = 'Informe uma nova senha.';
            return;
        }

        if ($scope.changeParams.ConfirmPassword == '') {
            $scope.message = 'Repita a nova senha.';
            return;
        }

        if ($scope.changeParams.NewPassword != $scope.changeParams.ConfirmPassword) {
            $scope.message = 'A senha e a confirmação não coicidem.';
            return;
        }
        $scope.loading = true;

        identityService.resetPassword($scope.changeParams).success(function (response) {
            $scope.message = 'Senha alterada com sucesso. Aguarde que estou redirecionando você para a tela de login!';
            console.log(response);

            $timeout(goHome, 3000);
            //setTimeout(goHome, 3000);
            $scope.loading = false;
        }).error(function (err, status) {
            $scope.message = err;
            console.log(err);
            $scope.loading = false;
        });

    }

    function goHome() {
        $location.path('/');
        
    }

    $scope.restorePassword = function () {

        $scope.message = '';
        if ($scope.rememberParams.company == '') {
            $scope.message = 'Domínio não informado.'
            return;
        }

        if ($scope.rememberParams.email == '') {
            $scope.message = 'E-mail não informado.'
            return;
        }
        $scope.loading = true;
        identityService.rememberPassword($scope.rememberParams).success(function (response) {
            console.log(response);
            $scope.message = 'Verifique o seu e-mail.';
            $scope.rememberParams = {
                company: '',
                email: ''
            }
            $scope.loading = false;
        }).error(function (err, status) {
            console.log(err);

            $scope.message = err.Message;
            $scope.loading = false;
        });

    }

    prepare();

}]);
