app.controller("appCtrl", function ($scope, $timeout, $location, $http, NationalBudget) {
    $scope.cachebuster = Math.floor((Math.random()*1000000)+1);
    $scope.mark = "MkI";
	$scope.spiralLoader = true;

  	$scope.shares = false;
  

	$scope.bodyClasser = function (bodyClass) {
		$scope.bodyClass = bodyClass;
	};


	$scope.budget = function () {
		$location.path("/peranijuan/budget");
		$scope.shares = true;
	};

	$scope.source = function () {
		$location.path("/peranijuan/source");
		$scope.shares = true;
	};

	$scope.expenditures = function () {
		$location.path("/peranijuan/expenditures");
		$scope.shares = true;
	};

	$scope.sectors = ['Social','Economic','Defense','General Public Services','Debt Servicing','Special Funds'];
	$scope.sectorColors = ['#3bbec0','#e87352','#67b0d1','#ebc85e','#60cd9b','#a48b60'];
	$scope.options = {
        "legend": "none",
        "slices": [
        	{color: $scope.sectorColors[0]}, 
        	{color: $scope.sectorColors[1]}, 
        	{color: $scope.sectorColors[2]}, 
        	{color: $scope.sectorColors[3]}, 
        	{color: $scope.sectorColors[4]}, 
        	{color: $scope.sectorColors[5]}
        ],
        "isStacked": false,
        "fill": 200,
        "sliceVisibilityThreshold": 0,
        "displayExactValues": false,
        "pieSliceText": 'none',
        "fontSize": 24,
        // "pieHole": 0.3,
        // "is3D": true,
        "chartArea": {
            "top": "10%",
            "bottom": "20%",
            "height": "100%",
            "width": "100%"
        },
        "tooltip": {
          "isHtml": true,
          "showColorCode": true,
          "textStyle": { 
          	"fontSize": 12
          }
        }
      };

    var rand = Math.floor(Math.random()*4);
	var summaryTextArray = [
		" is allocated to the ",
		" goes to the ",
		" is budgeted for the ",
		" is for the ",
		" is given to the ",
		" is given to the "
		];
	var summaryText = summaryTextArray[rand];

	$scope.cols = [];
    $scope.rows = [];

	$scope.cols.push({
        "label": "Sector",
        "type": "string"
      });
    $scope.cols.push({
        "label": "Budget",
        "type": "number"
      });

    $scope.sector = {};
    $scope.sector.total = 0;

	$scope.itemSlidersPnoyTotal = {};
	$scope.itemSlidersPnoy = {};
	$scope.itemSlidersJuan = {}; 
    $scope.summaryNums = [];

    $scope.sectorGroups = function (sector,year,gsx,gsx2) {
	    $http({
	        url: 'sectors.php?sector='+sector,
	        method: 'GET',
	        headers: {'Content-Type': 'application/json'}
	    }).success(function (data, status, headers, config) {
	        $scope.sector[gsx] = [];
	        var sectorBudget = 0;
	        for (var i=0; i<data.autoAppro.feed.entry.length; i++) {
	        	var dept = data.autoAppro.feed.entry[i]['gsx$departmentcode']['$t'];

	        	var ps0 = data.autoAppro.feed.entry[i]['gsx$ps'+year]['$t'];
	        	var mooe0 = data.autoAppro.feed.entry[i]['gsx$mooe'+year]['$t'];
	        	var co0 = data.autoAppro.feed.entry[i]['gsx$co'+year]['$t'];

	        	var ps1 = data.newAppro.feed.entry[i]['gsx$ps'+year]['$t'];
	        	var mooe1 = data.newAppro.feed.entry[i]['gsx$mooe'+year]['$t'];
	        	var co1 = data.newAppro.feed.entry[i]['gsx$co'+year]['$t'];

	        	var deptData = {};
	        	deptData.dept = [dept,[ps0,mooe0,co0],[ps1,mooe1,co1]];
	            $scope.sector[gsx].depts = [];
	            $scope.sector[gsx].depts.push(deptData);
	    		sectorBudget += Number(ps0)+Number(ps1) + Number(mooe0)+Number(mooe1) + Number(co0)+Number(co1);
	    	}
// console.log($scope.sector[gsx]);
	    	var sectorBudgetNum = accounting.formatMoney(sectorBudget, "₱", 0);
	       	var summary = sectorBudgetNum + summaryText +gsx+" sector";
	       	$scope.sector[gsx].budget = sectorBudget;
	       	$scope.sector[gsx].summary = summary;
	       	$scope.sector.total = sectorBudget + $scope.sector.total;
		    $scope.rows.push({
		        "c": [
		          {
		            "v": gsx
		          },
		          {
		            "v": sectorBudget,
		            "f": sectorBudgetNum
		          }
		        ]
		    });
		    if (gsx2) {
		    	$scope.sectorChecks(gsx2);
		    } else {
		    	$scope.showSummary = true;
		    	// summaryCarousel();

			    for (var m=0; m<$scope.sectors.length; m++) {
			    	var sectorName = $scope.sectors[m]+"";
			    	var sectorBudget = $scope.sector[sectorName].budget;
			    	$scope.itemSlidersPnoy[sectorName] = {
			    		"name" : sectorName,
			    		"value" : accounting.formatMoney(sectorBudget, "₱", 0),
			    		"staticpercentage" : accounting.toFixed((sectorBudget/$scope.sector.total)*100, 1),
			    		"percentage" : accounting.toFixed((sectorBudget/$scope.sector.total)*100, 1)
			    	}; 
	    		}
	    		$scope.itemSlidersJuan = $scope.itemSlidersPnoy;

    // for (var x = 0; x < 6; x++) {
      // $scope.summaryNums.push([$scope.sectors[x],$scope.itemSlidersPnoy[$scope.sectors[x]].percentage,$scope.itemSlidersPnoy[sectors[x]].value]);
    // }

    $scope.summaryNums = $scope.itemSlidersPnoy;
		    }
// console.log($scope.sector);
	    }).error(function (data, status, headers, config) {
	            var test = "bad";
	            $scope.test = test;
	    })
	};

	$scope.sectorGroups('od6','2013',$scope.sectors[0],$scope.sectors[1]);

	$scope.sectorChecks = function (sectorCheck) {
		if (sectorCheck == $scope.sectors[1]) {
			$scope.sectorGroups('od7','2013',$scope.sectors[1],$scope.sectors[2]);
		}
		if (sectorCheck == $scope.sectors[2]) {
			$scope.sectorGroups('od4','2013',$scope.sectors[2],$scope.sectors[3]);
		}
		if (sectorCheck == $scope.sectors[3]) {
			$scope.sectorGroups('od5','2013',$scope.sectors[3],$scope.sectors[4]);
		}
		if (sectorCheck == $scope.sectors[4]) {
			$scope.sectorGroups('oda','2013',$scope.sectors[4],$scope.sectors[5]);
		}
		if (sectorCheck == $scope.sectors[5]) {
			$scope.sectorGroups('odb','2013',$scope.sectors[5]);
		}
	};


function MyController($scope, angularFireAuth) {
  var ref = new Firebase("https://peranijuan.firebaseio.com/");
  angularFireAuth.initialize(ref, {scope: $scope, name: "user"});
}

});