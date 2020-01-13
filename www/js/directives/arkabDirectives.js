angular.module("arkabPortal").directive('akbTitle', function () {
    return {
        restrict: 'E',
        template: '<h4 style="margin: 0px;">{{pageTitle}} <small>{{pageSubtitle}}</small></h4>',
        link: function (scope, el, attrs) {
            scope.pageTitle = attrs.pageTitle;
            scope.pageSubtitle = attrs.pageSubtitle;
        }
    };
})

angular.module("arkabPortal").directive('akbServerLoading', function () {
    return {
        restrict: 'E',
        template: '<h3 style="margin: 0px; padding: 0px;"><kbd><span class="fa fa-cog fa-spin fa-fw" aria-hidden="true"></span>Processando, aguarde...</kbd></h3>'
    };
    //template: '<span><img src="img/loading.gif" alt="Carregando, aguarde..." title="Carregando, aguarde..." /></span><br /><kbd>Sua solicitação está sendo processada pelo servidor, por favor aguarde!</kbd><br />'
})

//angular.module("arkabPortal").directive('focusOn', function () {
//    return function (scope, elem, attr) {
//        scope.$on('focusOn', function (e, name) {
//            if (name === attr.focusOn) {
//                elem[0].focus();
//            }
//        });
//    };
//});

//angular.module("arkabPortal").factory('focus', function ($rootScope, $timeout) {
//    return function (name) {
//        $timeout(function () {
//            $rootScope.$broadcast('focusOn', name);
//        },1000);
//    }
//});

angular.module("arkabPortal").directive('orderIcon', function () {
    return {
        restrict: 'E',
        template: '<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>'
    };
})

angular.module("arkabPortal").directive('escKey', function () {
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if (event.which === 27) { // 27 = esc key
                scope.$apply(function () {
                    scope.$eval(attrs.escKey);
                });

                event.preventDefault();
            }
        });
    };
})

//angular.module('arkabPortal').directive('datepicker', function () {
//    return {
//        restrict: 'A',
//        require: 'ngModel',
//        link: function (scope, element, attrs, ngModelCtrl) {
//            $(element).datepicker({
//                dateFormat: 'dd/mm/yy',
//                language: 'pt-BR',
//                pickTime: false,
//                showButtonPanel: false,
//                showToday: false,
//                //onSelect: function (e) {
//                //    console.log(e);
//                //    ngModelCtrl.$setViewValue(formatPtBrDate(e));
//                //}

//            });
            
//        }
//    };
//});

//angular.module('arkabPortal').directive('datetimepicker', function () {
//    return {
//        restrict: 'A',
//        require: 'ngModel',
//        link: function (scope, element, attrs, ngModelCtrl) {
//            $(element).datepicker({
//                dateFormat: 'dd/mm/yy',
//                language: 'pt-BR',
//                timepicker: true,
//                showButtonPanel: false,
//                showToday: false,
//                //onSelect: function (e) {
//                //    console.log(e);
//                //    ngModelCtrl.$setViewValue(formatPtBrDate(e));
//                //}

//            });

//        }
//    };
//});

angular.module('arkabPortal').directive('akbdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            $.datetimepicker.setLocale('pt-BR');
            $(element).datetimepicker({
                //dateFormat: 'dd/mm/yy',
                //language: 'pt-BR',
                //pickTime: false,
                //showButtonPanel: false,
                //showToday: false,
                ignoreReadonly: true,
                allowInputToggle: true,
                format: 'd/m/Y',
                formatDate: 'd/m/Y',

                //formatDate: 'd/m/Y',
                //formatTime: '',
                dayOfWeekStart: 0,
                //lang: 'pt',
                timepicker: false,
                //onSelect: function (e) {
                //    console.log(e);
                //    ngModelCtrl.$setViewValue(formatPtBrDate(e));
                //}

            });

        }
    };
});

angular.module('arkabPortal').directive('akbdatetimepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            $.datetimepicker.setLocale('pt-BR');
            $(element).datetimepicker({
                format: 'd/m/Y H:i',
                formatDate: 'd/m/Y',
                formatTime: 'H:i',
                dayOfWeekStart: 0,  
                //lang: 'pt'
                //onSelect: function (e) {
                //    console.log(e);
                //    //ngModelCtrl.$setViewValue(formatPtBrDate(e));
                //}

            });

        }
    };
});


angular.module('arkabPortal').directive('setFocus', ['$timeout', function ($timeout) {
    return {
        scope: { trigger: '@setFocus' },
        link: function (scope, element) {
            scope.$watch('trigger', function (value) {
                if (value === "true") {
                    $timeout(function () {
                        element[0].focus();
                        element[0].select();
                        
                    });
                }
            });
        }
    };
}]);

angular.module('arkabPortal').directive('onlyNumbersDate', function () {
    return function (scope, element, attrs) {
        element.bind("keydown", function (event) {

            if ($.inArray(event.which, [46, 8, 9, 27, 13, 110, 61, 35, 36, 37, 38, 39, 193, 111]) !== -1) {
                // let it happen, don't do anything

                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((event.shiftKey || (event.which < 48 || event.which > 57)) && (event.which < 96 || event.which > 105)) {
                event.preventDefault();
            }

        });
    };
});

angular.module('arkabPortal').directive('onlyNumbersPlus', function () {
    return function (scope, element, attrs) {
        element.bind("keydown", function (event) {

            if ($.inArray(event.which, [46, 8, 9, 27, 13, 110, 61, 107, 187, 35, 36, 37, 38, 39, 44]) !== -1) {
                // let it happen, don't do anything
                
                return;
            }

            // Ensure that it is a number and stop the keypress
            if ((event.shiftKey || (event.which < 48 || event.which > 57)) && (event.which < 96 || event.which > 105)) {
                event.preventDefault();
            }

        });
    };
});

angular.module('arkabPortal').directive('onlyNumbers', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {

            if ($.inArray(event.which, [46, 8, 9, 27, 13, 110]) !== -1 ||
                // Allow: home, end, left, right
                (event.which >= 35 && event.which <= 39)
   
                ) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((event.shiftKey || (event.which < 48 || event.which > 57)) && (event.which < 96 || event.which > 105)) {
                event.preventDefault();
            }

        });
    };
});

angular.module("arkabPortal").directive('akbCheck', function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            check: '=ngModel',
            disabled: '=disabled'
        },
        template: '<span class="fa fa-2x" aria-hidden="true" style="cursor: pointer" ng-class="{\'fa-square-o text-muted\': !check, \'fa-check-square text-primary\': check}" ng-click="checkClick()";></span>',
        //template: '<span class="fa fa-2x" aria-hidden="true" style="cursor: pointer" ng-class="{\'fa-square-o text-muted\': !check, \'fa-check-square-o text-primary\': check}" ng-click="check = !check"></span>',
        link: function (scope, el, attrs, ngModel, disabled) {

            scope.checkClick = function () {
                if (!scope.disabled) {
                    scope.check = !scope.check;
                }
            }


        }
    };
})

angular.module("arkabPortal").directive('akbCheckSm', function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            check: '=ngModel',
            disabled: '=disabled'
        },
        template: '<span class="fa" aria-hidden="true" style="cursor: pointer" ng-class="{\'fa-square-o text-muted\': !check, \'fa-check-square text-primary\': check}" ng-click="checkClick()";></span>',
        //template: '<span class="fa fa-2x" aria-hidden="true" style="cursor: pointer" ng-class="{\'fa-square-o text-muted\': !check, \'fa-check-square-o text-primary\': check}" ng-click="check = !check"></span>',
        link: function (scope, el, attrs, ngModel, disabled) {

            scope.checkClick = function () {
                if (!scope.disabled) {
                    scope.check = !scope.check;
                }
            }


        }
    };
})

angular.module("arkabPortal").directive('akbCheckSmInverted', function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            check: '=ngModel',
            disabled: '=disabled'
        },
        template: '<span class="fa" aria-hidden="true" style="cursor: pointer" ng-class="{\'fa-square-o text-muted\': check, \'fa-check-square text-primary\': !check}" ng-click="checkClick()";></span>',
        //template: '<span class="fa fa-2x" aria-hidden="true" style="cursor: pointer" ng-class="{\'fa-square-o text-muted\': !check, \'fa-check-square-o text-primary\': check}" ng-click="check = !check"></span>',
        link: function (scope, el, attrs, ngModel, disabled) {

            scope.checkClick = function () {
                if (!scope.disabled) {
                    scope.check = !scope.check;
                }
            }


        }
    };
})

angular.module("arkabPortal").directive('akbRadio', function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            check: '=ngModel',
            disabled: '=disabled'
        },
        template: '<span class="fa fa-2x" aria-hidden="true" style="cursor: pointer" ng-class="{\'fa-circle-thin text-muted\': !check, \'fa-dot-circle-o text-primary\': check}" ng-click="checkClick()";></span>',
        //template: '<span class="fa fa-2x" aria-hidden="true" style="cursor: pointer" ng-class="{\'fa-square-o text-muted\': !check, \'fa-check-square-o text-primary\': check}" ng-click="check = !check"></span>',
        link: function (scope, el, attrs, ngModel, disabled) {

            scope.checkClick = function () {
                if (!scope.disabled) {
                    scope.check = true;
                }
            }


        }
    };
})

angular.module("arkabPortal").directive('akbCheckbox', function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            check: '=ngModel',
            label: '@',
            block: '<block'
        },
        template: '<button class="btn btn-default btn-sm" ng-click="check = !check" ng-class="{\'btn-block\': block}"><span class="fa fa" aria-hidden="true" style="cursor: pointer" ng-class="{\'fa-square-o text-muted\': !check, \'fa-check-square text-primary\': check}"></span> {{label}}</button>',
        link: function (scope, el, attrs, ngModel) {


        }
    };
})