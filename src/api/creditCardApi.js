let api = (Restangular, ApiBase) => {
  return new class CreditCardApi extends ApiBase {
    fetch(params) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('credit_cards')
        .get(params);
    }

    create(card) {
      if(card.number && card.number.length > 12) {
        card.last_four_digits = card.number.slice(-4);
      }

      card.number = null;
      card.expiry = null;
      card.cvc = null;

      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .post('credit_cards', { credit_card: card });
    }

    update(card) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('credit_cards', card.id)
        .patch({ credit_card: card });
    }

    remove(card) {
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
