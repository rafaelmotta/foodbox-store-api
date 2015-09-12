let registrationApi = (Restangular, ApiBase) => {
  return new class RegistrationApi extends ApiBase {

    create(data) {
      return Restangular
        .service('sessions')
        .post({ costumer: angular.extend(data, { company_id: this.company.id }) });
    }

    update(data) {
      return Restangular
        .service('sessions')
        .patch({ costumer: data });
    }
  }
};

angular.module('foodbox.store.api').factory('registrationApi', registrationApi);
