require('angular');
require('ng-dialog'); //ngDialog for modal window
require('angular-route'); //ngRoute for ng-view
require('angular-datepicker'); //720kb.datepicker for datepicker
require('angular-local-storage'); //LocalStorageModule for order data

var app = angular.module('shopApp', ['ngRoute','LocalStorageModule','720kb.datepicker','ngDialog']);
require('./bootstrap.js')(app);