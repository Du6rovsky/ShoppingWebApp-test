var config = function($routeProvider, $locationProvider, $httpProvider){
  $routeProvider
    .when('/', {
      templateUrl:'/build/modules/login/login.html',
      controller:'mainCtrl'
    })
    .when('/signup', {
      templateUrl:'/build/modules/signup/signup.html',
      controller:'mainCtrl'
    })
    .when('/search', {
      templateUrl:'/build/modules/search/search.html',
      controller:'mainCtrl'
    })
    .otherwise({redirectTo:'/'});
    // use the HTML5 History API
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
};

module.exports = config;
