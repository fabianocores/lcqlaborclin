// Formata nomes para deixar a primeira letra em maiúscula.
angular.module("arkabPortal").filter("cnpjCpfFilter", function(){
  return function(input){
      
      if(!input)
      {
        return '';
      }
      
      input = input.replace('.', '').replace('/', '').replace('-', '').replace('.', '').replace('.', '');
      
      if(input.length == 11)
      {
          return input.substring(0, 3) + '.' + input.substring(3, 6) + '.' + input.substring(6, 9) + '-' + input.substring(9, 11);
      }
      
      if(input.length == 14)
      {
          return input.substring(0, 2) + '.' 
               + input.substring(2, 5) + '.' 
               + input.substring(5, 8) + '/' 
               + input.substring(8, 12) + '-' 
               + input.substring(12, 14);
      }
      
      return input;
  };
});
