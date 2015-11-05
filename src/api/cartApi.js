let api = (Restangular, ApiBase) => {
  return new class CartApi extends ApiBase {

    fetch(params = {}) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('costumer', this.costumer.id)
        .one('cart')
        .get(params);
    }

    create() {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('costumer', this.costumer.id)
        .one('cart')
        .one('new')
        .get();
    }
  }
};

angular.module('store.api.client.foodio').factory('cartApi', api);
api.$inject = ['Restangular', 'ApiBase'];