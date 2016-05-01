let api = (Restangular, ApiBase) => {
  return new class CouponApi extends ApiBase {

    fetch(params = {}) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('coupons')
        .get(params);
    }
  }
};

angular.module('store.api.client.foodio').factory('couponApi', api);
api.$inject = ['Restangular', 'ApiBase'];