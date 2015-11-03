let api = (Restangular) => {
  return new class CompanyApi {
    fetchBySubdomain(company) {
      return Restangular
        .one('companies', company.subdomain)
        .get();
    }
  }
};

angular.module('store.api.client.foodio').factory('companyApi', api);
api.$inject = ['Restangular'];
