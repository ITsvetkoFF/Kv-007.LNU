'use strict';

/**
 * @ngdoc service
 * @name admissionSystemApp.getEnrolmentsList
 * @description
 * # getEnrolmentsList
 * Factory in the admissionSystemApp.
 */
angular.module('admissionSystemApp')
  .factory('getListEnrolmentsSvc', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
