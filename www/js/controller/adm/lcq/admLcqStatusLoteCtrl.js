angular.module("arkabPortal").controller("admLcqStatusLoteCtrl", ['$scope', 'identityService', 'appConfigKeys', 'lcqService', function ($scope, identityService, appConfigKeys, lcqService) {

    $scope.message = "";

    document.title = 'Status do lote';

    $scope.getStatusLoteUsersList = function()
    {
        lcqService.getStatusLoteUsersList().success(function (response) {
            $scope.statusLoteList = response;
        }).error(function (err, status) {
            console.log(err, status);
        });
    }

    $scope.selectStatus = function(s)
    {

        s.selection = angular.copy($scope.permissions);

        $.each(s.users, function (index, value) {
            
            $.each(s.selection, function (index2, value2) {
                if (value.userid == value2.userid) {
                    s.selection.splice(index2, 1);
                    return false;
                }
            })


        })

        $scope.selected = s;



        angular.element('#modalStatusLoteUsers').modal('show');
    }

    $scope.addUser = function(statuslote, user)
    {
        lcqService.postStatusLoteUser(statuslote.code, user.userid).success(function (response) {

            // removo o usuário da lista de disponíveis 
            $.each(statuslote.selection, function (index, value) {
                if (value.userid == user.userid) {
                    statuslote.selection.splice(index, 1);
                    return false;
                }
            });

            statuslote.users.push({
                userid: user.userid,
                username: user.username
            })

        }).error(function (err, status) {
            console.log(err, status);
        });
    }

    $scope.removeUser = function (statuslote, user)
    {
        lcqService.deleteStatusLoteUser(statuslote.code, user.userid).success(function (response) {

            // removo o usuário da lista de disponíveis 
            $.each(statuslote.users, function (index, value) {
                if (value.userid == user.userid) {
                    statuslote.users.splice(index, 1);
                    return false;
                }
            });

            statuslote.selection.push({
                userid: user.userid,
                username: user.username
            })

        }).error(function (err, status) {
            console.log(err, status);
        });
    }


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

    $scope.init = function()
    {
        $scope.getStatusLoteUsersList();
        $scope.getPermissions();
    }

    $scope.init();

    
    //$scope.identity = identityService.getUserIdentity().userName;

    //$scope.publishVersion = appConfigKeys.publishVersion;
       
    //$scope.img = Math.floor(Math.random() * 6) + 1;

}]);
