define(['jquery'], function($){
    'use strict';

    function getData(lat, long, city){
        var ApiKeyForecast = '3c956d0f1e9a996c11b6fc9cd1e98cb6';
        var locationUrl = 'https://api.forecast.io/forecast/' + ApiKeyForecast + '/' + lat + ',' + long + '';

        /*var serverTimeOut = setTimeout(function () {
            alert('Server don`t response')
        }, 10000);*/

        $.ajax({
            url: locationUrl,
            type: 'GET',
            dataType: 'jsonp',
            success: function (data) {
                //console.log(data);

                data.city = city;
                //clearTimeout(serverTimeOut);

                require(['services/storage'], function(storage){
                    storage.save(data);
                })
            }
        })
    }

    return {
        getForecastData: getData
    }

});

