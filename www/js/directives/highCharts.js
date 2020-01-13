angular.module("arkabPortal").directive('hcChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            //console.log(scope.options);

            //if (scope.options.chart) {
            //    scope.options.chart.options3d = {
            //        enabled: true,
            //        alpha: 15,
            //        beta: 15,
            //        depth: 50,
            //    }
            //}
            //else {
            //    scope.options.chart = {
            //        options3d: {
            //            enabled: true,
            //            alpha: 15,
            //            beta: 15,
            //            depth: 50,
            //        }
            //    }
            //}

            //if (scope.options.plotOptions) {
            //    if (scope.options.plotOptions.column) {
            //        scope.options.plotOptions.column.depth = 25;
            //    }
            //}

            //scope.options.chart.options3d = {
            //    enabled: true,
            //    alpha: 40,
            //    beta: 0,
            //    depth: 25,
            //}
            Highcharts.chart(element[0], scope.options);
        }
    };
})

angular.module("arkabPortal").directive('hcStockChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element) {

            Highcharts.stockChart(element[0], scope.options);
        }
    };
})

// Directive for pie charts, pass in title and data only    
angular.module("arkabPortal").directive('hcPieChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            title: '@',
            data: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], {
                credits: {
                    enabled: false,
                },
                chart: {
                    type: 'pie',
                    backgroundColor: 'transparent',
                    options3d: {
                        enabled: false,
                        alpha: 40,
                        beta: 0,
                        depth: 25,
                    },
                },
                title: {
                    text: scope.title
                },
                tooltip: {
                    valueDecimals: 0,
                    valuePrefix: 'R$ ',
                    valueSuffix: ',00',

                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 25,
                        dataLabels: {
                            enabled: false,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    data: scope.data
                }]
            });
        }
    };
})

angular.module("arkabPortal").directive('hcPieLabelChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            title: '@',
            data: '='
        },
        link: function (scope, element, attrs) {
            
            if (!attrs.tooltipDecimals) {
                attrs.tooltipDecimals = 0;
            }

            if (!attrs.tooltipValuePrefix) {
                attrs.tooltipValuePrefix = 'R$ ';
            }

            if (!attrs.tooltipValueSuffix) {
                attrs.tooltipValueSuffix = ',00';
            }

            var obj = {
                credits: {
                    enabled: false,
                },
                chart: {
                    type: 'pie',
                    backgroundColor: 'transparent',
                    options3d: {
                        enabled: false,
                        alpha: 40,
                        beta: 0,
                        depth: 25,
                    }
                },
                title: {
                    text: scope.title
                },
                tooltip: {
                    valueDecimals: attrs.tooltipDecimals,
                    valuePrefix: attrs.tooltipValuePrefix,
                    valueSuffix: attrs.tooltipValueSuffix,
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 25,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f}%'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    data: scope.data
                }]
            }

            Highcharts.chart(element[0], obj);
            
        }
    };
})


angular.module("arkabPortal").directive('temperatureChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            title: '@',
            data: '='
        },
        link: function (scope, element) {

            Highcharts.chart(element[0], {
                credits: {
                    enabled: false,
                },

                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                },

                title: {
                    text: 'Temperatura'
                },

                pane: {
                    startAngle: -165,
                    endAngle: 165,
                    background: [{
                        className: 'outer-pane',
                        outerRadius: '115%'
                    }, {
                        className: 'middle-pane',
                        outerRadius: '112%'
                    }, {
                        // default background
                    }, {
                        className: 'inner-pane',
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
                },

                // the value axis
                yAxis: {
                    //min: -40,
                    //max: 80,
                    min: scope.data.devicemintemp-10,
                    max: scope.data.devicemaxtemp+10,

                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',

                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto'
                    },

                    title: {
                        text: '°C'
                    },
                    plotBands: [
                    {
                        from: scope.data.devicemintemp -10,
                        to: scope.data.devicemintemp - 5,
                        className: 'red-band',
                        
                    },
                    {
                        from: scope.data.devicemintemp - 5,
                        to: scope.data.devicemintemp,
                        className: 'yellow-band',
                        
                    },
                    {
                        from: scope.data.devicemintemp,
                        to: scope.data.devicemaxtemp,
                        className: 'green-band',
                    },
                    {
                        from: scope.data.devicemaxtemp,
                        to: scope.data.devicemaxtemp + 5,
                        className: 'yellow-band',
                    },
                    {
                        from: scope.data.devicemaxtemp + 5,
                        to: scope.data.devicemaxtemp + 10,
                        className: 'red-band',
                    }],

                },

                series: [{
                    name: 'Atual',
                    data: [scope.data.actualtemp],
                    tooltip: {
                        valueSuffix: ' °C'
                    }
                },
                {
                    name: 'Min',
                    data: [scope.data.mintemp],
                    tooltip: {
                        valueSuffix: ' °C'
                    }
                },
                {
                    name: 'Máx',
                    data: [scope.data.maxtemp],
                    tooltip: {
                        valueSuffix: ' °C'
                    }
                }],

            }, function (chart) {
                if (!chart.renderer.forExport) {
                    setInterval(function () {
                        var point = chart.series[0].points[0],
                            newVal

                        newVal = scope.data.actualtemp

                        point.update(newVal);

                    }, 1000);
                }
            });

            
        }
    };
})

angular.module("arkabPortal").directive('humidityChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            title: '@',
            data: '='
        },
        link: function (scope, element) {

            Highcharts.chart(element[0], {
                credits: {
                    enabled: false,
                },

                chart: {
                    type: 'gauge',
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },

                title: {
                    text: 'Umidade '
                },

                pane: {
                    startAngle: -165,
                    endAngle: 165,
                    background: [{
                        className: 'outer-pane',
                        outerRadius: '115%'
                    }, {
                        className: 'middle-pane',
                        outerRadius: '112%'
                    }, {
                        // default background
                    }, {
                        className: 'inner-pane',
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
                },

                // the value axis
                yAxis: {
                    //min: -40,
                    //max: 80,
                    min: 0,
                    max: 100,

                    minorTickInterval: 'auto',
                    minorTickWidth: 1,
                    minorTickLength: 10,
                    minorTickPosition: 'inside',
                    minorTickColor: '#666',

                    tickPixelInterval: 30,
                    tickWidth: 2,
                    tickPosition: 'inside',
                    tickLength: 10,
                    tickColor: '#666',
                    labels: {
                        step: 2,
                        rotation: 'auto'
                    },

                    title: {
                        text: '%'
                    },
                    plotBands: [],

                },

                series: [{
                    name: 'Atual',
                    data: [scope.data.actualhumi],
                    tooltip: {
                        valueSuffix: '%'
                    }
                },
                {
                    name: 'Min',
                    data: [scope.data.minhumi],
                    tooltip: {
                        valueSuffix: '%'
                    }
                },
                {
                    name: 'Máx',
                    data: [scope.data.maxhumi],
                    tooltip: {
                        valueSuffix: '%'
                    }
                }],

            }, function (chart) {
                if (!chart.renderer.forExport) {
                    setInterval(function () {
                        var point = chart.series[0].points[0],
                            newVal

                        newVal = scope.data.actualhumi

                        point.update(newVal);

                    }, 1000);
                }
            });


        }
    };
})

// Directive for pie charts, pass in title and data only    
angular.module("arkabPortal").directive('temperatureRangeChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            title: '@',
            ranges: '=',
            temperatures: '=',
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], {


                //chart: {
                //    type: 'arearange',
                //    zoomType: 'x'
                //},

                title: {
                    text: scope.title
                },

                xAxis: {
                    type: 'datetime'
                },

                yAxis: {
                    title: {
                        text: null
                    }
                },

                tooltip: {
                    crosshairs: true,
                    shared: true,
                    valueSuffix: '°C'
                },

                legend: {
                    enabled: false
                },

                series: [{
                    name: 'Temperatura média',
                    data: scope.temperatures,
                    marker: {
                        fillColor: 'white',
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[0]
                    }
                }, {
                    name: 'Mínima e máxima',
                    data: scope.ranges,
                    type: 'arearange',
                    lineWidth: 0,
                    linkedTo: ':previous',
                    color: Highcharts.getOptions().colors[0],
                    fillOpacity: 0.3,
                    zIndex: 0,
                    marker: {
                        enabled: false
                    }
                }]


                //credits: {
                //    enabled: false,
                //},
                //chart: {
                //    type: 'pie',
                //    backgroundColor: 'transparent',
                //    options3d: {
                //        enabled: false,
                //        alpha: 40,
                //        beta: 0,
                //        depth: 25,
                //    },
                //},
                //title: {
                //    text: scope.title
                //},
                //tooltip: {
                //    valueDecimals: 0,
                //    valuePrefix: 'R$ ',
                //    valueSuffix: ',00',

                //},
                //plotOptions: {
                //    pie: {
                //        allowPointSelect: true,
                //        cursor: 'pointer',
                //        depth: 25,
                //        dataLabels: {
                //            enabled: false,
                //            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                //        }
                //    }
                //},
                //series: [{
                //    type: 'pie',
                //    data: scope.data
                //}]
            });
        }
    };
})