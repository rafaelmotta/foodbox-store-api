let api = (Restangular, ApiBase) => {
  return new class contactApi extends ApiBase {

    create(contact) {
      return Restangular
        .one('companies', this.company.id)
        .post('contact', { contact: contact });
    }
  }
};

api.$inject = ['Restangular', 'ApiBase'];
angular.module('store.api.client.foodio').factory('contactApi', api);
