angular.module("arkabPortal").controller("rootCtrl",
                ['$rootScope', '$location', 'identityService', 'appConfig', 'logService', 'stateService', '$http', '$sce', '$timeout', 'urlConfig', 'configStateService', '$window', 'appConfigKeys', 'lcqService',
        function ($rootScope,   $location,   identityService,  appConfig,   logService,   stateService,   $http,   $sce,   $timeout,   urlConfig,   configStateService,   $window,   appConfigKeys, lcqService) {

            $rootScope.loading = false;

            $rootScope.loginData = {
                userName: '',
                password: '',
                latitude: '',
                longitude: '',
                ip: '',
                agree: true,
                rememberMe: false,
                checkingCookie: true,
                checkingConfig: true,
                userNameForImage: 'img',
                isCordovaApp: isCordovaApp
            };

            $rootScope.appConfigKeys = appConfigKeys;

            $rootScope.actualYear = new Date().getFullYear();


            function init() {

                $rootScope.partnerConfig = urlConfig.getUrlConfig().partnerConfig;

                $rootScope.appConfig = appConfig.getAppConfig();

                $rootScope.apiURL = urlConfig.getUrlConfig().baseUrl;
                
                if ($rootScope.appConfig.wallpaper) {
                    $rootScope.appConfig.appWallpaper = { 'background-image': 'url(' + ($rootScope.apiURL + 'Adm/GetWallpaper/' + $rootScope.appConfig.wallpaper) + ')' };
                }
                else
                {
                    $rootScope.appConfig.appWallpaper = { 'background-image': 'url(config/wp.jpg)' };
                }

                $rootScope.footerText = $sce.trustAsHtml(appConfig.getAppConfig().footerText);

                $rootScope.loginPageCompanyName = appConfig.getAppConfig().loginPageCompanyName;

                $rootScope.userCanLogin = true;
                                
                identityService.resetUserData();

                $rootScope.identity = identityService.getUserIdentity();

                var userNameCookie = $window.localStorage.getItem('userName');
                var passwordCookie = $window.localStorage.getItem('password');

                var autoLogin = function () {

                    if (userNameCookie && passwordCookie) {

                        $rootScope.loginData.userName = userNameCookie;
                        $rootScope.loginData.password = passwordCookie;

                        _login($rootScope.loginData);

                    }
                    else {

                        $timeout(function () {
                            $rootScope.loginData.checkingCookie = false;
                            if ($rootScope.loginData.isCordovaApp) {
                                navigator.splashscreen.hide();
                            }

                        });


                    }
                }

                $rootScope.submitLogin = function () {

                    $rootScope.loading = true;

                    var invalidMessage = "Nome do usuário ou senha é inválido";

                    if ($rootScope.loginData.userName === undefined || $rootScope.loginData.password === undefined) {
                        $rootScope.message = invalidMessage;
                        console.error(invalidMessage);
                        $rootScope.loading = false;
                        return;
                    }
                    if ($rootScope.loginData.userName == "" || $rootScope.loginData.password == "") {
                        $rootScope.message = invalidMessage;
                        console.error(invalidMessage);
                        $rootScope.loading = false;
                        return;
                    }

                    _login($rootScope.loginData);

                }

                $rootScope.logOut = function () {
                    identityService.resetUserData();
                    $rootScope.NotificationStarted = false;
                    $rootScope.notificationlist = [];
                    
                    $window.localStorage.removeItem('userName');
                    $window.localStorage.removeItem('password');

                    $rootScope.requested_url = '';
                    $location.path("/login");
                }

                function _login(loginData) {

                    $rootScope.message = "";

                    //$rootScope.loginData.checkingCookie = true;

                    identityService.logUserIn(loginData).success(function (response) {

                        identityService.setUserData(response);

                        if (loginData.rememberMe == true) {

                            $window.localStorage.setItem('userName', loginData.userName);
                            $window.localStorage.setItem('password', loginData.password);

                        }

                        $rootScope.params = {
                        }

                        if (isCordovaApp) {

                            navigator.splashscreen.hide();

                        }

                        
                        identityService.getIndustryPermissions().success(function (permissionresponse) {

                            stateService.reset();

                            response.lcqpermission = permissionresponse.lcqpermission;
                            response.industrypermission = permissionresponse.industrypermission;

                            //if (permissionresponse) {
                            //    if (permissionresponse.length > 0) {
                            //        response.lcqpermission = permissionresponse[0];
                            //    }
                            //}

                            // true - ignorar formatações da reposta string
                            identityService.setUserData(response, true);

                            //if (response.lcqpermission.bloqueado) {

                                
                            //    identityService.resetUserData();
                            //    $rootScope.NotificationStarted = false;
                            //    $rootScope.notificationlist = [];

                            //    $rootScope.isAuthenticated = false;
                            //    $rootScope.loginData.checkingCookie = false;

                            //    $rootScope.requested_url = '';
                            //    $location.path("/login");

                            //    $rootScope.message = 'Usuário está bloqueado';

                            //    return;


                            //}

                            $rootScope.identity = response;

                            response.isAuthenticated = true;

                            $rootScope.loading = false;

                            if ($rootScope.requested_url) {

                                $location.path($rootScope.requested_url);
                            }
                            else {

                                $location.path('/');
                            }

                            //$rootScope.loginData.checkingCookie = false;




                        }).error(function (err, status) {
                            
                            console.log(err);

                            $rootScope.loginData.checkingCookie = false;

                            if ($rootScope.loginData.isCordovaApp) {
                                navigator.splashscreen.hide();
                            }


                            if (status == 400) {
                                if (err.error == 'invalid_grant') {
                                    $rootScope.message = err.error_description;

                                }
                            }
                            else {
                                $rootScope.message = 'Conexão recusada.';
                            }

                            $rootScope.loading = false;



                        });



                        



                    }).error(function (err, status) {

                        console.log(err);

                        $rootScope.loginData.checkingCookie = false;

                        if ($rootScope.loginData.isCordovaApp) {
                            navigator.splashscreen.hide();
                        }


                        if (status == 400) {
                            if (err.error == 'invalid_grant') {
                                $rootScope.message = err.error_description;

                            }
                        }
                        else {
                            $rootScope.message = 'Conexão recusada.';
                        }

                        $rootScope.loading = false;

                    });


                };
                

                $rootScope.checkAvatar = function () {
                    if ($rootScope.loginData.userName != null) {
                        $rootScope.loginData.userNameForImage = $rootScope.loginData.userName.replace('.', '!').replace('.', '!').replace('.', '!').replace('.', '!').replace('.', '!');
                    }

                }

                $rootScope.go = function(local)
                {
                    $location.path(local);
                }
                
                $rootScope.notifyMe = function (icon, title, body, url, usernotification) {

                    try {

                        if (isCordovaApp) {

                            if ('Notification' in window) {
                                Notification.requestPermission(function (permission) {
                                    // If the user accepts, let’s create a notification
                                    if (permission === 'granted') {
                                        var notification = new Notification(title, {
                                            tag: (new Date().toString()),
                                            icon: icon,
                                            body: body
                                        });
                                        notification.onshow = function () { console.log('show'); };
                                        notification.onclose = function () { console.log('close'); };
                                        notification.onclick = function () {

                                            console.log('notification click');

                                            try {
                                                if (usernotification) {
                                                    $rootScope.confirmread(usernotification);
                                                }

                                                $rootScope.confirmnotification();

                                                console.log('navigate to original:', url);

                                                url = url.replace('#', '');

                                                console.log('navigate to final:', url);

                                                $location.path(url);

                                                window.focus();
                                            } catch (e) {
                                                console.log(e);
                                            }

                                            

                                            
                                        };
                                    }
                                    else {
                                        console.log('Cordova notification not authorized');
                                    };
                                });
                            }
                        }
                        else
                        {
                            if (!Notification) {
                                console.log('Este browser não é compatível com notificações no desktop. Sugerimos a utilização do chrome.');
                                alert('Este browser não é compatível com notificações no desktop. Sugerimos a utilização do chrome.');
                                return;
                            }

                            if (!icon) {
                                //icon = 'config/branch-logo.png';

                                icon = $rootScope.apiURL + 'Adm/GetLogo/' + $rootScope.appConfig.logo + '-128px';

                            }
                            else {
                                icon = 'img/icons/' + icon;
                            }

                            if (Notification.permission !== "granted")
                                Notification.requestPermission();
                            else {


                                var notification = new Notification(title, {
                                    icon: icon,
                                    body: body,
                                });

                                if (url) {
                                    notification.onclick = function () {

                                        if (usernotification) {
                                            $rootScope.confirmread(usernotification);
                                        }

                                        $rootScope.confirmnotification();

                                        url = url.replace('#', '');

                                        $location.path(url);

                                        window.focus();

                                    };
                                }



                            }
                        }




                        
                    } catch (e) {
                        console.log(e);
                    }


                    

                }
                                
                
                // caso este executando no phonegap cordova
                if (isCordovaApp) {

                    // habilita o método para confirmar o fechamento a aplicação.
                    $rootScope.closeApp = function () {
                        if (confirm('Tem certeza que deseja encerrar a aplicação? Você deixará de receber as notificações.')) {
                            navigator.app.exitApp();
                        };
                    };

                };
                                
                // request permission on page load
                document.addEventListener('DOMContentLoaded', function () {
                    if (Notification.permission !== "granted")
                        Notification.requestPermission();
                });

                $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {

                    $('div.modal').modal('hide');
                    $('.modal').modal('hide');

                });

                autoLogin();


            }

            if (!urlConfig.valid()) {
                console.log('configuração inválida');
                $location.path('/setup');
            }
            else
            {

                identityService.getWebAPPConfigAS(urlConfig.getUrlConfig().dataProfile).success(function (response) {

                    $rootScope.loginData.checkingConfig = false;
                    configStateService.setAppConfigState(response);

                    init();
                }).error(function (err, status) {
                    $location.path('/404');
                    console.log(err, status);
                });
                
                
            }

            




        }]);
