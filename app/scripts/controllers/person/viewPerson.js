'use strict';

angular.module('admissionSystemApp')
  .controller('ViewPersonCtrl', ['$scope', 'DictionariesSvc', '$q', '$stateParams', 'Person',
    function ($scope, DictionariesSvc, $q, $stateParams, Person) {

      $scope.entirePerson = {};
      $scope.entirePerson.contacts = [];

      $scope.brosweOrEditPerson = function (personId) {
        Person.getEntirePerson(personId).then(function (res) {
          _.merge($scope.entirePerson, res);
        });
      };

      $scope.brosweOrEditPerson($stateParams.id);

      $scope.personsTypes = [];
      $scope.genderTypes = [];
      $scope.marriedTypes = [];
      $scope.adminUnits = [];
      $scope.streetsTypes = [];

      function pushData(data, array) {
        angular.forEach(data, function (item) {
          array[item.id] = item.name;
        });
      }

      $q.all([
        DictionariesSvc.getPersonsTypes(),
        DictionariesSvc.getGenderTypes(),
        DictionariesSvc.getMarriedTypes(),
        DictionariesSvc.getAdminUnits({
          adminUnitTypeId: 6
        }),
        DictionariesSvc.getStreetsTypes()
      ])
        .then(function (res) {
          pushData(res[0], $scope.personsTypes);
          pushData(res[1], $scope.genderTypes);
          pushData(res[2], $scope.marriedTypes);
          pushData(res[3], $scope.adminUnits);
          pushData(res[4], $scope.streetsTypes);
        });

    }])

  .filter('checkmark', function () {
    return function (input) {
      return input ? '\u2713' : '\u2718';
    };
  });
