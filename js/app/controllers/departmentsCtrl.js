app.controller("departmentsCtrl", function ($scope, $timeout, $location, $http) {

	$scope.saobTots = {};
	$scope.saobTots.approp = 0;
	$scope.saobTots.allot = 0;
	$scope.saobTots.oblig = 0;
	$scope.saobTots.unoblig = 0;
	$scope.saobTots.allotps = 0;
	$scope.saobTots.obligps = 0;
	$scope.saobTots.unobligps = 0;
	$scope.saobTots.allotmooe = 0;
	$scope.saobTots.obligmooe = 0;
	$scope.saobTots.unobligmooe = 0;
	$scope.saobTots.allotco = 0;
	$scope.saobTots.obligco = 0;
	$scope.saobTots.unobligco = 0;

	$scope.getSaob = function () {
	    $http({
	        url: 'http://api.kabantayngbayan.ph/saob?app_id=5286dedc5e13db265f7b21da&year=2013',
	        method: 'GET',
	        headers: {'Content-Type': 'application/json'}
	    }).success(function (data, status, headers, config) {

	    	for (var i=0; i<data.budget.length; i++) {
	        	var approp = data.budget.approp[i];
	        	var allot = data.budget.allot_tot[i];
	        	var oblig = data.budget.oblig_tot[i];
	        	var unoblig = data.budget.unoblig_tot[i];
	        	$scope.saobTots.approp = Number(approp) + $scope.saobTots.approp;
	        	$scope.saobTots.allot = Number(allot) + $scope.saobTots.allot;
	        	$scope.saobTots.oblig = Number(oblig) + $scope.saobTots.oblig;
	        	$scope.saobTots.unoblig = Number(unoblig) + $scope.saobTots.unoblig;
	        	$scope.saobTots.allotps = Number(allot) + $scope.saobTots.allotps;
	        	$scope.saobTots.obligps = Number(oblig) + $scope.saobTots.obligps;
	        	$scope.saobTots.unobligps = Number(unoblig) + $scope.saobTots.unobligps;
	        	$scope.saobTots.allotmooe = Number(allot) + $scope.saobTots.allotmooe;
	        	$scope.saobTots.obligmooe = Number(oblig) + $scope.saobTots.obligmooe;
	        	$scope.saobTots.unobligmooe = Number(unoblig) + $scope.saobTots.unobligmooe;
	        	// $scope.saobTots.allot = Number(allot) + $scope.saobTots.allot;
	        	// $scope.saobTots.oblig = Number(oblig) + $scope.saobTots.oblig;
	        	// $scope.saobTots.unoblig = Number(unoblig) + $scope.saobTots.unoblig;
	        }
	    }).error(function (data, status, headers, config) {
	            // var test = "bad";
	            // $scope.test = test;
	    })
	};

	$scope.getSaob();

});
