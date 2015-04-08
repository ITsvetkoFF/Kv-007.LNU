'use strict';

angular.module('admissionSystemApp')

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.get = { 'Authorization' : 'Basic YWRtaW46bmltZGE=' };
  }])

  .factory('SpecofferDictionaryService', ['$http', '$q', function ($http, $q) {

    function requestConfig(item, limit, offset, customParams) {
        var normalParams = {
          limit: limit,
          offset: offset
        };
        angular.extend(normalParams, customParams);

        return {
          method: 'GET',
          url: 'http://176.36.11.25/api-lnu/' + item,
          params: normalParams
          // ,cache: true
        };
      }

      var storage = {};
      function getLargeDictionary (route, customParams) {
        var deferred = $q.defer();

        if (storage[route]) {
          deferred.resolve(storage[route]);
        } else {
          storage[route] = [];

          var limit = 300;
          var offset = 0;

          $http(requestConfig(route, limit, offset, customParams)).success(function callBack (data) {

            for (var i=0; i<data.resources.length; i+=1) {
              storage[route].push(data.resources[i]);
            }
            if (data.resources.length < limit) {
              deferred.resolve(storage[route]);
              return;
            }
            offset += limit;
            $http(requestConfig(route, limit, offset, customParams)).success(callBack);
          });
        }

        return deferred.promise;
      }

      return {
        getAllDepartments: function () {
          return getLargeDictionary('departments');
        },
        getAllSpecoffers: function (params) {
          return getLargeDictionary('specoffers', params);
        },
        getAllSubjects: function () {
          return getLargeDictionary('enrolments/subjects');
        },
        getAllSpecialties: function () {
          return getLargeDictionary('specialties');
        },
        getSpecialtiesTypes: function () {
          return getLargeDictionary('specialties/types');
        },
        getSpecoffersTypes: function () {
          return getLargeDictionary('specoffers/types');
        },
        getEduformTypes: function () {
          return getLargeDictionary('educations/forms/types');
        },
        getTimePeriodCourseIds: function () {
          return getLargeDictionary('courses/types');
        },
        getTimeperiods: function (params) {
          return getLargeDictionary('timeperiods', params);
        },
        getBenefits: function () {
          return getLargeDictionary('benefits');
        },
        clearStorage: function () {
          storage = {};
        },
        getBenefitsTypes: function () {
          return getLargeDictionary('benefits/types');
        },
        clearStorageByRoute: function (route) {
          if(storage[route]) {
            delete storage[route];
          }
        },
        getTimeperiodsTypes: function () {
          return getLargeDictionary('timeperiods/types');
        },
        getPersons: function () {
          return getLargeDictionary('persons');
        },
        getPersonsTypes: function () {
          return getLargeDictionary('persons/types');
        },
        getGenderTypes: function () {
          return getLargeDictionary('gendertypes');
        },
        getMarriedTypes: function () {
          return getLargeDictionary('marriedtypes');
        },
        getAdminUnits: function () {
          return getLargeDictionary('adminunits');
        },
        getAdminUnitsTypes: function () {
          return getLargeDictionary('adminunits/types ');
        },
        getAddressTypes: function () {
          return getLargeDictionary('addresstypes');
        },
        getStreetsTypes: function () {
          return getLargeDictionary('streets/types');
        },
        getAssets: function () {
          return getLargeDictionary('assets');
        },
        getLanguages: function () {
          return getLargeDictionary('languages');
        },
        getContactsTypes: function () {
          return getLargeDictionary('contacts/types');
        },
        getPaperTypes: function () {
          return getLargeDictionary('papers/types');
        },
        getPaperUsages: function () {
          return getLargeDictionary('papers/usages');
        },
        getHonorsTypes: function () {
          return getLargeDictionary('honors/types');
        },
        getPublicActivities: function () {
          return getLargeDictionary('publicactivities');
        },
        getPublicActivitiesTypes: function () {
          return getLargeDictionary('publicactivities/types');
        },
        getPublicActivitiesAwards: function (params) {
          return getLargeDictionary('publicactivities/' + params + '/awards');
        },
        getEnrolmentsSubjects: function () {
          return getLargeDictionary('enrolments/subjects');
        },
        getEnrolmentsTypes: function () {
          return getLargeDictionary('enrolments/types');
        },
        getEnrolmentsStatusTypes: function () {
          return getLargeDictionary('enrolments/statustypes');
        }
      };
    }]);



