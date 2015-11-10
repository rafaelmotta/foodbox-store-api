let api = (Restangular, ApiBase, $q) => {
  return new class RatingApi extends ApiBase {
    fetch(order) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('orders', order.id)
        .one('ratings', order.rating.id)
        .get();
    }

    create(order) {
      return this._serializeBeforeCreate(order).then((rating) => {
        return Restangular
          .one('companies', this.company.id)
          .one('costumers', this.costumer.id)
          .one('orders', order.public_number)
          .post('ratings', { rating: rating });
      });
    }

    _serializeBeforeCreate(order) {
      return $q((resolve, reject) => {
        let rating = {
          delivery: order.delivery,
          score: order.score,
          quality: order.quality,
          good_comment: order.goodComment,
          bad_comment: order.bad_comment
        };

        return resolve(rating);
      });
    }
  }
};

angular.module('store.api.client.foodio').factory('ratingApi', api);
api.$inject = ['Restangular', 'ApiBase', '$q'];