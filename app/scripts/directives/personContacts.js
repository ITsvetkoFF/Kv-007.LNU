'use strict';

angular.module('admissionSystemApp')
  .directive('personContacts', function () {

    return {
      restrict: 'E',
      templateUrl: '../views/directives/personContacts.html',
      require: 'ngModel',
      replace: false,
      scope: {},
      link: function (scope, element, attrs, ctrl) {

        scope.contacts = [];

        scope.$watch(function() { return ctrl.$modelValue }, function (personContacts) {

          for (var i = 1; i < 9; i++) {
            angular.forEach(personContacts, function (el) {
              if (el.contactTypeId === i) {
                scope.contacts[i] = {
                  id: el.id,
                  contactTypeId: i,
                  value: el.value
                };
              }
            });
            if (!scope.contacts[i]) {
              scope.contacts[i] = {
                contactTypeId: i,
                value: ''
              };
            }
          }
        }, true);

        scope.$watch('contacts', function (newContacts) {
          ctrl.$setViewValue(newContacts.filter(function (contact) {
              return !(contact.value === '');
            })
          );
        }, true);

      }
    };
  });
