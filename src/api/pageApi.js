let service = (Restangular, ApiBase) => {

  return new class PageApi extends ApiBase {

    show(page) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('pages', page.type)
        .get();
    }
  }
};

service.$inject = ['Restangular', 'ApiBase'];
angular.module('store.api.client.foodio').factory('pageApi', service);