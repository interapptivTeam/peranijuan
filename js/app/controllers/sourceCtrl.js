app.controller("sourceCtrl", function ($scope, $timeout, $location, $http) {
	$scope.bodyClasser("chart");
	$scope.years = ['2013','2012','2011'];
	$scope.departments = [];

	$scope.chart = "";
	$scope.chartData = {};
  $scope.chartType = "PieChart";
	$scope.options = {
        "legend": "none",
        "isStacked": false,
        "fill": 200,
        "sliceVisibilityThreshold": 0,
        "displayExactValues": false,
        "pieSliceText": 'percentage',
        "fontSize": 24,
        "pieHole": 0.3,
        "is3D": true,
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
    };

	$scope.cols = [];
  $scope.rows = [];

	$scope.cols.push({
        "label": "Department",
        "type": "string"
      });
    $scope.cols.push({
        "label": "Source",
        "type": "number"
      });

    $scope.sources = {};
    $scope.total = [];

    $scope.getSources = function () {
	    $http({
	        url: 'sources.php',
	        method: 'GET',
	        headers: {'Content-Type': 'application/json'}
	    }).success(function (data, status, headers, config) {
	    	var tax = [];
	    	var nontax = [];
	    	var total = [];
        for (var r = 1; r <= 3; r++) {
          $scope.rows[r] = [];
          $scope.total[r] = 0;
        }
	        for (var i=0; i<data.feed.entry.length; i++) {
	        	var dataEntry = data.feed.entry[i];
	        	var dept = dataEntry['gsx$departmentagency']['$t'];
	        	// $scope.sources[dept] = [];
	        	tax[1] = dataEntry['gsx$tax2011']['$t'];
	        	nontax[1] = dataEntry['gsx$nontax2011']['$t'];
	        	total[1] = dataEntry['gsx$total2011']['$t'];

	        	tax[2] = dataEntry['gsx$tax2012']['$t'];
	        	nontax[2] = dataEntry['gsx$nontax2012']['$t'];
	        	total[2] = dataEntry['gsx$total2012']['$t'];

	        	tax[3] = dataEntry['gsx$tax2013']['$t'];
	        	nontax[3] = dataEntry['gsx$nontax2013']['$t'];
	        	total[3] = dataEntry['gsx$total2013']['$t'];

	        	var deptData = [dept,[tax[1],nontax[1],total[1]],[tax[2],nontax[2],total[2]],[tax[3],nontax[3],total[3]]];
            $scope.sources[dept] = deptData;

            $scope.total[1] = (Number(total[1])*1000000) + $scope.total[1];
            $scope.total[2] = (Number(total[2])*1000000) + $scope.total[2];
            $scope.total[3] = (Number(total[3])*1000000) + $scope.total[3];

              for (var r = 1; r <= 3; r++) {
		            $scope.rows[r].push({
  				        "c": [
  				          {
  				            "v": dept
  				          },
                    {
                      "v": (Number(total[r])*1000000)
                    }
  				        ]
				        });
		          }
		      }
// console.log($scope.sources[dept].rows[3]);
    $scope.chartData.chart2011 = {
      "type": $scope.chartType,
      "data": {
        "cols": $scope.cols,
        "rows": $scope.rows[1]
      },
      "options": $scope.options,
      "formatters": {}
    };

    $scope.comparativeChart = {
      "type": "AreaChart",
      "data": {
        "cols": [
      {
        "label": "Year",
        "type": "string"
      },
      {
        "label": "National Budget",
        "type": "number"
      },
      {
        "label": "Tax Revenues",
        "type": "number"
      },
      {
        "label": "National Debt",
        "type": "number"
      }
    ],
        "rows": [
      {
        "c": [
          {
            "v": "2011"
          },
          {
            "v": "1645000000000",
            "f": "1.645 Trillion"
          },
          {
            "v": $scope.total[1]
          }
        ]
      },
      {
        "c": [
          {
            "v": "2012"
          },
          {
            "v": "1816000000000",
            "f": "1.816 Trillion"
          },
          {
            "v": $scope.total[2]
          }
        ]
      },
      {
        "c": [
          {
            "v": "2013"
          },
          {
            "v": 2006000000000,
            "f": "2.006 Trillion"
          },
          {
            "v": $scope.total[3]
          }
        ]
      }
      ],
      "options": $scope.options,
      "formatters": {}
    }
    };

    $scope.chartData.chart2013 = {
      "type": $scope.chartType,
      "data": {
        "cols": $scope.cols,
        "rows": $scope.rows[3]
      },
      "options": $scope.options,
      "formatters": {}
    };

    $scope.chartData.chart2013 = {
      "type": $scope.chartType,
      "data": {
        "cols": $scope.cols,
        "rows": $scope.rows[3]
      },
      "options": $scope.options,
      "formatters": {}
    };
// $scope.chart3 = $scope.chartData.chart2012;
// $scope.chart2 = $scope.chartData.chart2012;
$scope.chart = $scope.chartData.chart2013;
	    }).error(function (data, status, headers, config) {
	            var test = "bad";
	            $scope.test = test;
	    })
	};

	$scope.getSources();

	$scope.selectSlice = function (selectedItem) {
        $scope.flips = 'animated flipOutY';
        $timeout(function () {
        	$scope.flips = 'animated flipInY';
        }, 1500);
  };

  $scope.changeChart = function (chartYear) {
    $scope.chart = $scope.chartData[chartYear];
    if (chartYear == "2011") {
      $scope.chart2011 = true;
      $scope.chart2012 = false;
      $scope.chart2013 = false;
    } else if (chartYear == "2012") {
      $scope.chart2011 = false;
      $scope.chart2012 = true;
      $scope.chart2013 = false;
    } else {
      $scope.chart2011 = false;
      $scope.chart2012 = false;
      $scope.chart2013 = true;
    }
  };

  
      $scope.chart2013 = true;

});
