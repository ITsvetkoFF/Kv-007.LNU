'use strict';

angular
  .module('admissionSystemApp')
  .controller('enrolmentSubjects', ['$scope', 'Restangular', 'DictionariesSvc', function ($scope, Restangular, DictionariesSvc) {

    //receive Id of person for enrolment
    //$scope.entireEnrolment.enrolment.personId;



    $scope.personSubjects = [
      {
        'id': 1,
        'personId': 11,
        'personPaperId': 3,
        'enrolmentSubjectId': 3,
        'mark': 3
      },
      {
        'id': 2,
        'personId': 11,
        'personPaperId': 2,
        'enrolmentSubjectId': 2,
        'mark': 5
      }
    ];

    //$scope.enrolmentPersonMark = {
    //  value: 2
    //  };

    //receive person's subjects (substitute 11 into $scope.entireEnrolment.enrolment.personId
    //  Restangular.one('persons', 11).one('enrolmentsubjects').get().then(function (personEnrolmentSubjects) {
    //    $scope.personsSubjects = personEnrolmentSubjects.resources;
    //    console.log('personSubjects: ',$scope.personSubjects);
    //  });
    //




    //receive all subjects
    $scope.somethingNew = DictionariesSvc.getEnrolmentsSubjects().then(function (allSubjects) {
      $scope.allSubjects = allSubjects;
    });

    //receive subjects of an enrolment
    Restangular.one('enrolments', 2).one('enrolmentsubjects/6').get().then(function (enrolmentIdSubjects) {
      $scope.enrolmentIdSubjects = [enrolmentIdSubjects];
      console.log($scope.enrolmentIdSubjects);
    });


    //translate subject id into subject name
      $scope.getSubjectTitleById = function (id) {
      var subjectTitle = '';

      angular.forEach($scope.enrolmentIdSubjects, function (subject) {
        if (subject.enrolmentSubjectId === id) {
          //mistake is here ---------------------------------------
            subjectTitle = $scope.allSubjects.name
          //mistake
        }
      });
      return subjectTitle;
    };


    //filter
    $scope.filterExistsSubjects = function (subject) {
      return _.find($scope.enrolmentIdSubjects.enrolmentSubjectId, function (item) {
        return item.enrolmentSubjectId == subject.id;
      });
    };

  }
  ]);
