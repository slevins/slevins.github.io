define(['components/page/pageView', 'components/dashboard/dashboardComponent', 'jquery', 'lodash', 'text!components/page/pageTemplate.html'], function (pageView, dashboard, $, _, template) {
    'use strict';

    function show() {
        showCityInPage();
        pageView.render();
    }

    // Render data and show on tha page
    function showCityInPage(){
        var slider = $('.main-slider > ul');
        var pagination = $('#pagination');
        slider.html('');
        pagination.html('');

        $.each(localStorage, function(key, value){
            var cityData = JSON.parse(value);
            var id = '#' + ((cityData.city).split(' ').join('')).toLowerCase();
            var currentHour = new Date(cityData.currently.time * 1000).getUTCHours() + cityData.offset;
            //console.log(currentHour);

            var tmpl = _.template(template);
            var html = tmpl({cityData: cityData});
            slider.append(html);

            pagination.append('<a href=' + id + '></a>');

            // Add class dependant on time and set position for sun
            if(currentHour > 4 && currentHour <= 12){
                $(id).addClass('active-morning');
                $(id).find('.sun-block').css({'left':'-10%', 'bottom':'-20%'})
            }else if(currentHour > 12 && currentHour <= 20){
                $(id).addClass('active-afternoon');
                $(id).find('.sun-block').css({'left':'30%', 'bottom':'15%'})
            }else{
                $(id).addClass('active-night');
                $(id).find('.sun-block').css({'left':'50%', 'bottom':'-20%'})
            }

            // Add class dependant on weather
            if(cityData.currently.icon == 'rain' || cityData.currently.icon == 'sleet'){
                $(id).addClass('active-rain');
            }else if(cityData.currently.icon == 'snow'){
                $(id).addClass('active-snow');
            }

            // Set position for sun

        });
        dashboard.show();
    }

    return {
        show: show,
        showCity: showCityInPage
    }
});