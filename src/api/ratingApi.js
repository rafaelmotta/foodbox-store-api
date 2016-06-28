let api = (Restangular, ApiBase, $q) => {
  return new class RatingApi extends ApiBase {

    update(order) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('orders', order.public_number)
        .one('ratings', order.rating.id)
        .patch({ rating: order.rating });
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
          correct: order.rating.correct,
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
