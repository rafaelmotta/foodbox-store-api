let confirmationApi = (Restangular, ApiBase) => {
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

angular.module('foodbox.store.api').factory('confirmationApi', confirmationApi);
