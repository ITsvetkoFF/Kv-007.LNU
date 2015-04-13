'use strict';


angular.module('admissionSystemApp')
  .controller('dictionaryCtrl', ['$scope', 'ngTableParams', 'SpecofferDictionaryService',
    function ($scope, NgTableParams, SpecofferDictionaryService) {

      $scope.newData=[];

      $scope.dictionaries = [
        {name: 'Довідник типів часових періодів', headers: {abbrName: 'Скорочена назва', name: 'Hазва'}, id:1, dict: function() {SpecofferDictionaryService.getTimeperiodsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів спеціальностей', headers: {abbrName: 'Скорочена назва', name: 'Тип спеціальності'}, id:2, dict: function() {SpecofferDictionaryService.getSpecialtiesTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Напрями та спеціальності', headers: {specialtyTypeId: 'Ідентифікатор типу спеціальності', abbrName: 'Абревіатура спеціальності', name: 'Назва спеціальності', cipher: 'Шифр спеціальності', begdate: 'Дата початку', enddate: 'Дата закінчення', parentId: 'Ієрархічний ідентифікатор'}, id:3, dict: function() {SpecofferDictionaryService.getAllSpecialties().then(function (data){$scope.newData = data;})}},
        {name: 'Інформація про підрозділи', headers: {departmentTypeId: 'Ідентифікатор типу підрозділу', identifir: 'Внутрішньо університетський індитфікатор', abbrName: 'Скорочена назва', name: 'Назва підрозділу', manager: 'Керівник підрозділу', begdate: 'Дата створення підрозділу', enddate: 'Дата закриття підрозділу', parentId: 'Ієрархічний ідентифікатор'}, id:4, dict: function() {SpecofferDictionaryService.getAllDepartments().then(function (data){$scope.newData = data;})}},
        {name: 'Тип пропозиції', headers: {specialtyTypeId: 'Ідентифікатор довідника типів спеціальностей', abbrName: 'Скорочена назва', name: 'Hазва'}, id:5, dict: function() {SpecofferDictionaryService.getSpecoffersTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник форм навчання', headers: {abbrName: 'Скорочена назва', name: 'Тип форми навчання'}, id:6, dict: function() {SpecofferDictionaryService.getEduformTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів пільг', headers: {abbrName: 'Скорочена назва', name: 'Тип пільги', priority: 'Квота (1 - квота, 0 - пільга)', parentId: 'Ієрархічний ідентифікатор'}, id:7, dict: function() {SpecofferDictionaryService.getBenefitsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Дані про пільги', headers: {}, id:8, dict: function() {SpecofferDictionaryService.getBenefits().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типу персон', headers: {abbrName: 'Скорочена назва', name: 'Тип персони'}, id: 9, dict: function() {SpecofferDictionaryService.getPersonsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник статі персон', headers: {abbrName: 'Скорочена назва', name: 'Стать персони'}, id: 10, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник сімейного стану', headers: {abbrName: 'Скорочена назва', name: 'Тип персони'}, id:11, dict: function() {SpecofferDictionaryService.getMarriedTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів адмістративно-територіальних одиниць', headers: {abbrName: 'Скорочена назва', name: 'Тип адіністративно-територіальної одиниці'}, id:12, dict: function() {SpecofferDictionaryService.getAdminUnitsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Адміністративно-територіальні одиниці', headers: {}, id:13, dict: function() {SpecofferDictionaryService.getAdminUnits().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типу адрес', headers: {abbrName: 'Скорочена назва', name: 'Тип адреси'}, id:14, dict: function() {SpecofferDictionaryService.getAddressTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів контактів', headers: {abbrName: 'Скорочена назва', name: 'Тип контакту'}, id:15, dict: function() {SpecofferDictionaryService.getContactsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типу публічних активностей', headers: {abbrName: 'Скорочена назва', name: 'Тип публічної активності'}, id:16, dict: function() {SpecofferDictionaryService.getPublicActivitiesTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Нагороди за публічні заходи', headers: {}, id:17, dict: function() {SpecofferDictionaryService.getPublicActivitiesAwards().then(function (data){$scope.newData = data;})}},
        {name: 'Публічні активності', headers: {}, id:18, dict: function() {SpecofferDictionaryService.getPublicActivities().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник придметів ЗНО', headers: {}, id:19, dict: function() {SpecofferDictionaryService.getEnrolmentsSubjects().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів відзнак', headers: {abbrName: 'Скорочена назва', name: 'Тип відзнаки'}, id:20, dict: function() {SpecofferDictionaryService.getHonorsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів використання документів', headers: {abbrName: 'Скорочена назва', name: 'Тип використання документу'}, id:21, dict: function() {SpecofferDictionaryService.getPaperUsages().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів документів', headers: {}, id:22, dict: function() {SpecofferDictionaryService.getPaperTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів поступлень', headers: {}, id:23, dict: function() {SpecofferDictionaryService.getEnrolmentsTypes().then(function (data){$scope.newData = data;})}},
        {name: 'Довідник типів статусу заявки', headers: {}, id:24, dict: function() {SpecofferDictionaryService.getEnrolmentsStatusTypes().then(function (data){$scope.newData = data;})}},
        //{name: 'Часові періоди', headers: {}, id:25, dict: function() {SpecofferDictionaryService.getGenderTypes().then(function (data){$scope.newData = data;})}}
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




