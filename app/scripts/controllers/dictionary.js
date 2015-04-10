'use strict';


angular.module('admissionSystemApp')
  .controller('dictionaryCtrl', ['$scope', 'ngTableParams', 'SpecofferDictionaryService',
    function ($scope, NgTableParams, SpecofferDictionaryService) {

      $scope.newData=[];

      $scope.dictionaries = [
        {name: 'Довідник типів часових періодів', headers: {}, id:1},
        {name: 'Довідник типів спеціальностей', headers: {}, id:2},
        {name: 'Напрями та спеціальності', headers: {}, id:3},
        {name: 'Інформація про підрозділи', headers: {}, id:4},
        {name: 'Тип пропозиції', headers: {}, id:5},
        {name: 'Довідник форм навчання', headers: {}, id:6},
        {name: 'Довідник типів пільг', headers: {}, id:7},
        {name: 'Дані про пільги', headers: {}, id:8},
        {name: 'Довідник типу персон', headers: {}, id: 9},
        {name: 'Довідник статі персон', headers: {
          abbrName: 'Скорочена назва',
          name: 'Hазва'
          }, id: 10, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data; console.log('data:',data); console.log('scope.dics:',$scope.dictionaries[$scope.dictionary-1].headers)})}},
        {name: 'Довідник сімейного стану', headers: {}, id:11},
        {name: 'Довідник типів адмістративно-територіальних одиниць', headers: {}, id:12},
        {name: 'Адміністративно-територіальні одиниці', headers: {}, id:13},
        {name: 'Довідник типу адрес', headers: {}, id:14},
        {name: 'Довідник типів контактів', headers: {}, id:15},
        {name: 'Довідник типу публічних активностей', headers: {}, id:16},
        {name: 'Нагороди за публічні заходи', headers: {}, id:17},
        {name: 'Публічні активності', headers: {}, id:18},
        {name: 'Довідник придметів ЗНО', headers: {}, id:19},
        {name: 'Довідник типів відзнак', headers: {}, id:20},
        {name: 'Довідник типів використання документів', headers: {}, id:21},
        {name: 'Довідник типів документів', headers: {}, id:22},
        {name: 'Довідник типів поступлень', headers: {}, id:23},
        {name: 'Довідник типів статусу заявки', headers: {}, id:24},
        {name: 'Часові періоди', headers: {}, id:25}
      ];
      $scope.dictionary = $scope.dictionaries[0];


      $scope.pickDictionary = function () {
        $scope.dictionaries[($scope.dictionary)-1].dict()
        };

      var getData = function () {
        return $scope.newData;
      };
      $scope.$watch('newData', function () {
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



          params.total(moreData.length);
          $defer.resolve(moreData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
    }]);




