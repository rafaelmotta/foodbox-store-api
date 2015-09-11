let menuApi = (Restangular, ApiBase) => {
  return new class MenuApi extends ApiBase {
    fetch() {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('menu')
        .get();
    }
  }
};

angular.module('foodbox.store.api').factory('menuApi', MenuApi);