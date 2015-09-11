let confirmationApi = (Restangular, ApiBase) => {
  return new class ConfirmationApi {
    fetch(confirmationToken) {
      return Restangular
        .one('costumers')
        .one('sessions')
        .one(`confirmation?confirmation_token=${confirmationToken}`)
        .get();
    }

    create(data) {
      return Restangular
        .one('costumers')
        .one('sessions')
        .one('confirmation')
        .post({ costumer: data });
    }
  }
};

angular.module('foodbox.store.api').factory('confirmationApi', confirmationApi);
