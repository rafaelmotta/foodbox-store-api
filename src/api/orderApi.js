let api = (Restangular, ApiBase) => {
  return new class OrderApi extends ApiBase {
    fetch() {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('me')
        .one('orders')
        .get();
    }

    show(order) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('me')
        .one('orders', order.public_number)
        .get();
    }

    create(order) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('me')
        .post('orders', { order: order });
    }
  }
};

angular.module('store.api.client.foodio').factory('orderApi', api);
api.$inject = ['Restangular', 'ApiBase'];