'use strict';

describe('Controller: TabEnrolmentCtrl', function () {

  // load the controller's module
  beforeEach(module('admissionSystemApp'));

  var TabEnrolmentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TabEnrolmentCtrl = $controller('TabEnrolmentCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
