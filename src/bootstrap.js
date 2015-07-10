'use strict';

module.exports = function(app) {
	//Config
	app.config(require('./config.js'));
	//Filter
	app.filter('range', require('./modules/search/range-filter'));
	//Directives
	app.directive('activeStar', require('./modules/search/astar-directive'));
	app.directive('inactiveStar', require('./modules/search/istar-directive'));
	// Controller 
    app.controller('mainCtrl', require('./modules/main/main-controller'));
};