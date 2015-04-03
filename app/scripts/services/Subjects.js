'use strict';

angular.module('admissionSystemApp')

//http://176.36.11.25/api-lnu/enrolments/subjects
//http://104.236.29.16:8080/is-lnu-rest-api/api/enrolments/subjects
  .factory('Subjects', ['$http', '$q', 'SpecofferDictionaryService', function ($http, $q, SpecofferDictionaryService) {
    var flagForFirstFunction = 0;
    var flagForSecondFunction = 0;
    var data = [];
    var chiefSubjectsArray = [];
    var subjectsForParentArray = [];
    var chiefSubjects = $q.defer();
    var subjectsForParent = $q.defer();

    //var returnName = {};



    //Get chief subjects function
    var getChiefSubjects = function () {

      if (flagForFirstFunction === 0) {
        flagForFirstFunction += 1;
        SpecofferDictionaryService.getAllSubjects().then(function (res) {
          angular.extend(data, res);

          for (var i = 0; i < data.length; i++) {
            if (!data[i].hasOwnProperty('hasChildren')) {
              data[i].hasChildren = false;
              if (data[i].hasOwnProperty('parentId')) {
                data[data[i].parentId - 1].hasChildren = true;
              }
            }
          }
          for (var y = 0; y < data.length; y++) {
            if (!data[y].hasOwnProperty('parentId')) {
              chiefSubjectsArray.push({id: data[y].id, name: data[y].name, hasChildren: data[y].hasChildren});
            }
          }

          chiefSubjects.resolve(chiefSubjectsArray);
        });
      }

      return chiefSubjects.promise;
    };


    //Get subjects for chief subject function
    var getSubjectsForParentFunction = function (id) {

      getChiefSubjects().then(function () {
        subjectsForParentArray.length = 0;
        if (data[id - 1].hasChildren) {
          for (var y = 0; y < data.length; y++) {
            if (data[y].parentId == id) {
              subjectsForParentArray.push({id: data[y].id, name: data[y].name, parentId: data[y].parentId});
            }
          }
        }

        subjectsForParent.resolve(subjectsForParentArray);
      });

      return subjectsForParent.promise;
    };


    var getSubjectsById = function (id1) {
      console.log('getSubjectsById', id1);
      var returnNameDefer = $q.defer();
      var returnName = {};

      getChiefSubjects().then(function () {

        if (data[id1 - 1].hasOwnProperty('parentId')) {
          //   returnName.name = '';

          returnName.additionName = data[id1 - 1].name;
            console.log('additionName' + data[id1 - 1].name);
          }
          else if (data[id1 - 1].hasOwnProperty('hasChildren')) {
          //  returnName.additionName = '';

          returnName.name = data[id1 - 1].name;
            console.log('name' + data[id1 - 1].name);
          }

          returnNameDefer.resolve(returnName);
      });

      return returnNameDefer.promise;
    };


    return {
      //function returns Promise with info about chief subjects (like [{hasChildren: true, id: 3, name: "Іноземна мова"}, etc.])
      getChiefSubjects: getChiefSubjects,

      //function returns Promise with info about children-subjects (like [{id: 30, name: "Французька мова", parentId: 3}, etc.])
      getSubjectsForParent: function (id) {
        return getSubjectsForParentFunction(id);
      },

      getSubjectsById: function (id1) {
        return getSubjectsById(id1);
      }

    }
  }]);
