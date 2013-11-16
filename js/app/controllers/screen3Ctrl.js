app.controller("screen3Ctrl", function ($scope, $timeout, $location, $http) {
	$scope.bodyClasser("screen3");
    $timeout(function () {
        $scope.screen3 = true;
        // $location.path("/peranijuan/howtouse");
        $location.path("/peranijuan/menu");
    }, 3000);
});
