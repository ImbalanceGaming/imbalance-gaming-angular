angular.module('apiService', [])

.factory('API', function($resource) {
    return $resource('public/index.php/api/:action');
});
