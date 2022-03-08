(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope) {
    $scope.checkLunch = function () {
    	 $scope.message = getMessageToDisplay($scope.lunchItems);
    };

    function getMessageToDisplay(lunchItems){
    	$scope.classMessage = 'error'
    	return (!lunchItems || lunchItems === "") ? "Please Enter Data First": getCorrectMessage(lunchItems);
    }

    function getCorrectMessage(lunchItems){
    	// do NOT consider an empty item, i.e., , , as an item towards to the count
    	var listofLunch = lunchItems.split(",");
        var filteredLunchList = listofLunch.filter(function (item) {
          return item != null && item.trim() !== "";
        });
       $scope.classMessage = 'success'
       return filteredLunchList.length <= 3 ? "Enjoy!": "Too much!";
    }
  }

})();