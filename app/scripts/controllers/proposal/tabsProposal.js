'use strict';

angular.module('admissionSystemApp')
  .controller('tabProposalCtrl', ['$scope', 'SpecofferDictionaryService', 'Cookies', '$q',
    function ($scope, SpecofferDictionaryService, Cookies, $q) {

      $scope.entireSpecoffer.specoffer = {};
      $scope.entireSpecoffer.specoffer.timePeriodId = Cookies.getCookie('timeperiod');

      $q.all([
        SpecofferDictionaryService.getAllDepartments(),
        SpecofferDictionaryService.getSpecoffersTypes(),
        SpecofferDictionaryService.getEduformTypes(),
        SpecofferDictionaryService.getTimePeriodCourseIds()
      ])
        .then(function (promisesResult) {
          $scope.departmentId = promisesResult[0];
          $scope.specofferTypesOptions = promisesResult[1];
          $scope.eduFormTypesOptions = promisesResult[2];
          $scope.timePeriodCourseId = promisesResult[3];
        });

  }]);
