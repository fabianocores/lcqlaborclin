angular.module("arkabPortal").filter("addressTypeFilter", function () {
    return function (input) {

        if (!input) {
            return "";
        }

        if (input.toUpperCase() == 'B')
            return 'Cobrança';

        if (input.toUpperCase() == 'S')
            return 'Entrega';

        return '';
    };
});


angular.module("arkabPortal").filter("queueStatusFilter", function () {
    return function (input) {

        if (!input) {
            return "";
        }

        if (input.toUpperCase() == 'A')
            return 'Ativo';

        if (input.toUpperCase() == 'E')
            return 'Erro';

        if (input.toUpperCase() == 'I')
            return 'Integrado';

        if (input.toUpperCase() == 'X')
            return 'Anulado';

        return input;
    };
});

angular.module("arkabPortal").filter("contentStatusFilter", function () {
    return function (input) {

        if (!input) {
            return "";
        }

        if (input.toUpperCase() == 'A')
            return 'Publicado';

        if (input.toUpperCase() == 'I')
            return 'Inativo';

        if (input.toUpperCase() == 'D')
            return 'Em edição';

        return input;
    };
});

angular.module("arkabPortal").filter("priorityFilter", function () {
    return function (input) {

        if (!input) {
            return "Baixa";
        }

        if (input.toString() == '0')
            return 'Baixa';

        if (input.toString() == '1')
            return 'Média';

        if (input.toString() == '2')
            return 'Alta';


        return input;
    };
});

angular.module("arkabPortal").filter("monthNameFilter", function () {
    return function (input) {

        if (!input) {
            return "";
        }

        if (input.toString() == '1') return 'Janeiro';
        if (input.toString() == '2') return 'Fevereiro';
        if (input.toString() == '3') return 'Março';
        if (input.toString() == '4') return 'Abril';
        if (input.toString() == '5') return 'Maio';
        if (input.toString() == '6') return 'Junho';
        if (input.toString() == '7') return 'Julho';
        if (input.toString() == '8') return 'Agosto';
        if (input.toString() == '9') return 'Setembro';
        if (input.toString() == '10') return 'Outubro';
        if (input.toString() == '11') return 'Novembro';
        if (input.toString() == '12') return 'Dezembro';

        return input;

    };
});
angular.module("arkabPortal").filter("monthShortNameFilter", function () {
    return function (input) {

        if (!input) {
            return "";
        }

        if (input.toString() == '1') return 'Jan';
        if (input.toString() == '2') return 'Fev';
        if (input.toString() == '3') return 'Mar';
        if (input.toString() == '4') return 'Abr';
        if (input.toString() == '5') return 'Mai';
        if (input.toString() == '6') return 'Jun';
        if (input.toString() == '7') return 'Jul';
        if (input.toString() == '8') return 'Ago';
        if (input.toString() == '9') return 'Set';
        if (input.toString() == '10') return 'Out';
        if (input.toString() == '11') return 'Nov';
        if (input.toString() == '12') return 'Dez';

        return input;

    };
});
angular.module("arkabPortal").filter("monthFilter", function () {
    return function (input) {

        if (!input) {
            return "";
        }

        if (input.length == 1) {
          return '0' + input;
        }

        return input;

    };
});

angular.module("arkabPortal").filter("replaceZeroFilter", function () {
    return function (input) {

        if (!input) {
            return "";
        }

        if (input == '0') {
            return '';
        }

        return input;

    };
});
angular.module("arkabPortal").filter("leftZeros", function () {
    return function (input, quantity) {

        if (!input) {
            return "";
        }

        if (!quantity) {
            return input;
        }

        var len = input.toString().length;
        var zeros = '';

        if (len < quantity) {
            for (var i = 0; i < quantity - len; i++) {
                zeros += '0';
            }
        }

        return zeros + input;

    };
});


angular.module("arkabPortal").filter("inStockFilter", ['appConfig', function (appConfig) {
    return function (input, replacement) {

        var r = replacement;

        if (r == undefined || r == null || r == '' || r == 'Prev.' || r == 'Prev. ') {
            r = 'Indisponível';
        }

        if (!input) {
            return r;
        }

        if (!appConfig.getAppConfig().showInStockQuantity) {
            return input > 0 ? 'Sim' : r;
        }

        return input > 0 ? input : r;

        return input;

    };
}]);

angular.module("arkabPortal").filter("yesNoFilter", function () {
    return function (input) {

        return !input ? 'Não' : 'Sim';

        //if (!input) {
        //    return "";
        //}

        //if (!appConfig.showInStockQuantity) {
        //    return input > 0 ? 'Sim' : 'Não'
        //}
        //return input;

    };
});


angular.module("arkabPortal").filter("yesFilter", function () {
    return function (input) {

        return !input ? '' : 'Sim';

    };
});

angular.module("arkabPortal").filter("replaceDotByPipe", function () {
    return function (input) {

        if (!input) {
            return "";
        }
        
        return input.replace('.', '%2E').replace('.', '%2E').replace('.', '%2E').replace('.', '%2E');

    };
});


angular.module("arkabPortal").filter("replaceBrackets", function () {
    return function (input) {

        if (!input) {
            return "";
        }

        return input.replace(/[\[\]']+/g, '').replace(/,/g, ', ');;

    };
});

angular.module("arkabPortal").filter("objTypeFilter", function () {
    return function (input) {

        if (!input) {
            return "";
        }

        if (input == "13") {
            return "Nota fiscal";
        }
        if (input == "15") {
            return "Entrega";
        }
        if (input == "17") {
            return "Pedido de venda";
        }
        if (input == "23") {
            return "Orçamento";
        }

    };
});

angular.module("arkabPortal").filter("objTypeShortFilter", function () {
    return function (input) {

        if (!input) {
            return "";
        }

        if (input == "13" || input == "Nota fiscal") {
            return "NF";
        }
        if (input == "15" || input == 'Entrega') {
            return "EN";
        }
        if (input == "17" || input == 'Pedido de venda') {
            return "PV";
        }
        if (input == "23" || input == 'Orçamento') {
            return "OR";
        }

    };
});

angular.module("arkabPortal").filter("treeTypeFilter", function () {
    return function (input, hidecomp) {

        if (!input) {
            return "";
        }

        if (input == "S") {
            return "KIT " + (hidecomp ? 'fechado' : 'aberto');
        }
        if (input == "P") {
            return "Produção";
        }
        if (input == "T") {
            return "Modelo";
        }
        if (input == "N") {
            return "Revenda";
        }

        return "?";

    };
});

angular.module("arkabPortal").filter("opportunityStatusFilter", function () {
    return function (input) {

        if (!input) {
            return "";
        }

        if (input == "O") {
            return "Aberto";
        }
        if (input == "W") {
            return "Ganhou";
        }
        if (input == "L") {
            return "Perdeu";
        }

        return "?";

    };
});


angular.module("arkabPortal").filter("flagFilter", ['$sce', function ($sce) {
    return function (input) {

        if (!input) {
            return "";
        }

        if (input.indexOf('Dólar comercial') >= 0) {
            return $sce.trustAsHtml('<img src="img/icons/dollar-icon.png" vAlign="absmiddle" style="width: 16px; height: 16px;" alt="' + input + '" /> ');
        }

        if (input.indexOf('Dólar Canadense') >= 0) {
            return $sce.trustAsHtml('<img src="img/icons/can-icon.png" vAlign="absmiddle" style="width: 16px; height: 16px;" alt="' + input + '" /> ');
        }

        if (input.indexOf('Euro') >= 0) {
            return $sce.trustAsHtml('<img src="img/icons/euro-icon.png" vAlign="absmiddle" style="width: 16px; height: 16px;" alt="' + input + '" /> ');
        }

        return input;
    };
}]);



angular.module("arkabPortal").filter('revertListFilter', function () {
    return function (items) {
        return items.slice().reverse();
    };
});

angular.module("arkabPortal").filter('firstNameFilter', function () {
    return function (items) {
        return items.split(' ')[0];
    };
});


angular.module("arkabPortal").filter("absValueFilter", ['$sce', function ($sce) {
    return function (input) {

        if (input < 0) {
            return input * -1;
        }
        return input;
    };
}]);

angular.module("arkabPortal").filter("blockTypeRoleFilter", function () {
    return function (input) {

        if (!input) {
            return "";
        }

        if (input.toUpperCase() == 'G')
            return 'Gerente';

        if (input.toUpperCase() == 'S')
            return 'Supervisor';

        if (input.toUpperCase() == 'A')
            return 'Assistente';

        if (input.toUpperCase() == 'C')
            return 'Customizado';

        return input;
    };
});

angular.module("arkabPortal").filter("removePoint", function () {
    return function (input) {

        return !input ? '' : input.replace(/\.|\-|ltda|LTDA|Ltda/g, ' ');

    };
});

angular.module("arkabPortal").filter("removeCardCode", function () {
    return function (input, cardcode) {

        return !input ? '' : input.replace(cardcode, ' ');

    };
});

angular.module("arkabPortal").filter("formatFoneLink", function () {
    return function (input, ddd) {

        return !input ? '' : '+55' + ddd + input.replace(/^0/, '').replace(/\(|\)|\.|\-/g, '');

    };
});

angular.module("arkabPortal").filter("encodeURI", function () {
    return function (input) {

        //return !input ? '' : encodeURI(input);

        return !input ? '' : input.replace(/\//, '');

    };
});


angular.module("arkabPortal").filter("statusLinhaLCQ", function () {
    return function (input) {

        //return !input ? '' : encodeURI(input);

        if (!input) {
            return null;
        }

        if (input == 'P') {
            return 'Pendente';
        }

        if (input == 'A') {
            return 'Aprovado';
        }

        if (input == 'R') {
            return 'Reprovado';
        }

        return input;

    };
});

angular.module("arkabPortal").filter("ordertype", function () {
    return function (input) {

        //return !input ? '' : encodeURI(input);

        if (!input) {
            return null;
        }

        if (input == 'W') {
            return 'Produção';
        }

        if (input == 'P') {
            return 'Compra';
        }

        return input;

    };
});

angular.module("arkabPortal").filter("removeAsterisk", function () {
    return function (input) {

        //return !input ? '' : encodeURI(input);

        if (!input) {
            return null;
        }

        if (input == '*') {
            return '';
        }

        if (input.substring(0,1) == '*') {
            return input.substring(1, input.length);
        }

        return input;
    };
});

