let meAddressApi = (Restangular, ApiBase) => {
  return new class MeAddressApi extends ApiBase {
    fetch() {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('me')
        .one('addresses')
        .get();
    }

    create(address) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('me')
        .post('addresses', { address: address });
    }

    update(address) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('me')
        .one('addresses')
        .patch({ address: address });
    }

    remove(address) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('me')
        .one('addresses', address.id)
        .remove();
    }
  }
};

angular.module('foodbox.store.api').factory('meAddressApi', meAddressApi);