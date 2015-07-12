angular.module('apiService', [])

.factory('API', function($resource) {
    return $resource(config.backend+'api/:controller/:action');
});
