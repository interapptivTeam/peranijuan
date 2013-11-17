app.controller("budgetCtrl", function ($scope, $timeout, $location, $http) {
	$scope.bodyClasser("chart");
	$scope.budgetLvl = ["Nasyonal","National"];

	$scope.loader = function () {
    $timeout(function () {
      $scope.spiralLoader = false;
    }, 2500);
  };

	$scope.selectSlice = function (selectedItem) {
        // alert($scope.chart.data.rows[selectedItem.row].c[0].v);
        var selected = $scope.chart.data.rows[selectedItem.row].c[0].v;
        var depts = $scope.sector[selected].depts;

        for (var i = 0; i < depts.length; i++) {
          $scope.rows.push({
              "c": [
                {
                  "v": depts[i].dept[0]
                },
                {
                  "v": Number(depts[i].dept[1][0]) + Number(depts[i].dept[2][0])
                }
              ]
          });
        }

        $scope.flips = 'animated flipOutY';
        $timeout(function () {
        	$scope.flips = 'animated flipInY';
        }, 1500);


            $scope.chart = {
          "type": "PieChart",
          "data": {
            "cols": $scope.cols,
            "rows": $scope.rows
          },
          "options": $scope.options,
          "formatters": {}
        };
    };

    $scope.sliderFormatting = function(value) { 
    	return value.toString() + "%";
    };

    $scope.chart = {
      "type": "PieChart",
      "data": {
        "cols": $scope.cols,
        "rows": $scope.rows
      },
      "options": $scope.options,
      "formatters": {}
    };


});
