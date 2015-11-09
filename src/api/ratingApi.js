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
      this._beforeCreate(rating, (ratingSerialized) => {
        return Restangular
          .one('companies', this.company.id)
          .one('costumers', this.costumer.id)
          .one('orders', rating.order.id)
          .post('ratings', { rating: ratingSerialized });
      });
    }

    _beforeCreate(data) {
      return $q((resolve, reject) => {
        resolve({
          delivery: data.delivery,
          score: data.score,
          quality: data.quality,
          good_comment: data.goodComment,
          bad_comment: data.bad_comment
        });
      });
    }
  }
};

angular.module('store.api.client.foodio').factory('ratingApi', api);
api.$inject = ['Restangular', 'ApiBase', '$q'];