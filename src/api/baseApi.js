let api = ($rootScope) => {
  return class ApiBase {
    constructor(){
      this.company = $rootScope.company;
      this.store = $rootScope.currentStore;

      $rootScope.$watch('currentStore', (store) => {
        if(store) this.store = store;
      });

      $rootScope.$watch('company', (company) => {
        if(company) this.company = company;
      });
    }
  };
};

angular.module('store.api.client.foodio').factory('ApiBase', api);
api.$inject = ['$rootScope'];