'use strict';

/**
 * @ngdoc service
 * @name admissionSystemApp.enrolmentsDecode
 * @description
 * # enrolmentsDecode
 * Factory in the admissionSystemApp.
 */
angular.module('admissionSystemApp')
  .factory('decodeEnrolmentsSvc', function () {
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
