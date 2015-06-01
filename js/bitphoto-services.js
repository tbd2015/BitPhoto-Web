(function(){
	var app = angular.module('bitphoto-services',[]);

	app.service('GetterService', function($q, $rootScope, UserService) {
	    this.getUser = function() {
	    	var cookie = $rootScope.globals.currentUser;
	        var user = {};

	        var p0 = UserService.GetByEmail(cookie.email);

	        return $q.all([p0]).then(function(res) {
	        	var retorno = res[0];
				console.log(retorno);
				return retorno;
			});
		};
	});

	app.factory('UserDataFactory', function(GetterService) {
		return {
			nombre: function() {
				promise = GetterService.getUser();
				return promise.then(function(f) {
						//console.log(f.firstName);
						return f.firstName;
					}, function (error) {
						console.log(error);
						return null;
					});
			},
			apellido: function() {
				promise = GetterService.getUser();
				return promise.then(function(f) {
						//console.log(f.lastName);
						return f.lastName;
					}, function (error) {
						console.log(error);
						return null;
					});
			},
			apodo: function() {
				promise = GetterService.getUser();
				return promise.then(function(f) {
						//console.log(f.firstName);
						return f.username;
					}, function (error) {
						console.log(error);
						return null;
					});
			},
			descripcion: function() {
				promise = GetterService.getUser();
				return promise.then(function(f) {
						//console.log(f.firstName);
						return f.descripcion;
					}, function (error) {
						console.log(error);
						return null;
					});
			}
		};
	});
})();
