'use strict';

angular.module('admissionSystemApp')
  .controller('tabPersonPapers', ['$scope', '$modal', '$rootScope', 'SpecofferDictionaryService', function ($scope, $modal, $rootScope, SpecofferDictionaryService) {

    $scope.isCreating = true;
    $scope.isAddToTable = true;
    //$scope.showPassword = false;

    $scope.headers = [
      {name: 'abbrName', display: 'категорія документів'},
      {name: 'name', display: 'назва документу'},
      {name: 'docSeries', display: 'серія документу'},
      {name: 'docNum', display: 'номер документу'},
      {name: 'dataIssued', display: 'дата видачі'},
      {name: 'dataDate', display: 'дата завершення'}
    ];

    function pushData(data, array) {
      angular.forEach(data, function (item) {
        array[item.id] = item.name;
      });
    }
    var paperTypeNames = [];
    var paperUsageNames = [];

    SpecofferDictionaryService.getPaperUsages().then(function (paperUsage) {
      $scope.paperUsage = paperUsage;
      pushData(paperUsage, paperUsageNames);
    });


    $scope.setNewData = function (id) {
      SpecofferDictionaryService.getPaperTypes().then(function (paperType) {
        pushData(paperType, paperTypeNames);
        $scope.newData = [];
        for (var i = 0; i < paperType.length; i++) {
          if (paperType[i].paperUsageId === id) {
            $scope.newData.push(paperType[i]);
          }
        }
      })
    };

    $scope.someObj = {};
    $scope.inputDataDecoded = []; // view
    $scope.inputData = []; // model

    $scope.addToTable = function () {
      var cloneMainNotDecode = _.clone($scope.someObj);
      $scope.inputData.push(cloneMainNotDecode);

      var cloneViewDecode = _.clone($scope.someObj);
      cloneViewDecode.abbrName = paperUsageNames[cloneViewDecode.abbrName];
      cloneViewDecode.name = paperTypeNames[cloneViewDecode.name];
      $scope.inputDataDecoded.push(cloneViewDecode);
      $scope.isAddToTable = true;
      $scope.isSaveToTable = false;
    };

    $scope.deleteData = function (id) {
      var indexDataDecoded = _.findIndex($scope.inputDataDecoded, {name: id});
      var indexMainData = _.findIndex($scope.inputData, {name:id});

      $scope.inputData.splice(indexDataDecoded, 1);
      $scope.inputDataDecoded.splice(indexMainData, 1);
    };

    $scope.editData = function (id) {
      var objToEdit = _.find($scope.inputData, {name:id});
      _.merge($scope.someObj, objToEdit);

      $scope.isAddToTable = false;
      $scope.isSaveToTable = true;
    };

    $scope.saveData = function (id) {
      $scope.deleteData($scope.someObj.id);
      $scope.addToTable();
    };

    $scope.addInput = function(){
      SpecofferDictionaryService.getPaperTypes().then(function (paperType) {
        $scope.paperType = paperType;
        if(paperType[28] == true){
          $scope.showPassword = true;
        }
        else{
          $scope.showPassword = false;
        }
      })
    };
  }]);
