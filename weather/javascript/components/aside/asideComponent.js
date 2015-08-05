
define(['components/aside/asideView', 'jquery', 'text!components/aside/localCityTemplate.html', 'lodash'], function(asideView, $, template, _){
    'use strict';

    function show(){
        asideView.render();
        showCityInAside();
        asideView.initSlides();
    }

    function showCityInAside(){
        var cityList = $('.city-list');
        cityList.html('');

        $.each(localStorage, function(key, value){
            var cityData = JSON.parse(value);

            var tmpl = _.template(template);
            var html = tmpl({cityData: cityData});
            cityList.append(html)
        });
        asideView.initSlides();
    }

    return {
        show: show,
        showCity: showCityInAside
    }
});