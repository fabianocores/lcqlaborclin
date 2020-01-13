angular.module("arkabPortal").controller("lcqCertificadoCtrl", ['$scope', 'identityService', 'appConfig', '$location', 'urlConfig', 'lcqService', '$routeParams', 'admService', '$timeout', 
    function ($scope, identityService, appConfig, $location, urlConfig, lcqService, $routeParams, admService, $timeout) {

        document.title = 'Certificado';

        $scope.isCordovaApp = isCordovaApp;

        //if (identityService.getUserIdentity().lcqpermission.bloqueado) {
        //    $location.path('/');
        //}

        $scope.apiURL = urlConfig.getUrlConfig().baseUrl;

        $scope.appConfig = appConfig.getAppConfig();

        $scope.params = {
            ficha: $routeParams.code,
            emissao: new Date(),
        }

        identityService.getCompanyInfo().success(function (response) {
            
            $scope.companyInfo = response;
        }).error(function (err, status) {
            console.log(err, status);
        });

        $scope.getFichaLCQ = function () {

            $scope.loading = true;

            lcqService.getFichaLCQ($scope.params.ficha).success(function (response) {

                
                $.each(response.linhas, function (index, value) {
                    if (value.obs) {
                        if (value.obs.substring(0, 1) == '*') {
                            value.cq = false;
                            value.ccq = true;
                        }
                    }
                    
                });

                $scope.ficha = response;

                //console.log('fichalcq', response);

                document.title = 'Ficha ' + $scope.ficha.nroficha;

                $scope.loading = false;

                //$timeout(function () {
                //    window.print();
                //},1000);

                

            }).error(function (err, status) {
                console.log(err, status);
                $scope.loading = false;
            });
        }

        $scope.getCertificatePDF = function () {

            $scope.loadingpdf = true;

            lcqService.getCertificatePDF($scope.params.ficha).success(function (response) {

                window.URL = window.URL || window.webkitURL;

                var blob = new Blob([response], { type: 'application/pdf;base64' });
                var fileName = $scope.ficha.batchnum + ".pdf";
                var link = document.createElement('a');
                link.rel = 'stylesheet';
                link.href = window.URL.createObjectURL(blob);
                document.body.appendChild(link);
                link.style = "display: none";
                //link.href = fileURL;
                link.download = fileName;
                link.click();
                $scope.loadingpdf = false;

            }).error(function (err, status) {
                console.log(err, status);
                $scope.loadingpdf = false;
            });
        }

        $scope.getFichaLCQ();



    }]);
