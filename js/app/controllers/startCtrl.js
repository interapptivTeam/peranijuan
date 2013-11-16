app.controller("startCtrl", function ($scope, $timeout, $location, $http) {
    $scope.bodyClasser("start");
    $timeout(function () {
    	$scope.logoSplash = true;
        $location.path("/peranijuan/screen1");
    }, 3000);
});
