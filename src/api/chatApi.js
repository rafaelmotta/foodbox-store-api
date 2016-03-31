let api = (Restangular, ApiBase) => {
  return new class ChatApi extends ApiBase {

    show(chat, params) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('chats', chat.id)
        .get(params);
      }
  }
};

api.$inject = ['Restangular', 'ApiBase'];
angular.module('store.api.client.foodio').factory('chatApi', api);