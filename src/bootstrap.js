angular.module('foodbox.store.api', []);

angular.module('foodbox.store.api').config((RestangularProvider) => {
  RestangularProvider.setBaseUrl('http://speedy.com.br');
});

