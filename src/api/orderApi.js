let api = (Restangular, ApiBase) => {
  return new class OrderApi extends ApiBase {

    fetch(params) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('orders')
        .get(params);
    }

    show(order) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('orders', order.public_number)
        .get();
    }

    create(order) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .post('orders', { order: order });
    }
  }
};

angular.module('store.api.client.foodio').factory('orderApi', api);
api.$inject = ['Restangular', 'ApiBase'];