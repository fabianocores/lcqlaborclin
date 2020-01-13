angular.module("arkabPortal").service("lcqService", ['$http', 'urlConfig', '$q', function ($http, urlConfig, $q) {

    this.getPermissions = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/GetPermissions",
            method: "GET"
        });

    };

    this.getUserPermissions = function (userid) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/GetUserPermissions/" + userid,
            method: "GET"
        });

    };

    this.putPermission = function(permission)
    {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/PutPermission",
            method: "PUT",
            data: permission
        });

    }

    this.getFichaLCQ = function (code) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/GetFichaLCQ/" + code,
            method: "GET"
        });

    };

    this.getListaFichas = function (params) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/GetListaFichas",
            method: "POST",
            data: params
        });

    };

    this.getTipoAnaliseList = function (code) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/GetTipoAnaliseList",
            method: "GET"
        });

    };

    this.getStatusLoteList = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/GetStatusLoteList",
            method: "GET"
        });
    };

    this.getUserStatusLoteList = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/GetUserStatusLoteList",
            method: "GET"
        });
    };

    this.getStatusLoteUsersList = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/GetStatusLoteUsersList",
            method: "GET"
        });

    };

    this.postStatusLoteUser = function (code, userid) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/PostStatusLoteUser/" + code + "/" + userid,
            method: "POST"
        });

    };

    this.deleteStatusLoteUser = function (code, userid) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/DeleteStatusLoteUser/" + code + "/" + userid,
            method: "DELETE"
        });

    };

    this.putFichaLCQ = function (ficha) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/PutFichaLCQ",
            method: "PUT",
            data: ficha
        });

    };

    this.getFichaLCQIntegrationStatus = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/GetFichaLCQIntegrationStatus/" + id,
            method: "GET"
        });
    }

    this.postFichaLCQEtiquetas = function (etiquetas) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/PostFichaLCQEtiquetas",
            method: "POST",
            data: etiquetas
        });

    };
    this.getIndicadoresLCQ = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/GetIndicadoresLCQ",
            method: "GET"
        });
    }

    this.postAttachment = function (docentry, file) {

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

        return $http.post(urlConfig.getUrlConfig().baseUrl + "LCQ/PostFichaLCQAttachment?docentry=" + docentry + "&filename=" + file.name, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });

    }

    this.deleteFichaLCQAttachment = function (attachmentid) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "LCQ/DeleteFichaLCQAttachment/" + attachmentid,
            method: "DELETE"
        });

    };

    this.getCertificatePDF = function (code) {


        //var u = encodeURIComponent(userid);
        //var t = encodeURIComponent(token);
        //var profile = encodeURIComponent(dataprofile);

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + 'LCQ/GetCertificatePDF?code=' + code,// + '&u=' + u + '&t=' + t,
            method: "GET",
            responseType: 'arraybuffer'
        });
    }

}]);
