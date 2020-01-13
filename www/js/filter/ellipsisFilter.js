angular.module("arkabPortal").filter("ellipsisFilter", function () {
    return function (input, length) {

        if (!input) {
            return "";
        }

        if (input.length <= length) {
            return input;
        }
        var output = input.substring(0, (length || 2)) + "...";
        return output;
    };
});
