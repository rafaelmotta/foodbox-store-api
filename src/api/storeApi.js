let api = (Restangular, ApiBase) => {
  return new class StoreApi extends ApiBase {

    fetch(params = {}) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores')
        .get(params);
    }

    show(params) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .get(params);
    }
  }
};

angular.module('store.api.client.foodio').factory('storeApi', api);
api.$inject = ['Restangular', 'ApiBase'];
