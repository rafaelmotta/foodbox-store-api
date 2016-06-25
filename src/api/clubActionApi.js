let api = (Restangular, ApiBase) => {
  return new class clubActionApi extends ApiBase {

    fetch() {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('club_actions')
        .get();
    }
  }
};

api.$inject = ['Restangular', 'ApiBase'];
angular.module('store.api.client.foodio').factory('clubActionApi', api);
