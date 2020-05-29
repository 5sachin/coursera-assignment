(function () {

'use strict';
angular.module('myFirstAssig',[])
.controller('MsgController',MsgController);

MsgController.$inject = ['$scope'];
function MsgController($scope){
	$scope.result = "";
	$scope.input = "";
	$scope.colorResult = "black";
	$scope.borderColor = "Black";
	$scope.checkLunch = function(){
		if ($scope.input == "") {
				$scope.result = "PLEASE ENTER THE DATA FIRST";
				$scope.colorResult = "Red";
				$scope.borderColor = "Red";
		}
		else
		{
			var length = (($scope.input).split(",")).length;
			if(length > 0 && length < 4)
			{
				$scope.result = "Enjoy!";
				$scope.colorResult = "#4dff4d";
				$scope.borderColor = "#4dff4d";

			}
			else if(length > 3 && length >0)
			{
				$scope.result = "Too Much";
				$scope.colorResult = "#4dff4d";
				$scope.borderColor = "#4dff4d";
			}
			
			}
			
	};
}

})();
