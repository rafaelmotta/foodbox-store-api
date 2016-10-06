let service = (Restangular, ApiBase) => {
  return new class PagseguroApi extends ApiBase {
    createSession() {
      return Restangular
        .one('pagseguro')
        .get();
    }

    pay(cart) {
      return Restangular
        .one('pagseguro')
        .post('addresses', { address: address });
    }
  }
};

service.$inject = ['Restangular', 'ApiBase'];
angular.module('store.api.client.foodio').factory('pagseguroApi', service);
