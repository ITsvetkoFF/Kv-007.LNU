'use strict';

angular.module('admissionSystemApp')
  .directive('personPapers', function () {

    return {
      restrict: 'E',
      templateUrl: '../views/directives/personPapers.html',
      require: 'ngModel',
      replace: false,
      scope: {},
      link: function (scope, element, attrs, ctrl) {

        scope.papers = [];

        ctrl.$render = function () {
          for (var i = 1; i < 9; i++) {
            angular.forEach(ctrl.$modelValue, function (el) {
              if (el.paperTypeId === i) {
                scope.papers[i] = {
                  id: el.id,
                  paperTypeId: i,
                  value: el.value
                };
              }
            });
            if (!scope.papers[i]) {
              scope.papers[i] = {
                paperTypeId: i,
                value: ''
              };
            }
          }
        };

        scope.$watch('papers', function (newPapers) {
          ctrl.$setViewValue(newPapers.filter(function (paper) {
              return !(paper.value === '');
            })
          );
        }, true);

      }
    };
  });
