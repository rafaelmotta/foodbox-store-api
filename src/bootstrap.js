angular.module('foodbox.store.api', []);

angular.module('foodbox.store.api').constant('constants', {
  baseUrl: "http://speedy.com.br"
});

angular.module('foodbox.store.api').config((constants, RestangularProvider) => {
  RestangularProvider.setBaseUrl(constants.baseUrl);
});