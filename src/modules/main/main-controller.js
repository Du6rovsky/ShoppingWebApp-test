//Main controller Shop App
'use strict';
var mainCtrl = function($scope,$http,localStorageService,ngDialog,$interval,$location,$route,$timeout) {
    //Users init
    var usersstore = localStorageService.get('users');
    var users = [];
    if(usersstore){
        users = localStorageService.get('users');
    }else{
        var admin = { email : "admin@mail.com", pass : "admin"};
        users[users.length] = admin;
        localStorageService.set('users', users);
    }
    //Signup
    $scope.signerr='';
    $scope.signup = function(email,pass1,pass2){
        users = localStorageService.get('users');
        var accept = true;
        if(users){
            for(var i=0; i < users.length;i++){
                if(users[i].email == email){
                    $scope.signerr="Email is already exist";
                    $timeout(function(){
                        $scope.signerr = '';
                        $scope.$apply();
                    },2000);
                    accept = false;
                }
            }
            if(accept){
                if(pass1 == pass2){
                    var user = { email : email, pass : pass1 };
                    users[users.length] = user
                    localStorageService.set('users', users);
                    $location.path("/");
                } else {
                    $scope.signerr="Passwords are don't match";
                    $timeout(function(){
                        $scope.signerr = '';
                        $scope.$apply();
                    },2000);
                }
            }
        } else {
            $route.reload();
        }
    };
    //Login
    $scope.currurl = $location.url();
    var logcache = localStorageService.get('login');
    if(logcache){
        $scope.logged = localStorageService.get('login');
        $scope.authuser = localStorageService.get('authuser');
    }else{
        $scope.logged = '';
        $scope.authuser='';
    };
    $scope.logerr='';
    $scope.login = function(email,pass){
        var users = localStorageService.get('users');
        if(users){
            for(var i=0; i < users.length;i++){
                if(users[i].email == email){
                    if(users[i].pass == pass){
                        $scope.logged = true;
                        localStorageService.set('login', $scope.logged);
                        $scope.authuser = email;
                        localStorageService.set('authuser', $scope.authuser);
                        $location.path("/search");
                    } else {
                        $scope.logerr="Password incorrect";
                        $timeout(function(){
                            $scope.logerr = '';
                            $scope.$apply();
                        },2000);   
                    };
                } else {
                    $scope.logerr="Email does not exist";
                    $timeout(function(){
                        $scope.logerr = '';
                        $scope.$apply();
                    },2000);
                };
            }
        } else {$route.reload();};
    };
    //Simple secure redirect
    if($scope.currurl =="/"){
        if($scope.logged){
            $location.path("/search");
        }    
    };
    if($scope.currurl == "/signup"){
        if($scope.logged){
            $location.path("/search");
        }    
    };
    if($scope.currurl == "/search"){
        if(!$scope.logged){
            $location.path("/");
        }    
    };
    //Logout
    $scope.logout = function(){
        $scope.logged = '';
        $scope.authuser = '';
        localStorageService.remove('login');
        localStorageService.remove('ordered');
        localStorageService.remove('authuser');
        localStorageService.remove('ordermass');
        $location.path("/");
    };
	//Get items list data
	var iurl="/src/data/";
	$http.get(iurl+'/items.js').success(function(data){
		var items = data;
		for(var l=0 ; l < items.length; l++){
			items[l].id = parseInt(items[l].id);
			items[l].rait = parseFloat(items[l].rait);
			items[l].price = parseFloat(items[l].price);
			items[l].inStock = Boolean(items[l].inStock);
			items[l].issueDate = new Date(items[l].issueDate);
		};
		$scope.items = items;
	});
    //Dates
    $scope.newMinDate = function(date){
        $scope.dateFrom = new Date ($scope.minDate);
    };
    $scope.newMaxDate = function(date){
        $scope.dateTo = new Date ($scope.maxDate);
    };
    $scope.minRemove = function() {
        $scope.minDate = '';
        $scope.dateFrom = '';
    };
    $scope.maxRemove = function() {
        $scope.maxDate = '';
        $scope.dateTo = '';
    };
	//Colors
	$scope.colors = ["red","white","black","blue","yellow","green"];
	//Order list
	var ordermass = localStorageService.get('ordermass');
    if(ordermass){
        $scope.ordermass = localStorageService.get('ordermass');
    }else {
        $scope.ordermass=[];
    }
    var ordered = localStorageService.get('ordered');
    if(ordered){
        $scope.ordered = localStorageService.get('ordered');
    }else {
        $scope.ordered=[];
        $scope.ordermass=[];
        localStorageService.set('ordered',$scope.ordered);
        localStorageService.set('ordermass',$scope.ordermass);
    };
    $interval(function(){
        $scope.ordered = localStorageService.get('ordered');
        $scope.ordermass = localStorageService.get('ordermass');
    },1000);
    //Order list : add item to cart
	$scope.addorder = function(item) {
        $scope.ordermass[$scope.ordermass.length] = $scope.items[item];
        $scope.ordered[$scope.ordered.length] = $scope.items[item].id;
        localStorageService.set('ordermass', $scope.ordermass);
        localStorageService.set('ordered', $scope.ordered);
        $scope.ordermass = localStorageService.get('ordermass');
        $scope.ordered = localStorageService.get('ordered');
    };
    //Order list : remove item from cart
    $scope.delorder = function(index) {
        var count;
        for(var i=0; i<$scope.ordermass.length; i++){
            if($scope.ordermass[i].id==index){
                count=i;
                $scope.ordermass.splice(count,1);
                localStorageService.set('ordermass',$scope.ordermass);
                $scope.ordermass = localStorageService.get('ordermass');
            };
        };
        for(var i=0; i<$scope.ordered.length; i++){
            if($scope.ordered[i]==index){
                count=i;
                $scope.ordered.splice(count,1);
                localStorageService.set('ordered',$scope.ordered);
                $scope.ordered = localStorageService.get('ordered');
            };
        };
    };
    //Cart modal window
    $scope.cartModal = function(){
        ngDialog.open({ 
            template: './build/modules/search/cart.html',
            controller: 'mainCtrl'
        });
    };
}
module.exports = mainCtrl;