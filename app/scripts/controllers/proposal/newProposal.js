'use strict';


angular.module('admissionSystemApp')
  .controller('NewProposalCtrl', ['$scope', '$routeParams', '$location', 'SpecoffersService', 'SpecofferDictionaryService', '$q', 'progressBarService',
    function ($scope, $routeParams, $location, SpecoffersService, SpecofferDictionaryService, $q, progressBarService) {
      $scope.entireSpecoffer = {};

      $scope.brosweOrEditSpecoffer = function (specofferId) {
        SpecoffersService.getEntireSpecoffer(specofferId).then(function (res) {
          _.merge($scope.entireSpecoffer.subjects, res.subjects);
          _.merge($scope.entireSpecoffer.benefits, res.benefits);
          _.merge($scope.entireSpecoffer.specoffer, res.specoffer);
        });
      };

      if ($routeParams.id) {
        $scope.brosweOrEditSpecoffer($routeParams.id);
      }

      $scope.sendToServer = function (entireSpecoffer) {
        $scope.entireSpecoffer.specoffer.note = 'some note';
        SpecoffersService.addOrEditSpecoffer(entireSpecoffer).then(function () {
          SpecofferDictionaryService.clearStorageByRoute('specoffers');
          $location.path('/#/list-proposal');
        });
      };

      $scope.delete = function () {
        SpecoffersService.deleteEntireSpecoffer().then(function () {
          SpecofferDictionaryService.clearStorageByRoute('specoffers');
          $location.path('/#/list-proposal');
        });
      };

      // for progress bar
      $scope.$on('valBubble', function (evt, args) { 
        if (args.isValid) {                           
          progressBarService.value++;                 
        }
        else if (progressBarService.value > 0) {      
          progressBarService.value--;
        }
        else {
          progressBarService.inputQuantity++;        
        }
      });

    }]);

angular.module('admissionSystemApp')
  .config(['datepickerConfig', 'datepickerPopupConfig',
    function (datepickerConfig, datepickerPopupConfig) {
      datepickerConfig.showWeeks = false;
      datepickerConfig.startingDay = '1';
      datepickerPopupConfig.showButtonBar = false;
    }]);




