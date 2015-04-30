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
    //Restangular.one('enrolments', 2).one('enrolmentsubjects/6').get().then(function (enrolmentIdSubjects) {
    //  $scope.enrolmentIdSubjects = [enrolmentIdSubjects];
    //  console.log($scope.enrolmentIdSubjects);
    //});
    $scope.enrolmentIdSubjects = [{
      'mark': 3,
      'enrolmentId': 4,
      'personEnrolmentSubjectId': 2,
      'enrolmentSubjectId': 2,
      'alternative': false
    },
    {
      'mark': 2,
      'enrolmentId': 4,
      'personEnrolmentSubjectId': 2,
      'enrolmentSubjectId': 3,
      'alternative': true
    },
    {
      'mark': 5,
      'enrolmentId': 4,
      'personEnrolmentSubjectId': 2,
      'enrolmentSubjectId': 1,
      'alternative': false
    }];


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

    // enrolmentIdSubjects should have a value "alternative" which defines whether a subject is obligatory or not
    //this can be seen in controllers/specoffer/tabSubject
    //angular.forEach($scope.enrolmentIdSubjects, function (subject) {
    //  $scope.isObligatory != subject.alternative;
    //  console.log($scope.isObligatory);
    //});


  $scope.getPersonSubjectMark = function (id) {
    var PersonSubjectMark = '';
    angular.forEach($scope.personSubjects, function (subject) {
      if(subject.enrolmentSubjectId == id) {
        PersonSubjectMark = subject.mark;
      }
    });
    return PersonSubjectMark;
  };
  }
  ]);
