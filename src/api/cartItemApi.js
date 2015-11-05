let api = (Restangular, ApiBase, $q) => {
  return new class CartItemApi extends ApiBase {

    create(cartItem, params = {}) {
      return this._serialize(cartItem).then((serializedCartItem) => {
        return Restangular
          .one('companies', this.company.id)
          .one('stores', this.store.id)
          .one('carts')
          .post(`cart_items?cart_id=${params.cart_id}`, { cart_item: serializedCartItem });
      });
    }


    update(cartItem, params = {}) {
      return this._serialize(cartItem).then( (serializedCartItem) => {
        return Restangular
          .one('companies', this.company.id)
          .one('stores', this.store.id)
          .one('carts')
          .one('cart_items', cartItem.id)
          .patch(angular.extend({ cart_item: serializedCartItem }, params));
      });
    }

    destroy(cartItem, params = {}) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('carts')
        .one('cart_items', cartItem.id)
        .remove(params);
    }

    _serialize(cartItem) {
      return $q((resolve, reject) => {
        let data = {};

        angular.forEach(cartItem, (value, key) => {
          if(key === 'id' || key === 'amount' || key === 'note') {
            data[key] = value;
          }
        });

        data.store_product_id = cartItem.product.id;
        data.customization_fields = JSON.stringify(cartItem.customization_fields);

        data.cart_item_addons_to_put_attributes = cartItem.addons.map((addon) => {
          return {
            store_addon_id: addon.id,
            product_addon_id: addon.product_addon_id
          };
        });

        resolve(data);
      });
    }
  }
};

angular.module('store.api.client.foodio').factory('cartItemApi', api);
api.$inject = ['Restangular', 'ApiBase', '$q'];