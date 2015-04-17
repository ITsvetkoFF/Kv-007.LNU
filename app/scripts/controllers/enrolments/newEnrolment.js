'use strict';


angular.module('admissionSystemApp')
  .controller('NewEnrolmentCtrl', function ($scope, $routeParams) {
    $scope.entolmentId = $routeParams.id;

  });
