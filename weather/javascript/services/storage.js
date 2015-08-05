define(['jquery'], function($){
    'use strict';

    return {
        save: function(data) {
            var slide = $('.slide');
            if(slide.length < 10){
                localStorage.setItem(data.city, JSON.stringify(data));
                //console.log(data);

                require(['components/aside/asideComponent', 'components/page/pageComponent'], function (aside, page, dashboard) {
                    aside.showCity();
                    page.show();
                    //dashboard.show();
                })
            }
        },

        deleteCity: function(city){
            localStorage.removeItem(city);
        },

        update: function(){
            $.each(localStorage, function(key, value){
                var cityData = JSON.parse(value);
                var lat = cityData.latitude;
                var long = cityData.longitude;
                var city = cityData.city;

                require(['services/forecast'], function(forecast){
                    forecast.getForecastData(lat, long, city)
                })
            });
        }
    }
});

