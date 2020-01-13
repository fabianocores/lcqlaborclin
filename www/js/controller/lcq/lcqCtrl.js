angular.module("arkabPortal").controller("lcqCtrl", ['$scope', 'identityService', 'appConfig', '$location', 'urlConfig', 'lcqService', '$routeParams', 'stateService',
    function ($scope, identityService, appConfig, $location, urlConfig, lcqService, $routeParams, stateService) {

        document.title = 'LCQ';

        $scope.isCordovaApp = isCordovaApp;

        //console.log('Home', appConfig.getAppConfig());

        if (identityService.getUserIdentity().lcqpermission.bloqueado) {
            $location.path('/');
        }

        var lcqState = stateService.getLcqState();

        $scope.params = lcqState.params;

        $scope.lista = lcqState.report;

        $scope.pesquisa = {
            tipo: '',
            valor: ''
        };

        $scope.loading = false;

        lcqService.getTipoAnaliseList().success(function (response) {
            $scope.tipoAnaliseList = response;
        }).error(function (err, status) {
            console.log(err, status);
        })

        lcqService.getStatusLoteList().success(function (response) {
            $scope.statusLoteList = response;
        }).error(function (err, status) {
            console.log(err, status);
        });

        $scope.getListaFichas = function()
        {
            $scope.loading = true;

            $scope.lista = null;

            var p = angular.copy($scope.params);

            //if (p.dataini) { p.dataini = formatPtBrDateTime(p.dataini); }

            //if (p.datafim) { p.datafim = formatPtBrDateTime(p.datafim); }

            //if (p.datainsini) { p.dataini = formatPtBrDateTime(p.datainsini); }

            //if (p.datainsfim) { p.datafim = formatPtBrDateTime(p.datainsfim); }
            
            getFichas(p);
        }

        $scope.getFichasListLote = function()
        {

            var params = {
                
            }

            if ($scope.pesquisa.tipo == 'lote') {
                params.lote = $('#inputResult2').val();
            } else if ($scope.pesquisa.tipo == 'item') {
                params.item = $('#inputResult2').val();
            }

            getFichas(params);

            angular.element('#modalLcqPorLote').modal('hide');

        }

        $scope.mostrarPesquisaLote = function () {
            $scope.pesquisa = {
                tipo: 'lote',
            }
            $('#inputResult2').val('');
            angular.element('#modalLcqPorLote').modal('show');

            if (!isCordovaApp) {
                $('#inputResult2').focus();
            }


        }

        $scope.mostrarPesquisaItem = function () {
            $scope.pesquisa = {
                tipo: 'item',
            }
            angular.element('#modalLcqPorLote').modal('show');
        }

        function getFichas(params)
        {
            

            lcqService.getListaFichas(params).success(function (response) {
                
                $scope.lista = response;
                $scope.loading = false;


                var ps = {
                    params: $scope.params,
                    report: $scope.lista
                };

                stateService.setLcqState(ps);

            }).error(function (err, status) {
                console.log(err, status);
                $scope.loading = false;
            });
        }

        $scope.navigateTo = function(code)
        {
            $location.path('/lcq/ficha/' + code);
        }


        //// teclado virtual, inclusão de valor
        //$scope.add = function (val) {

        //    if (val == 'x') {
        //        $scope.pesquisa.valor = '';
        //    }
        //    else {
        //        var buff = ($scope.pesquisa.valor || '').toString();

        //        buff = buff + val.toString();

        //        $scope.pesquisa.valor = buff;
        //    }

        //}

        // pesquisa com enter
        $scope.tecladoKeyPress = function (event) {
            if (event.keyCode == 13) {
                var valor = $('#inputResult2').val();
                angular.element('#modalLcqPorLote').modal('hide');
                $scope.getFichasListLote(valor);
                event.preventDefault();
            }
        }

        $scope.pesquisaKeyPress = function (event) {
            if (event.keyCode == 13) {
                $scope.getListaFichas();
                event.preventDefault();
            }
        }


        // atualizo as permissões do usuário
        lcqService.getUserPermissions(identityService.getUserIdentity().companyUserid).success(function (permissionresponse) {


            var identity = identityService.getUserIdentity();

            if (permissionresponse) {
                if (permissionresponse.length > 0) {
                    identity.lcqpermission = permissionresponse[0];
                }
            }

            // true - ignorar formatações da reposta string
            identityService.setUserData(identity, true);

            $scope.identity = identity;
            

        }).error(function (err, status) {

            console.log(err);
        });

        $scope.getCertificatePDF = function (item) {

            item.loadingpdf = true;
            item.erropdf = false;

            lcqService.getCertificatePDF(item.docentry).success(function (response) {

                window.URL = window.URL || window.webkitURL;

                var blob = new Blob([response], { type: 'application/pdf;base64' });
                var fileName = item.lote + ".pdf";
                var link = document.createElement('a');
                link.rel = 'stylesheet';
                link.href = window.URL.createObjectURL(blob);
                document.body.appendChild(link);
                link.style = "display: none";
                //link.href = fileURL;
                link.download = fileName;
                link.click();
                item.loadingpdf = false;

            }).error(function (err, status) {
                console.log(err, status);
                item.loadingpdf = false;
                item.erropdf = true;
            });
        }

        
    }]);
