'use strict';

/**
 * @ngdoc function
 * @name admissionSystemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the admissionSystemApp
 */
angular.module('admissionSystemApp')
  .controller('ListProposalCtrl', ['$scope', '$filter', 'ngTableParams', 'ListProposalGettingService', '$modal', function ($scope, $filter, ngTableParams, ListProposalGettingService, $modal) {

    $scope.headers = [
      {name: "№", visible: true},
      {name: "specialtyId", visible: true},
      {name: "departmentId", visible: true},
      {name: "timePeriodId", visible: true},
      {name: "timePeriodCourseId", visible: true},
      {name: "specofferTypeId", visible: true},
      {name: "eduFormTypeId", visible: true},
      {name: "licCount", visible: true},
      {name: "stateCount", visible: true}
    ];

    $scope.openFiltersModal = function (size) {

      var modalInstance = $modal.open({
        templateUrl: '../views/modal/modalFilter.html',
        controller: function ($scope, $modalInstance) {
          $scope.headersLocal = $scope.headers;
          $scope.apply = function () {
            $scope.headers = $scope.headersLocal;
            $modalInstance.close('apply');
          };
        },
        size: size,
        scope: $scope
      });
    };

    ListProposalGettingService.allProposalsDecoded(8).then(function (data) {
      $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 20
          //filter: {
          //  timePeriodCourseId: '1',
          //  specialtyId:'ж',
          //  eduFormTypeId:'д'
          //}
      },
        {
        total: data.length, // length of data
        getData: function ($defer, params) { // $defer - це obj промісу, що дозволяє відобаржати в ng-table нашу data
                                             // $params - це ...
          var orderedData = params.filter() ?
            $filter('filter')(data, params.filter()) :
            data;

          $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

          params.total(orderedData.length); // set total for recalc pagination
          $defer.resolve($scope.users);
        }
      });
    });


  }]);





