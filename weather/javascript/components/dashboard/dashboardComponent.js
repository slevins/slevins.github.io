
define(['components/dashboard/dashboardView', 'text!components/dashboard/dashboardTemplate.html', 'jquery', 'lodash'], function(dashboardView, template, $, _){
    'use strict';

    function show(){
        addDashboard();
        dashboardView.render();
    }

    // Add temperature structure on week in the page
    function addDashboard(){

        $.each(localStorage, function(key, value){
            var cityData = JSON.parse(value);

            var tmpl = _.template(template);
            var html = tmpl({cityData: cityData});
            $('#' + ((cityData.city).split(' ').join('')).toLowerCase()).append(html);
        });

    }

    return {
        show: show
    }
});