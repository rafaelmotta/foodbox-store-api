let loginApi = (Restangular, $q, $interval, $window, popup, constants) => {
  return new class LoginApi {
    loginWithEmail(data) {
      return Restangular
        .one('sessions')
        .post('sign_in', { costumer: data });
    }

    loginWithFacebook() {
      return $q((resolve, reject) => {
        return popup.open("http://speedy.com.br/sessions/auth/facebook", 600, 600).then((popup) => {
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

angular.module('foodbox.store.api').factory('loginApi', loginApi);
