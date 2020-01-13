angular.module("arkabPortal").controller("admUserCtrl", ['$scope', '$location', '$routeParams', '$timeout', 'identityService', 'admService', 'urlConfig', function ($scope, $location, $routeParams, $timeout, identityService, admService, urlConfig) {

    // parâmetros do usuário.
    $scope.params = {
        userid: $routeParams.userid,
        apiurl: urlConfig.getUrlConfig().baseUrl,
        identity: identityService.getUserIdentity(),
        revendaID: 0,
        message: '',
        loading: false,
        user: {

        },
        sellers: [],
        roles: [],
        teams: [],
        allteams: [],
        branches: {
            multibranches: false,
            branches: []
        },

        

        // retorna lista de funções (ex.: master, gerente, supervisor, assistente, vendedor, representante, revenda, consultor, analista)
        getRolesList: function () {

            admService.getRolesList().success(function (response) {

                //$.each(response, function (index, value) {
                //    if (value.name == 'Revenda') {
                //        $scope.params.revendaID = value.code;
                //        return false;
                //    }
                //});

                $scope.params.roles = response;
            }).error(function (err, status) {
                console.log(err, status);
            });
        },

        
        // retorna o perfil do usuário da API
        getUserProfile: function () {
            $scope.params.loading = true;

            if (!$scope.params.userid) {
                $scope.params.loading = false;
                return;
            }

            // fetch data 
            admService.getUserProfile($scope.params.userid).success(function (response) {

                document.title = response.username;

                response.birthdate = formatDateToPtBr(response.birthdate);

                $scope.params.user = response;

                if ($scope.params.user.reseller) {
                    $scope.getCustomerDetails($scope.params.user.reseller);
                }

                $scope.params.loading = false;

                $scope.params.setTeamList();

            }).error(function (err, status) {
                $scope.params.loading = false;
                console.log(err);
            });

        },

        // remove da lista de equipes disponíveis as equipes já selecionadas
        setTeamList: function () {
            $scope.params.teams = [];

            if (!$scope.params.user || !$scope.params.allteams) {
                return;
            }

            if (!$scope.params.user.teams) {
                $scope.params.user.teams = [];
            }

            $.each($scope.params.allteams, function (index, team) {

                var found = false;

                $.each($scope.params.user.teams, function (index2, team2) {

                    if (team.code == team2.code) {
                        found = true;
                        return false;
                    }
                });
                if (!found) {
                    $scope.params.teams.push(angular.copy(team));
                }
            });

        },

        // inclui a equipe na lista de equipes do usuário
        putTeam: function (teamid) {
            if (!$scope.params.user || !$scope.params.allteams || !$scope.params.user.teams) {
                return;
            }

            $.each($scope.params.allteams, function (index, vteam) {
                if (vteam.code == teamid) {
                    $scope.params.user.teams.push(vteam);
                }
            });

            $scope.params.setTeamList();

        },

        // remove equipe da lista de equipes do usuário
        removeTeam: function (teamid) {

            if (!$scope.params.user || !$scope.params.allteams || !$scope.params.user.teams) {
                return;
            }

            $.each($scope.params.user.teams, function (index, vteam) {

                if (vteam && vteam.code == teamid) {
                    $scope.params.user.teams.splice(index, 1);
                }
            });

            $scope.params.setTeamList();

        },

        // salva os dados do usuário (integração)
        save: function () {
            $scope.params.saving = true;
            $scope.params.message = '';

            if ($scope.params.user.roleid == $scope.params.revendaID && !$scope.params.user.reseller) {
                $scope.params.message = 'Informe o código da revenda (parceiro SAP)';
                $scope.params.saving = false;
                return;
            }


            $scope.params.user.createseller = ($scope.params.user.slpcode == -1);

            $scope.params.user.branches = [];

            if ($scope.params.user.roleid != $scope.params.revendaID) {
                $scope.params.user.reseller = '';
            }

            $.each($scope.params.branches.branches, function (index, branch) {
                if (branch.selected) {
                    $scope.params.user.branches.push(branch);
                }
            });

            admService.saveUserProfile($scope.params.user).success(function (response) {
                //console.log('checkStatusNow', response);
                $scope.params.getIntegrationStatus(response);
            }).error(function (err, status) {
                console.log(err, status);
                $scope.params.message = err.Message;
                $scope.params.saving = false;
            });
        },

        // busca o status de integração do usuário
        getIntegrationStatus: function (id) {
            admService.getUserIntegrationStatus(id).success(function (response) {

                if (response.status == 'I') {

                    // Caso seja novo usuário, é necessário registrar na API e atribuir licença.
                    if (!$scope.params.userid) {

                        $scope.params.userid = response.user_id;

                        // se o usuário salvou com sucesso, registro na API
                        identityService.register($scope.params.user.email, 'Password123!', urlConfig.getUrlConfig().dataProfile).success(function (response) {

                            // busco novamente o cliente para pegar a chave da API
                            admService.getUserProfile($scope.params.userid).success(function (response) {

                                $scope.params.user = response;

                                // atribuo a licença
                                admService.putUserLicense($scope.params.user.api).success(function (response) {
                                    $location.path('/adm/userprofile/' + $scope.params.userid);

                                    $scope.params.saving = false;
                                }).error(function (err, status) {

                                    // se der erro ao atribuir, navego da mesma forma para a edição do usuário
                                    $location.path('/adm/userprofile/' + $scope.params.userid);
                                    $scope.params.saving = false;
                                    console.log(err);
                                });

                            }).error(function (err, status) {
                                $scope.params.saving = false;
                                console.log(err);
                            });

                        }).error(function (err, status) {
                            console.log(err, status);
                            $location.path('/adm/userprofile/' + $scope.params.userid);
                        });




                    }
                    else {
                        $scope.params.saving = false;
                    }

                }
                else if (response.status == 'E') {
                    $scope.params.saving = false;
                    console.log(response);
                    $scope.params.message = response.message;
                }
                else {

                    $scope.params.getIntegrationStatus(id);

                }


            }).error(function (err, status) {

                console.log(err, status);

            });
        },

        // registra o usuário na API
        register: function () {
            identityService.register($scope.params.user.email, 'Password123!', urlConfig.getUrlConfig().dataProfile).success(function (response) {
                $scope.params.getUserProfile();
            }).error(function (err, status) {
                console.log(err, status);
            });
        },

        // atribui licença ao usuário
        putUserLicense: function () {
            admService.putUserLicense($scope.params.user.api).success(function (response) {
                $scope.params.getUserProfile();
            }).error(function (err, status) {
                console.log(err);
            });
        },

        // remove a licença do usuário
        removeUserLicense: function (userid) {
            admService.removeUserLicense($scope.params.user.api).success(function (response) {
                $scope.params.getUserProfile();
            }).error(function (err, status) {
                console.log(err);
            });
        },

        getUserBranches: function () {

            if ($scope.params.userid > 0) {
                admService.getUserBranches($scope.params.userid).success(function (response) {
                    $scope.params.branches = response;
                }).error(function (err, status) {
                    console.log(err, status);
                });
            }


        },

        getEmailSuggestion: function () {
            console.log('hi');
            $scope.params.user.email =  createGuid().substring(1,8) + '@email.com';
        },

        // inicializa o escopo
        init: function () {

            if (!$scope.params.userid) {
                // se o id do usuário não é informado, é novo cadastro.
                document.title = 'Novo usuário';
            }

            $scope.params.getUserBranches();

            $scope.params.getRolesList();

            $scope.params.getUserProfile();

        }

    }

    $scope.customerSearchParam = '';

    //$scope.searchCustomer = function (customerSearchParam) {
    //    $scope.loadingbp = true;
    //    bpService.getCustomersList(customerSearchParam).success(function (response) {
    //        $scope.customersList = response;
    //        $scope.loadingbp = false;
    //    }).error(function (err, status) {
    //        console.log(err);
    //        $scope.loadingbp = false;
    //    });
    //}

    //$scope.changeCustomer = function (newreseller) {

    //    console.log(newreseller);

    //    $scope.params.user.reseller = newreseller;

    //    $scope.getCustomerDetails(newreseller);

    //    //console.log(newreseller);
    //    //$scope.params.reseller = 

    //    //orderService.changeCustomerFromOrder($scope.order.id, newreseller).success(function (response) {
    //    //    $location.path('/order/new/' + newreseller);
    //    //}).error(function (err, status) {
    //    //    console.log(err);
    //    //});
    //}

    //$scope.getCustomerDetails = function (reseller) {
    //    bpService.getCustomer(reseller).success(function (response) {

    //        if (response) {
    //            $scope.params.user.reseller = response.cardcode;
    //            $scope.params.user.resellername = response.cardname;
    //        }
    //        else {
    //            $scope.params.user.reseller = '';
    //            $scope.params.user.resellername = '';
    //        }

    //    }).error(function (err, status) {
    //        console.log(err, status);
    //        $scope.params.user.reseller = '';
    //        $scope.params.user.resellername = '';
    //    });
    //}

    $scope.params.init();


}]);
