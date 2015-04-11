'use strict';

angular
	.module('admissionSystemApp')
  .directive('personTable', personTable);

function personTableController($scope) {

  // filter (checkboxes) options
	$scope.userFilterPick = [];
  $scope.oneAtATime = {open : false};  
  $scope.removeFromUserPick = function (obj) {
  	var index = $scope.userFilterPick.indexOf(obj);
  	$scope.userFilterPick.splice(index, 1);
  };

  // pagination options
  $scope.maxSize = 5;  
  $scope.totalItems = 123;
  $scope.currentPage = 1;
	
	// item per page chooser
	$scope.itemsPerPageOptions = ['10', '25', '50', '100'];
  $scope.itemsPerPage = $scope.itemsPerPageOptions[1];

  // if page no. changed - do smth
  $scope.pageChanged = function(pageNumber) {
    // console.log('page changed to', pageNumber);
  };

 	// handle click on the table rows
  $scope.setSelected = function(item) {
    $scope.selected = item;
  };
}


function personTable ($window) {

 	var directive = {
 		templateUrl: '../views/directives/personTable.html',
 		restrict: 'E',
 		link: link,
 		controller: personTableController,
 		controllerAs: 'vm',
 		scope: {
 			data: '=',
 			headers: '=',
 			filters : '='
 		}
 	};

	function link(scope, element, attr) {
		
		scope.hideFilter = false;
		scope.hideFilterFunc = function () {
			scope.hideFilter = !scope.hideFilter;
			var tableNode = angular.element(element[0].getElementsByClassName('content-data'));
			tableNode.toggleClass('col-sm-10 col-md-10');
			tableNode.toggleClass('col-sm-12 col-md-12');
		};
		
		scope.sort = function (columnName, event) {
			scope.descending = !scope.descending;

 			var arrow = angular.element(event.target.getElementsByClassName('fa'));
 			arrow.removeClass('fa-sort');
 			if (scope.descending) {
 				arrow.removeClass('fa-caret-up ').addClass('fa-caret-down');
 			} else {
 				arrow.removeClass('fa-caret-down').addClass('fa-caret-up');
 			}

 		};
	}

 	return directive;
 }



