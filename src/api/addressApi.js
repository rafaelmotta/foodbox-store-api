let api = (Restangular, ApiBase) => {
  return new class AddressApi extends ApiBase {
    fetch(params) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('addresses')
        .get(params);
    }

    create(address) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .post('addresses', { address: address });
    }

    update(address) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('addresses', address.id)
        .patch({ address: address });
    }

    remove(address) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('addresses', address.id)
        .remove();
    }
  }
};

angular.module('store.api.client.foodio').factory('addressApi', api);
api.$inject = ['Restangular', 'ApiBase'];