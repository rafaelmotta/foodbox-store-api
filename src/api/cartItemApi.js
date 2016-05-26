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
      return new Promise((resolve, reject) => {
        let toPut = [];

        for(let i in cartItem.cart_item_addons) {
          let a = cartItem.cart_item_addons[i];

          if(a.id && a.price) {
            toPut.push({ product_addon_id: a.id });
          } else {
            for(let j in a) {
              let addon = a[j];
              if(addon.selected) {
                toPut.push({ product_addon_id: addon.id });
              }
            }
          }
        }

        let data = {
          amount: cartItem.amount,
          note: cartItem.note,
          product_id: cartItem.product.id,
          cart_item_addons_to_put_attributes: toPut
        };

        resolve(data);
      });
    }
  }
};

angular.module('store.api.client.foodio').factory('cartItemApi', api);
api.$inject = ['Restangular', 'ApiBase', '$q'];
