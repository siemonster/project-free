SiemApp.controller('SiemApp', function($scope) {

    $scope.vm = {};

    $scope.links = [
        { id: 'link1', title: 'Kibana Dashboards'     , url: 'http://customer-1.siemonster.com:5601/app/kibana#/dashboard/Overview' },
        { id: 'link2', title: 'Kibana Visualisations' , url: 'http://customer-1.siemonster.com:5601/app/kibana#/visualize/' },
        { id: 'link3', title: 'Etsy'                  , url: 'http://customer-1.siemonster.com/' },
        { id: 'link4', title: 'Alerta'                , url: 'http://try.alerta.io/' }
    ];

    $scope.vm.active_link = $scope.links[0].title;
});