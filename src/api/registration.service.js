let registrationApi = (Restangular) => {
  return new class RegistrationApi {

    create(data) {
      return Restangular
        .one('costumers')
        .post('sessions', { costumer: data });
    }

    update(data) {
      return Restangular
        .one('costumers')
        .one('sessions')
        .patch({ costumer: data });
    }
  }
};

angular.module('foodbox.store.api').factory('registrationApi', registrationApi);
