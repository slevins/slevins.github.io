define(['text!components/aside/asideTemplate.html', 'jquery', 'enscroll'], function (tmpl , $) {
    'use strict';
    var wrap = $('#wrapper');

    function render(param) {
        addAsideBar();
        initAsideHandlers();
    }

    function initAsideHandlers(){
        var searchForm = $('#form');
        var search = $('#search');
        var submit = $('#submit-form');
        var check = $('.search-form .icon-check');

        // Show search field
        $('.icon-add').on('click', function(){
            searchForm.toggleClass('active-search-form');
            search.focus();
            initAutocomplete();
        });

        // On click button menu show/hide aside bar
        $('.icon-menu').on('click', function(){
            $('.aside-menu').toggleClass('active-aside');
            $('.icon-menu').toggleClass('active-menu');
        });

        // Initialize scroll plugin
        $('.added-cities').enscroll({
            showOnHover: true,
            horizontalScrolling: false,
            verticalScrolling: true
        });

        // Show or hide submit button on search
        search.keyup(function(){
            var value = search.val();
            if(value){
                check.show();
            }else{
                check.hide();
            }
            return false;
        });

        // Request To Google when click submit
        searchForm.submit(function () {
            require(['services/geocode'], function(geocode){
                geocode.getGeocodeData();

                check.hide();
                search.val('');
            });

            return false;
        });

        // Delete city from Aside and LocalStorage
        $('.icon-delete').on('click', function () {
            $('.city-list li').each(function () {
                var cityName = $(this).find('.city').html();

                if ($(this).find('input[type=checkbox]').is(':checked')) {
                    $(this).remove();

                    $('#' + (cityName.split(' ').join('')).toLowerCase()).remove();

                    $('a[href=#'+ (cityName.split(' ').join('')).toLowerCase() +']').remove();

                    require(['services/storage'], function(storage){
                        storage.deleteCity(cityName);
                    })
                }
            });
            return false
        });

    }

    // Activate autocomplete
    function initAutocomplete(){

        var input = document.getElementById('search');
        var options = {
            types: ['(cities)']
        };

        var autocomplete = new google.maps.places.Autocomplete(input, options);
    }

    // Activate slider when click on city list
    function activeCityListSlider(){
        var activeCity = $('.aside-city > a');
        var left = 0;
        var slider = $('.main-slider ul');
        var pagination = $('#pagination');

        activeCity.on('click', function(){
            left += $($(this).attr('href')).offset().left;
            slider.animate({
                left: '-'+left
            },500);

            pagination.find('a[href='+ $(this).attr("href")+ ']').addClass('active-pagination').siblings().removeClass('active-pagination');

            return false
        })
    }

    // Add aside structure on the page
    function addAsideBar(){
        wrap.append(tmpl);
    }

    return {
        render: render,
        initSlides: activeCityListSlider
    }
});
