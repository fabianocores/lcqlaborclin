﻿angular.module("arkabPortal").controller("admLcqPermissionsCtrl", ['$scope', 'identityService', 'appConfigKeys', 'lcqService', function ($scope, identityService, appConfigKeys, lcqService) {

    $scope.message = "";

    document.title = 'Permissões';

    $scope.getPermissions = function () {

        $scope.permissions = null;

        $scope.loading = true;

        lcqService.getPermissions().success(function (response) {

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

        lcqService.putPermission(permission).success(function (response) {
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
