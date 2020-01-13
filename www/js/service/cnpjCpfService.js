angular.module("arkabPortal").service("cnpjCpfService", function () {

    this.validate = function(docnum){

        docnum = docnum.replace('.', '').replace('/', '').replace('-', '').replace('.', '').replace('.', '');
        
        var result = {
          valid: false,
          formatted: '',
          unformatted: docnum,
          message: ''
        };

        if(docnum.length == 11)
        {
            result.valid = validateCPF(docnum);

            if(result.valid)
            {
              result.formatted = docnum.substring(0, 3) + '.' + docnum.substring(3, 6) + '.' + docnum.substring(6, 9) + '-' + docnum.substring(9, 11);
              return result;
            }
            else
            {
              result.message = 'Número de CPF inválido.';
              return result;
            }

        }
        else if(docnum.length == 14)
        {
            result.valid = validateCNPJ(docnum);

            if(result.valid)
            {
              result.formatted = docnum.substring(0, 2) + '.'
                     + docnum.substring(2, 5) + '.'
                     + docnum.substring(5, 8) + '/'
                     + docnum.substring(8, 12) + '-'
                     + docnum.substring(12, 14);
              return result;
            }
            else
            {
                result.message = 'Número de CNPJ inválido.';
                return result;
            }
        }
        else
        {
          result.message = 'Formato da identificação fiscal é inválido.';
          return result;
        }

        return result;


    };

    function validateCNPJ(cnpj) {

        cnpj = cnpj.replace(/[^\d]+/g,'');

        if(cnpj == '') return false;

        if (cnpj.length != 14)
            return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        tamanho = cnpj.length - 2;
        numeros = cnpj.substring(0,tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos-- ;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;

    };

    function validateCPF (strCPF) {
        var Soma;
        var Resto;
        Soma = 0;

        // Elimina CPFs invalidos conhecidos
        if (strCPF == "00000000000" ||
            strCPF == "11111111111" ||
            strCPF == "22222222222" ||
            strCPF == "33333333333" ||
            strCPF == "44444444444" ||
            strCPF == "55555555555" ||
            strCPF == "66666666666" ||
            strCPF == "77777777777" ||
            strCPF == "88888888888" ||
            strCPF == "99999999999")
            return false;

        for (i=1; i<=9; i++)
            Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);

        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))
            Resto = 0;

        if (Resto != parseInt(strCPF.substring(9, 10)) )
            return false;

        Soma = 0;

        for (i = 1; i <= 10; i++)
            Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);

        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))
            Resto = 0;

        if (Resto != parseInt(strCPF.substring(10, 11) ) )
            return false;
        return true;
    };

});
