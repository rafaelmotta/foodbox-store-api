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
      this._serializeBeforeCreate(order, (serializedOrder) => {
        return Restangular
          .one('companies', this.company.id)
          .one('costumers', this.costumer.id)
          .post('orders', { order: order });
      });
    }

    _serializeBeforeCreate(order) {
      return $q((resolve) => {
        let data = {
          store_id: store.id,
          cart_id: order.cart.id,
          note: order.note || null,
          change: order.change || null,
          payment_method_id: order.payment_method.id,
          address_id: order.address.id,
          order_type_id: order.order_type.id
        };

        if (order.scheduling.day && order.scheduling.time) {
          data.scheduling_for = {
            wday: order.scheduling.day.wday,
            from: order.scheduling.day.date + ' ' + order.scheduling.time.opening,
            to: order.scheduling.day.date + ' ' + order.scheduling.time.closing
          };
        }

        return resolve(data);
      });
    }
  }
};

angular.module('store.api.client.foodio').factory('orderApi', api);
api.$inject = ['Restangular', 'ApiBase'];