(function(){
	var app = angular.module('bitphoto-services',[]);

	app.service('GetterService', function($q, $rootScope, UserService) {
		this.getEmail = function() {
			var cookie = $rootScope.globals.currentUser;
			return cookie.email;
		};

		this.getAuthData = function() {
			var cookie = $rootScope.globals.currentUser;
			return cookie.authdata;
		};
	});

	app.service('TestService', function($http, $q, parms) {            
		this.getHola = function() {
			var path = parms.serverPath + "/helloworld";
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		this.getAlbum = function() {
			var path = parms.serverPath + "/albumes";
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		this.getLocalQuery = function(query) {
			var path = parms.localServerPath + "/" + query;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		this.getRemoteQuery = function(query) {
			var path = parms.remoteServerPath + "/" + query;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};
	});

	app.service('PhotoService', function($http, $q, parms, GetterService) {            
		this.getTest = function() {
			var path = parms.serverPath + "/albumes";
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		this.getPhotostream = function() {
			var email = GetterService.getEmail();
			var path = parms.serverPath + "/photoStream/" + email;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		this.getHomePhotos = function(num) {
			var email = GetterService.getEmail();
			var path = parms.serverPath + "/photo/" + email + "/" + num;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};
	});

	app.service('AlbumService', function($http, $q, parms, GetterService) {            
		this.getAlbums = function() {
			var email = GetterService.getEmail();
			var path = parms.serverPath + "/albumes/" + email;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		this.getAlbumPhotos = function(id) {
			var email = GetterService.getEmail();
			var path = parms.serverPath + "/albumes/" + email + "/" + id;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
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
