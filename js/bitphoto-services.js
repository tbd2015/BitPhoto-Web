(function(){
	var app = angular.module('bitphoto-services',[]);

	// SERVCIO Consulta los datos almacenados en la cookie del navegador
	app.service('GetterService', function($rootScope, parms) {
		// Obtiene el email del usuario en la cookie
		this.getEmail = function() {
			var cookie = $rootScope.globals.currentUser;
			return cookie.email;
		};

		// Obtiene el string de autenticación de la cookie
		this.getAuthData = function() {
			var cookie = $rootScope.globals.currentUser;
			return cookie.authdata;
		};

		// Obtiene el Timestamp actual alineado a milisegundos
		this.getTimestamp = function() {
			return new Date().getTime();
		};

		// Obtiene un ID pseudo unico basado en el Timestamp
		this.getTimeId = function() {
			return this.getTimestamp()%(Math.pow(10,parms.digitosId));
		};
	});

	// SERVICIO Procesa consultas relacionadas con la manipulación de fotografías
	app.service('PhotoService', function($http, $q, parms, GetterService) {
		// Test de petición GET      
		this.getTest = function() {
			var path = parms.serverPath + "/albumes";
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		// GET Obtiene los datos básicos de una foto
		this.getPhoto = function(id) {
			var email = GetterService.getEmail();
			var path = parms.serverPath + "/photo/get/" + id;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		// GET Obtiene el Photostream (portada) de un usuario (a través de su <id> o por cookie)
		this.getPhotostream = function(id) {
			if (!id) {
				email = GetterService.getEmail();
				path = parms.serverPath + "/photoStream/" + email;
				p0 = $http.get(path);

				return $q.all([p0]).then(function(res) {
					var retorno = res[0].data;
					return retorno;
				});
			}
			else {
				path1 = parms.serverPath + "/user/id/" + id;
				
				return $http.get(path1).then(function(r1) {
					path2 = parms.serverPath + "/photoStream/" + r1.data.correo;

					return $http.get(path2).then(function(r2) {
						return r2.data;
					});
				});
			}
		};

		// GET Obtiene las últimas <num> fotografías del sistema (para la portada)
		this.getHomePhotos = function(num) {
			var email = GetterService.getEmail();
			var path = parms.serverPath + "/photo/" + email + "/" + num;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		// GET "Fotos De"
		this.getPhotosFrom = function(cant) {
			var email = GetterService.getEmail();
			var path = parms.serverPath + "/photosfrom/" + cant + "/" + email;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		// GET "Fotos Con"
		this.getPhotosOf = function(cant) {
			var email = GetterService.getEmail();
			var path = parms.serverPath + "/photosof/" + cant + "/" + email;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};
	});
	
	// SERVICIO Procesa los álbumes del sistema
	app.service('AlbumService', function($http, $q, parms, GetterService) {
		// GET Obtener los albumes del usuario (por <id> o por cookie)
		this.getAlbums = function(id) {
			if (!id) {
				email = GetterService.getEmail();
				path = parms.serverPath + "/albumes/" + email;
				p0 = $http.get(path);

				return $q.all([p0]).then(function(res) {
					var retorno = res[0].data;
					return retorno;
				});
			}
			else {
				path1 = parms.serverPath + "/user/id/" + id;
				
				return $http.get(path1).then(function(r1) {
					path2 = parms.serverPath + "/albumes/" + r1.data.correo;

					return $http.get(path2).then(function(r2) {
						return r2.data;
					});
				});
			}
		};

		// GET Obtener las fotos del album <id>
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
	
	// SERVICIO Manipulación de etiquetas de fotos
	app.service('TagService', function($http, $q, parms) {
		// GET Obtener las etiquetas de la foto <id>
		this.getPhotoTags = function(id) {
			var path = parms.serverPath + "/tags/" + id;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};
	});

	// SERVICIO Manipulación de comentarios
	app.service('CommentService', function($http, $q, parms, GetterService) {
		// GET Obtiene los comentarios de una foto
		this.getPhotoComments = function(id) {
			var email = GetterService.getEmail();
			var path = parms.serverPath + "/photo/" + email + "/comentario/" + id;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		// POST Postear Comentario
		this.postPhotoComment = function(idPhoto, text) {
			var email = GetterService.getEmail();
			var path = parms.serverPath + "/photo/" + email + "/comentarioPhoto/" + idPhoto;
			var query = { "comentarioFoto": text };

			console.log(path);
			console.log(query);

			var prom = $http.post(path, query);

			return prom.then(function(ret) {
				console.log(ret.data);
				return ret.data;
			}, function(error) {
				console.log(error);
				return "";
			});
		};
	});

	// SERVICIO Manipulación de fotos favoritas
	app.service('FavoritesService', function($http, $q, parms, GetterService) {
		// GET Obtener las fotos favoritas de un usuario (por <id> o cookie)
		this.getFavorites = function(id) {
			if (!id) {
				email = GetterService.getEmail();
				path = parms.serverPath + "/photo/" + email + "/favoritos";
				p0 = $http.get(path);

				return $q.all([p0]).then(function(res) {
					var retorno = res[0].data;
					return retorno;
				});
			}
			else {
				path1 = parms.serverPath + "/user/id/" + id;
				
				return $http.get(path1).then(function(r1) {
					path2 = parms.serverPath + "/photo/" + r1.data.correo + "/favoritos";

					return $http.get(path2).then(function(r2) {
						return r2.data;
					});
				});
			}
		};

		// POST Setear foto como favorita
		this.setPhotoAsFavorite = function(id, mail) {
			var query = { "idFoto": id };
			var path = parms.serverPath + "/photo/" + mail + "/favoritofoto";
			var prom = $http.post(path, query);

			return prom.then(function(ret) {
				return ret.data;
			}, function(error) {
				console.log(error);
				return "";
			});
		};
	});

	// FACTORÍA Obtiene datos del usuario
	app.factory('UserDataFactory', function($http, parms, GetterService) {
		return {
			// Obtiene los datos del usuario por cookie
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
			// Obtiene los datos del usuario por <id>
			id2user: function(id) {
				var path = parms.serverPath + "/user/id/" + id;
				var promise = $http.get(path);

				return promise.then(function(ret) {
					return ret.data;
				}, function (error) {
					console.log(error);
					return "";
				});
			},
			// Obtiene el nombre y apodo del usuario por <id>
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
			},
			// Obtiene el id en base al <email>
			email2id: function(email) {
				var path = parms.serverPath + "/user/" + email;
				var promise = $http.get(path);

				return promise.then(function(ret) {
					return ret.idUsuario;
				}, function (error) {
					console.log(error);
					return "";
				});
			},
			// Función de conveniencia (si está o no está el <id>)
			getUserProfile: function(id) {
				if (!id) {
					return this.getUser();
				}
				else {
					return this.id2user(id);
				}
			}
		};
	});

	/* ÁREA DE TESTING */

	// SERVICIO Subida de Fotografías
	app.service('UploadService', function($http, $q, parms, GetterService) {
		// POST Subir Fotografias
		this.doUpload = function(id) {
			var mail = GetterService.getEmail();
			var path = parms.serverPath + "/photo/upload/" + mail;

			var query = { "idFoto": id };
			var prom = $http.post(path, query);

			return prom.then(function(ret) {
				return ret.data;
			}, function(error) {
				console.log(error);
				return "";
			});
		};
	});

	// FACTORÍA Obtiene datos de la cámara fotográfica
	app.factory('CameraDataFactory', function($http, parms, GetterService) {
		return {
			// Obtiene datos de la cámara <id>
			getCamera: function(id) {
				return null;
			},
			// Obtiene los datos de la cámara con que se tomó la foto <id>
			getPhotoCamera: function(id) {
				var path = parms.serverPath + "/camara/" + id;
				var promise = $http.get(path);

				return promise.then(function(ret) {
					return ret.data;
				}, function (error) {
					console.log(error);
					return "";
				});
			}			
		};
	});

	// SERVICIO Servicio de testing
	app.service('TestService', function($http, $q, parms) {
		// Retorna un "Hola Mundo"       
		this.getHola = function() {
			var path = parms.serverPath + "/helloworld";
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		// Test temporal para álbumes
		this.getAlbum = function() {
			var path = parms.serverPath + "/albumes";
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		// Permite realizar consultas GET en el app de negocio local
		this.getLocalQuery = function(query) {
			var path = parms.localServerPath + "/" + query;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};

		// Permite realizar consultas GET en el app de negocio remoto
		this.getRemoteQuery = function(query) {
			var path = parms.remoteServerPath + "/" + query;
			var p0 = $http.get(path);

			return $q.all([p0]).then(function(res) {
				var retorno = res[0].data;
				return retorno;
			});
		};
	});
})();
