'use strict';


angular.module('admissionSystemApp')
	.controller('ListEnrolmentsCtrl', ['$scope', 'getListEnrolmentsSvc', 'DictionariesSvc', 'baseListData', '$q',
    function ($scope, getListEnrolmentsSvc, SpecofferDictionaryService, baseListData, $q) {

      $scope.getEnrolments = function (pageNumber, perPage, filters, sort) {
        getListEnrolmentsSvc.getListEnrolments(pageNumber, perPage, filters, sort).then(function(res) {
          $scope.enrolDecoded = res.data;
          $scope.totalEnrol = res.total;
        });
      };

      $scope.enrolSearch = baseListData.search;
      $scope.enrolHeaders = baseListData.headers;
      $scope.enrolFilters = baseListData.filters;

      $q.all([
        SpecofferDictionaryService.getEnrolmentsTypes(),
        SpecofferDictionaryService.getAllDepartments({departmentTypeId: 1})
      ])
        .then(function (promisesResult) {
          baseListData.expandFilters(promisesResult[0], 'enrolmentTypeId');
          baseListData.expandFilters(promisesResult[1], 'departmentId');
        });

	}]);
