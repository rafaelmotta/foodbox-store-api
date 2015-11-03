let api = (Restangular, ApiBase) => {
  return new class storeProductApi extends ApiBase {

    show(storeProduct) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('store_products', storeProduct.id)
        .get();
    }
  }
};

angular.module('store.api.client.foodio').factory('storeProductApi', api);
api.$inject = ['Restangular', 'ApiBase'];