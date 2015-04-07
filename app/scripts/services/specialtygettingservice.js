'use strict';

angular.module('admissionSystemApp')
  .factory('SpecialtyGettingService', ['$http', '$q', 'SpecofferDictionaryService', function ($http, $q, SpecofferDictionaryService) {

    var deferred,
      searchResult = [],
      specialties = [];

    function fillSpecialtiesArray() {
      if (deferred) {
        return deferred.promise;
      }
      deferred = $q.defer();
      SpecofferDictionaryService.getAllSpecialties().then(function (data) {
        angular.forEach(data, function (resource) {
          if (resource.hasOwnProperty('parentId')) {
            specialties.push(resource);
          }
        });
        deferred.resolve(specialties);
      });
      return deferred.promise;
    }

    var service = {};

    service.searchSpecialtyByName = function (str) {
      return fillSpecialtiesArray().then(function (specialties) {
        searchResult.length = 0;
        var filter = function (item) {
          if (item.name.indexOf(str) > -1) {
            searchResult.push(item);
          }
        };
        angular.forEach(specialties, filter);
        return searchResult;
      });
    };

    service.searchSpecialtyById = function (str) {
      return fillSpecialtiesArray().then(function (specialties) {
        searchResult.length = 0;
        var filter = function (item) {
          if (item.cipher.indexOf(str) > -1) {
            searchResult.push(item);
          }
        };
        angular.forEach(specialties, filter);
        return searchResult;
      });
    };

    service.searchSpecialty = function (str) {
      return fillSpecialtiesArray().then(function (specialties) {
        var specialty = null;
        angular.forEach(specialties, function (item) {
          if (parseInt(item.id) === parseInt(str)) {
            specialty = item;
            return false;
          }
        });
        return specialty;
      });
    };

    return service;

  }]);



