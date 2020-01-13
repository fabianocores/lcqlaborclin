angular.module("arkabPortal").directive('preLoader', function () {
    return {
        restrict: 'E',
        template: '<div class="supLoader"></div>'
    };
});

angular.module("arkabPortal").directive('preLoaderReseller', function () {
    return {
        restrict: 'E',
        template: '<div class="supLoaderReseller"></div>'
    };
});

//angular.module("arkabPortal").directive('preLoaderText', function () {
//    return {
//        restrict: 'E',
//        template: '<div id="loadingCentered"><center><h3><span class="fa fa-spinner fa-spin fa-2x fa-fw text-muted" aria-hidden="true"></span><br/>{{loaderTitle}}<br><small>{{loaderMessage}}</small></h3></center></div>',
//        link: function (scope, el, attrs) {
//            scope.loaderTitle = attrs.loaderTitle;
//            scope.loaderMessage = attrs.loaderMessage;
//        }
//    };
//});

angular.module("arkabPortal").directive('preLoaderText', function () {
    return {
        restrict: 'E',
        template: '<div id="loadingCentered"><center><div align="center" class="cssload-fond">	<div class="cssload-container-general"><div class="cssload-internal"><div class="cssload-ballcolor cssload-ball_1"></div></div><div class="cssload-internal"><div class="cssload-ballcolor cssload-ball_2"></div></div><div class="cssload-internal"><div class="cssload-ballcolor cssload-ball_3"></div></div><div class="cssload-internal"><div class="cssload-ballcolor cssload-ball_4"></div></div></div></div><br/><h3>{{loaderTitle}}<br><small>{{loaderMessage}}</small></h3></center></div>',
        link: function (scope, el, attrs) {
            scope.loaderTitle = attrs.loaderTitle;
            scope.loaderMessage = attrs.loaderMessage;
        }
    };
});



angular.module("arkabPortal").directive('whirlPool', function () {
    return {
        restrict: 'E',
        template: '<div class="whirlpool"><div class="ring ring1"></div><div class="ring ring2"></div><div class="ring ring3"></div><div class="ring ring4"></div><div class="ring ring5"></div><div class="ring ring6"></div><div class="ring ring7"></div><div class="ring ring8"></div><div class="ring ring9"></div></div>'
    };
});

