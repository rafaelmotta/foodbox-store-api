'use strict';

angular.module('store.api.client.foodio', []);

angular.module('store.api.client.foodio').constant('constants', {
  baseUrl: "http://speedy.com.br"
});

angular.module('store.api.client.foodio').config(function (constants, RestangularProvider) {
  RestangularProvider.setBaseUrl(constants.baseUrl);
});
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var apiBase = function apiBase($rootScope) {
  return function ApiBase() {
    var _this = this;

    _classCallCheck(this, ApiBase);

    this.company = $rootScope.company;
    this.store = $rootScope.currentStore;

    $rootScope.$watch('currentStore', function (store) {
      if (store) _this.store = store;
    });

    $rootScope.$watch('company', function (company) {
      if (company) _this.company = company;
    });
  };
};

angular.module('store.api.client.foodio').factory('ApiBase', apiBase);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var confirmationApi = function confirmationApi(Restangular, ApiBase) {
  return new ((function () {
    function ConfirmationApi() {
      _classCallCheck(this, ConfirmationApi);
    }

    _createClass(ConfirmationApi, [{
      key: 'fetch',
      value: function fetch(data) {
        return Restangular.one('sessions').one('confirmation').get(data);
      }
    }, {
      key: 'create',
      value: function create(data) {
        return Restangular.one('sessions').post('confirmation', { costumer: data });
      }
    }]);

    return ConfirmationApi;
  })())();
};

angular.module('store.api.client.foodio').factory('confirmationApi', confirmationApi);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var loginApi = function loginApi(Restangular, $q, $interval, $window, popup, constants) {
  return new ((function () {
    function LoginApi() {
      _classCallCheck(this, LoginApi);
    }

    _createClass(LoginApi, [{
      key: 'loginWithEmail',
      value: function loginWithEmail(data) {
        return Restangular.one('sessions').post('sign_in', { costumer: data });
      }
    }, {
      key: 'loginWithFacebook',
      value: function loginWithFacebook() {
        return $q(function (resolve, reject) {
          return popup.open(constants.baseUrl + '/sessions/auth/facebook', 600, 600).then(function (popup) {
            var fetchInterval = $interval(function () {
              popup.postMessage('fetch', constants.baseUrl);
            }, 1000);

            $window.addEventListener('message', function (e) {
              $interval.cancel(fetchInterval);

              if (e.origin != constants.baseUrl) {
                return false;
              }

              popup.close();
              resolve(e.data, { provider: 'Facebook' });
            }, false);
          });
        });
      }
    }]);

    return LoginApi;
  })())();
};

angular.module('store.api.client.foodio').factory('loginApi', loginApi);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var meAddressApi = function meAddressApi(Restangular, ApiBase) {
  return new ((function (_ApiBase) {
    _inherits(MeAddressApi, _ApiBase);

    function MeAddressApi() {
      _classCallCheck(this, MeAddressApi);

      _get(Object.getPrototypeOf(MeAddressApi.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MeAddressApi, [{
      key: 'fetch',
      value: function fetch() {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').one('addresses').get();
      }
    }, {
      key: 'create',
      value: function create(address) {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').post('addresses', { address: address });
      }
    }, {
      key: 'update',
      value: function update(address) {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').one('addresses', address.id).patch({ address: address });
      }
    }, {
      key: 'remove',
      value: function remove(address) {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').one('addresses', address.id).remove();
      }
    }]);

    return MeAddressApi;
  })(ApiBase))();
};

angular.module('store.api.client.foodio').factory('meAddressApi', meAddressApi);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var meCartItemApi = function meCartItemApi(Restangular, ApiBase, $q) {
  return new ((function (_ApiBase) {
    _inherits(MeCartItemApi, _ApiBase);

    function MeCartItemApi() {
      _classCallCheck(this, MeCartItemApi);

      _get(Object.getPrototypeOf(MeCartItemApi.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MeCartItemApi, [{
      key: 'create',
      value: function create(cartItem) {
        var _this = this;

        var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return this._serialize(cartItem).then(function (serializedCartItem) {
          return Restangular.one('companies', _this.company.id).one('stores', _this.store.id).one('me').one('cart').post('cart_items?cart_id=' + params.cart_id, { cart_item: serializedCartItem });
        });
      }
    }, {
      key: 'update',
      value: function update(cartItem) {
        var _this2 = this;

        var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return this._serialize(cartItem).then(function (serializedCartItem) {
          return Restangular.one('companies', _this2.company.id).one('stores', _this2.store.id).one('me').one('cart').one('cart_items', cartItem.id).patch(angular.extend({ cart_item: serializedCartItem }, params));
        });
      }
    }, {
      key: 'destroy',
      value: function destroy(cartItem) {
        var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').one('cart').one('cart_items', cartItem.id).remove(params);
      }
    }, {
      key: '_serialize',
      value: function _serialize(cartItem) {
        return $q(function (resolve, reject) {
          var data = {};

          angular.forEach(cartItem, function (value, key) {
            if (key === 'id' || key === 'amount' || key === 'note') {
              data[key] = value;
            }
          });

          data.store_product_id = cartItem.product.id;
          data.customization_fields = JSON.stringify(cartItem.customization_fields);

          data.cart_item_addons_to_put_attributes = cartItem.addons.map(function (addon) {
            return {
              store_addon_id: addon.id,
              product_addon_id: addon.product_addon_id
            };
          });

          resolve(data);
        });
      }
    }]);

    return MeCartItemApi;
  })(ApiBase))();
};

angular.module('store.api.client.foodio').factory('meCartItemApi', meCartItemApi);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var meCartApi = function meCartApi(Restangular, ApiBase) {
  return new ((function (_ApiBase) {
    _inherits(MeCartApi, _ApiBase);

    function MeCartApi() {
      _classCallCheck(this, MeCartApi);

      _get(Object.getPrototypeOf(MeCartApi.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MeCartApi, [{
      key: 'fetch',
      value: function fetch() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').one('cart').get(params);
      }
    }, {
      key: 'create',
      value: function create() {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').one('cart').one('new').get();
      }
    }]);

    return MeCartApi;
  })(ApiBase))();
};

angular.module('store.api.client.foodio').factory('meCartApi', meCartApi);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var meOrderApi = function meOrderApi(Restangular, ApiBase) {
  return new ((function (_ApiBase) {
    _inherits(MeOrderApi, _ApiBase);

    function MeOrderApi() {
      _classCallCheck(this, MeOrderApi);

      _get(Object.getPrototypeOf(MeOrderApi.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MeOrderApi, [{
      key: 'fetch',
      value: function fetch() {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').one('orders').get();
      }
    }, {
      key: 'show',
      value: function show(order) {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').one('orders', order.public_number).get();
      }
    }, {
      key: 'create',
      value: function create(order) {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').one('orders').post('orders', { order: order });
      }
    }]);

    return MeOrderApi;
  })(ApiBase))();
};

angular.module('store.api.client.foodio').factory('meOrderApi', meOrderApi);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var meApi = function meApi(Restangular, ApiBase) {
  return new ((function (_ApiBase) {
    _inherits(MeApi, _ApiBase);

    function MeApi() {
      _classCallCheck(this, MeApi);

      _get(Object.getPrototypeOf(MeApi.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MeApi, [{
      key: 'fetch',
      value: function fetch() {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').get();
      }
    }, {
      key: 'update',
      value: function update(data) {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').patch({ costumer: data });
      }
    }]);

    return MeApi;
  })(ApiBase))();
};

angular.module('store.api.client.foodio').factory('meApi', meApi);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var menuApi = function menuApi(Restangular, ApiBase) {
  return new ((function (_ApiBase) {
    _inherits(MenuApi, _ApiBase);

    function MenuApi() {
      _classCallCheck(this, MenuApi);

      _get(Object.getPrototypeOf(MenuApi.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MenuApi, [{
      key: 'fetch',
      value: function fetch() {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('menu').get();
      }
    }]);

    return MenuApi;
  })(ApiBase))();
};

angular.module('store.api.client.foodio').factory('menuApi', menuApi);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var orderApi = function orderApi(Restangular, ApiBase) {
  return new ((function (_ApiBase) {
    _inherits(OrderApi, _ApiBase);

    function OrderApi() {
      _classCallCheck(this, OrderApi);

      _get(Object.getPrototypeOf(OrderApi.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(OrderApi, [{
      key: 'fetch',
      value: function fetch() {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').one('orders').get();
      }
    }, {
      key: 'show',
      value: function show(order) {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').one('orders', order.public_number).get();
      }
    }, {
      key: 'create',
      value: function create(order) {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('me').post('orders', { order: order });
      }
    }]);

    return OrderApi;
  })(ApiBase))();
};

angular.module('store.api.client.foodio').factory('orderApi', orderApi);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var passwordApi = function passwordApi(Restangular) {
  return new ((function () {
    function PasswordApi() {
      _classCallCheck(this, PasswordApi);
    }

    _createClass(PasswordApi, [{
      key: 'create',
      value: function create(data) {
        return Restangular.one('sessions').post('password', { costumer: data });
      }
    }, {
      key: 'update',
      value: function update(data) {
        return Restangular.one('sessions').one('confirmation').patch({ costumer: data });
      }
    }]);

    return PasswordApi;
  })())();
};

angular.module('store.api.client.foodio').factory('passwordApi', passwordApi);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var registrationApi = function registrationApi(Restangular, ApiBase) {
  return new ((function (_ApiBase) {
    _inherits(RegistrationApi, _ApiBase);

    function RegistrationApi() {
      _classCallCheck(this, RegistrationApi);

      _get(Object.getPrototypeOf(RegistrationApi.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(RegistrationApi, [{
      key: 'create',
      value: function create(data) {
        return Restangular.service('sessions').post({ costumer: angular.extend(data, { company_id: this.company.id }) });
      }
    }, {
      key: 'update',
      value: function update(data) {
        return Restangular.service('sessions').patch({ costumer: data });
      }
    }]);

    return RegistrationApi;
  })(ApiBase))();
};

angular.module('store.api.client.foodio').factory('registrationApi', registrationApi);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var storeProductApi = function storeProductApi(Restangular, ApiBase) {
  return new ((function (_ApiBase) {
    _inherits(storeProductApi, _ApiBase);

    function storeProductApi() {
      _classCallCheck(this, storeProductApi);

      _get(Object.getPrototypeOf(storeProductApi.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(storeProductApi, [{
      key: 'show',
      value: function show(storeProduct) {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).one('store_products', storeProduct.id).get();
      }
    }]);

    return storeProductApi;
  })(ApiBase))();
};

angular.module('store.api.client.foodio').factory('storeProductApi', storeProductApi);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var storeApi = function storeApi(Restangular, ApiBase) {
  return new ((function (_ApiBase) {
    _inherits(StoreApi, _ApiBase);

    function StoreApi() {
      _classCallCheck(this, StoreApi);

      _get(Object.getPrototypeOf(StoreApi.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(StoreApi, [{
      key: 'fetch',
      value: function fetch() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return Restangular.one('companies', this.company.id).one('stores').get(params);
      }
    }, {
      key: 'show',
      value: function show(params) {
        return Restangular.one('companies', this.company.id).one('stores', this.store.id).get(params);
      }
    }]);

    return StoreApi;
  })(ApiBase))();
};

angular.module('store.api.client.foodio').factory('storeApi', storeApi);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var zipcodeApi = function zipcodeApi(Restangular) {
  return new ((function () {
    function ZipcodeApi() {
      _classCallCheck(this, ZipcodeApi);
    }

    _createClass(ZipcodeApi, [{
      key: 'fetch',
      value: function fetch(params) {
        return Restangular.one('zipcode').get(params);
      }
    }]);

    return ZipcodeApi;
  })())();
};

angular.module('store.api.client.foodio').factory('zipcodeApi', zipcodeApi);