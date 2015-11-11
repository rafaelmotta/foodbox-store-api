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
          delivery: order.rating.delivery,
          score: order.rating.score,
          quality: order.rating.quality,
          good_comment: order.rating.goodComment,
          bad_comment: order.rating.badComment
        };

        return resolve(rating);
      });
    }
  }
};

angular.module('store.api.client.foodio').factory('ratingApi', api);
api.$inject = ['Restangular', 'ApiBase', '$q'];