define(['jquery', 'enscroll'], function ( $) {
    'use strict';

    function render() {
        initMainSlider();
        initScroll();
        initTime();
        initUpdate();
    }

    // Initialization horizontal scroll
    function initScroll(){
        $('.weather-for-day').enscroll({
            horizontalScrolling: true,
            verticalScrolling: false
        });
    }

    // Initialize current time
    function initTime(){
        var date = new Date;
        var min = date.getMinutes();
        (function(time){
            var min = (time < 10) ? '0'+time : time;
            return  $('.time-now').html(date.getHours() + ' : ' + min);
        })(min);
    }

    // Move slides when click on pagination button
    function initMainSlider(){
        var left = 0;
        var point = $('#pagination a');
        var slider = $('.main-slider ul');

        point.first().addClass('active-pagination');

        point.on('click', function() {
            $(this).addClass('active-pagination').siblings().removeClass('active-pagination');

            left += $($(this).attr('href')).offset().left;
            slider.animate({
                left: '-'+left
            },500);
            return false
        });
    }

    // Initialize update button
    function initUpdate(){
        $('.icon-refresh').on('click', function(){
            require(['services/storage'], function(storage){
                storage.update();
            })
        })
    }

    return {
        render: render
    }
});
