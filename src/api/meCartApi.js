let api = (Restangular, ApiBase) => {
  return new class MeCartApi extends ApiBase {

    fetch(params = {}) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('me')
        .one('cart')
        .get(params);
    }

    create() {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('me')
        .one('cart')
        .one('new')
        .get();
    }
  }
};

angular.module('store.api.client.foodio').factory('meCartApi', api);
api.$inject = ['Restangular', 'ApiBase'];