define(['jquery'], function($){
    'use strict';

    function getData(){
        var city = $('#search').val();
        var url = 'http://maps.google.com/maps/api/geocode/json?address=' + city + '?language=en';

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                //console.log(data);

                var cityName = data.results[0].address_components[0].long_name;
                var latitude = data.results[0].geometry.location.lat;
                var longitude = data.results[0].geometry.location.lng;

                require(['services/forecast'], function(forecast){
                    forecast.getForecastData(latitude,longitude,cityName);
                })
            }
        });
    }

    return {
        getGeocodeData: getData
    }

});

