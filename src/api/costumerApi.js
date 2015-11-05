let api = (Restangular, ApiBase) => {
  return new class CostumerApi extends ApiBase {
    fetch() {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('costumer', this.costumer.id)
        .get();
    }

    update(data) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('costumer', this.costumer.id)
        .patch({ costumer: data});
    }
  }
};

angular.module('store.api.client.foodio').factory('costumerApi', api);
api.$inject = ['Restangular', 'ApiBase'];