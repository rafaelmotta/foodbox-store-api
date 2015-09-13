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

    show(params = {}) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('me')
        .one('orders')
        .get(params);
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