let api = (Restangular, ApiBase) => {
  return new class StoreApi extends ApiBase {
    show(data) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('messages', data.page)
    }
  }
};

angular.module('store.api.client.foodio').factory('messageApi', api);
api.$inject = ['Restangular', 'ApiBase'];
