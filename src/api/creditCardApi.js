let api = (Restangular, ApiBase) => {
  return new class CreditCardApi extends ApiBase {
    fetch(params) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('credit_cards')
        .get(params);
    }

    create(credit_card) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .post('credit_cards', { credit_card: credit_card });
    }

    update(credit_card) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('credit_cards', card.id)
        .patch({ credit_card: credit_card });
    }

    remove(credit_card) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('credit_cards', card.id)
        .remove();
    }
  }
};

angular.module('store.api.client.foodio').factory('creditCardApi', api);
api.$inject = ['Restangular', 'ApiBase'];
