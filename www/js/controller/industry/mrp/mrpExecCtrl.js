angular.module("arkabPortal").controller("mrpExecCtrl", ['$scope', 'identityService', 'appConfig', 'industryService', '$timeout',
    function ($scope, identityService, appConfig, industryService, $timeout) {

        document.title = 'Execução do MRP';

        $scope.isCordovaApp = isCordovaApp;

        if (identityService.getUserIdentity().industrypermission.bloqueado || !identityService.getUserIdentity().industrypermission.mrp) {
            $location.path('/');
        }

        $scope.view = 'mrp';

        $scope.search = '';

        $scope.order = {
            by: 'releasdate',
            inverted: false
        }

        $scope.params = {
            ordertype: 'W',
            scenario: 3,
            whscode: '',
        }

        $scope.warehouseList = [];

        $scope.orderTypeList = [
            { code: '', name: 'Todos' },
            { code: 'W', name: 'Produção' },
            { code: 'P', name: 'Compra' },
            //{ code: 3, name: 'Requisições de transferência' },
            //{ code: 4, name: 'Cotações de compra' },
            //{ code: 5, name: 'Requisições de materiais' },
        ];

        $scope.orderBy = function (by) {
            if (by != $scope.order.by) {
                $scope.order.inverted = false;
            }
            else {
                $scope.order.inverted = !$scope.order.inverted;
            }
            $scope.order.by = by;

        }


        $scope.changeView = function (newView) {
            $scope.view = newView;
        }

        $scope.getScenarios = function () {
            industryService.getScenarios().success(function (response) {
                
                $scope.scenariosList = response;

                $scope.getRecommendations();

            }).error(function (err, status) {
                console.log(err, status);
            });
        }

        $scope.getWarehouses = function()
        {
            industryService.getMRPWarehouses($scope.params.ordertype).success(function (response) {

                response.unshift({ whscode: '', whsname: '*Todos' });

                $scope.warehousesList = response;

            }).error(function (err, status) {
                console.log(err, status);
            });
        }

        $scope.getRecommendations = function () {
            $scope.loading = true;
            $scope.warehouseList = [];
            industryService.getRecommendations($scope.params).success(function (response) {
                $scope.mrp = response;
                $scope.loading = false;
            }).error(function (err, status) {
                console.log(err, status);
                $scope.loading = false;
            });
        }

        $scope.changeStartDate = function()
        {
            if (!$scope.params.enddate && $scope.params.startdate) {
                $scope.params.enddate = $scope.params.startdate;
            }
        }

        $scope.changeValue = function(line, opt)
        {
            // quantidade total
            if (opt == 't') {
                if (line.quantity < line.economicalbatch) {
                    line.batches = 1;
                    line.batchquantity = line.economicalbatch;
                    line.batchrest = 0;
                }
                else
                {
                    line.batches = Math.floor( line.quantity/line.economicalbatch) ;
                    line.batchquantity = line.economicalbatch;
                    line.batchrest = line.quantity % line.economicalbatch;
                }
            }
            else if (opt == 'b') {

                line.batchquantity = Math.floor(line.quantity / line.batches);
                line.batchrest = line.quantity % line.batchquantity;


                //line.quantity = (line.batches * line.batchquantity) + line.batchrest;

            }
            else if (opt == 'q') {

                if (line.batchquantity > line.quantity) {
                    line.batchquantity = line.quantity;
                    line.batches = 1;
                }
                else
                {
                    line.batches = Math.floor(line.quantity / line.batchquantity);
                    line.batchrest = line.quantity % line.batchquantity;
                }

                

                //line.batches = Math.floor(line.quantity / line.economicalbatch);
                //line.batchrest = line.quantity % line.economicalbatch;
                //line.quantity = (line.batches * line.batchquantity) + line.batchrest;
            }
            else if (opt == 'r') {
                if (line.batchrest >= line.batchquantity) {
                    line.batchrest = line.batchquantity - 1;
                }
                line.quantity = (line.batches * line.batchquantity) + line.batchrest;
            }
        }

        //$scope.getMRP = function () {
        //    $scope.loading = true;
        //    industryService.getProductMRP().success(function (response) {


        //        var categories = [];

        //        var alerts = {
        //            name: 'Alertas',
        //            data: []
        //        };

        //        $.each(response, function (index, value) {
        //            categories.push(value.itemcode);
        //            if (value.lack > 0) {
        //                alerts.data.push(value.lack);
        //            }
        //            if (index >= 19) {
        //                return false;
        //            }
        //        });

        //        $scope.alertsChart = {
        //            chart: {
        //                type: 'column',
        //                backgroundColor: 'transparent'
        //            },

        //            title: {
        //                text: 'Top 20 alertas de falta de produtos'
        //            },
        //            credits: {
        //                enabled: false
        //            },
        //            xAxis: {
        //                categories: categories,
        //                type: 'category',
        //                labels: {
        //                    rotation: -60,
        //                    style: {
        //                        fontSize: '12px',
        //                    }
        //                }
        //            },
        //            yAxis: {
        //                title: {
        //                    text: 'Alertas'
        //                }
        //            },

        //            tooltip: {
        //                crosshairs: true,
        //                shared: true,
        //                valueSuffix: ' unidades'
        //            },

        //            legend: {
        //                enabled: false,
        //            },
        //            exporting: {
        //                enabled: false
        //            },
        //            series: [alerts]
        //        }


        //        $scope.mrp = response;

        //        $scope.loading = false;
        //    }).error(function (err, status) {
        //        console.log(err, status);
        //        $scope.loading = false;
        //    });
        //}

        $scope.program = function (p) {

            p.program = p.suggestion;

            //if (p.lack < p.minordrqty) {
            //    p.program = p.minordrqty;
            //}
            //else
            //{
            //    var t = p.lack % p.minordrqty;
            //    var rest = 0;
            //    if (t) {
            //        rest = 1;
            //    }

            //    p.program = p.minordrqty * ( Math.floor(p.lack / p.minordrqty) + rest);


            //    console.log('rest', rest);
            //    console.log('lack', p.lack);
            //    console.log('min', p.minordrqty);
            //    console.log('lack/min', (p.lack / p.minordrqty));
            //    console.log('round lack/min', Math.floor(p.lack / p.minordrqty));
            //    console.log('lack%min', p.lack % p.minordrqty);

            //}

            //p.program = p.lack;
        }

        //$scope.getMRP();

        $scope.executeRecommendation = function () {

            $scope.opsList = null;

            var nr_op = 0;

            var array = $.grep($scope.mrp, function (value, index) {
                return (value.create == true);
            });

            if (array.length == 0) {
                return;
            }

            $.each(array, function (index, value) {

                var array2 = [];

                value.saving = false;
                value.saved = false;
                value.message = '';

                value.releasdate_f = formatDateToPtBr(value.releasdate);
                value.duedate_f = formatDateToPtBr(value.duedate);

                var copy = angular.copy(value);
                copy.saving = false;
                copy.saved = false;
                copy.workorderentry = 0;
                copy.batches = 1;
                copy.batchrest = 0;
                copy.quantity = value.batchquantity;
                copy.id = 0;

                for (var i = 1; i <= value.batches; i++) {
                    copy.number = ++nr_op;
                    array2.push(angular.copy(copy));
                }

                if (value.batchrest) {
                    copy.number = ++nr_op;
                    copy.quantity = value.batchrest;
                    copy.ajust = true;
                    array2.push(angular.copy(copy));
                }

                value.opsList = array2;

            });

            

            $scope.opsList = array;

            $scope.saved = false;
            $scope.saving = false;

            $('#modalExecRec').modal('show');

        }

        $scope.confirmPostOps = function () {
            $scope.confirmPostOpsMessage = null;

            $scope.saved = false;
            $scope.saving = true;

            if ($scope.opsList.length == 0) {
                $scope.confirmPostOpsMessage = 'Nenhuma ordem de produção informada.';
                return;
            }



            /*
            public int id { get; set; }
            public DateTime createdate { get; set; }
            public DateTime? updatedate { get; set; }
            public int userid { get; set; }
            public string itemcode { get; set; }
            public int quantity { get; set; }
            public string whscode { get; set; }
            public bool mrp { get; set; }
            public DateTime startdate { get; set; }
            public DateTime duedate { get; set; }
            public int workorderentry { get; set; }
            */

            $.each($scope.opsList, function (indexm, masterop) {

                masterop.saving = true;

                $.each(masterop.opsList, function (index, op) {
                    

                    op.startdate = new Date(op.releasdate);
                    op.duedate = new Date(op.duedate);

                    industryService.postWorkOrder(op).success(function (response) {
                        op.saving = true;
                        op.id = response.id;

                        checkWorkOrderIntegrationStatus(op);

                    }).error(function (err, status) {
                        op.message = err;
                    });


                });


            });

            //console.log('será postado', $scope.opsList);

            //return;

            //industryService.postWorkOrders($scope.opsList).success(function (response) {

            //    $scope.opsList = response.oplist;

            //    $.each($scope.opsList, function (index, value) {
            //        console.log(value);
            //        value.saving = true;
            //        checkWorkOrderIntegrationStatus(value);
            //    });



            //}).error(function (err, status) {
            //    console.log(err, status);
            //    $scope.saving = false;
            //});

        }

        function checkIfRemainIntegration() {
            //var q = $.grep($scope.opsList, function (v) { return v.saving; }).length;
            //if (!q) {
            //    $scope.saved = true;
            //    $scope.saving = false;
            //    $scope.getRecommendations();

            //}

            var saving = true;
            var listamaster = $.grep($scope.opsList, function (v) { return v.saving; });

            $.each(listamaster, function (index, value) {

                var q = $.grep(value.opsList, function (v) { return v.saving; }).length;

                if (!q) {
                    value.saving = false;
                }

            })

            if (!$.grep($scope.opsList, function (v) { return v.saving; }).length) {
                $scope.saved = true;
                $scope.saving = false;
                $scope.getRecommendations();

            }


        }

        function checkWorkOrderIntegrationStatus(op) {

            industryService.getWorkingOrderIntegrationStatus(op.id).success(function (response) {

                if (response.status == 'I' || response.status == 'E') {
                    if (response.status == 'I') {
                        op.saving = false;
                        op.workorderentry = response.workorderentry;
                    }
                    else if (response.status == 'E') {
                        op.saving = false;
                        op.serverResponse = response.message;

                    }

                    checkIfRemainIntegration();

                }

                else {

                    checkWorkOrderIntegrationStatus(op);
                }

            }).error(function (err, status) {
                console.log(err, status);
                $scope.saving = false;
                $scope.saved = false;
            });
        }

        $scope.selectAll = function (onlyAlert) {

            $.each($scope.mrp, function (i, v) {
                if (onlyAlert) {
                    if (v.lack) {
                        v.program = v.lack;
                    }
                }
                else {
                    v.program = v.lack;
                }
            });

        }



        // init;
        $scope.getScenarios();

        $scope.getWarehouses();

    }]);
