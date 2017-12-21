// constante para instalação WEB, consumido pelo serviço urlConfig (appConfigKeys.js - coloquei neste script para uglify e unificação)
angular.module("arkabPortal").constant('urlConfigParams', {
    config: {

        // endereço da API do cliente, sempre com /api/ no final.
        //baseUrl: "https://localhost:44338/api/",
        baseUrl: 'http://192.168.0.13:81/WebAPITempPublish/api/',

        // nome do domínio da web api.
        dataProfile: "SBO_Laborclin",

        // propriedade no google analytics.
        googleAnalyticsChild: '1', 

        partnerConfig: {
            name: 'CVA Consultoria',
            site: 'http://www.cvaconsultoria.com.br',
            fone: '3030-4040',
            logo: 'cva', // utilize arquivos "partnerLogo"_20.png e _60.png
        },
    }
});

