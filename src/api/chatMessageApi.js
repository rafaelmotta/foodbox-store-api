let api = (Restangular, ApiBase) => {
  return new class chatMessageApi extends ApiBase {

    create(chat, chatMessage) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one('chats', chat.id)
        .post('chat_messages', { chat_message: chatMessage });
    }
  }
};

api.$inject = ['Restangular', 'ApiBase'];
angular.module('store.api.client.foodio').factory('chatMessageApi', api);