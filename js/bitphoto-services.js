(function(){
	var app = angular.module('bitphoto-services',[]);

	app.service('GetterService', function($rootScope, UserService) {
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

		this.getPhoto = function(id) {
			var email = GetterService.getEmail();
			var path = parms.serverPath + "/photo/get/" + id;
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

	app.factory('UserDataFactory', function($http, parms, GetterService) {
		return {
			getUser: function() {
				var email = GetterService.getEmail();
				var path = parms.serverPath + "/user/" + email;
				var promise = $http.get(path);

				return promise.then(function(ret) {
					return ret.data;
				}, function (error) {
					console.log(error);
					return "";
				});
			},
			id2username: function(id) {
				var path = parms.serverPath + "/user/id/" + id;
				var promise = $http.get(path);

				return promise.then(function(ret) {
					var nombre = ret.data.nombre + " " +ret.data.apellido;
					var apodo = ret.data.alias;
					return nombre + " (" + apodo +")";
				}, function (error) {
					console.log(error);
					return "";
				});
			}
		};
	});

	app.factory('CameraDataFactory', function($http, parms, GetterService) {
		return {
			getCamera: function(id) {
				return null;
			}
		};
	});
})();
