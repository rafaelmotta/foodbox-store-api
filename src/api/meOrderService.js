let meOrderApi = (Restangular, ApiBase) => {
  return new class MeOrderApi extends ApiBase {

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
        .one('orders')
        .post('orders', { order: order });
    }
  }
};

angular.module('foodbox.store.api').factory('meOrderApi', meOrderApi);