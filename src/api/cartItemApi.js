let api = (Restangular, ApiBase, $q) => {
  return new class CartItemApi extends ApiBase {

    create(cart, cartItem) {
      return this._serialize(cartItem).then((serializedCartItem) => {
        return Restangular
          .one('companies', this.company.id)
          .one('stores', this.store.id)
          .one('carts')
          .post(`cart_items?token=${cart.token}`, { cart_item: serializedCartItem });
      });
    }


    update(cart, cartItem) {
      return this._serialize(cartItem).then( (serializedCartItem) => {
        let params = { token: cart.token };

        return Restangular
          .one('companies', this.company.id)
          .one('stores', this.store.id)
          .one('carts')
          .one('cart_items', cartItem.id)
          .patch(angular.extend({ cart_item: serializedCartItem }, params));
      });
    }

    destroy(cart, cartItem) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('carts')
        .one('cart_items', cartItem.id)
        .remove({ token: cart.token });
    }

    clubable(cart, cartItem) {
      return Restangular
        .one('companies', this.company.id)
        .one('stores', this.store.id)
        .one('carts')
        .one('cart_items', cartItem.id)
        .post(`clubable?token=${cart.token}`);
    }

    _serialize(cartItem) {
      return new Promise((resolve, reject) => {
        let toPut = [];

        for(let i in cartItem.cart_item_addons) {
          let a = cartItem.cart_item_addons[i];

          if(a.id && a.price !== null) {
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
          bonificable: cartItem.bonificable,
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
