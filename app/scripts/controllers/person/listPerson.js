'use strict';


angular.module('admissionSystemApp')
  .controller('ListPersonCtrl', ['$scope', 'personDecodeSvc', 'DictionariesSvc', 'basePersonData', 'getFiltredListSvc',
    function ($scope, personDecodeSvc, DictionariesSvc, basePersonData, getFiltredListSvc) {

      $scope.personDecoded = [];
      
      $scope.getPersons = function (pageNumber, perPage, filters, sort) {
        getFiltredListSvc.getListPersons(pageNumber, perPage, filters, sort).then(function(res) {
          $scope.personDecoded = res.data;
          $scope.totalPersons = res.total;
        });
      };

      $scope.personFilters = basePersonData.filters;
      $scope.personSearch = basePersonData.search;
      $scope.headers = basePersonData.headers;


    }]);
