var baseApp = angular.module("baseApp", ["ngRoute"]);

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
]);