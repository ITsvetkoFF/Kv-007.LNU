'use strict';

/**
 * @ngdoc overview
 * @name admissionSystemApp
 * @description
 * # admissionSystemApp
 *
 * Main module of the application.
 */
angular
  .module('admissionSystemApp', [
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'ngTable',
    'restangular',
    'ngSanitize',
    'ui.select',
    'loadingSpinner',
    'checklist-model'
  ])


  .config(function ($routeProvider) {
    $routeProvider
      .when('/list-proposal', {
        templateUrl: 'views/list_proposal.html',
        controller: 'ListProposalCtrl'
      })
      .when('/new-proposal', {
        templateUrl: 'views/new_proposal.html',
        controller: 'NewProposalCtrl'
      })
      .when('/edit-proposal/:id', {
        templateUrl: 'views/new_proposal.html',
        controller: 'NewProposalCtrl'
      })
      .when('/list-person', {
        templateUrl: 'views/list_person.html',
        controller: 'ListPersonCtrl'
      })
      .when('/new-person', {
        templateUrl: 'views/new_person.html',
        controller: 'NewPersonCtrl'
      })
      .when('/edit-person/:id', {
        templateUrl: 'views/new_person.html',
        controller: 'NewPersonCtrl'
      })
      .when('/list-enrolments', {
        templateUrl: 'views/list_enrolments.html',
        controller: 'ListenrolmentsCtrl'
      })
      .otherwise({
        redirectTo: '/list-proposal'
      });
  })

  .config(function (uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  });

