angular.module("arkabPortal").service("activityService", ['$http', 'urlConfig', '$q', function ($http, urlConfig, $q) {

    this.getCalendar = function (params) {
        var start = JSON.stringify(params.startdate).replace(/"/gi, '');
        var end = JSON.stringify(params.enddate).replace(/"/gi, '');
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetCalendar?start=" + start + "&end=" + end,
            method: "GET"
        });

    };

    this.getCalendarEvents = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetCalendarEvents",
            method: "GET"
        });

    };

    this.getCalendarEventsFromSeller = function (slpcode) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetCalendarEventsFromSeller/" + slpcode,
            method: "GET"
        });

    };

    this.getCalendarEvent = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetCalendarEvent",
            method: "GET",
            params: {
                id: id
            }
        });

    };

    this.getCalendarHistory = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetCalendarHistory",
            method: "GET",
            params: {
                id: id
            }
        });

    };

    this.getActivityActionList = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetActivityActionList",
            method: "GET"
        });

    };

    this.getActivityObjTypeList = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetActivityObjTypeList",
            method: "GET"
        });

    };

    this.getActivityTypeList = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetActivityTypeList",
            method: "GET"
        });

    };

    this.getActivitySubjectList = function (type) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetActivitySubjectList",
            method: "GET",
            params: {
                type: type
            }
        });

    };

    this.getActivityAttendUserList = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetActivityAttendUserList",
            method: "GET"
        });

    };

    this.getActivityContactList = function (cardcode) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetActivityContactList",
            method: "GET",
            params: { cardcode: cardcode }
        });

    };

    this.putActivity = function (activity) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/putActivity",
            method: "PUT",
            data: activity
        });

        //  public int cntcttype { get; set; }
        //    public int cntctsbjct { get; set; }
        //     public string cardcode { get; set; }
        //     public string priority { get; set; }
        //     public string doctype { get; set; }
        //     public string docnum { get; set; }
        //     public int? cntctcode { get; set; }
        //     public int attenduser { get; set; }
        //     public bool reminder { get; set; }
        //     public int remqty { get; set; }
    }

    this.getActivityIntegrationStatus = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetActivityIntegrationStatus",
            method: "GET",
            params: {
                id: id
            }
        });

    };

    this.startNewActivity = function (cardcode, objtype, docnum) {

        if (objtype == null) {
            objtype = '';
        }

        if (docnum == null) {
            docnum = '';
        }

        if (objtype != '' || docnum != '') {

            if (objtype == '' || docnum == '') {
                objtype = '';
                docnum = '';
            }

        }

        if (objtype != '') {

            return $http({
                url: urlConfig.getUrlConfig().baseUrl + "Activity/StartNewActivity/" + cardcode + "/" + objtype + "/" + docnum,
                method: "GET"
            });

        }
        else {

            return $http({
                url: urlConfig.getUrlConfig().baseUrl + "Activity/StartNewActivity/" + cardcode,
                method: "GET"
            });
        }

    };

    this.getactivityprofiles = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/Getactivityprofiles",
            method: "GET"
        });

    };

    this.putActivityProfile = function (profile) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/PutActivityProfile",
            method: "PUT",
            data: profile
        });
    }

    this.deleteActivityProfile = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/DeleteActivityProfile/" + id,
            method: "DELETE"
        });
    }

    this.getContentListByStatus = function (status) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetContentListByStatus/" + status,
            method: "GET"
        });

    };

    this.getContentList = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetContentList",
            method: "GET"
        });

    };

    this.getContent = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetContent/" + id,
            method: "GET"
        });

    };

    this.getContentForEditing = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetContentForEditing/" + id,
            method: "GET"
        });

    };

    this.postContent = function (post) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/PostContent",
            method: "POST",
            data: post
        });
    };

    this.putContentStatus = function (id, newstatus) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/PutContentStatus/" + id + "/" + newstatus,
            method: "PUT"
        });
    };

    this.deleteContent = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/DeleteContent/" + id,
            method: "DELETE"
        });
    };
    this.getLastExchangeRates = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetLastExchangeRates",
            method: "GET"
        });
    }

    this.getExchangeRates = function () {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetExchangeRates",
            method: "GET"
        });
    }

    this.getActivityUDF = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetActivityUDF/" + id,
            method: "GET"
        });
    }

    this.putActivityUDF = function (id, udf) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Order/PutActivityUDF/" + id,
            method: "PUT",
            data: udf
        });
    }

    this.getActivityAttachmentDownload = function (clgcode, line) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetActivityAttachmentDownload/" + clgcode + "/" + line,
            method: "GET",
            responseType: 'arraybuffer'
        });
    }

    this.postActivityAttachment = function (clgcode, file) {

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

        return $http.post(urlConfig.getUrlConfig().baseUrl + "Activity/PostActivityAttachment?clgcode=" + clgcode + "&filename=" + file.name, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });

    }

    this.deleteActivityAttachment = function(clgcode, line)
    {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/DeleteActivityAttachment/" + clgcode + "/" + line,
            method: "DELETE"
        });
    }

    this.getPostActivityAttachmentIntegrationStatus = function (id) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "Activity/GetPostActivityAttachmentIntegrationStatus/" + id,
            method: "GET"
        });
    }

    this.getActivityAttachments = function (clgcode) {
        return $http({
            url: urlConfig.getUrlConfig().baseUrl + "ACtivity/GetActivityAttachments/" + clgcode,
            method: "GET"
        });
    }


}]);
