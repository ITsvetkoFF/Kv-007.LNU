'use strict';

angular
  .module('admissionSystemApp')
  .factory('paperDecodeSvc', ['$q', 'DictionariesSvc', function ($q, DictionariesSvc) {

    function decode(rawPapers) {

      var paperTypeNames = [],
        publicAwards1 = [],
        publicAwards2 = [],
        publicActivities = [],
        decodeHonorTypes = [];

      function pushData(data, array) {
        angular.forEach(data, function (item) {
          array[item.id] = item.name;
        });
      }

      function pushAwardsData(data, array) {
        angular.forEach(data, function (item) {
          array[item.id] = item.awardName;
        });
      }

      return $q.all([
        DictionariesSvc.getPaperTypes(),
        DictionariesSvc.getPublicActivities(),
        DictionariesSvc.getHonorsTypes(),
        DictionariesSvc.getPublicActivitiesAwards(1),
        DictionariesSvc.getPublicActivitiesAwards(2)
      ])
        .then(function (res) {
          pushData(res[0], paperTypeNames);
          pushData(res[1], publicActivities);
          pushData(res[2], decodeHonorTypes);
          pushAwardsData(res[3], publicAwards1);
          pushAwardsData(res[4], publicAwards2);

          angular.forEach(rawPapers, function (item) {
            item.paperTypeId = paperTypeNames[item.paperTypeId];
            if (item.award && item.award.publicActivityAwardId < 64) {
              item.publicActivityTypeId = 1;
              item.publicActivityAwardId = publicAwards1[item.publicActivityAwardId];
            } else if (item.award && item.award.publicActivityAwardId >= 64) {
              item.publicActivityTypeId = 2;
              item.publicActivityAwardId = publicAwards2[item.publicActivityAwardId];
            }
            if (item.honorsTypeId) {
              item.honorsTypeId = decodeHonorTypes[item.honorsTypeId];
            }
          });
          return rawPapers;
        });
    }

    return {
      paperDecoded: function (rawData) {
        return decode(rawData);
      }
    };
  }]);

