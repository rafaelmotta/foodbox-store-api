let sessionApi = (Restangular, $q, $interval, $window, popup) => {
  return new class SessionApi {
    loginWithEmail(data) {
      Restangular
        .service('costumers/sessions/sign_in')
        .post({ costumer: data });
    }

    loginWithFacebook() {
      $q((resolve, reject) => {
        popup.open("http://speedy.com.br/costumers/sessions/auth/facebook", 600, 600).then((popup) => {
          let fetchInterval = $interval(() => {
            popup.postMessage('fetch', constants.baseUrl);
          }, 1000);

          $window.addEventListener('message', (e) => {
            $interval.cancel(fetchInterval);

            if(e.origin != constants.baseUrl) {
              return false;
            }

            popup.close();
            resolve(e.data, { provider: 'Facebook' });
          }, false);
        });
      });
    }
  }
};

angular.module('foodbox.store.api').factory('sessionApi', sessionApi);
