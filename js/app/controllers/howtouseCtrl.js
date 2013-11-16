app.controller("howtouseCtrl", function ($scope, $timeout, $location, $http) {
    $scope.bodyClasser("howtouse");
    $timeout(function () {
        $scope.howtouse = true;
        $location.path("/peranijuan/menu");
    }, 3000);
});
