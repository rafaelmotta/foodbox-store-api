let meApi = (Restangular, ApiBase) => {
  return new class MeApi extends ApiBase {
    fetch() {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('me')
        .get();
    }

    update(data) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('me')
        .patch({ costumer: data});
    }
  }
};

angular.module('foodbox.store.api').factory('meApi', meApi);