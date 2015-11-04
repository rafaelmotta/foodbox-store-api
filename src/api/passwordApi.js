let api = (Restangular) => {
  return new class PasswordApi {

    create(data) {
      return Restangular
        .one('sessions')
        .post('password', { costumer: data });
    }

    update(data) {
      return Restangular
        .one('sessions')
        .one('password')
        .patch({ costumer: data });
    }
  }
};

angular.module('store.api.client.foodio').factory('passwordApi', api);
api.$inject = ['Restangular'];
