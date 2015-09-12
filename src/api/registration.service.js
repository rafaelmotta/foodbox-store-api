let registrationApi = (Restangular, ApiBase) => {
  return new class RegistrationApi extends ApiBase {

    create(data) {
      return Restangular
        .one('costumers')
        .post('sessions', { costumer: angular.extend(data, { company_id: $rootScope.company.id })});
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
