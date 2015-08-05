define(['text!components/settings/settingTemplate.html', 'jquery', 'range'], function (tmpl , $) {
    'use strict';

    function render(param) {
        addSettings();
        initSliderRange();
        initHandlerTemp();
        initRanges();
    }

    // Initialize two range sliders
    function initSliderRange(){
        $('.range-days').jRange({
            from: 1,
            to: 7,
            showLabels: true,
            showScale: false,
            width: '100%'
        });

        $('.range-time').jRange({
            from: 0,
            to: 60,
            step: 15,
            showLabels: true,
            showScale: false,
            width: '100%'
        });
    }

    // Initialize handler of temperature
    function initHandlerTemp(){
        var faring = $('.faring');
        var celsius =  $('.celsius');

        celsius.on('click', function(){
            var convert = $('.convert');

            if(!(celsius.hasClass('active-temperature'))){
                celsius.addClass('active-temperature');
                faring.removeClass('active-temperature');
                convert.each(function(){
                    $(this).html(Math.round(($(this).html() - 32)/1.8));
                });
            }
            return false
        });

        faring.on('click', function(){
            var convert = $('.convert');
            if(!(faring.hasClass('active-temperature'))){
                faring.addClass('active-temperature');
                celsius.removeClass('active-temperature');
                convert.each(function(){
                    $(this).html(Math.round(($(this).html() * 1.8)+32));
                });
            }
            return false
        })
    }

    // Range amount of days visible
    function initRanges(){
        var labelDays = $('.days-box .pointer-label');
        var labelUpdate = $('.update-box .pointer-label');

        $('.days-box').change(function(){
            var holder = $('.holder-days');

            if(labelDays.last().html() == 1){holder.css('height', '114px')}
            else if(labelDays.last().html() == 2){holder.css('height', '230px')}
            else if(labelDays.last().html() == 3){holder.css('height', '346px')}
            else if(labelDays.last().html() == 4){holder.css('height', '462px')}
            else if(labelDays.last().html() == 5){holder.css('height', '578px')}
            else if(labelDays.last().html() == 6){holder.css('height', '694px')}
            else{holder.css('height', '810px')}

        });

        $('.update-box').change(function(){
            var update = labelUpdate.last().html();

            var interval = setInterval(function(){
                console.log('d');
                require(['services/storage'], function(storage){
                    storage.update();
                })
            }, update * 60 * 1000);
            if(update == 0){
                clearInterval(interval);
            }
        })
    }

    // Add setting structure in the aside bar
    function addSettings(){
        $('.aside-menu').append(tmpl);
    }

    return {
        render: render
    }
});
