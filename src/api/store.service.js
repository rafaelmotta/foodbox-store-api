let storeApi = (Restangular, ApiBase) => {
  return new class StoreApi extends ApiBase {
    fetch(params) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .get(params);
    }
  }
};

angular.module('foodbox.store.api').factory('storeApi', storeApi);
