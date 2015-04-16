'use strict';

angular.module('admissionSystemApp')
  .config( function (RestangularProvider, Constants) {

    RestangularProvider.setBaseUrl(Constants.basicURL);
    RestangularProvider.setDefaultHeaders({
      Authorization: Constants.BasicAuth
    });
    RestangularProvider.addResponseInterceptor(function (data, operation) {
      if (operation === 'get') {
        delete data.uri;
      }
      if (operation === 'getList') {
        return data.resources;
      } else {
        return data;
      }
    });
  });


angular.module('admissionSystemApp')
  .factory('SpecoffersService', ['Restangular', '$q', '$filter',

    function (Restangular, $q, $filter) {

      var restAngular =
        Restangular.withConfig(function (Configurer) {
          Configurer.setRequestInterceptor(function (element, operation) {
            if (operation === 'post' || operation === 'put') {
              element.begDate = $filter('date')(element.begDate, 'yyyy-MM-dd');
              element.endDate = $filter('date')(element.endDate, 'yyyy-MM-dd');
              delete element.uri;
            }
            return element;
          });
        });


      var objCopy = {};

      function getEntireSpecoffer(id) {
        var entireSpecoffer = {};
        entireSpecoffer.specoffer = restAngular.one('specoffers', id).get();
        entireSpecoffer.subjects = restAngular.one('specoffers', id).one('subjects').getList();
        entireSpecoffer.benefits = restAngular.one('specoffers', id).one('benefits').getList();

        $q.all(entireSpecoffer).then(function (res) {
          // objCopy = {};
          _.merge(objCopy, res);
        });
        return $q.all(entireSpecoffer);
      }

      function addArrayOfItems(itemsArr, specOfferId, route) {
        var promises = [];
        for (var i = 0; i < itemsArr.length; i += 1) {
          itemsArr[i].specOfferId = specOfferId;
          var benefitPromise = restAngular.one('specoffers', specOfferId).one(route).post('', itemsArr[i]);
          promises.push(benefitPromise);
        }
        return $q.all(promises);
      }

      function addEntireSpecoffer(obj) {
        var id = $q.defer();
        restAngular.all('specoffers').post(obj.specoffer).then(function (response) {
          id.resolve(response.id);
        });
        return id.promise;
      }

      function addOrEditSpecoffer(currentObj) {
        if (!objCopy.specoffer) {
          return addEntireSpecoffer(currentObj).then(function (specOfferID) {
            currentObj.specoffer.id = specOfferID;
            return $q.all([
              addArrayOfItems(currentObj.subjects, specOfferID, 'subjects'),
              addArrayOfItems(currentObj.benefits, specOfferID, 'benefits'),
            ])
              .then(function () {
                return getEntireSpecoffer(specOfferID).then(function (newEntireSpecoffer) {
                  _.merge(currentObj, newEntireSpecoffer);
                });
              });
          });
        } else {
          return editEntireSpecoffer(currentObj);
        }
      }

      function editEntireSpecoffer(newOnj) {
        var specOfferID = objCopy.specoffer.id;
        var promiseSpecoffer;
        if (!angular.equals(newOnj.specoffer, objCopy.specoffer)) {
          promiseSpecoffer = restAngular.one('specoffers', specOfferID).customPUT(newOnj.specoffer);
        }

        return $q.all([
          compareArrays(newOnj.subjects, objCopy.subjects, specOfferID, 'subjects'),
          compareArrays(newOnj.benefits, objCopy.benefits, specOfferID, 'benefits'),
          promiseSpecoffer
        ])
          .then(function () {
            return getEntireSpecoffer(specOfferID).then(function (res) {
              _.merge(newOnj, res);
            });
          });
      }

      function compareArrays(newArr, oldArr, specOfferID, route) {
        /* - if item doesn't have id property - POST NEW item.
         - else check if item correspond the items with same ID in oldAdd. If false - PUT it.
         - check if there are there are deleted items  */
        var promises = [];

        _.forEach(newArr, function (item) {
          var promise;
          if (!item.specOfferId) {
            item.specOfferId = specOfferID;
            promise = restAngular.one('specoffers', specOfferID).one(route).customPOST(item);
            promises.push(promise);
          } else {
            var oldItem = _.find(oldArr, {
              'id': item.id
            });
            if (!angular.equals(oldItem, item)) {
              promise = restAngular.one('specoffers', specOfferID).one(route, oldItem.id).customPUT(item);
              promises.push(promise);
            }
          }
        });

        _.forEach(oldArr, function (item) {
          var promise;
          if (!_.some(newArr, {
              'id': item.id
            })) {
            promise = restAngular.one('specoffers', specOfferID).one(route, item.id).remove();
            promises.push(promise);
          }
        });

        return $q.all(promises);
      }

      function deleteSpecoffer(objToDelete) {
        var promises = [];
        var specOfferID = objToDelete.specoffer.id;

        promises.push(restAngular.one('specoffers', specOfferID).remove());

        _.forEach(objToDelete.benefits, function (benefit) {
          promises.push(restAngular.one('specoffers', specOfferID).one('benefits', benefit.id).remove());
        });

        _.forEach(objToDelete.subjects, function (subject) {
          promises.push(restAngular.one('specoffers', specOfferID).one('benefits', subject.id).remove());
        });

        return $q.all(promises).then(function () {
          objCopy = {};
        });
      }

      function deleteEntireSpecoffer(objToDelete, id) {
        if (!objToDelete.specoffer) {
          return getEntireSpecoffer(id).then(deleteSpecoffer);
        } else {
          return deleteSpecoffer(objToDelete);
        }
      }


      return {
        getEntireSpecoffer: getEntireSpecoffer,

        addOrEditSpecoffer: addOrEditSpecoffer,

        deleteEntireSpecoffer: function (id) {
          return deleteEntireSpecoffer(objCopy, id);
        }
      };
    }]);
