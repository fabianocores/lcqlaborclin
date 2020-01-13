angular.module("arkabPortal").controller("industryMRPProductsCtrl", ['$scope', 'identityService', 'appConfig', 'industryService', '$timeout', 
    function ($scope, identityService, appConfig, industryService, $timeout) {

        document.title = 'MRP Produtos';

        if (identityService.getUserIdentity().industrypermission.bloqueado || !identityService.getUserIdentity().industrypermission.mrp) {
            $location.path('/');
        }

        $scope.isCordovaApp = isCordovaApp;

        $scope.view = 'mrp';

        $scope.search = '';

        $scope.order = {
            by: 'lack',
            inverted: true
        }

        $scope.orderBy = function(by)
        {
            if (by != $scope.order.by) {
                $scope.order.inverted = false;
            }
            else
            {
                $scope.order.inverted = !$scope.order.inverted;
            }
            $scope.order.by = by;
            
        }
        

        $scope.changeView = function(newView)
        {
            $scope.view = newView;
        }

        $scope.getMRP = function()
        {
            $scope.loading = true;
            industryService.getProductMRP().success(function (response) {


                var categories = [];

                var alerts = {
                    name: 'Alertas',
                    data: []
                };

                $.each(response, function (index, value) {
                    categories.push(value.itemcode);
                    if (value.lack > 0) {
                        alerts.data.push(value.lack);
                    }
                    if (index >= 19) {
                        return false;
                    }
                });

                $scope.alertsChart = {
                    chart: {
                        type: 'column',
                        backgroundColor: 'transparent'
                    },

                    title: {
                        text: 'Top 20 alertas de falta de produtos'
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        categories: categories,
                        type: 'category',
                        labels: {
                            rotation: -60,
                            style: {
                                fontSize: '12px',
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Alertas'
                        }
                    },

                    tooltip: {
                        crosshairs: true,
                        shared: true,
                        valueSuffix: ' unidades'
                    },

                    legend: {
                        enabled: false,
                    },
                    exporting: {
                        enabled: false
                    },
                    series: [alerts]
                }

                
                $scope.mrp = response;
                
                $scope.loading = false;
            }).error(function (err, status) {
                console.log(err, status);
                $scope.loading = false;
            });
        }

        $scope.program = function(p)
        {

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

        $scope.getMRP();

        $scope.postOPs = function()
        {

            $scope.opsList = null;

            var array = $.grep($scope.mrp, function (value, index) {
                return (value.program > 0);
            });

            if (array.length == 0) {
                return;
            }

            $scope.opsList = array;

            $scope.saved = false;
            $scope.saving = false;
            
            $('#modalPostOps').modal('show');

        }

        $scope.confirmPostOps = function()
        {
            $scope.confirmPostOpsMessage = null;

            $scope.saved = false;
            $scope.saving = true;

            if ($scope.opsList.length == 0) {
                $scope.confirmPostOpsMessage = 'Nenhuma ordem de produção informada.';
                return;
            }


            industryService.postWorkOrders($scope.opsList).success(function (response) {
                
                $scope.opsList = response.oplist;
                
                $.each($scope.opsList, function (index, value) {
                    console.log(value);
                    value.saving = true;
                    checkWorkOrderIntegrationStatus(value);
                });



            }).error(function (err, status) {
                console.log(err, status);
                $scope.saving = false;
            });

        }

        function checkIfRemainIntegration()
        {
            var q = $.grep($scope.opsList, function (v) { return v.saving; }).length;
            if (!q) {
                $scope.saved = true;
                $scope.saving = false;
                $scope.getMRP();
                
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

        $scope.selectAll = function(onlyAlert)
        {
            
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
        
    }]);
