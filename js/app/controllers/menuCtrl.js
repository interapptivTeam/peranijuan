app.controller("menuCtrl", function ($scope, $timeout, $location, $http) {
	$scope.bodyClasser("menu");

	$scope.budget = function () {
		$location.path("/peranijuan/budget");
	};

	$scope.source = function () {
		$location.path("/peranijuan/source");
	};

	$scope.expenditures = function () {
		$location.path("/peranijuan/expenditures");
	};

});
