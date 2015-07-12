angular.module('apiService', [])

.factory('API', function($resource) {
    return $resource('api/:action');
});
