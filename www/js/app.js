//angular.module('arkabPortal', ['ngRoute', 'ngCookies', 'ngMap', 'googlechart', 'ngSanitize', 'ckeditor', 'ui.bootstrap', 'ngclipboard', 'angularjs.daterangepicker', 'luegg.directives', 'angular.filter']);

angular.module('arkabPortal', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'angularjs.daterangepicker', 'luegg.directives', 'angular.filter', 'summernote']);

var isCordovaApp = !!window.cordova;

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function formatDateToMonthAndYear(date) {

    var offset = new Date().getTimezoneOffset() * 60000

    var d = new Date(date);

    //d = new Date(d.getTime() + offset);
    d = new Date(d.getTime());

    var month = '' + (d.getMonth() + 1),
        //day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    //if (day.length < 2) day = '0' + day;

    return [month, year].join('/');
}

function formatDateToString(date) {

    var offset = new Date().getTimezoneOffset() * 60000

    var d = new Date(date);

    d = new Date(d.getTime());

    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function formatDateToPtBr(date) {

    if (date == null) {
        return null;
    }

    return moment(date).format('DD/MM/YYYY');

}

function isSameDate(date1, date2) {
    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate())
        return true;
    else
        return false;
}

function isToday(date) {
    if (date.getFullYear() == new Date().getFullYear() && date.getMonth() == new Date().getMonth() && date.getDate() == new Date().getDate())
        return true;
    else
        return false;
}

function formatDateToPtBrNoOffset(d) {

    if (d == null) {
        return null;
    }

    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

function formatDateTimeToPtBr(date) {

    if (!date) {
        return null;
    }

    return moment(date).format('DD/MM/YYYY HH:mm');

}

function formatDateTimeToPtBr2(date) {

    var d = new Date(moment.parseZone(date));

    //d = new Date(d.getTime() + offset);

    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes()

    if (month.toString().length < 2) month = '0' + month;
    if (day.toString().length < 2) day = '0' + day;
    if (hour.toString().length < 2) hour = '0' + hour;
    if (minutes.toString().length < 2) minutes = '0' + minutes;


    return [day, month, year].join('/') + ' ' + [hour, minutes].join(':');
}

function formatPtBrDate(sdate) {

    if (sdate == null) {
        return null;
    }

    return moment(sdate, 'DD/MM/YYYY');

    //var day = sdate.substring(0, 2);
    //var month = sdate.substring(3, 5);
    //var year = sdate.substring(6, 10);

    ////if (month.length < 2) month = '0' + month;
    ////if (day.length < 2) day = '0' + day;


    //return new Date(year, month - 1, day);

}

function formatPtBrDateTime(sdate) {
    // 0123456789012345
    // 13/05/2017 21:37

    console.log('sdate', sdate);

    var day = sdate.substring(0, 2);
    var month = sdate.substring(3, 5);
    var year = sdate.substring(6, 10);
    var hour = sdate.substring(11, 13);
    var minutes = sdate.substring(14, 16);
    var seconds = "00";

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (minutes.length < 2) minutes = '0' + minutes;

    var fdate = [year, month, day].join('-') + 'T' + [hour, minutes, seconds].join(':') + '-02:00';

    var date = moment(fdate);

    console.log('date', date);

    return date;

}


function monthName(month) {
    if (month == 1) {
        return 'Jan';
    } else if (month == 2) {
        return 'Fev';
    } else if (month == 3) {
        return 'Mar';
    } else if (month == 4) {
        return 'Abr';
    } else if (month == 5) {
        return 'Mai';
    } else if (month == 6) {
        return 'Jun';
    } else if (month == 7) {
        return 'Jul';
    } else if (month == 8) {
        return 'Ago';
    } else if (month == 9) {
        return 'Set';
    } else if (month == 10) {
        return 'Out';
    } else if (month == 11) {
        return 'Nov';
    } else if (month == 12) {
        return 'Dez';
    } else return month.toString();

}


function getFileNameFromHttpResponse(httpResponse) {
    var contentDispositionHeader = httpResponse.headers('Content-Disposition');
    var result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
}


function timeSpanBetweenDates(date1, date2) {
    var diff = date2.getTime() - date1.getTime();

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    var hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    var mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);

    var seconds = Math.floor(diff / (1000));
    diff -= seconds * (1000);

    return (days + " days, " + hours + " hours, " + mins + " minutes, " + seconds + " seconds");
}

function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


//var isCordovaApp = !!window.cordova;

//function addDays(date, days) {
//    var result = new Date(date);
//    result.setDate(result.getDate() + days);
//    return result;
//}

//function addMinutes(date, minutes) {
//    return new Date(date.getTime() + minutes * 60000);
//}

//function formatDateToMonthAndYear(date) {

//    var offset = new Date().getTimezoneOffset() * 60000

//    var d = new Date(date);

//    //d = new Date(d.getTime() + offset);
//    d = new Date(d.getTime());

//    var month = '' + (d.getMonth() + 1),
//        //day = '' + d.getDate(),
//        year = d.getFullYear();

//    if (month.length < 2) month = '0' + month;
//    //if (day.length < 2) day = '0' + day;

//    return [month, year].join('/');
//}

//function formatDateToString(date) {

//    var offset = new Date().getTimezoneOffset() * 60000

//    var d = new Date(date);

//    //d = new Date(d.getTime() + offset);
//    d = new Date(d.getTime());

//    var month = '' + (d.getMonth() + 1),
//        day = '' + d.getDate(),
//        year = d.getFullYear();

//    if (month.length < 2) month = '0' + month;
//    if (day.length < 2) day = '0' + day;

//    return [year, month, day].join('-');
//}

//function formatDateToPtBr(date) {

//    if (date == null) {
//        return null;
//    }



//    var offset = new Date().getTimezoneOffset() * 60000

//    var d = new Date(date);

//    //d = new Date(d.getTime() + offset);
//    d = new Date(d.getTime());


//    var month = '' + (d.getMonth() + 1),
//        day = '' + d.getDate(),
//        year = d.getFullYear(),
//        hour = d.getHours(),
//        minutes = d.getMinutes()

//    if (month.length < 2) month = '0' + month;
//    if (day.length < 2) day = '0' + day;

//    return [day, month, year].join('/');
//}

//function formatDateTimeToPtBr(date) {

//    var offset = new Date().getTimezoneOffset() * 60000

//    var d = new Date(date);

//    //d = new Date(d.getTime() + offset);

//    d = new Date(d.getTime());

//    var month = '' + (d.getMonth() + 1),
//        day = '' + d.getDate(),
//        year = d.getFullYear(),
//        hour = d.getHours(),
//        minutes = d.getMinutes()

//    if (month.toString().length < 2) month = '0' + month;
//    if (day.toString().length < 2) day = '0' + day;
//    if (hour.toString().length < 2) hour = '0' + hour;
//    if (minutes.toString().length < 2) minutes = '0' + minutes;


//    return [day, month, year].join('/') + ' ' + [hour, minutes].join(':');
//}

//function formatPtBrDate(sdate) {

//    if (sdate == null) {
//        return null;
//    }

//    var day = sdate.substring(0, 2);
//    var month = sdate.substring(3, 5);
//    var year = sdate.substring(6, 10);

//    //if (month.length < 2) month = '0' + month;
//    //if (day.length < 2) day = '0' + day;


//    return new Date(year, month - 1, day);

//}

//function formatPtBrDateTime(sdate) {
//    // 0123456789012345
//    // 13/05/2017 21:37


//    var day = sdate.substring(0, 2);
//    var month = sdate.substring(3, 5);
//    var year = sdate.substring(6, 10);
//    var hour = sdate.substring(11, 13);
//    var minutes = sdate.substring(14, 16);

//    if (month.length < 2) month = '0' + month;
//    if (day.length < 2) day = '0' + day;
//    if (hour.length < 2) hour = '0' + hour;
//    if (minutes.length < 2) minutes = '0' + minutes;

//    //console.log('formatPtBrDateTime Result', [year, month, day].join('-') + ' ' + [hour, minutes].join(':'));

//    return new Date([year, month, day].join('-') + ' ' + [hour, minutes].join(':'));

//}

//function monthName(month) {
//    if (month == 1) {
//        return 'Jan';
//    } else if (month == 2) {
//        return 'Fev';
//    } else if (month == 3) {
//        return 'Mar';
//    } else if (month == 4) {
//        return 'Abr';
//    } else if (month == 5) {
//        return 'Mai';
//    } else if (month == 6) {
//        return 'Jun';
//    } else if (month == 7) {
//        return 'Jul';
//    } else if (month == 8) {
//        return 'Ago';
//    } else if (month == 9) {
//        return 'Set';
//    } else if (month == 10) {
//        return 'Out';
//    } else if (month == 11) {
//        return 'Nov';
//    } else if (month == 12) {
//        return 'Dez';
//    } else return month.toString();

//}

//function getFileNameFromHttpResponse(httpResponse) {
//    var contentDispositionHeader = httpResponse.headers('Content-Disposition');
//    var result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
//    return result.replace(/"/g, '');
//}

//function timeSpanBetweenDates(date1, date2)
//{
//    var diff = date2.getTime() - date1.getTime();

//    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
//    diff -= days * (1000 * 60 * 60 * 24);

//    var hours = Math.floor(diff / (1000 * 60 * 60));
//    diff -= hours * (1000 * 60 * 60);

//    var mins = Math.floor(diff / (1000 * 60));
//    diff -= mins * (1000 * 60);

//    var seconds = Math.floor(diff / (1000));
//    diff -= seconds * (1000);

//    return (days + " days, " + hours + " hours, " + mins + " minutes, " + seconds + " seconds");
//}

