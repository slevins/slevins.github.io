
require.config({
    baseUrl: 'javascript',
    paths: {
        jquery: "lib/jquery-2.1.4",
        lodash: "lib/lodash",
        text: "plugins/text",
        enscroll: "plugins/enscroll-0.6.1.min",
        range: "plugins/jquery.range"
    }
});

require(['components/aside/asideComponent',
        'components/settings/settingComponent',
        'components/page/pageComponent',
        'components/dashboard/dashboardComponent'], function(aside, setting, page, dashboard){

    aside.show();
    setting.show();
    page.show();
    //dashboard.show();
});