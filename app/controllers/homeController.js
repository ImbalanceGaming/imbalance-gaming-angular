angular.module('homeCtrl', [])

.controller('homeController', function($scope, API) {
        API.get({action:'users'}, function(data) {
            console.log(data);
        })
    });