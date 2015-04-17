'use strict';

angular.module('admissionSystemApp')
.controller('tabPersonSubjects', ['$scope', '$modal','$rootScope', function($scope, $modal, $rootScope) {

    // temp data --------begin---------
    $scope.entirePerson.enrolmentsubjects = [
      {"id": 1,
        "personId": 11,
        "personPaperId": 3,
        "enrolmentSubjectId": 3,
        "mark": 3},
      {"id": 2,
        "personId": 11,
        "personPaperId": 2,
        "enrolmentSubjectId": 2,
        "mark": 5}
    ];
    // temp data --------end---------

    $scope.subHeaders = [
      {name: 'id', display: '№'},
      {name: 'personPaperId', display: 'Сертифікат ЗНО'},
      {name: 'enrolmentSubjectId', display: 'Предмет ЗНО'},
      {name: 'mark', display: 'Бал предмету ЗНО'}
    ];

    $scope.addPersonSubject = function () {
      var newSubj = {};
      newSubj.id = $scope.entirePerson.enrolmentsubjects.length+1;
      newSubj.personId = $scope.entirePerson.enrolmentsubjects.personId || 11; // to delete "|| 11" when restang is ready
      newSubj.personPaperId = document.getElementById('personPaperId').value;
      newSubj.enrolmentSubjectId = document.getElementById('enrolmentSubjectId').value;
      newSubj.mark = document.getElementById('mark').value;
      $scope.entirePerson.enrolmentsubjects.push(newSubj);
    };


    $scope.deleteSubj = function (id) {
      $scope.entirePerson.enrolmentsubjects.splice(id-1, 1);
      $scope.entirePerson.enrolmentsubjects.forEach(function (subj, index){
        subj.id = index+1;
      });
      //OR ???
      // for (var i=0, ii=$scope.entirePerson.enrolmentsubjects.length; i<=ii; i++) {
      //  $scope.entirePerson.enrolmentsubjects[i].id = i+1;
      //}
    };

    $scope.open = function (size, id) {

      $modal.open({
        templateUrl: '../views/modal/tabEditPersonSubj.html',
        scope: $scope,
        controller: function ($rootScope, $scope, $modalInstance, id) {
          $scope.id = id;

          $scope.ok = function (id) {
            $scope.entirePerson.enrolmentsubjects[id-1].personPaperId = document.getElementById('modalPersonPaperId').value;
            $scope.entirePerson.enrolmentsubjects[id-1].enrolmentSubjectId = document.getElementById('modalEnrolmentSubjectId').value;
            $scope.entirePerson.enrolmentsubjects[id-1].mark = document.getElementById('modalMark').value;
            $modalInstance.close();
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };

        },
        size: size,
        resolve: {
          id: function () {
            return id}
        }
      });
    };
  }]);
