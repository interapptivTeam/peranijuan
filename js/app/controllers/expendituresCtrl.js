app.controller("expendituresCtrl", function ($scope, $timeout, $location, $http) {

$scope.dept = function () {
	$location.path("/peranijuan/departments");
}

});