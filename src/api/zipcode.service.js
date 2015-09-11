let zipcodeApi = (Restangular) => {
  return new class ZipcodeApi {
    fetch(params) {
      return Restangular
        .one('zipcode')
        .get(params);
    }
  }
};

angular.module('foodbox.store.api').factory('zipcodeApi', ZipcodeApi);