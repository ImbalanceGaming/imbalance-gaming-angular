var baseApp = angular.module('baseApp', ['ngRoute', 'ngResource', 'apiService']);

baseApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'app/views/home.html'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }
]).constant('config', {
    'backend': 'http://imbalancegaming.com/base/',
    'site': 'base',
    'version': 0.1
});