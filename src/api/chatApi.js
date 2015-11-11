let api = (Restangular, ApiBase) => {
  return new class ChatApi extends ApiBase {

    show(resource) {
      return Restangular
        .one('companies', this.company.id)
        .one('costumers', this.costumer.id)
        .one(resource.name, resource.id)
        .one('chat')
        .get();
      }
  }
};

api.$inject = ['Restangular', 'ApiBase'];
angular.module('admin.api.client.foodio').factory('chatApi', api);