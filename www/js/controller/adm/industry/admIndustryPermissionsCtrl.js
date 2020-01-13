angular.module("arkabPortal").controller("admIndustryPermissionsCtrl", ['$scope', 'identityService', 'appConfigKeys', 'industryService', function ($scope, identityService, appConfigKeys, industryService) {

    $scope.message = "";

    document.title = 'Permissões industria';

    $scope.getPermissions = function () {

        $scope.permissions = null;

        $scope.loading = true;

        industryService.getPermissions().success(function (response) {

            $scope.permissions = response;

            $scope.loading = false;

        }).error(function (err, status) {

            $scope.loading = false;

            console.log(err, status);
        });

    };

    $scope.getPermissions();

    $scope.putPermission = function(permission)
    {
        $scope.saving = true;

        industryService.putPermission(permission).success(function (response) {
            $scope.saving = false;
        }).error(function (err, status) {
            console.log(err, status);
            $scope.saving = false;
        });
    }

    //$scope.identity = identityService.getUserIdentity().userName;

    //$scope.publishVersion = appConfigKeys.publishVersion;
       
    //$scope.img = Math.floor(Math.random() * 6) + 1;

}]);
