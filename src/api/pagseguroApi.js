let service = (Restangular, ApiBase) => {
  return new class PagseguroApi extends ApiBase {
    fetch() {
      return Restangular
        .one('pagseguro')
        .get();
    }
  }
};

service.$inject = ['Restangular', 'ApiBase'];
angular.module('store.api.client.foodio').factory('pagseguroApi', service);
