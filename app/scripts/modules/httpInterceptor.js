'use strict';

angular
  .module('admissionSystemApp')
  .factory('httpInterceptorSvc', ['$q', '$rootScope', '$location', '$sessionStorage', '$localStorage',
    function ($q, $rootScope, $location, $sessionStorage, $localStorage) {

      var numLoadings = 0,
        token;

      return {
        request: function (config) {

          numLoadings++;
          token = $sessionStorage.token || $localStorage.token;
          if (token) {
            config.headers.Authorization = 'Basic ' + token;
          }
          // Show loader
          $rootScope.$broadcast('loader_show');
          return config || $q.when(config);

        },
        response: function (response) {

          if ((--numLoadings) === 0) {
            // Hide loader
            $rootScope.$broadcast('loader_hide');
          }

          return response || $q.when(response);

        },
        responseError: function (response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/signin');
          }

          if (!(--numLoadings)) {
            // Hide loader
            $rootScope.$broadcast('loader_hide');
          }

          return $q.reject(response);
        }
      };
    }])

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptorSvc');
  });
