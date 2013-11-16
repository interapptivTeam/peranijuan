app.controller("budgetCtrl", function ($scope, $timeout, $location, $http) {
	$scope.budgetLvl = ["Nasyonal","National"];
	var sectors = ['Social','Economic','Defense','General Public Services','Debt Servicing','Special Funds'];
	var sectorColors = ['orange','green','red','blue','violet'];	
    var rand = Math.floor(Math.random()*4);
	var summaryTextArray = [
		" is allocated to the ",
		" goes to the ",
		" is budgeted for the ",
		" is for the ",
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

	$scope.itemSlidersPnoy = [];
	$scope.itemSlidersJuan = [];

    $scope.sectorGroups = function (sector,year,gsx,gsx2) {
	    $http({
	        url: 'sectors.php?sector='+sector,
	        method: 'GET',
	        headers: {'Content-Type': 'application/json'}
	    }).success(function (data, status, headers, config) {
	        $scope.sector[gsx] = [];
	        var sectorBudget = 0;
	        for (var i=0; i<data.feed.entry.length; i++) {
	        	var dept = data.feed.entry[i]['gsx$departmentcode']['$t'];
	        	var ps = data.feed.entry[i]['gsx$ps'+year]['$t'];
	        	var mooe = data.feed.entry[i]['gsx$mooe'+year]['$t'];
	        	var co = data.feed.entry[i]['gsx$co'+year]['$t'];
	        	var deptData = {};
	        	deptData[dept] = [ps,mooe,co];
	            $scope.sector[gsx].push(deptData);
	    		sectorBudget += Number(ps) + Number(mooe) + Number(co);
	    	}

	    	var sectorBudgetNum = accounting.formatMoney(Number(sectorBudget), "₱", 0);
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
		    	summaryCarousel();

			    for (var m=0; m<sectors.length; m++) {
			    	var sectorName = sectors[m]+"";
			    	var sectorBudget = $scope.sector[sectorName].budget;
			    	$scope.itemSlidersPnoy.push({
			    		"name" : sectorName,
			    		"value" : accounting.formatMoney(sectorBudget, "₱", 0),
			    		"percentage" : accounting.toFixed((sectorBudget/$scope.sector.total)*100, 1)
			    	}); 
	    		}
	    		$scope.itemSlidersJuan = $scope.itemSlidersPnoy;
		    	// console.log($scope.sector[sectorName].budget);
		    console.log($scope.itemSlidersJuan);
		    }
// console.log($scope.sector);
	    }).error(function (data, status, headers, config) {
	            var test = "bad";
	            $scope.test = test;
	    })
	};

	function summaryCarousel() {
		if ($scope.showSummary) {
		    rand = Math.floor(Math.random()*4);
			summaryText = summaryTextArray[rand];
			$scope.summary = $scope.sector[sectors[rand]].summary;
			$scope.summaryStyle = sectorColors[rand];
	        $timeout(function () {
	            summaryCarousel();
	        }, 4000);
		}
	};

	$scope.sectorGroups('od6','2013',sectors[0],sectors[1]);

	$scope.sectorChecks = function (sectorCheck) {
		if (sectorCheck == sectors[1]) {
			$scope.sectorGroups('od7','2013',sectors[1],sectors[2]);
		}
		if (sectorCheck == sectors[2]) {
			$scope.sectorGroups('od4','2013',sectors[2],sectors[3]);
		}
		if (sectorCheck == sectors[3]) {
			$scope.sectorGroups('od5','2013',sectors[3],sectors[4]);
		}
		if (sectorCheck == sectors[4]) {
			$scope.sectorGroups('oda','2013',sectors[4],sectors[5]);
		}
		if (sectorCheck == sectors[5]) {
			$scope.sectorGroups('odb','2013',sectors[5]);
		}
	};

	$scope.selectSlice = function (selectedItem) {
        // alert($scope.chart.data.rows[selectedItem.row].c[0].v);
        // $scope.chartPanel = !$scope.chartPanel;
        // $scope.flips = 'animated flip';
        $scope.flips = 'animated flipOutY';
        $timeout(function () {
            // $scope.chartPanel = !$scope.chartPanel;
        	// $scope.flips = '';
        	$scope.flips = 'animated flipInY';
        }, 1500);
    };

    $scope.sliderFormatting = function(value) { 
    	return value.toString() + "%";
    };

    $scope.chart = {
      "type": "PieChart",
      // "displayed": true,
      "data": {
        "cols": $scope.cols,
        "rows": $scope.rows
      },
      "options": {
        "legend": "none",
        // "title": "Badyet ni PNoy",
        // "titleTextStyle": {
        	// "fontSize": 16,
        	// "bold": true,
        // },
        "slices": [
        	{color: sectorColors[0]}, 
        	{color: sectorColors[1]}, 
        	{color: sectorColors[2]}, 
        	{color: sectorColors[3]}, 
        	{color: sectorColors[4]}
        ],
        "isStacked": false,
        "fill": 200,
        "sliceVisibilityThreshold": 0,
        "displayExactValues": false,
        "pieSliceText": 'percentage',
        "fontSize": 24,
        "pieHole": 0.3,
        // "is3D": true,
        "chartArea": {
            "left": "2%",
            "top": "2%",
            "height": "96%",
            "width": "96%"
        },
        "tooltip": {
          "isHtml": true,
          "showColorCode": true,
          "textStyle": { 
          	"fontSize": 12
          }
        }
      },
      "formatters": {}
    };

    $scope.colorpicker = {
				red: 255,
				green: 140,
				blue: 60,
				options: {
					orientation: 'horizontal',
					min: 0,
					max: 255,
					range: 'min'
				}
			};

});
