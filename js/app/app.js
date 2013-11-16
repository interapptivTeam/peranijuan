//AngularJS app config

var app = angular.module('peranijuan', ['ui.slider','ngResource','ngRoute','ngTouch','googlechart']);

app.config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider)  {
        $routeProvider
            .when('/peranijuan/screen1', {
                templateUrl:'partials/screen1.html',
                controller:'screen1Ctrl'
            })
            .when('/peranijuan/screen2', {
                templateUrl:'partials/screen2.html',
                controller:'screen2Ctrl'
            })
            .when('/peranijuan/screen3', {
                templateUrl:'partials/screen3.html',
                controller:'screen3Ctrl'
            })
            .when('/peranijuan/howtouse', {
                templateUrl:'partials/howtouse.html',
                controller:'howtouseCtrl'
            })
            .when('/peranijuan/menu', {
                templateUrl:'partials/menu.html',
                controller:'menuCtrl'
            })
            .when('/peranijuan/budget', {
                templateUrl:'partials/budget.html',
                controller:'budgetCtrl'
            })
            .when('/peranijuan/source', {
                templateUrl:'partials/source.html',
                controller:'sourceCtrl'
            })
            .when('/peranijuan/expenditures', {
                templateUrl:'partials/expenditures.html',
                controller:'expendituresCtrl'
            })
            .otherwise({
                templateUrl:'partials/start.html',
                controller:'startCtrl'
            });

        $locationProvider.html5Mode(true).hashPrefix('!');
}]);