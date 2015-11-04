let api = (Restangular, $q, $interval, $window, popup, constants) => {
  return new class LoginApi {
    loginWithEmail(data) {
      return Restangular
        .one('sessions')
        .post('sign_in', { costumer: data });
    }

    loginWithFacebook() {
      return $q((resolve, reject) => {
        return popup.open(`${constants.api}/sessions/auth/facebook`, 600, 600).then((popup) => {
          let fetchInterval = $interval(() => {
            popup.postMessage('fetch', constants.api);
          }, 1000);

          $window.addEventListener('message', (e) => {
            $interval.cancel(fetchInterval);

            if(e.origin != constants.api) {
              return false;
            }

            popup.close();
            resolve({ data: e.data }, { provider: 'Facebook' });
          }, false);
        });
      });
    }
  }
};

angular.module('store.api.client.foodio').factory('loginApi', api);
api.$inject = ['Restangular', '$q', '$interval', '$window', 'popup', 'constants'];
