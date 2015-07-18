angular.module('apiServices', [])

.factory('API', function($resource, config) {
    return $resource(config.backendURL+config.dev+'api/:action');
})
.factory('imbalanceAPI', function($resource) {
    return $resource('http://www.imbalancegaming.com/api/:action');
});
