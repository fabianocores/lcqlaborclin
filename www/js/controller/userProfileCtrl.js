angular.module("arkabPortal").controller("userProfileCtrl", ['$scope', '$rootScope', 'identityService', 'logService', 'urlConfig', 'appConfig', function ($scope, $rootScope, identityService, logService, urlConfig, appConfig) {


    $scope.identity = identityService.getUserIdentity();

    $scope.userProfileView = 'userInfo';

    document.title = 'Perfil do usuário';

    //// Editor options.
    //$scope.options = {
    //    language: 'pt',
    //    allowedContent: true,
    //    entities: false,
    //};

    $scope.options = {
        editable: false,
        lang: 'pt-BR',
        popover: {
            image: [
              ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
              ['float', ['floatLeft', 'floatRight', 'floatNone']],
              ['remove', ['removeMedia']]
            ],
            link: [
              ['link', ['linkDialogShow', 'unlink']]
            ],
            table: [
                ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
                ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
            ],
            air: [
              ['color', ['color']],
              ['font', ['bold', 'underline', 'clear']],
              ['para', ['ul', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture']]
            ]
        }
    };

    $scope.userProfile = {
        loading: false,
        message: "i'm here",
        avatar: '',
        apiurl: urlConfig.getUrlConfig().baseUrl
    }

    $scope.changePasswordModel = {
        OldPassword: '',
        NewPassword: '',
        ConfirmPassword: ''
    }

    $scope.appConfig = appConfig.getAppConfig();

    // Called when the editor is completely ready.
    $scope.onReady = function () {
        // ...
        console.log('hi');
    };

    $scope.changeView = function (newView) {
        $scope.userProfileView = newView;
    }

    $scope.postAvatar = function () {

        $scope.avatarMessage = '';

        var file = $scope.userProfile.avatar;

        if (file == null) {
            file = '';
        }

        if (file == '') {
            $scope.avatarMessage = 'Selecione um arquivo';
            return;
        }

        identityService.postAvatar(file).success(function (response) {
            identityService.setUserAvatar(response);
        }).error(function (err, status) {
            $scope.avatarMessage = err;
            console.log(err);

        });


    };

    $scope.postSignaturePicture = function () {

        $scope.signaturePictureMessage = '';

        var file = $scope.userProfile.avatar;

        if (file == null) {
            file = '';
        }

        if (file == '') {
            $scope.signaturePictureMessage = 'Selecione um arquivo';
            return;
        }

        identityService.postSignaturePicture(file).success(function (response) {
            console.log(response);
            $scope.identity.signature.picture = response;
        }).error(function (err, status) {
            $scope.signaturePictureMessage = err;
            console.log(err);

        });


    };

    $scope.putUserSignature = function () {
        console.log($scope.identity.signature);
        identityService.putUserSignature($scope.identity.signature).success(function (response) {
            logService.info('putUserSignature OK');
        }).error(function (err, status) {
            logService.xhrerror('identityService.putUserSignature', err, status);
        });
    }

    $scope.changePassword = function () {
        $scope.changePasswordMessage = '';
        $scope.changePasswordLoading = true;
        identityService.changePassword($scope.changePasswordModel).success(function (response) {
            $scope.changePasswordMessage = 'Senha alterada com sucesso.';
            $scope.changePasswordModel.OldPassword = '';
            $scope.changePasswordModel.NewPassword = '';
            $scope.changePasswordModel.ConfirmPassword = '';
            $scope.changePasswordLoading = false;

            setTimeout(clearChangePasswordMessage, 2500);

        }).error(function (err, status) {

            console.log(err.ModelState);

            $scope.changePasswordMessage = err.Message;
            $scope.changePasswordLoading = false;
        });
    }

    $scope.putUserSmtp = function () {
        $scope.smtpMessage = '';

        if (!$scope.userSmtp.email) {
            $scope.smtpMessage = 'Informe o endereço de e-mail.';
            return;
        }
        if (!$scope.userSmtp.nome) {
            $scope.smtpMessage = 'Informe o nome para exibição do e-mail.';
            return;
        }
        if (!$scope.userSmtp.smtp_host) {
            $scope.smtpMessage = 'Informe o endereço do servidor SMTP.';
            return;
        }

        if (!$scope.userSmtp.smtp_port) {
            $scope.smtpMessage = 'Informe a porta do servidor SMTP.';
            return;
        }

        if (!$scope.userSmtp.username) {
            $scope.smtpMessage = 'Informe o nome do usuário.';
            return;
        }
        if (!$scope.userSmtp.password) {
            $scope.smtpMessage = 'Informe a senha.';
            return;
        }

        identityService.putUserSmtp($scope.userSmtp).success(function (response) {
            $scope.smtpMessage = 'Alterado com sucesso.';
        }).error(function (err, status) {
            $scope.smtpMessage = err;
            console.log(err);
        });
    }

    function clearChangePasswordMessage() {
        $scope.changePasswordMessage = '';
    }

    $scope.init = function()
    {
        identityService.getUserSignature().success(function (response) {
            $scope.identity.signature = response;
        }).error(function (err, status) {
            console.log(err, status);
        });

        identityService.getUserSmtp().success(function (response) {
            $scope.userSmtp = response;
            $scope.smtpMessage = '';
        }).error(function (err, status) {
            console.log(err);
            $scope.smtpMessage = err;
        });

    }

    $scope.init();

}]);
