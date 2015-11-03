let api = (Restangular) => {
  return new class ZipcodeApi {
    fetch(params) {
      return Restangular
        .one('zipcode')
        .get(params);
    }
  }
};

angular.module('store.api.client.foodio').factory('zipcodeApi', api);
api.$inject = ['Restangular'];