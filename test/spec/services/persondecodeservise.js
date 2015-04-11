'use strict';

describe('Service: personDecodeServise', function () {

  // load the service's module
  beforeEach(module('admissionSystemApp'));

  // instantiate service
  var personDecodeServise;
  beforeEach(inject(function (_personDecodeServise_) {
    personDecodeServise = _personDecodeServise_;
  }));

  it('should do something', function () {
    expect(!!personDecodeServise).toBe(true);
  });

});
