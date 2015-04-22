'use strict';

angular.module('admissionSystemApp')
.controller('tabPersonSubjects', ['$scope', '$modal','$rootScope', 'SpecofferDictionaryService', function($scope, $modal, $rootScope, SpecofferDictionaryService) {


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



      $scope.decodedSubjects = [];
      //$scope.decodedObj = {};

    // create dictionary with subjects
    $scope.enrolSubjIds = SpecofferDictionaryService.getEnrolmentsSubjects().then(function(subjs) {
      $scope.subjs = subjs;
      $scope.arr = [];
      angular.forEach(subjs, function(subjs){
        $scope.arr[subjs.id] = subjs.name;
      });
      console.log('array of subject names:',$scope.arr);

      if ($scope.entirePerson.enrolmentsubjects) {
        angular.forEach($scope.entirePerson.enrolmentsubjects, function (decodedObj) {
          var temp = {};
          temp.id = decodedObj.id;
          temp.personPaperId = decodedObj.personPaperId;
          temp.enrolmentSubjectId = $scope.arr[decodedObj.enrolmentSubjectId];
          temp.mark = decodedObj.mark;
          $scope.decodedSubjects.push(temp);
        });
      }
    });

    //create array of decoded objects

//console.log($scope.decodedSubjects);
    $scope.subHeaders = [
      {name: 'id', display: '№'},
      {name: 'enrolmentSubjectId', display: 'Предмет ЗНО'},
      {name: 'mark', display: 'Бал предмету ЗНО'}
    ];

    $scope.addPersonSubject = function () {
      var newSubj = {};
      newSubj.id = $scope.decodedSubjects.length+1;
      newSubj.personId = $scope.entirePerson.enrolmentsubjects.personId || 11; // to delete "|| 11" when restang is ready
      newSubj.personPaperId = $scope.entirePerson.enrolmentsubjects.personPaperId || 11;
      newSubj.enrolmentSubjectId = $scope.enrolmentsubject.id;
      newSubj.mark = $scope.subjectMark;
      $scope.entirePerson.enrolmentsubjects.push(angular.copy(newSubj));
      console.log('subject before decoded', $scope.enrolmentsubject.id);



      newSubj.enrolmentSubjectId = $scope.enrolmentsubject.name;
      $scope.decodedSubjects.push(newSubj);

      console.log('subject after decoded', $scope.enrolmentsubject.name);
      console.log('subject in decoded', $scope.decodedSubjects);
      console.log('subject in entirePerson', $scope.entirePerson.enrolmentsubjects);
    };


    $scope.deleteSubj = function (id) {
      $scope.entirePerson.enrolmentsubjects.splice(id-1, 1);
      $scope.decodedSubjects.splice(id-1, 1);
      $scope.entirePerson.enrolmentsubjects.forEach(function (subj, index){
        subj.id = index+1;
      });
      $scope.decodedSubjects.forEach(function (subj, index){
        subj.id = index+1;
      });

    };
    $scope.open = function (size, id) {

      $modal.open({
        templateUrl: '../views/modal/tabEditPersonSubj.html',
        scope: $scope,
        controller: function ($rootScope, $scope, $modalInstance, id) {
          $scope.id = id;

          $scope.ok = function (id) {
            $scope.entirePerson.enrolmentsubjects[id-1].enrolmentSubjectId = $scope.modalEnrolmentSubject.id;
            $scope.entirePerson.enrolmentsubjects[id-1].mark = $scope.modalMark;
            $scope.decodedSubjects[id-1].enrolmentSubjectId = $scope.modalEnrolmentSubject.name;
            $scope.decodedSubjects[id-1].mark = $scope.modalMark;
            console.log('entirePerson', $scope.entirePerson.enrolmentsubjects);
            console.log('decoded', $scope.decodedSubjects);

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
