'use strict';

angular
  .module('admissionSystemApp')
	.controller('ListEnrolmentsCtrl', ['$scope', 'getFiltredListSvc', 'DictionariesSvc',
    'baseListData', '$q', '$state',
    function ($scope, getFiltredListSvc, DictionariesSvc, baseListData, $q, $state) {

      var page = ($state.params.page) ? $state.params.page : '1',
          itemsPerPage = ($state.params.count) ? $state.params.count : '10';

      $scope.currentPage = page;
      $scope.getEnrolments = function (pageNumber, perPage, filters, sort) {
        $scope.currentPage = pageNumber;
        getFiltredListSvc.getListEnrolments(pageNumber, perPage, filters, sort).then(function (res) {
          $scope.enrolDecoded = res.data;
          $scope.totalEnrol = res.total;
        });
      };
      $scope.getEnrolments(page, itemsPerPage);

      $scope.enrolSearch = baseListData.search;
      $scope.enrolHeaders = baseListData.headers;
      $scope.enrolFilters = baseListData.filters;

      $q.all([
        DictionariesSvc.getEnrolmentsTypes(),
        DictionariesSvc.getAllDepartments({
          departmentTypeId: 1
        })
      ])
        .then(function (promisesResult) {
          baseListData.expandFilters(promisesResult[0], 'enrolmentTypeId');
          baseListData.expandFilters(promisesResult[1], 'departmentId');
        });
      $scope.deleteEnrol = function (id) {
        console.log('delete enrol with id:', id);
      };
      $scope.changeEnrol = function (id) {
        $state.go('root.enrolment.edit.main', {
          id: id
        });
      };
    }]);

