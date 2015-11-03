angular.module('store.api.client.foodio', ['constants.foodio']);

let bootstrap = (constants, RestangularProvider) => {
  RestangularProvider.setBaseUrl(constants.api);
};

angular.module('store.api.client.foodio').config(bootstrap);
bootstrap.$inject = ['constants', 'RestangularProvider'];