angular.module("arkabPortal").service("admService", ['$http', 'urlConfig', function ($http, urlConfig) {

    this.getUsers = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetUsers",
            method: "GET"
        });

    };

    this.getGroups = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetGroups",
            method: "GET"
        });

    };

    this.postGroup = function (newgroup) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PostGroup/" + newgroup,
            method: "POST"
        });

    };

    this.putGroup = function (group) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutGroup",
            method: "PUT",
            data: group
        });

    };

    this.deleteGroup = function (groupnum) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/DeleteGroup/" + groupnum,
            method: "DELETE"
        });

    };

    this.getUser = function (params) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetUser/" + params.userid,
            method: "GET"
        });

    };

    this.getUserProfile = function (userid) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetUserProfile/" + userid,
            method: "GET"
        });

    };

    this.saveUserProfile = function (user) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/SaveUserProfile",
            method: "PUT",
            data: user

        });

    };

    this.getUserIntegrationStatus = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetUserIntegrationStatus/" + id,
            method: "GET"
        });
    }

    this.getSalesPersonList = function () {
        return $http({ url: urlConfig.getUrlConfig().baseUrl + "Adm/GetSalesPersonList", method: "GET" })
    };

    this.getRolesList = function () {
        return $http({ url: urlConfig.getUrlConfig().baseUrl + "Adm/GetIndustryRolesList", method: "GET" })
    };

    this.getTeamsList = function () {
        return $http({ url: urlConfig.getUrlConfig().baseUrl + "Adm/GetTeamsList", method: "GET" })
    };

    this.getUserLog = function (params) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetUserLog/" + params.userid + "/" + params.year + "/" + params.month,
            method: "GET"
        });

    };

    this.getPerformanceLog = function (process, option) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetPerformanceLog/" + process + "/" + option,
            method: "GET"
        });

    };

    this.getUDF = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetUDF",
            method: "GET"
        });

    };

    this.putUDF = function (udf) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutUDF",
            method: "PUT",
            data: udf
        });

    };
    
    this.postLicense = function (file) {

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

        return $http.post(urlConfig.getUrlConfig().baseUrl + "Adm/PostLicense", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });

    }

    this.getLicense = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetLicense",
            method: "GET"
        });

    };

    this.putUserLicense = function (userid) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutUserLicense?licenseUserId=" + userid,
            method: "PUT"
        });

    };

    this.removeUserLicense = function (userid) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/RemoveUserLicense?licenseUserId=" + userid,
            method: "DELETE"
        });

    };

    this.getRoles = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetRoles",
            method: "GET"
        });

    };

    this.getProductsGroups = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetProductsGroups",
            method: "GET"
        });

    };

    this.putProductGroup = function (group) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutProductGroup",
            method: "PUT",
            data: group
        });

    };

    this.getAdmProducts = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetAdmProducts",
            method: "GET"
        });

    };

    this.putAdmProduct = function (product) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutAdmProduct",
            method: "PUT",
            data: product
        });

    };

    this.putUserAuthorization = function(userprofile)
    {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutUserAuthorization",
            method: "PUT",
            data: userprofile
        });
    }

    this.getFreightRegions = function (pricelist) {

        if (!pricelist) {
            pricelist = 0;
        }

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetFreightRegions/" + pricelist,
            method: "GET"
        });

    };

    this.getFreightStates = function (pricelist) {

        if (!pricelist) {
            pricelist = 0;
        }

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetFreightStates/" + pricelist,
            method: "GET"
        });

    };

    this.getFreightStateCities = function (pricelist, state) {

        if (!pricelist) {
            pricelist = 0;
        }

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetFreightStateCities/" + pricelist + "/" + state,
            method: "GET"
        });

    };

    this.getFreightRegion = function (region) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetFreightRegion/" + region,
            method: "GET"
        });

    };

    this.putFreightRegionCitiesByText = function(citiesObject)
    {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutFreightRegionCitiesByText",
            method: "PUT",
            data: citiesObject
        });
    }

    this.deleteFreightPriceListRegion = function (pricelist, linenum) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/DeleteFreightPriceListRegion/" + pricelist + "/" + linenum,
            method: "DELETE",
        });
    }

    this.deleteFreightRegionCity = function (region, city) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/DeleteFreightRegionCity/" + region + "/" + city,
            method: "DELETE",
        });
    }

    this.deleteFreightRegionCities = function (region, cities) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/DeleteFreightRegionCities/" + region,
            method: "POST",
            data: cities
        });
    }

    this.deleteFreightPriceList = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/DeleteFreightPriceList/" + id,
            method: "DELETE"
        });
    }

    this.postNewRegion = function (newRegionName) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PostNewRegion?newRegionName=" + newRegionName,
            method: "POST"
        });
    }

    this.putRegion = function (id, name) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutRegion?id=" + id + "&name=" + name,
            method: "PUT"
        });
    }

    this.deleteRegion = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/DeleteRegion?id=" + id,
            method: "DELETE"
        });
    }
    
    this.getFreightPriceLists = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetFreightPriceLists",
            method: "GET"
        });

    };

    this.getFreightPriceList = function (id) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetFreightPriceList/" + id,
            method: "GET"
        });

    };

    this.putRegionsInPriceList = function (regions) {
        console.log('putRegionsInPriceList', regions);
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutRegionsInPriceList",
            method: "PUT",
            data: regions
        });
    }

    this.putCitiesInPriceList = function (cities) {
        console.log('putCitiesInPriceList', cities);
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutCitiesInPriceList",
            method: "PUT",
            data: cities
        });
    }

    this.getPriceListRegionTaxes = function (pricelist, linenum)
    {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetPriceListRegionTaxes/" + pricelist + "/" + linenum,
            method: "GET"
        });
    }

    this.putTaxesInPriceListRegion = function (taxes) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutTaxesInPriceListRegion",
            method: "PUT",
            data: taxes
        });
    }

    this.putFreightPriceListRegion = function (pricelist, region) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutFreightPriceListRegion/" + pricelist,
            method: "PUT",
            data: region
        });
    }

    this.deleteFreightPriceListRange = function (pricelist, linenum, line) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/DeleteFreightPriceListRange/" + pricelist + "/" + linenum + "/" + line,
            method: "DELETE",
        });
    }

    this.deleteFreightPriceListTax = function (pricelist, linenum, taxcode) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/DeleteFreightPriceListTax/" + pricelist + "/" + linenum + "/" + taxcode,
            method: "DELETE",
        });
    }

    this.postFreightPriceList = function (cardcode) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PostFreightPriceList/" + cardcode,
            method: "POST"
        });
    }

    this.putFreightPriceList = function (param) {

        var pricelist = angular.copy(param);

        if (pricelist.startdate == '') {
            pricelist.startdate = null;
        }
        else
        {
            pricelist.startdate = formatPtBrDate(pricelist.startdate);
        }

        if (pricelist.enddate == '') {
            pricelist.enddate = null;
        }
        else
        {
            pricelist.enddate = formatPtBrDate(pricelist.enddate);
        }

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutFreightPriceList",
            method: "PUT",
            data: pricelist
        });
    }

    this.getFreightTaxes = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetFreightTaxes",
            method: "GET"
        });
    }

    this.deleteFreightTax = function (taxcode) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/DeleteFreightTax/" + taxcode,
            method: "DELETE"
        });
    }

    this.postFreightTax = function (taxcode, taxname) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PostFreightTax/" + taxcode + "/" + taxname,
            method: "POST"
        });
    }

    this.putFreightTax = function (tax) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutFreightTax",
            method: "PUT",
            data: tax
        });
    }

    this.putFreightRegionCityDeadLine = function (region, cityline) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutFreightRegionCityDeadLine/" + region + "/" + cityline.state + "/" + cityline.city + "/" + cityline.deadline,
            method: "PUT"
        });
    }

    this.getIndustryCList = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetIndustryCList",
            method: "GET"
        });

    };

    this.deleteIndustryCProduct = function (indcode, itemcode) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/deleteIndustryCProduct/" + indcode + "/" + itemcode,
            method: "DELETE"
        });

    };

    this.putIndustryCProduct = function (indcode, itemcode) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/putIndustryCProduct/" + indcode + "/" + itemcode,
            method: "PUT"
        });

    };

    this.getIndustryCProducts = function (indcode) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetIndustryCProducts/" + indcode,
            method: "GET"
        });

    };

    this.getBlockTypeList = function()
    {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetBlockTypeList",
            method: "GET"
        });
    }

    this.putBlock = function (block) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutBlock",
            method: "PUT",
            data: block
        });
    }

    this.putBlockUser = function (code, userid) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutBlockUser/" + code + "/" + userid,
            method: "PUT"
        });
    }

    this.deleteBlockUser = function (code, userid) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/DeleteBlockUser/" + code + "/" + userid,
            method: "DELETE"
            
        });
    }

    this.getUsages = function () {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetUsages",
            method: "GET"
        });

    };

    this.putUsage = function (usage) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/PutUsage",
            method: "PUT",
            data: usage
        });

    };

    this.postImage = function (file) {

        var fd = new FormData();
        fd.append('file', file);

        return $http.post(urlConfig.getUrlConfig().baseUrl + "Adm/PostLogo", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });

    }

    this.postWallpaper = function (file) {

        var fd = new FormData();
        fd.append('file', file);

        return $http.post(urlConfig.getUrlConfig().baseUrl + "Adm/PostWallpaper", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });

    }

    this.getUserBranches = function (target_userid) {

        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Adm/GetUserBranches/" + target_userid,
            method: "GET"
        });

    };


}]);
