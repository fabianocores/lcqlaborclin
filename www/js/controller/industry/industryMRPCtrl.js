angular.module("arkabPortal").controller("industryMRPCtrl", ['$scope', 'identityService', 'appConfig', 'industryService', '$location',
    function ($scope, identityService, appConfig, industryService, $location) {

        document.title = 'MRP';

        $scope.isCordovaApp = isCordovaApp;

        if (identityService.getUserIdentity().industrypermission.bloqueado || !identityService.getUserIdentity().industrypermission.mrp) {
            $location.path('/');
        }

        //$scope.getProductMRP = function()
        //{
        //    $scope.loading = true;
        //    industryService.getProductMRP().success(function (response) {
        //        $scope.productMRP = response;
        //        //console.log('mrp', response);
        //        $scope.loading = false;
        //    }).error(function (err, status) {
        //        console.log(err, status);
        //        $scope.loading = false;
        //    });
        //}

        //$scope.getProductMRP();
        
        // atualizo as permissões do usuário
        //lcqService.getUserPermissions(identityService.getUserIdentity().companyUserid).success(function (permissionresponse) {


        //    var identity = identityService.getUserIdentity();

        //    if (permissionresponse) {
        //        if (permissionresponse.length > 0) {
        //            identity.lcqpermission = permissionresponse[0];
        //        }
        //    }

        //    // true - ignorar formatações da reposta string
        //    identityService.setUserData(identity, true);

        //    $scope.identity = identity;
            

        //}).error(function (err, status) {

        //    console.log(err);
        //});
        
    }]);
