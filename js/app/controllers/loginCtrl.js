app.controller("loginCtrl", function ($scope, $timeout, $location, $http) {
	$scope.login = function () {
        $location.path("/input");
	};
});