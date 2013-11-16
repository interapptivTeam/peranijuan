app.controller("screen2Ctrl", function ($scope, $timeout, $location, $http) {
    $scope.bodyClasser("screen2");
    $timeout(function () {
        $scope.screen2 = true;
        $location.path("/peranijuan/screen3");
    }, 4000);
});
