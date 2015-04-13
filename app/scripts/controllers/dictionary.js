'use strict';


angular.module('admissionSystemApp')
  .controller('dictionaryCtrl', ['$scope', 'ngTableParams', 'SpecofferDictionaryService',
    function ($scope, NgTableParams, SpecofferDictionaryService) {

      $scope.newData=[];

      $scope.dictionaries = [
        {name: 'Довідник типів часових періодів', headers: {}, id:1, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів спеціальностей', headers: {}, id:2, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Напрями та спеціальності', headers: {}, id:3, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Інформація про підрозділи', headers: {}, id:4, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Тип пропозиції', headers: {}, id:5, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник форм навчання', headers: {}, id:6, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів пільг', headers: {}, id:7, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Дані про пільги', headers: {}, id:8, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типу персон', headers: {}, id: 9, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник статі персон', headers: {
          abbrName: 'Скорочена назва',
          name: 'Hазва'
          }, id: 10, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник сімейного стану', headers: {}, id:11, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів адмістративно-територіальних одиниць', headers: {}, id:12, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Адміністративно-територіальні одиниці', headers: {}, id:13, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типу адрес', headers: {}, id:14, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів контактів', headers: {}, id:15, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типу публічних активностей', headers: {}, id:16, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Нагороди за публічні заходи', headers: {}, id:17, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Публічні активності', headers: {}, id:18, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник придметів ЗНО', headers: {}, id:19, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів відзнак', headers: {}, id:20, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів використання документів', headers: {}, id:21, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів документів', headers: {}, id:22, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів поступлень', headers: {}, id:23, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів статусу заявки', headers: {}, id:24, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Часові періоди', headers: {}, id:25, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}}
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




