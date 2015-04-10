'use strict';


angular.module('admissionSystemApp')
  .controller('dictionaryCtrl', ['$scope', 'ngTableParams', 'SpecofferDictionaryService',
    function ($scope, NgTableParams, SpecofferDictionaryService) {

      $scope.dataNew=[];

      $scope.dictionaries = [
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0, dict},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0},
        {name: 'num', display: 'Номер', headers: {}, id:0}
      ];








      SpecofferDictionaryService.getTimeperiods({timePeriodTypeId: 1}).then(function (timeperiods) {
        $scope.timeperiods = timeperiods;
      });
      $scope.dataNew = [];
      $scope.pickTimePeriod = function () {
        valueSendingService.timeperiod = $scope.timeperiod.timePeriodId;
        SpecofferDictionaryService.clearStorageByRoute('specoffers');
        ListProposalGettingService.allProposalsDecoded($scope.timeperiod).then(function (data) {
          $scope.dataNew = data;
        });
      };
      var getData = function () {
        return $scope.dataNew;
      };
      $scope.$watch('dataNew', function () {
        $scope.tableParams.reload();
      });
      $scope.tableParams = new NgTableParams({
        page: 1,            // show first page
        count: 10          // count per page
      }, {
        total: function () {
          return getData().length;
        }, // length of data
        getData: function ($defer, params) {
          var moreData = getData();
          moreData.forEach(function (el, index) {
            el.num = index + 1;
          });
          params.total(moreData.length);
          $defer.resolve(moreData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
    }]);




