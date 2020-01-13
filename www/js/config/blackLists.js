
angular.module("arkabPortal").constant("blackLists", {
    // "path" - the specific path 
    // "domain" - everything that begins with the term (as domain)
    representativesBlackList: [
        { path: '/monitor', option: 'path' },
        { path: '/adm', option: 'domain' },
    ],

    resellersBlackList: [
        // option: "domain" - everything that begins with, path - the specific path.
        { path: '/monitor', option: 'domain'},
        { path: '/adm', option: 'domain' },
        { path: '/activity', option: 'domain' },
        { path: '/activities', option: 'domain' },
        { path: '/reports/stock', option: 'domain' },
        { path: '/reports/customersList', option: 'domain' },
        { path: '/reports/progression', option: 'domain' },
        { path: '/reports/revenue', option: 'domain' },
        { path: '/reports/campaing', option: 'domain' },
        { path: '/reports/opportunities', option: 'domain' },
        { path: '/reports/comission', option: 'domain' },
        { path: '/reports/revenue', option: 'domain' },
        { path: '/customer/search', option: 'domain' },

    ]

});
