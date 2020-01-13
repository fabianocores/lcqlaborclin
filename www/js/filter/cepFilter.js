angular.module("arkabPortal").filter("cepFilter", function(){
  return function(input){

    if (!input) {
      return "";
    }

    if (input.length < 5) {
      return input;
    }
    
    input = input.replace('.', '').replace('-', '');
    
    var output = input.substring(0, 5) + "-" + input.substring(5, 8);
    return output;
  };
});
