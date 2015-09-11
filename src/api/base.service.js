let apiBase = ($rootScope) => {
  return class ApiBase {
    constructor(){
      this.company = $rootScope.company;
      this.store = $rootScope.currentStore;
    }
  };
};

angular.module('foodbox.store.api').factory('ApiBase', apiBase);