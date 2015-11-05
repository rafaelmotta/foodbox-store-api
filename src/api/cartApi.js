let api = (Restangular, ApiBase) => {
  return new class CartApi extends ApiBase {

    fetch(params = {}) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('carts')
        .get(params);
    }

    create() {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('carts')
        .one('new')
        .get();
    }
  }
};

angular.module('store.api.client.foodio').factory('cartApi', api);
api.$inject = ['Restangular', 'ApiBase'];