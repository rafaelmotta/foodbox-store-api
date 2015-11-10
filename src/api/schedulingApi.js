let api = (Restangular, ApiBase) => {
  return new class SchedulingApi extends ApiBase {
    fetch() {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('scheduling')
        .get();
    }
  }
};

angular.module('store.api.client.foodio').factory('schedulingApi', api);
api.$inject = ['Restangular', 'ApiBase'];