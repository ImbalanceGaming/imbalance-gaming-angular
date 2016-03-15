angular.module('apiServices', [])

.factory('API', function($resource, config) {
        var URL = '';
        if (config.devMode) {
            URL = config.backendURL+'public/index.php/api/:action'
        } else {
            URL = config.backendURL+'api/:action'
        }
    return $resource(URL);
})
.factory('imbalanceAPI', function($resource) {
    return $resource('http://www.imbalancegaming.com/api/:action');
});
