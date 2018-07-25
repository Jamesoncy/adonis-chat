'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currency = currency;
exports.player = player;
exports.profile = profile;
exports.admin = admin;

var _lodash = require('lodash');

function currency($q, $interval, $rootScope) {
  var x = 0;
  return $q(function (resolve, reject) {
    try {
      $interval.cancel(x);
      x = $interval(function () {
        if (!(0, _lodash.isEmpty)($rootScope.currency) && !(0, _lodash.isEmpty)($rootScope.settings)) {
          $interval.cancel(x);
          return resolve($rootScope.currency);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

function player(currency, $stateParams, $q, ActionHero) {
  return $q(function (resolve, reject) {
    var username = $stateParams.username;
    if ((0, _lodash.isEmpty)(username)) {
      return reject(new Error('No username found.'));
    }
    return ActionHero.fetch('user:view', {
      id: username, userClass: 'player'
    }).then(function (data) {
      return resolve(data);
    }).catch(reject);
  });
}

function profile(currency, $q, ActionHero, $state) {
  return $q(function (resolve, reject) {
    return ActionHero.auth().then(function (data) {
      if ((0, _lodash.isUndefined)(data)) {
        return $state.go('app.home');
      }
      var resp = data.resp;

      if (resp.message && resp.message.toLowerCase() === 'success') {
        return resolve(resp);
      }
      return reject(new Error('Not authorized.'));
    }).catch(reject);
  });
}

function admin(profile, $q, $state) {
  return $q(function (resolve) {
    var isAdmin = (0, _lodash.get)(profile, 'data.info.isAdmin');
    if (isAdmin === true) {
      return resolve(true);
    }
    return resolve(false);
  });
}