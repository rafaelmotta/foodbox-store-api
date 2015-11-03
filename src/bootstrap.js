angular.module('store.api.client.foodio', ['constants.foodio']);

angular.module('store.api.client.foodio').config((constants, RestangularProvider) => {
  RestangularProvider.setBaseUrl(constants.api);
});