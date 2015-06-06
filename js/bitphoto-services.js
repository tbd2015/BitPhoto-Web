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
						return f.nombre;
					}, function (error) {
						console.log(error);
						return null;
					});
			},
			apellido: function() {
				promise = GetterService.getUser();
				return promise.then(function(f) {
						return f.apellido;
					}, function (error) {
						console.log(error);
						return null;
					});
			},
			apodo: function() {
				promise = GetterService.getUser();
				return promise.then(function(f) {
						return f.apodo;
					}, function (error) {
						console.log(error);
						return null;
					});
			},
			descripcion: function() {
				promise = GetterService.getUser();
				return promise.then(function(f) {
						return f.descripcion;
					}, function (error) {
						console.log(error);
						return null;
					});
			}
		};
	});
})();
