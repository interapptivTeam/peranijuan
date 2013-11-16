app.controller("appCtrl", function ($scope, $timeout, $location, $http, NationalBudget) {
    $scope.cachebuster = Math.floor((Math.random()*1000000)+1);
    $scope.mark = "MkI";
    
	$scope.bodyClasser = function (bodyClass) {
		$scope.bodyClass = bodyClass;
	};

});