app.controller("screen1Ctrl", function ($scope, $timeout, $location, $http) {
   	$scope.bodyClasser("screen1");
    $timeout(function () {
        $scope.screen1 = true;
	    $location.path("/peranijuan/screen2");
    }, 4000);
});
