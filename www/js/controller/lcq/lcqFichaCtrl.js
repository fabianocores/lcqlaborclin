angular.module("arkabPortal").controller("lcqFichaCtrl", ['$scope', 'identityService', 'appConfig', '$location', 'urlConfig', 'lcqService', '$routeParams', 
    function ($scope, identityService, appConfig, $location, urlConfig, lcqService, $routeParams) {

        document.title = 'LCQ';

        $scope.isCordovaApp = isCordovaApp;

        if (identityService.getUserIdentity().lcqpermission.bloqueado) {
            $location.path('/');
        }

        $scope.statusList = [
            { code: 'Aberto', name: 'Aberto' },
            { code: 'Cancelado', name: 'Cancelado' },
            { code: 'Fechado', name: 'Fechado' },
            
        ];

        //console.log('Home', appConfig.getAppConfig());

        $scope.params = {
            apiURL: urlConfig.getUrlConfig().baseUrl,
            identity: identityService.getUserIdentity(),
            permission: identityService.getUserIdentity().lcqpermission,
            appConfig: appConfig.getAppConfig(),
            ficha: $routeParams.code,
        }

        lcqService.getUserStatusLoteList().success(function (response) {
            $scope.statusLoteList = response;
        }).error(function (err, status) {
            console.log(err, status);
        });

        $scope.filterFase = function(search)
        {
            $scope.search = search;
        }

        $scope.getFichaLCQ = function()
        {

            $scope.loading = true;

            lcqService.getFichaLCQ($scope.params.ficha).success(function (response) {

                

                response.dataemi = formatDateToPtBr(response.dataemi);

                response.datains = formatDateToPtBr(response.datains);

                response.moreDetails = true;

                var bugs = $scope.params.identity.lcqpermission.bugs;

                var newLines = [];

                $.each(response.linhas, function (index, value) {

                    if (value.obs) {
                        if (value.obs.substring(0, 1) == '*') {
                            //value.cq = false;
                            value.ccq = true;
                        }
                    }

                    value.printquantity = 1;
                    
                    if (value.medias) {
                        
                        $scope.calcValue(value);
                    }

                    if (value.ccq) {
                        if (bugs) {
                            newLines.push(value);
                        }
                    }
                    else
                    {
                        newLines.push(value);
                    }

                    
                });

                response.linhas = newLines;

                $scope.ficha = response;

                document.title = 'Ficha ' + $scope.ficha.nroficha;

                $scope.loading = false;

            }).error(function (err, status) {
                console.log(err, status);
                $scope.loading = false;
            });
        }

        $scope.getFichaLCQ();

        $scope.selectLinha = function(linha)
        {



            $scope.ficha.selected = linha;

            if ($scope.ficha.selected.p_de) {
                $scope.ficha.selected.f_de = parseFloat($scope.ficha.selected.p_de.replace(/,/, '.'));
            }
            if ($scope.ficha.selected.p_ate) {
                $scope.ficha.selected.f_ate = parseFloat($scope.ficha.selected.p_ate.replace(/,/, '.'));
            }
            $scope.calcValue($scope.ficha.selected);

            angular.element('#modalLcqInput').modal('show');
            
        }

        

        $scope.conforme = function (conforme, linha) {

            if (!linha) {
                linha = $scope.ficha.selected;
            }

            if (conforme) {
                linha.status = 'A';

                //if ($scope.ficha.selected.valorn) {
                //    $scope.ficha.selected.resultado = $scope.ficha.selected.valorn;
                //}
                //else
                {
                    linha.resultado = 'Conforme';
                }

                
            }

            if (!conforme) {
                linha.status = 'R';
                linha.resultado = 'Não conforme';
            }

            linha.edited = true;

        }

        $scope.changeLineStatus = function(status)
        {
            $scope.ficha.selected.status = status;
            $scope.ficha.selected.edited = true;
        }

        $scope.navegacao = {
            next: function () {
                var target = $scope.ficha.selected.lineid + 1;
                if (!$scope.ficha.selected) {
                    return;
                }
                $.each($scope.ficha.linhas, function (index, value) {
                    if (value.lineid == target) {
                        $scope.selectLinha(value);
                        return false;
                    }
                });


            },
            previous: function () {
                var target = $scope.ficha.selected.lineid - 1;
                if (!$scope.ficha.selected) {
                    return;
                }
                $.each($scope.ficha.linhas, function (index, value) {
                    if (value.lineid == target) {
                        $scope.selectLinha(value);
                        return false;
                    }
                });
            }
        }

        $scope.save = function()
        {
            $scope.saving = true;

            $scope.serverResponse = null;

            var ficha = angular.copy($scope.ficha);

            if (ficha.dataemi) { ficha.dataemi = formatPtBrDate(ficha.dataemi); }

            if (ficha.datains) { ficha.datains = formatPtBrDate(ficha.datains); }

            console.log('Params', ficha);

            lcqService.putFichaLCQ(ficha).success(function (response) {

                checkFichaLCQIntegrationStatus(response);


            }).error(function (err, status) {
                console.log(err, status);
                $scope.saving = false;
            });


        }

        function checkFichaLCQIntegrationStatus(id) {

            lcqService.getFichaLCQIntegrationStatus(id).success(function (response) {

                //console.log(response);

                //logService.info('Servidor respondeu o status', response);

                if (response.istatus == 'I') {
                    $scope.saving = false;

                    $scope.getFichaLCQ();

                    //console.log('Integração realizada');

                }
                else if (response.istatus == 'E') {
                    //logService.info('Servidor respondeu o status', response);

                    //console.log(response.message);
                    $scope.saving = false;
                    $scope.serverResponse = {
                        message: 'O servidor retornou uma mensagem de erro:',
                        messages: [response.message]
                    };
                }
                else {

                    checkFichaLCQIntegrationStatus(id);
                }

            }).error(function (err, status) {
                //logService.xhrerror('orderService.getOrderIntegrationStatus', err, status);
                console.log(err, status);
            });
        }

        // teclado virtual, inclusão de valor
        $scope.add = function (val) {

            if (val == '-') {
                $scope.ficha.selected.resultadot = (parseFloat($scope.ficha.selected.resultadot.toString().replace(/,/, '.')) * -1).toString().replace('.', ',');
            }
            else if (val == ',') {
                $scope.comma = true;
            }
            else if (val == 'x') {
                $scope.ficha.selected.resultadot = '';
                //$scope.ficha.selected.status = 'P';
            }
            else if (val == 'bs') {
                $scope.ficha.selected.resultadot = $scope.ficha.selected.resultadot.substring(0, $scope.ficha.selected.resultadot.length - 1);
                //$scope.ficha.selected.status = 'P';
                $scope.comma = false;
            }
            else {
                var buff = ($scope.ficha.selected.resultadot || '').toString();

                if ($scope.comma) {
                    buff = buff + ',' + val.toString();
                    $scope.comma = false;
                }
                else {
                    buff = buff + val.toString();
                }

                $scope.ficha.selected.resultadot = buff;
            }

            //$scope.validarResultado($scope.ficha.selected.resultadot);

        }

        // tratar enter e + para adicionar valor
        $scope.resultadoKeyPress = function(event)
        {
            
            if (event.keyCode == 13) {
                $scope.addValue();

                event.preventDefault();
                
            }

            
        }

        // para médias, adiciona na lista de medições
        $scope.addValue = function (selected) {

            //console.log($scope.ficha.selected.resultado);

            if (!selected) {
                selected = $scope.ficha.selected;
            }

            var rs = parseFloat(selected.resultadot.replace(',', '.'));

            if (rs || selected.resultadot == '0') {

                if (!selected.medias) {
                    selected.medias = [];
                }

                selected.medias.push({
                    valor: rs,
                    index: selected.medias.length+1
                });

            }

            selected.edited = true;

            $scope.calcValue(selected);

        }

        // para médias, adiciona na lista de medições
        $scope.addValue2 = function (selected) {

            //console.log($scope.ficha.selected.resultado);

            if (!selected) {
                selected = $scope.ficha.selected;
            }

            var t = $('#inputResult2').val();

            var rs = parseFloat(t.replace(',', '.'));

            if (rs || t == '0') {

                if (!selected.medias) {
                    selected.medias = [];
                }

                selected.medias.push({
                    valor: rs,
                    index: selected.medias.length + 1
                });

            }

            selected.edited = true;

            $scope.calcValue(selected);

            $('#inputResult2').val('');

        }

        // atualiza o cálculo da média a partir da lista de medições
        $scope.calcValue = function (selected) {

            if (selected == null) {
                selected = $scope.ficha.selected;
            }

            if (selected.tpdados != '02') {
                return;
            }
            if (!selected.resultfinal) {
                selected.resultfinal = selected.resultado.toString();
            }
            
            
            

            if (!selected.medias) {
                selected.desviopadrao = null;
                selected.coeficiente = null;
                selected.medias = [];

            }

            if (selected.medias.length == 0 && selected.resultado) {

                selected.resultadot = selected.resultado.toString();
                selected.resultado = null;
                $scope.addValue(selected);

            }
            
            if (selected.medias.length > 1) {

                var l = 0.0;
                for (var i = 0; i < selected.medias.length; i++) {
                    l += selected.medias[i].valor;
                    selected.medias[i].index = i + 1;
                }

                selected.soma = l;

                selected.resultadom = (Math.round((l / selected.medias.length) * 1000) / 1000);

                selected.resultado = (Math.round((l / selected.medias.length) * 1000) / 1000).toString().replace('.', ',');

                var soma2 = 0.0;

                for (var i = 0; i < selected.medias.length; i++) {
                    
                    soma2 = soma2 + (Math.pow((selected.medias[i].valor - selected.resultadom), 2));
                }

                var variacao = (soma2 / (selected.medias.length - 1));

                var desvio = Math.sqrt(variacao);

                //console.log('soma', soma2);

                selected.variacao = variacao;
                selected.desviopadrao = desvio;
                selected.coeficiente = desvio / selected.resultadom;
                selected.desviominimo = selected.resultadom - desvio;
                selected.desviomaximo = selected.resultadom + desvio;
               

            }
            else {
                if (selected.medias.length > 0) {
                    selected.resultadom = (Math.round((selected.medias[0].valor) * 1000) / 1000);
                    selected.resultado = (Math.round((selected.medias[0].valor) * 1000) / 1000).toString().replace('.', ',');
                }
                else {
                    selected.resultadom = 0;
                    selected.resultado = '';
                }

                selected.desviopadrao = null;
                selected.coeficiente = null;
                selected.desviominimo = null;
                selected.desviomaximo = null;
                selected.variacao = null;
                
            }

            //$scope.calcDesvios();

            $scope.validarResultado(selected);

            

            selected.resultadot = '';
        }

        // remove item da lista de medições
        $scope.removeMedia = function(index)
        {
            

            $.each($scope.ficha.selected.medias, function (id, value) {
                if (value.index == index) {
                    
                    $scope.ficha.selected.medias.splice(id, 1);
                    return false;
                }
            })

            $scope.ficha.selected.resultado = null;
            
            $scope.calcValue($scope.ficha.selected);

            if ($scope.ficha.selected.medias.length == 0) {
                $scope.ficha.selected.status = 'P';
                //$scope.validarResultado($scope.ficha.selected);
            }

            $scope.ficha.selected.edited = true;
        }

        // valida o valor do resultado com as faixas p_de e p_ate da análise.
        $scope.validarResultado = function (selected) {

            if (selected.tpdados != '02' || ( ( selected.status == 'A' || selected.status == 'R') && selected.aprovador ) ) {
                return;
            }

            var valor = selected.resultado;

            if (!valor) {
                return;
            }

            var de = selected.f_de;
            var ate = selected.f_ate;
            var result = parseFloat(valor.toString().replace(/,/, '.'));

            if (result >= de && result <= ate) {
                selected.status = 'A';
            }

            if (result < de || result > ate) {
                selected.status = 'R';
            }

            //selected.resultado = valor;

            selected.edited = true;

        }

        $scope.selecionarTodos = function(val, linhas)
        {

            var l = linhas;

            if (l == null) {
                l = $scope.ficha.linhas;
            }

            $.each(l, function (index, value) {
                value.checkforprint = val;
                
            });
        }

        $scope.imprimir = function()
        {
            $scope.tagmessage = '';

            var p = {
                docentry: $scope.ficha.docentry,
                linhas: []
            }

            $.each($scope.ficha.linhas, function (index, linha) {
                if (linha.checkforprint && linha.printquantity > 0) {
                    p.linhas.push({
                        lineid: linha.lineid,
                        quantidade: linha.printquantity
                    });
                }
            });

            if (p.linhas.length == 0) {
                $scope.tagmessage = 'Nenhuma linha selecionada';
                return;
            }

            //console.log('imprimir', p);

            lcqService.postFichaLCQEtiquetas(p).success(function (response) {

            }).error(function (err, status) {
                $scope.tagmessage = err.Message;
                console.log(err, status);
            });
        }

        $scope.selectLinhaAttachment = function () {

            $scope.attachment = {
                message: '',
                file: '',
                id: 0,
                processing: false,
                docentry: $scope.ficha.docentry,
                lineid: 0,
            }

            angular.element('#modalLcqAttachment').modal('show');
            
            
            
        }

        $scope.attachment = {
            message: '',
            file: '',
            id: 0,
            processing: false,
        }

        $scope.postAttachment = function () {

            var file = $scope.attachment.file;

            if (file == null) {
                file = '';
            }

            if (file == '') {
                $scope.attachment.message = 'Selecione um arquivo';
                return;
            }

            $scope.attachment.processing = true;
                        
            lcqService.postAttachment($scope.ficha.docentry, file).success(function (response) {

                $scope.ficha.anexos.push(response);                

                $scope.attachment = {
                    message: '',
                    file: '',
                    id: 0,
                    processing: false,
                }

                $scope.attachment.processing = false;

            }).error(function (err, status) {
                $scope.attachment.message = err.Message;
                console.log(err);
                $scope.attachment.processing = false;
            });
        }

        $scope.deleteAttachment = function(attachmentid)
        {

            lcqService.deleteFichaLCQAttachment(attachmentid).success(function (response) {

                $.each($scope.ficha.anexos, function (index, at) {
                    if (at.attachmentid == attachmentid) {
                        $scope.ficha.anexos.splice(index, 1);
                        return false;
                    }
                });

            }).error(function (err, status) {
                console.log(err, status);
            });
                        
        }

        $scope.getCertificatePDF = function (ficha) {

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

    }]);
