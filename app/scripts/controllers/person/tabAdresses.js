'use strict';

angular.module('admissionSystemApp')
	.controller('TabAdressesCtrl',
		function ($scope, SpecofferDictionaryService) {

			$scope.entirePerson.addresses = {
				regAddresses: {},
				postAddresses: {},
				isAdressesMatch: true
			};

			$scope.$watch('entirePerson.addresses', function(newVal) {
				console.log('entireSpecofferCopy watch', newVal);
			}, true);

			SpecofferDictionaryService.getStreetsTypes().then(function (streetTypes) {
				$scope.streetsTypesOptions = streetTypes;
			});

		});