let api = ($q, Restangular, ApiBase) => {
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
      return this._serializeBeforeCreate(order).then((serializedOrder) => {
        return Restangular
          .one('companies', this.company.id)
          .one('costumers', this.costumer.id)
          .post('orders', { order: serializedOrder });
      });
    }

    _serializeBeforeCreate(order) {
      return $q((resolve) => {
        let data = {
          store_id: order.store.id,
          cart_id: order.cart.id,
          note: order.note || null,
          change: order.change || null,
          payment_method_id: order.payment_method.id,
          address_id: order.address? order.address.id : null,
          order_type_id: order.order_type.id
        };

        // Cupom de desconto
        if(order.coupon && order.coupon.code) {
          data.order_coupon_attributes = {
            code: order.coupon.code
          };
        }

        if (order.scheduling) {
          if (order.scheduling.day && order.scheduling.time) {
            data.scheduling_for = {
              wday: order.scheduling.day.wday,
              from: order.scheduling.day.date + ' ' + order.scheduling.time.opening,
              to: order.scheduling.day.date + ' ' + order.scheduling.time.closing
            };
          }
        }
        return resolve(data);
      });
    }
  }
};

angular.module('store.api.client.foodio').factory('orderApi', api);
api.$inject = ['$q', 'Restangular', 'ApiBase'];