let api = (Restangular, ApiBase) => {
  return new class ConfirmationApi {
    fetch(data) {
      return Restangular
        .one('sessions')
        .one('confirmation')
        .get(data);
    }

    create(data) {
      return Restangular
        .one('sessions')
        .post('confirmation', { costumer: data });
    }
  }
};

angular.module('store.api.client.foodio').factory('confirmationApi', api);
api.$inject = ['Restangular', 'ApiBase'];
