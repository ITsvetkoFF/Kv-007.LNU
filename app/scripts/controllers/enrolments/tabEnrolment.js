'use strict';

angular.module('admissionSystemApp')
  .controller('TabEnrolmentCtrl',
	  	function ($scope, DictionariesSvc, baseFormData, basePersonData, $q, baseSpecofferData) {

      $q.all([
        DictionariesSvc.getAllDepartments({departmentTypeId: 1}),
        DictionariesSvc.getEnrolmentsTypes(),
        DictionariesSvc.getSpecoffersTypes()
      ])
        .then(function (promisesResult) {
          $scope.departmentId = promisesResult[0];
          $scope.enrolmentTypeId = promisesResult[1];
          $scope.specofferTypes = promisesResult[2];
        });

			$scope.entireEnrolment.enrolment = {};
			$scope.entireEnrolment.enrolment.specOfferId = 141;

			$scope.entireEnrolment.enrolment.personId = 33;
			$scope.entireEnrolment.enrolment.personPaperId = 35; //22

	    $scope.fieldSearchBy = [];

	    console.log('baseFormData.isedustateOpt', baseFormData.isedustateOpt);
	    $scope.personSearch = baseFormData.searchPerson;
	    $scope.isedustateOpt = baseFormData.isedustateOpt;
	    $scope.isinterviewOpt = baseFormData.isinterviewOpt;
	    $scope.personHeaders = basePersonData.headers;
	    $scope.specofferHeaders = baseSpecofferData.headers;
	    
	  });
