
define(['components/settings/settingView'], function(settingView){
    'use strict';

    function show(){
        settingView.render();
    }

    return {
        show: show
    }
});