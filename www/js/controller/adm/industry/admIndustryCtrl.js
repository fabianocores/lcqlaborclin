﻿angular.module("arkabPortal").controller("admIndustryCtrl", ['$scope', 'identityService', 'appConfigKeys', '$timeout', function ($scope, identityService, appConfigKeys, $timeout) {

    $scope.message = "";

    document.title = 'Painel de controle - Indústria';

    $scope.identity = identityService.getUserIdentity().userName;

    $scope.publishVersion = appConfigKeys.publishVersion;
       
    

    function changeImage ()
    {
        $scope.img = Math.floor(Math.random() * 6) + 1;
    }

    function imageTimer()
    {
        changeImage();
        $timeout(function () {
            imageTimer();
        }, 13000);
    }

    imageTimer();
    

    

}]);
