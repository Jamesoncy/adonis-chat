'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports.pager = pager;
exports.getAmount = getAmount;
exports.toFixed = toFixed;

var _lodash = require('lodash');

function debounce(func, wait, immediate) {
  var timeout = void 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
} /* eslint-disable no-param-reassign */
function pager(totalItems, currentPage, pageSize) {
  // default to first page
  currentPage = currentPage || 1;

  // default page size is 10
  pageSize = pageSize || 10;

  // calculate total pages
  var totalPages = Math.ceil(totalItems / pageSize);

  var startPage = void 0;
  var endPage = void 0;

  if (totalPages <= 10) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // more than 10 total pages so calculate start and end pages
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  // calculate start and end item indexes
  var startIndex = (currentPage - 1) * pageSize;
  var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  var pages = (0, _lodash.range)(startPage, endPage + 1);

  // return object with all pager properties required by the view
  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages
  };
}

function getAmount() {
  var col = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var currency = arguments[1];

  var x = void 0;
  return (x = (0, _lodash.find)(col, { currency: currency })) ? x.amount : 0;
}

function toFixed(x) {
  return parseFloat((Math.floor(100 * x) / 100).toFixed(2));
}