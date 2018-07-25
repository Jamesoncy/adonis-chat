'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.empty = empty;
exports.split = split;
exports.amount = amount;

var _lodash = require('lodash');

var _helpers = require('./services/helpers.lib');

function empty() {
  return function (input) {
    return (0, _lodash.isEmpty)(input);
  };
}

function split() {
  return function (input) {
    var splitChar = arguments.length <= 1 || arguments[1] === undefined ? ',' : arguments[1];
    var splitIndex = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    return input.split(splitChar)[splitIndex];
  };
}

function amount($filter) {
  'ngInject';

  return function (fieldAmount, currency) {
    if (!(0, _lodash.isEmpty)('' + fieldAmount)) {
      var _amount = fieldAmount;
      if ((0, _lodash.isArray)(fieldAmount) && currency) {
        _amount = (0, _helpers.getAmount)(fieldAmount, currency);
      }
      return $filter('number')(_amount, 2) + ' ' + (currency || '');
    }
    return '';
  };
}