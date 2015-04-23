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

    // create dictionary with subjects
    $scope.enrolSubjIds = SpecofferDictionaryService.getEnrolmentsSubjects().then(function(subjs) {
      $scope.subjs = subjs;
      $scope.dictionaryArr = [];
      angular.forEach(subjs, function(subjs){
        $scope.dictionaryArr[subjs.id] = subjs.name;
      });
      $scope.viewDictionary = angular.copy($scope.subjs);
      //console.log('viewDictionary:',$scope.dictionaryArr);

      if ($scope.entirePerson.enrolmentsubjects) {
        angular.forEach($scope.entirePerson.enrolmentsubjects, function (decodedObj) {
          var temp = {};
          temp.id = decodedObj.id;
          temp.personPaperId = decodedObj.personPaperId;
          temp.enrolmentSubjectId = $scope.dictionaryArr[decodedObj.enrolmentSubjectId];
          temp.mark = decodedObj.mark;
          $scope.decodedSubjects.push(temp);

          $scope.viewDictionary.splice($scope.dictionaryArr.indexOf(temp.enrolmentSubjectId)-1, 1);
          //console.log('subj:', $scope.dictionaryArr.indexOf(temp.enrolmentSubjectId));
          //console.log('viewDict', $scope.viewDictionary);
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
      console.log('subject before decoded', $scope.enrolmentsubject.dict);

      newSubj.enrolmentSubjectId = $scope.dictionaryArr[$scope.enrolmentsubject.id];
      $scope.decodedSubjects.push(newSubj);

      // problem is here
      var objIndx = $scope.viewDictionary.map(function(obj, index) {
        if(obj.name === $scope.enrolmentsubject.name) {console.log(index); return index}
      }).filter(isFinite);

      $scope.viewDictionary.splice(objIndx[0], 1);


       //console.log('AAAAAAAA---', $scope.dictionaryArr.indexOf($scope.enrolmentsubject.name));
       //console.log('viewDict', $scope.viewDictionary);
      //console.log('subject after decoded', $scope.enrolmentsubject.name);
      //console.log('subject in decoded', $scope.decodedSubjects);
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

      //$scope.viewDictionary.push($scope.subjs[]);

    };
    $scope.open = function (size, id) {

      $modal.open({
        templateUrl: '../views/modal/tabEditPersonSubj.html',
        scope: $scope,
        controller: function ($rootScope, $scope, $modalInstance, id) {
          $scope.id = id;
          $scope.modalMark = $scope.decodedSubjects[id-1].mark;

          $scope.ok = function (id) {
            $scope.entirePerson.enrolmentsubjects[id-1].enrolmentSubjectId = $scope.modalEnrolmentSubject.id;
            $scope.entirePerson.enrolmentsubjects[id-1].mark = $scope.modalMark;
            $scope.decodedSubjects[id-1].enrolmentSubjectId = $scope.modalEnrolmentSubject.name;
            $scope.decodedSubjects[id-1].mark = $scope.modalMark;
            //console.log('entirePerson', $scope.entirePerson.enrolmentsubjects);
            //console.log('decoded', $scope.decodedSubjects);

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
