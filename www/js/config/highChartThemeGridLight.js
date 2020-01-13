/**
 * Grid-light theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
//Highcharts.createElement('link', {
//    href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
//    //href: 'https://fonts.googleapis.com/css?family=Waiting+for+the+Sunrise',
//    rel: 'stylesheet',
//    type: 'text/css'
//}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
    //colors: ["#7cb5ec", "#90ee7e", "#f7a35c", "#ff0066", "#7798BF", "#eeaaee", "#aaeeee",
    //   "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    colors: ["#60BD68", "#5DA5DA", "#F15854", "#FAA43A", "#4D4D4D", "#F17CB0", "#B2912F", "#B276B2", "#DECF3F", "#7cb5ec", "#90ee7e", "#f7a35c", "#7798BF", "#DF5353", "#55BF3B"],

    chart: {
        backgroundColor: null,
        style: {
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", //"Dosis, sans-serif"
        }
    },
    title: {
        style: {
            fontSize: '16px',
            fontWeight: 'bold',
            //textTransform: 'uppercase'
        }
    },
    tooltip: {
        borderWidth: 0,
        backgroundColor: 'rgba(219,219,216,0.8)',
        shadow: false
    },
    legend: {
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '15px',
            //textTransform: 'uppercase'
        }
    },
    xAxis: {
        gridLineWidth: 1,
        labels: {
            style: {
                fontSize: '14px'
            }
        }
    },
    yAxis: {
        minorTickInterval: 'auto',
        title: {
            style: {
                //textTransform: 'uppercase'
            }
        },
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },
    plotOptions: {
        candlestick: {
            lineColor: '#404048'
        }
    },


    // General
    background2: '#F0F0EA'

};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);