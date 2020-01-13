

angular.module("arkabPortal").service("stateService", ['$http', 'appConfig', 'identityService', 'appConfigComponents', 'urlConfig', function ($http, appConfig, identityService, appConfigComponents, urlConfig) {

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var firstDay2 = '01/' +
                   ((new Date().getMonth() + 1) < 10 ? '0' : '') + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();

    var lastDay2 = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() + '/' +
        ((new Date().getMonth() + 1) < 10 ? '0' : '') + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();

    var firstAnnualDay = formatDateToPtBr(addDays(new Date(), -364));

    var lastAnnualDay = formatDateToPtBr(new Date());

    var actualMonth = new Date().getMonth() + 1;
    var actualYear = new Date().getFullYear();

    var lastMonth = actualMonth - 1;
    var lastMonthYear = actualYear;

    if (lastMonth == 0) {
        lastMonth = 12;
        lastMonthYear -= 1;
    }

    var workflowViewState = {
        view: 'waiting'
    }

    
    //var salesState = {
    //    params: {
    //        startdate: firstDay2,
    //        enddate: lastDay2,
    //        docnum: '',
    //        quotations: true,
    //        orders: true,
    //        invoices: true,
    //        slpcode: parseInt(identityService.getUserIdentity().companySlpCode),
    //        attendant: parseInt(identityService.getUserIdentity().companyEmployee)
    //    },
    //    documents: null

    //};

    var lcqState = {
        params: {
            status: 'Aberto',
        },
        report: null,
        daterangeoptions: {
            ranges: {
                'Hoje': [moment(), moment()],
                'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Últimos 7 dias': [moment().subtract(6, 'days'), moment()],
                'Últimos 30 dias': [moment().subtract(29, 'days'), moment()],
                'Mês passado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        }
        }
    }

    //$scope.params.daterangeoptions.ranges = {
    //    'Hoje': [moment(), moment()],
    //    'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    //    'Últimos 7 dias': [moment().subtract(6, 'days'), moment()],
    //    'Últimos 30 dias': [moment().subtract(29, 'days'), moment()],
    //    'Mês passado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    //}


    var salesState = {
        params: {
            startdate: moment().subtract(29, 'days'),
            enddate: moment(),
            docnum: '',
            quotations: true,
            orders: true,
            invoices: true,
            slpcode: parseInt(identityService.getUserIdentity().companySlpCode),
            attendant: parseInt(identityService.getUserIdentity().companyEmployee),
            daterangeoptions: angular.copy(appConfigComponents.daterangeoptions)
        },
        documents: null

    };

    var commissionState = {
        params: {
            month: lastMonth,
            year: lastMonthYear,
        },
        report: null

    };

    var customersListState = {
        customers: null,
        params: {
            type: 'Regular',
            slpcode: parseInt(identityService.getUserIdentity().companySlpCode)
        }

    };

    var progressionState = {
        report: null,
        params: {
            year: date.getFullYear(),
            teamid: 0,
        },
        message: '',
        config: appConfig.getAppConfig().monitorConfig
    }

    var revenueByProductLineState = {
        report: null,
        params: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
        },
        message: ''
    }

    var campaingTrackingState = {
        report: null,
        params: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
        },
        message: ''
    }

    this.reset = function () {
        //salesState = {
        //    params: {
        //        startdate: moment().subtract(29, 'days'),
        //        enddate: moment(),
        //        docnum: '',
        //        quotations: true,
        //        orders: true,
        //        invoices: true,
        //        slpcode: parseInt(identityService.getUserIdentity().companySlpCode),
        //        attendant: parseInt(identityService.getUserIdentity().companyEmployee),
        //        daterangeoptions: angular.copy(appConfigComponents.daterangeoptions)
        //    },
        //    documents: null

        //};

        //commissionState = {
        //    params: {
        //        month: lastMonth,
        //        year: lastMonthYear,
        //    },
        //    report: null

        //};

        //customersListState = {
        //    customers: null,
        //    params: {
        //        type: 'Regular',
        //        slpcode: parseInt(identityService.getUserIdentity().companySlpCode)
        //    }

        //};

        //progressionState = {
        //    report: null,
        //    params: {
        //        year: date.getFullYear(),
        //        teamid: 0,
        //    },
        //    message: '',
        //    config: appConfig.getAppConfig().monitorConfig
        //}

        //revenueByProductLineState = {
        //    report: null,
        //    params: {
        //        year: date.getFullYear(),
        //        month: date.getMonth() + 1,
        //    },
        //    message: ''
        //}

        //campaingTrackingState = {
        //    report: null,
        //    params: {
        //        year: date.getFullYear(),
        //        month: date.getMonth() + 1,
        //    },
        //    message: ''
        //}

    }

    this.setLcqState = function (ps) {
        lcqState = ps;
    }
    this.getLcqState = function()
    {
        return lcqState;
    }

    this.setCampaingTrackingState = function (ps) {
        campaingTrackingState = ps;
    }

    this.getCampaingTrackingState = function () {
        return campaingTrackingState;
    }

    this.setRevenueByProductLineState = function (ps) {
        revenueByProductLineState = ps;
    }

    this.getRevenueByProductLineState = function () {
        return revenueByProductLineState;
    }

    this.setProgressionState = function (ps) {
        progressionState = ps;
    }

    this.getProgressionState = function () {
        return progressionState;
    }

    this.setSalesState = function (params, documents) {
        salesState.params = params;
        salesState.documents = documents;
    }

    this.getSalesState = function () {
        return salesState;
    }
    this.setCommissionState = function (params, report) {
        commissionState.params = params;
        commissionState.report = report;
    }

    this.getCommissionState = function () {
        return commissionState;
    }

    this.setCustomersListState = function (customers, type) {
        customersListState.customers = customers;
        customersListState.type = type;
    }

    this.getCustomersListState = function () {
        return customersListState;
    }

    this.getWorkflowViewState = function () {
        return workflowViewState.view;
    }

    this.setWorkflowViewState = function (view) {
        workflowViewState.view = view;
    }

    this.getStartingAnnualPeriod = function () {
        return { firstAnnualDay: firstAnnualDay, lastAnnualDay: lastAnnualDay };
    }

    var exchangeRates = [];
    var lastExchangeRate = [];

    this.getExchangeRates = function () {
        return exchangeRates;
    }

    this.setExchangeRates = function (rates) {
        exchangeRates = rates;
    }

    this.getLastExchangeRate = function () {
        return lastExchangeRate;
    }

    this.setLastExchangeRate = function (rate) {
        lastExchangeRate = rate;
    }


}]);

