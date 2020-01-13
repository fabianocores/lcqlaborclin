angular.module("arkabPortal").controller("setupCtrl", ['$scope', '$location', '$window', 'urlConfig', '$timeout', '$routeParams', '$http', '$sce', function ($scope, $location, $window, urlConfig, $timeout, $routeParams, $http, $sce) {

    $scope.message = '';

    $scope.config = urlConfig.getUrlConfig();

    if (isCordovaApp) {

        try {
            navigator.splashscreen.hide();
        } catch (e) {

        }

    }

    if (urlConfig.valid() && !$routeParams.ignore) {
        $location.path('/login');
    }

    if (!$scope.config.protocol) {
        console.log('protocol');
        $scope.config.protocol = 'https';
    }

    if (!$scope.config.baseUrl) {
        $scope.config.baseUrl = 'portal.laborclin.com.br/api';
    }

    if (!$scope.config.dataProfile) {
        $scope.config.dataProfile = 'SBO_Laborclin';
    }

    if ($scope.config) {
        if ($scope.config.baseUrl) {
            $scope.config.baseUrl = $scope.config.baseUrl.replace(/^(https|http):\/\//, '').replace(/\/api\/$/, '');
            //$scope.config.applicationUrl = $scope.config.applicationUrl.replace(/^(https|http):\/\//, '');
        }
    }

    $scope.protocols = [{ code: 'http' }, { code: 'https' }];

    function error(error) {
        //$sce.trustAsHtml(response.content);
        $scope.error = $sce.trustAsHtml(error);

        $timeout(function () {
            $scope.error = '';
        }, 30000);

    }

    $scope.cancelScan = function () {
        $("#appSetup").css({ 'opacity': 1.0 });
        QRScanner.destroy(function (status) {
            console.log(status);
        });
    }

    $scope.turnLight = function () {
        if (!$scope.light) {
            $scope.light = true;
            QRScanner.enableLight(function (err, status) {
                if (err) {
                    navigator.notification.alert(err, function () { }, 'Erro', 'OK');
                }
            });
        }
        else {
            $scope.light = false;
            QRScanner.disableLight(function (err, status) {
                if (err) {
                    navigator.notification.alert(err, function () { }, 'Erro', 'OK');
                }
            });
        }
    }

    $scope.scanConfig = function () {
        try {

            console.log('QRScanner.getStatus before');

            navigator.notification.alert('Para configurar o seu aplicativo, aponte a câmera para o código QRCode disponível no Portal de Vendas CRMSAP.', function () { }, 'Configuração', 'Entendi');

            QRScanner.getStatus(function (status) {

                $scope.scannerStatus = status;

                console.log('QRScanner.getStatus result', status);

                if (!status.authorized && status.canOpenSettings) {
                    if (confirm("Would you like to enable QR code scanning? You can allow camera access in your settings.")) {
                        QRScanner.openSettings();
                    }
                }
            });

            console.log('scanstart');

            QRScanner.scan(function (err, text) {

                console.log(err, text);

                $("#arkabPortalApp").fadeIn(1000, function () {
                    $("#arkabPortalApp").css({ 'opacity': 0.5 });
                });

                //$("#arkabPortalApp").css({ 'opacity': 1.0 });
                //$("#appSetup").css({ 'opacity': 1.0 });
                ////$("#appControls").css({ 'opacity': 0.0 });

                if (err) {
                    navigator.notification.alert(err, function () { }, 'Erro', 'Ok');
                }
                else {

                    if (text) {

                        var list = text.split('|');

                        var protocol = '';
                        var url = '';
                        var profile = '';
                        var user = '';
                        var password = '';

                        try { protocol = list[0]; } catch (e) { }
                        try { url = list[1]; } catch (e) { }
                        try { profile = list[2]; } catch (e) { }
                        try { user = list[3]; } catch (e) { }
                        try { password = list[4]; } catch (e) { }

                        $timeout(function () {
                            $scope.config.baseUrl = url;
                            $scope.config.protocol = protocol;
                            $scope.config.dataProfile = profile;
                            $scope.config.user = user;
                            $scope.config.password = password;
                            $scope.validate(true);
                        });

                        console.log(list);

                    }


                    //navigator.notification.alert('Conteúdo QRCode: ' + text, function () { }, 'Leitura realizada', 'Confirmar');
                }

                QRScanner.destroy(function (status) {
                    console.log(status);
                });


                //navigator.notification.alert(err + ', ' + text, function () { }, 'test title', 'btnNamee');


                //$("html").css({ 'opacity': 1.0 });
                //$("body").fadeIn(2000);

            });

            //$("#arkabPortalApp").css({ 'opacity': 0.0 });
            //$("#appSetup").css({ 'opacity': 0.0 });
            //$("#appControls").css({ 'opacity': 1.0 });

            QRScanner.show();

            $("#arkabPortalApp").fadeOut(500, function () {
                $("#arkabPortalApp").css({ 'opacity': 0.0 });
            });

            //hideForCamera();


        } catch (e) {
            try {
                alert(e);
            } catch (e) {

            }
            
            console.log(e);
        }


    }

    $scope.validate = function (automatic) {
        $scope.error = '';
        $scope.message = '';
        $scope.config.error1 = false;

        $scope.domainInfo = null;

        if (!$scope.config.baseUrl) {
            error('Informe o endereço da API.');

            return;
        }

        if (!$scope.config.dataProfile) {
            error('Informe o domínio.');
            return;
        }

        $scope.config.baseUrl = $scope.config.baseUrl.replace(/^(https|http):\/\//, '');

        //if (!$scope.config.ignoreerror1) {
        //    if (/\/api\/$/.test($scope.config.baseUrl) || /\/$/.test($scope.config.baseUrl) || /\/api$/.test($scope.config.baseUrl)) {
        //        $scope.config.error1 = true;
        //        error('Informe apenas o nome da aplicação da API, sem barra no final.');
        //        return;
        //    }
        //}

        var s = angular.copy($scope.config);

        //if ($scope.config.ignoreerror1) {
        //s.baseUrl = s.protocol + '://' + $scope.config.baseUrl;
        //}
        //else {
            s.baseUrl = s.protocol + '://' + $scope.config.baseUrl + '/api/';
        //}

        console.log(s);

        $scope.validating = true;

        try {
            $http({
                url: s.baseUrl + "Adm/GetDomainInfo/" + s.dataProfile,
                method: "GET"
            }).success(function (response) {

                $scope.apiURL = s.baseUrl;

                $scope.domainInfo = response;

                $scope.validating = false;

                if (automatic) {
                    $scope.saveConfig(automatic);
                }


            }).error(function (err, status) {

                error(err);

                console.log(err, status);

                $scope.validating = false;

                //$scope.scanConfig();


            });
        } catch (e) {
            error(e);
            console.log(e);
            $scope.validating = false;
            //$scope.scanConfig();
        }



    }

    $scope.saveConfig = function (automatic) {
        $scope.error = '';
        $scope.message = '';
        $scope.config.error1 = false;

        if (!$scope.config.baseUrl) {
            error('Informe o endereço da API.');
            return;
        }

        if (!$scope.config.dataProfile) {
            error('Informe o domínio.');
            return;
        }

        $scope.config.baseUrl = $scope.config.baseUrl.replace(/^(https|http):\/\//, '');

        //if (!$scope.config.ignoreerror1 && !automatic) {
        //    if (/\/api\/$/.test($scope.config.baseUrl) || /\/$/.test($scope.config.baseUrl) || /\/api$/.test($scope.config.baseUrl)) {
        //        $scope.config.error1 = true;
        //        error('Informe apenas o nome da aplicação da API, sem barra no final.');
        //        return;
        //    }
        //}

        var s = angular.copy($scope.config);

        //if ($scope.config.ignoreerror1) {
            //s.baseUrl = s.protocol + '://' + $scope.config.baseUrl;
        //}
        //else {
            s.baseUrl = s.protocol + '://' + $scope.config.baseUrl + '/api/';
        //}

        console.log($scope.domainInfo);

        console.log(s);

        console.log('analytics', $scope.domainInfo.analytics);

        $window.localStorage.setItem('protocol', s.protocol);
        $window.localStorage.setItem('baseUrl', s.baseUrl);
        $window.localStorage.setItem('dataProfile', s.dataProfile);
        $window.localStorage.setItem('googleAnalyticsChild', $scope.domainInfo.analytics);

        if ($scope.config.user) {
            $window.localStorage.setItem('userName', $scope.config.user);
        }

        if ($scope.config.password) {
            $window.localStorage.setItem('password', $scope.config.password);
        }

        $scope.restarting = true;

        navigator.notification.alert('Para terminar a configuração, a aplicação será finalizada. Por favor, abra o CRMSAP novamente.', function () {
            $timeout(function () {
                if (isCordovaApp) {
                    try {
                        navigator.app.exitApp();
                    } catch (e) {
                        console.log(e);

                    }

                    //
                }
                else {
                    window.close();
                }
            }, 2000);
        }, "Atenção", "Ok, entendi");



        $scope.message = 'Configuração salva. A aplicação será fechada, por favor abra novamente.';

        //$timeout(function () {

        //    $scope.restarting = true;

        //    if (isCordovaApp) {
        //        try {
        //            navigator.app.exitApp();
        //        } catch (e) {
        //            console.log(e);

        //        }

        //        //
        //    }
        //    else {
        //        window.close();
        //    }

        //}, 5000);      


    }

    //$scope.scanConfig();


}]);

