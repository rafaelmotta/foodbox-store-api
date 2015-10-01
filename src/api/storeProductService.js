let storeProductApi = (Restangular, ApiBase) => {
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

angular.module('foodbox.store.api').factory('storeProductApi', storeProductApi);
