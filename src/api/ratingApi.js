let api = (Restangular, ApiBase, $q) => {
  return new class CostumerApi extends ApiBase {
    fetch(order) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('orders', order.id)
        .one('ratings', order.rating.id)
        .get();
    }

    create(rating) {
      return this._serializeBeforeCreate(rating).then((serializedRating) => {
        return Restangular
          .one('companies', this.company.id)
          .one('costumers', this.costumer.id)
          .one('orders', rating.order.publicNumber)
          .post('ratings', { rating: serializedRating });
      });
    }

    _serializeBeforeCreate(data) {
      return $q((resolve, reject) => {
        let rating = {
          delivery: data.delivery,
          score: data.score,
          quality: data.quality,
          good_comment: data.goodComment,
          bad_comment: data.bad_comment
        };

        return resolve(rating);
      });
    }
  }
};

angular.module('store.api.client.foodio').factory('ratingApi', api);
api.$inject = ['Restangular', 'ApiBase', '$q'];