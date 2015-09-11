let passwordApi = (Restangular) => {
  return new class PasswordApi {

    create(data) {
      return Restangular
        .one('costumers')
        .one('sessions')
        .one('password')
        .post({ costumer: data });
    }

    update(data) {
      return Restangular
        .one('costumers')
        .one('sessions')
        .one('confirmation')
        .patch({ costumer: data });
    }
  }
};

angular.module('foodbox.store.api').factory('passwordApi', PasswordApi);