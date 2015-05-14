'use strict';

angular.module('admissionSystemApp')
  .controller('tabPersonPapers', ['$scope', '$http', '$modal', '$rootScope', 'DictionariesSvc', '$filter',
    function ($scope, $http, $modal, $rootScope, DictionariesSvc, $filter) {

      /* all ng-shows on a view*/
      $scope.isVisible = {
        isSaveToTable: false,
        isCreating: true,
        isAddToTable: true,
        publicActiveTable: false,
        publicActivSelect: false
      };

      $scope.headers = [
        {name: 'paperTypeId', display: 'назва документу'},
        {name: 'docSeries', display: 'серія документу'},
        {name: 'docNum', display: 'номер документу'},
        {name: 'docDate', display: 'дата видачі'},
        {name: 'docIssued', display: 'ким видано'},
        {name: 'publicActivityTypeId', display: 'категорія нагорд'},
        {name: 'awardName', display: 'нагорода'}
      ];

      /* function that's making decoding in data */
      function pushData(data, array) {
        angular.forEach(data, function (item) {
          array[item.id] = item.name;
        });
      }

      function pushAwardsData(data, array) {
        angular.forEach(data, function (item) {
          array[item.id] = item.awardName;
        });
      }

      var paperTypeNames = [],
        paperUsageNames = [],
        publicAwards = [],
        publicActivities = [];

      /* getting from service the categories of papers */
      DictionariesSvc.getPaperUsages().then(function (paperUsage) {
        $scope.paperUsage = paperUsage;
        pushData(paperUsage, paperUsageNames);
      });

      /* function that's setting the children in our category of papers(if category have chosen, return all children from this category) */
      $scope.setNewData = function (id) {
        DictionariesSvc.getPaperTypes().then(function (paperType) {
          pushData(paperType, paperTypeNames);
          $scope.newData = [];
          for (var i = 0; i < paperType.length; i++) {
            if (paperType[i].paperUsageId === id) {
              $scope.newData.push(paperType[i]);
            }
          }
        });
      };

      //DictionariesSvc.getPaperTypes().then(function (paperType) {
      //  pushData(paperType, paperTypeNames);
      //  $scope.newData = paperType;
      //});

      /* getting from service the categories of awards */
      DictionariesSvc.getPublicActivities().then(function (publicActiv) {
        $scope.publicActiv = publicActiv;
        pushData(publicActiv, publicActivities);
      });

      /* function that's setting the children in our category of awards(if category have chosen, return all children from this category) */
      $scope.setAdditionalData = function (id) {
        DictionariesSvc.getPublicActivitiesAwards(id).then(function (awards) {
          $scope.newAddingData = awards;
          pushAwardsData(awards, publicAwards);
        });
      };

      $scope.currentObj = {};
      $scope.entirePerson.papers = [];
      $scope.inputData = [];

      var cloneView,
        cloneViewDecode,
        award = {},
        cloneMainNotDecode;

      /* the function that's adding the object to the row of table  */
      $scope.addToTable = function () {
        $scope.currentObj.docDate = $filter('date')($scope.currentObj.docDate, 'yyyy-MM-dd');
        cloneMainNotDecode = _.clone($scope.currentObj);
        cloneMainNotDecode.award = award;
        award.awardName = cloneMainNotDecode.awardName;
        award.publicActivityTypeId = cloneMainNotDecode.publicActivityTypeId;
        delete cloneMainNotDecode.awardName;
        delete cloneMainNotDecode.publicActivityTypeId;
        //delete cloneMainNotDecode.abbrName;
        $scope.entirePerson.papers.push(cloneMainNotDecode);

        cloneView = _.clone($scope.currentObj);
        cloneViewDecode = decodeData(cloneView);
        cloneView.award = award;
        award.awardName = cloneViewDecode.awardName;
        award.publicActivityTypeId = cloneViewDecode.publicActivityTypeId;
        delete cloneViewDecode.awardName;
        delete cloneViewDecode.publicActivityTypeId;
        //delete cloneViewDecode.abbrName;
        $scope.inputData.push(cloneViewDecode);

        $scope.isVisible.isAddToTable = true;
        $scope.isVisible.isSaveToTable = false;
        $scope.currentObj = {};
        //_.merge(objToEditDecoded, decodeData($scope.currentObj));

      };

      function decodeData(obj) {
        obj.abbrName = paperUsageNames[obj.abbrName];
        obj.paperTypeId = paperTypeNames[obj.paperTypeId];
        obj.publicActivityTypeId = publicActivities[obj.publicActivityTypeId];
        obj.awardName = publicAwards[obj.awardName];
        return obj;
      }

      /* the function that's deleting the object(row from table)  */
      $scope.deleteData = function (idx) {

        $scope.inputData.splice(idx, 1);
        $scope.entirePerson.papers.splice(idx, 1);
      };

      var objToEdit,
        objToEditDecoded;

      /* the function that's editing the object, and let's to change current data in this object  */
      $scope.editData = function (item, idx) {

        objToEdit = $scope.entirePerson.papers[idx];
        _.merge($scope.currentObj, objToEdit);
        objToEditDecoded = $scope.inputData[idx];
        $scope.addSelect(objToEdit.paperTypeId);
        $scope.isVisible.isAddToTable = false;
        $scope.isVisible.isSaveToTable = true;
      };

      /* the function that's saving the object, and let's to update the changes  */
      $scope.saveData = function () {
        $scope.currentObj.docDate = $filter('date')($scope.currentObj.docDate, 'yyyy-MM-dd');
        _.merge(objToEdit, $scope.currentObj);
        _.merge(objToEditDecoded, decodeData($scope.currentObj));
        $scope.currentObj = {};
        delete cloneViewDecode.awardName;
        delete cloneViewDecode.publicActivityTypeId;
        $scope.isVisible.isAddToTable = true;
        $scope.isVisible.isSaveToTable = false;
      };

      /* the function that's adding the select with children of chosen category  */
      $scope.addSelect = function (paperTypeId) {
        if (paperTypeId === 29) {
          $scope.isVisible.publicActivSelect = true;
          $scope.isVisible.publicActiveTable = true;
        } else {
          $scope.isVisible.publicActivSelect = false;
        }
      };
    }]);
