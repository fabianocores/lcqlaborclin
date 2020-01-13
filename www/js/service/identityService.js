angular.module("arkabPortal").service("identityService", ['$http', 'appConfig', 'urlConfig', '$q', function ($http, appConfig, urlConfig, $q) {

    var userData = {
    };

    //this.getClientPublicIP = function ()
    //{
    //    return clientPublicIP;

    //    //return $http({
    //    //    url: 'https://www.l2.io/ip',
    //    //    method: 'JSONP',
    //    //    transformResponse: undefined,
    //    //    responseType: 'text'
    //    //}).success(function (data) {
    //    //    console.log(data);
    //    //    return data;
    //    //}).error(function (err, status) {
    //    //    console.log(err);
    //    //    console.log(status);
    //    //});


    //}

    this.logUserIn = function (loginData) {
        var ip = '';
        try {
            ip = clientPublicIP;
        } catch (e) {
            ip = '';
        }
        loginData.ip = ip;
        return $http({
            url: urlConfig.getUrlConfig().baseUrl.replace(/api\/$/, 'token'),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            method: "POST",
            data: "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&lat=" + loginData.latitude + "&lng=" + loginData.longitude + "&ip=" + loginData.ip
        });

    };


    this.resetUserData = function () {
        userData = { userName: 'Visitante', isAuthenticated: false, token: {} };
    }

    this.setUserData = function (data, ignoreParse) {

        //debugger;

        if (!ignoreParse) {
            // convert bool e int pois API responde apenas string ao obter token.
            data.profitability = (data.profitability === 'True' ? true : false);
            data.inactives = (data.inactives === 'True' ? true : false);
            data.posts = (data.posts === 'True' ? true : false);
            data.controlpanel = (data.controlpanel === 'True' ? true : false);
            data.freight = (data.freight === 'True' ? true : false);
            data.bplid = parseInt(data.bplid);
            data.companyEmployee = parseInt(data.companyEmployee);
            data.companySlpCode = parseInt(data.companySlpCode);
            data.companyUserId = parseInt(data.companyUserid);
        }

        

        userData = data;
    }

    this.setUserAvatar = function (avatarStream) {
        userData.avatarStream = avatarStream;
    }

    this.getUserIdentity = function () {
        return userData;
    }

    this.getUserInfo = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/UserInfo",
            method: "GET"
        });

    };

    this.isUserAuthehticated = function () {

        return $rootScope.identity.isAuthenticated;

    };

    this.postAvatar = function (file) {

        var fd = new FormData();
        fd.append('file', file);

        // todo: need to check file type, and stuff...

        //return $http({
        //    url: urlConfig.getUrlConfig().baseUrl + "Account/PostAvatar",
        //    transformRequest: angular.identity,
        //    method: "POST",
        //    headers: {
        //        'Content-Type': 'image/jpeg'
        //    }
        //});

        return $http.post(urlConfig.getUrlConfig().baseUrl + "Account/PostAvatar", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });

    }

    this.postSignaturePicture = function (file) {

        var fd = new FormData();
        fd.append('file', file);

        // todo: need to check file type, and stuff...

        //return $http({
        //    url: urlConfig.getUrlConfig().baseUrl + "Account/PostAvatar",
        //    transformRequest: angular.identity,
        //    method: "POST",
        //    headers: {
        //        'Content-Type': 'image/jpeg'
        //    }
        //});

        return $http.post(urlConfig.getUrlConfig().baseUrl + "Account/PostSignaturePicture", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });

    }

    this.changePassword = function (changePasswordModel) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/ChangePassword",
            method: "PUT",
            data: changePasswordModel
        });
    }
    this.resetPassword = function (resetPasswordModel) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/ResetPassword",
            method: "PUT",
            data: resetPasswordModel
        });
    }

    this.breakPassword = function (breakPasswordModel) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/BreakPassword",
            method: "PUT",
            data: breakPasswordModel
        });
    }

    this.sendMail = function (mail) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/SendMail",
            method: "POST",
            data: mail
        });
    }

    this.rememberPassword = function (rememberParams) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/RememberPassword",
            method: "POST",
            data: rememberParams
        });
    }

    this.putUserSignature = function (signature) {
        console.log(signature);
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/PutUserSignature",
            method: "PUT",
            data: signature
        });
    }


    this.getUserSignature = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/GetUserSignature/",
            method: "GET"
        });


    };

    this.getUserBranches = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/GetUserBranches/",
            method: "GET"
        });
    };

    this.getCompanyInfo = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/GetCompanyInfo/",
            method: "GET"
        });
    };

    this.getUserSmtp = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/GetUserSmtp",
            method: "GET"
        });
    };

    this.putUserSmtp = function (userSmtp) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/PutUserSmtp",
            method: "PUT",
            data: userSmtp
        });
    };

    this.canSelectWarehouse = function () {
        var roleFound = false;

        if (userData.roles == null) {
            return false;
        }

        try {
            $.each(appConfig.getAppConfig().orderConfig.selectwarehouseroles, function (index, value) {
                if (value.toUpperCase() == userData.roles.toUpperCase()) {
                    roleFound = true;
                    return false;
                }
            });
        } catch (e) {
            return false;
        }

        if (roleFound) {
            return true;
        }
        else {
            return false;
        }
    }

    this.canUseOpportunities = function () {
        var roleFound = false;

        if (userData.roles == null) {
            return false;
        }

        try {
            $.each(appConfig.getAppConfig().opportunities.roles, function (index, value) {
                if (value.toUpperCase() == userData.roles.toUpperCase()) {
                    roleFound = true;
                    return false;
                }
            });
        } catch (e) {
            return false;
        }
      

        if (roleFound) {
            return true;
        }
        else {
            return false;
        }
    }

    this.canSeeCalculatedFreight = function () {

        var roleFound = false;

        if (userData.roles == null) {
            return false;
        }

        if (!appConfig.getAppConfig().orderConfig.calculateFreight) {
            return false;
        }

        try {
            $.each(appConfig.getAppConfig().orderConfig.calculatedFreightRolesVisible, function (index, value) {
                if (value.toUpperCase() == userData.roles.toUpperCase()) {
                    roleFound = true;
                    return false;
                }
            });
        } catch (e) {
            return false;
        }


        if (roleFound) {
            return true;
        }
        else {
            return false;
        }
    }

    this.canSeeForecast = function () {

        var roleFound = false;

        if (userData.roles == null) {
            return false;
        }

        if (!appConfig.getAppConfig().orderConfig.forecast) {
            return false;
        }

        try {
            
            $.each(appConfig.getAppConfig().orderConfig.forecastRolesVisible, function (index, value) {
                if (value.toUpperCase() == userData.roles.toUpperCase()) {
                    roleFound = true;
                    return false;
                }
            });
        } catch (e) {
            return false;
        }

        if (roleFound) {
            return true;
        }
        else {
            return false;
        }
    }

    this.canEditCustomerSeller = function () {
        var roleFound = false;

        if (userData.roles == null) {
            return false;
        }

        if (!appConfig.getAppConfig().customerConfig.editCustomerSellerRoles) {
            return false;
        }

        try {
            $.each(appConfig.getAppConfig().customerConfig.editCustomerSellerRoles, function (index, value) {
                if (value.toUpperCase() == userData.roles.toUpperCase()) {
                    roleFound = true;
                    return false;
                }
            });
        } catch (e) {
            return false;
        }


        if (roleFound) {
            return true;
        }
        else {
            return false;
        }
    }

    this.canEditCustomerStatus = function () {
        var roleFound = false;

        if (userData.roles == null) {
            return false;
        }

        if (!appConfig.getAppConfig().customerConfig.editCustomerStatusRoles) {
            return false;
        }

        try {
            $.each(appConfig.getAppConfig().customerConfig.editCustomerStatusRoles, function (index, value) {
                if (value.toUpperCase() == userData.roles.toUpperCase()) {
                    roleFound = true;
                    return false;
                }
            });
        } catch (e) {
            return false;
        }


        if (roleFound) {
            return true;
        }
        else {
            return false;
        }
    }

    this.getWebAPPConfig = function (dataProfile) {

        var deferred = $q.defer();
        var result = {};

        $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetWebAPPConfig/" + dataProfile,
            method: "GET"
        }).error(function (err, status) {
            console.log(err, status);
        }).success(function (response) {
            deferred.resolve(response);
        });

        return deferred.promise;

    };

    this.getWebAPPConfigAS = function (dataProfile) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetWebAPPConfig/" + dataProfile,
            method: "GET"
        });

    };

    this.putWebAPPConfig = function (config) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutWebAPPConfig",
            method: "PUT",
            data: config
        });

    };


    this.getWebAPIConfig = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetWebAPIConfig",
            method: "GET"
        });

    };

    this.getWebAPIConfigByDomain = function (domain) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetWebAPIConfig/" + domain,
            method: "GET"
        });

    };

    this.putWebAPIConfig = function (config) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutWebAPIConfig",
            method: "PUT",
            data: config
        });

    };

    this.getUsersChat = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Chat/GetUsers",
            method: "GET"
        });

    };

    this.postImage = function (file) {

        var fd = new FormData();
        fd.append('file', file);

        // todo: need to check file type, and stuff...

        //return $http({
        //    url: urlConfig.getUrlConfig().baseUrl + "Account/PostAvatar",
        //    transformRequest: angular.identity,
        //    method: "POST",
        //    headers: {
        //        'Content-Type': 'image/jpeg'
        //    }
        //});

        return $http.post(urlConfig.getUrlConfig().baseUrl + "Account/PostImage", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });

    }

    this.postCarrierImage = function (pricelist, file) {

        var fd = new FormData();
        fd.append('file', file);

        // todo: need to check file type, and stuff...

        //return $http({
        //    url: urlConfig.getUrlConfig().baseUrl + "Account/PostAvatar",
        //    transformRequest: angular.identity,
        //    method: "POST",
        //    headers: {
        //        'Content-Type': 'image/jpeg'
        //    }
        //});

        return $http.post(urlConfig.getUrlConfig().baseUrl + "Adm/PostCarrierImage/" + pricelist, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });

    }

    this.getImages = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/GetImages",
            method: "GET"
        });

    };

    this.register = function (email, password, company) {

        var newUser = {
            Email: email,
            Password: password,
            ConfirmPassword: password,
            Company: company
        };

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/Register",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: newUser,
            method: "POST"
        });

    };

    this.postDevice = function(device)
    {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PostDevice",
            method: "POST",
            data: device
        });
    }

    this.getIndustryPermissions = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Account/GetIndustryPermissions",
            method: "GET"
        });

    };

}]);
