let meCartItemApi = (Restangular, ApiBase, $q) => {
  return new class MeCartItemApi extends ApiBase {

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

    create(params = {}, cartItem) {
      return this._serialize(cartItem).then((serializedCartItem) => {
        return Restangular
          .one('companies', this.company.id)
          .one('stores', this.store.id)
          .one('me')
          .one('cart')
          .post(`cart_items?cart_id=${params.cart_id}`, { cart_item: serializedCartItem });
      });
    }

    update(params = {}, cartItem) {
      return this._serialize(cartItem).then( (serializedCartItem) => {
        return Restangular
          .one('companies', this.company.id)
          .one('stores', this.store.id)
          .one('me')
          .one('cart')
          .one('cart_items', cartItem.id)
          .patch({ car_item: serializedCartItem });
      });
    }

    destroy(params = {}, cartItem) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('me')
        .one('cart')
        .one('cart_items', cartItem.id)
        .remove();
    }
  }
};

angular.module('foodbox.store.api').factory('meCartItemApi', MeCartItemApi);