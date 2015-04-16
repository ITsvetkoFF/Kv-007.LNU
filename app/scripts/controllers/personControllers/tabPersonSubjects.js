'use strict';

angular.module('admissionSystemApp')
.controller('tabPersonSubjects', ['$scope', function($scope) {

    console.log($scope.entirePerson.enrolmentsubjects);
    //$scope.entirePerson.enrolmentsubjects = [
    //  {"id": 1,
    //    "personId": 11,
    //    "personPaperId": 1,
    //    "enrolmentSubjectId": 1,
    //    "mark": 2}
    //];



    $scope.subHeaders = [
      {name: 'Num', display: '№'},
      {name: 'personPaperId', display: 'Сертифікат ЗНО'},
      {name: 'enrolmentSubjectId', display: 'Предмет ЗНО'},
      {name: 'mark', display: 'Бал предмету ЗНО'}
    ];

  }]);
