
'use strict';

angular.module('admissionSystemApp')

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.get = { 'Authorization' : 'Basic YWRtaW46bmltZGE=' };
  }])

  .service('personsService', function($http, $q){

    function getPersons(page, perPage) {
      var deffered = $q.defer();
      var offset = (page - 1) * perPage;
      var limit = perPage;
      var params = {
        offset: offset,
        limit:limit
      };

      var reguest = {
        method : 'GET',
        url:'http://104.236.29.16:8080/is-lnu-rest-api/api/persons',
        params: params
      };

      $http(reguest).then(function(data){
        var total = data.data.count;
        var countPage = Math.ceil(total / perPage);

        var getReturn = {
          data: data.data.resources,
          total: total,
          countPage: countPage
        };
        deffered.resolve(getReturn);
      });
      return deffered.promise;
    }
    return {
      getPersons: function(page, perPage) {
        return getPersons(page, perPage);
      }
    }
  });
