(function(){
	var app = angular.module('bitphoto-controllers', []);

	var JsonServer = "http://localhost:4000";

	app.controller('SessionCtrl', function($scope, $location, AuthenticationService) {
	    $scope.formLogin = {};
	    $scope.formRegister = {};
	    $scope.registerStatus = "";

		$scope.submitLogin = function (formLogin) {
			if ($scope.loginForm.$valid) {
				loginData = JSON.stringify(formLogin);
				console.log("Se procede a Iniciar Sesión con" + loginData);
				// TODO ruta logeado
				$location.path("/portada");
			}
			else {
				console.log("¡Formulario de Login Inválido!");
			}
		};

		$scope.submitRegister = function (formRegister) {
			if ($scope.registerForm.$valid) {
				if (formRegister.password1===formRegister.password2) {
					registerData = JSON.stringify(formRegister);
					console.log("Se procede a hacer Registro con" + registerData);
					// TODO ruta registrado
					$scope.registerStatus = "¡Formulario de Registro Válido!";
					$location.path("/portada");
				}
				else {
					$scope.registerStatus = "Las contraseñas no son iguales";
				}
			}
			else {
				console.log("¡Formulario de Registro Inválido!");
				$scope.registerStatus = "¡Formulario de Registro Inválido!";
			}
		};

		$scope.logout = function () {
			AuthenticationService.ClearCredentials();
			$location.path("/");
		}
	});

	app.controller('UserCtrl', function($scope, UserDataFactory) {
        UserDataFactory.getUser().then(function(f){
            $scope.nombre = f.nombre;
            $scope.apellido = f.apellido;
            $scope.apodo = f.alias;
            $scope.descripcion = f.descripcion;
            $scope.imgavatar = f.urlfoto;
            $scope.imgcover = f.urlperfil;
            $scope.username = f.nombre + " " + f.apellido + " (" + f.alias + ")";

            if (!($scope.imgcover) || $scope.imgcover==="") {
                $scope.imgcover = "images/users/wall/user002.jpg";
            }
        });
	});

	app.controller('IndexCtrl', function($scope) {
        $scope.variable = "";
	});

	app.controller('HomeCtrl', function($scope, parms, PhotoService) {
        PhotoService.getHomePhotos(parms.fotosPortada).then(function(f){
            $scope.respuesta = f.photos;
                
            angular.forEach($scope.respuesta.photo, function(nuevoUrl) {
                nuevoUrl.urlacceso = "#/foto/" + nuevoUrl.idfoto;
            });
            
            $scope.peticion = $scope.respuesta;
        });
	});

	app.controller('UploadCtrl', function($scope) {
            $scope.variable = "";
	});

	app.controller('PhotoCtrl', function($scope, $routeParams, PhotoService, UserDataFactory) {
            PhotoService.getPhoto($routeParams.idfoto).then(function(f){
                $scope.tituloImagen = f.Titulo;
                $scope.descripcionImagen = f.Descripcion;
                $scope.urlUsuario = "#/fotos/" + f.IdUsuario;

                $scope.fechaTomadaImagen = f.fecha_toma;
                $scope.fechaSubidaImagen = f.fecha_carga;
                $scope.urlImagen = f.Url;

                $scope.visitasImagen = f.Vistas;
                $scope.favoritosImagen = f.Cantidad_favoritos;
                $scope.comentariosImagen = f.Cantidad_comentarios;
                $scope.permisosImagen = "";

                $scope.marcaCamara = "";
                $scope.nombreCamara = "";
                $scope.resCamara = "";
                $scope.zoomCamara = "";

                UserDataFactory.id2username(f.IdUsuario).then(function(g) {
                    $scope.autorImagen = g;
                });
            });

            PhotoService.getPhotoComments($routeParams.idfoto).then(function(f) {
                $scope.comentarios = f;

                angular.forEach($scope.comentarios, function(comm) {
                    UserDataFactory.id2user(comm.IdUsuario).then(function(g) {
                        comm.usuario = g.nombre + " " + g.apellido + " (" + g.alias + ")";
                        comm.avatar = g.urlfoto;
                        comm.urlUsuario = "#/fotos/" + comm.IdUsuario;
                    });                    
                });
            });                
	});

    app.controller('ProfileCtrl', function($scope, $routeParams, UserDataFactory) {
        if ($routeParams.id) {
            $scope.idpeticion = $routeParams.id;

            UserDataFactory.id2user($routeParams.id).then(function(f){
                $scope.nombre = f.nombre;
                $scope.apellido = f.apellido;
                $scope.apodo = f.alias;
                $scope.descripcion = f.descripcion;
                $scope.imgavatar = f.urlfoto;
                $scope.imgcover = f.urlperfil;
                $scope.cantFotos = f.cantidad_fotos;
                $scope.cantAlbumes = f.cantidad_albumes;
                $scope.cantSeguidores = f.cantidad_seguidores;
                $scope.cantSeguidos = f.cantidad_seguidos;
                $scope.fechaCreacion = f.fecha_creacion;
                $scope.username = f.nombre + " " + f.apellido + " (" + f.alias + ")";

                if (!($scope.imgcover) || $scope.imgcover==="") {
                    $scope.imgcover = "images/users/wall/user002.jpg";
                }
            });
        }
        else {
            $scope.idpeticion = "";

            UserDataFactory.getUser().then(function(f){
                $scope.nombre = f.nombre;
                $scope.apellido = f.apellido;
                $scope.apodo = f.alias;
                $scope.descripcion = f.descripcion;
                $scope.imgavatar = f.urlfoto;
                $scope.imgcover = f.urlperfil;
                $scope.cantFotos = f.cantidad_fotos;
                $scope.cantAlbumes = f.cantidad_albumes;
                $scope.cantSeguidores = f.cantidad_seguidores;
                $scope.cantSeguidos = f.cantidad_seguidos;
                $scope.fechaCreacion = f.fecha_creacion;
                $scope.username = f.nombre + " " + f.apellido + " (" + f.alias + ")";

                if (!($scope.imgcover) || $scope.imgcover==="") {
                    $scope.imgcover = "images/users/wall/user002.jpg";
                }
            });
        }
    });
        
    app.controller('PhotostreamCtrl', function($scope, $routeParams, PhotoService, UserDataFactory) {
            if ($routeParams.id) {
                $scope.idpeticion = $routeParams.id;    
            }
            else {
                $scope.idpeticion = "";
            }

            PhotoService.getPhotostream($routeParams.id).then(function(f) {
                $scope.respuesta = f.photos;
                
                angular.forEach($scope.respuesta.photo, function(nuevoUrl) {
                    nuevoUrl.urlacceso = "#/foto/" + nuevoUrl.idfoto;
                });    
                
                $scope.peticion = $scope.respuesta;
            });

            UserDataFactory.getUserProfile($routeParams.id).then(function(f) {
                $scope.nombre = f.nombre;
                $scope.apellido = f.apellido;
                $scope.apodo = f.alias;
                $scope.descripcion = f.descripcion;
                $scope.imgavatar = f.urlfoto;
                $scope.imgcover = f.urlperfil;

                if (!($scope.imgcover) || $scope.imgcover==="") {
                    $scope.imgcover = "images/users/wall/user002.jpg";
                }
            });
	});

	app.controller('AlbumCtrl', function($scope, $routeParams, AlbumService, UserDataFactory) {
            if ($routeParams.id) {
                $scope.idpeticion = $routeParams.id;    
            }
            else {
                $scope.idpeticion = "";
            }

            AlbumService.getAlbums($routeParams.id).then(function(f){
                $scope.respuesta = f.albumes;
                
                angular.forEach($scope.respuesta.album, function(nuevoUrl) {
                    nuevoUrl.urlacceso = "#/album/" + nuevoUrl.idalbum;
                });            
                
                $scope.peticion = $scope.respuesta;
            });

            UserDataFactory.getUserProfile($routeParams.id).then(function(f) {
                $scope.nombre = f.nombre;
                $scope.apellido = f.apellido;
                $scope.apodo = f.alias;
                $scope.descripcion = f.descripcion;
                $scope.imgavatar = f.urlfoto;
                $scope.imgcover = f.urlperfil;

                if (!($scope.imgcover) || $scope.imgcover==="") {
                    $scope.imgcover = "images/users/wall/user002.jpg";
                }
            });

            $scope.recargar = function(cant) {
                $location.path("/fotos-de/" + cant);
            }
	});

    app.controller('FavoritesCtrl', function($scope, $routeParams, PhotoService, UserDataFactory) {
            if ($routeParams.id) {
                $scope.idpeticion = $routeParams.id;    
            }
            else {
                $scope.idpeticion = "";
            }

            PhotoService.getFavorites($routeParams.id).then(function(f) {
                $scope.respuesta = f.photosfav;
                
                angular.forEach($scope.respuesta.photo, function(nuevoUrl) {
                    nuevoUrl.urlacceso = "#/foto/" + nuevoUrl.idfoto;
                });    
                
                $scope.peticion = $scope.respuesta;
            });

            UserDataFactory.getUserProfile($routeParams.id).then(function(f) {
                $scope.nombre = f.nombre;
                $scope.apellido = f.apellido;
                $scope.apodo = f.alias;
                $scope.descripcion = f.descripcion;
                $scope.imgavatar = f.urlfoto;
                $scope.imgcover = f.urlperfil;

                if (!($scope.imgcover) || $scope.imgcover==="") {
                    $scope.imgcover = "images/users/wall/user002.jpg";
                }
            });
    });

    app.controller('AlbumPhotosCtrl', function($scope, $routeParams, AlbumService) {
			$scope.iden = $routeParams.idalbum;
            AlbumService.getAlbumPhotos($routeParams.idalbum).then(function(f){
            	$scope.titulo = f.album.nombre_album;
            	$scope.descripcion = f.album.descripcion;
                $scope.username = f.usuario.nombre_real + " " + f.usuario.apellido + " (" + f.usuario.alias + ")";
                $scope.urlUsuario = "#/fotos/" + f.usuario.idusuario;
                $scope.respuesta = f.album;
                
                angular.forEach($scope.respuesta.fotos, function(nuevoUrl) {
                    nuevoUrl.urlacceso = "#/foto/" + nuevoUrl.idfoto;
                });            
                
                $scope.peticion = $scope.respuesta;
            });
	});

    app.controller('PhotosFromCtrl', function($scope, $routeParams, PhotoService) {
            if ($routeParams.cant) {
                $scope.cant = $routeParams.cant;
            }
            else {
                $scope.cant = 5;
            }

            PhotoService.getPhotosFrom($scope.cant).then(function(f) {
                $scope.respuesta = f.usuarios;
                $scope.peticion = [];
                
                angular.forEach($scope.respuesta.usuariosfollows, function(user) {
                    angular.forEach(user.photos, function(foto) {
                        foto.urlacceso = "#/foto/" + foto.IdFoto;
                        $scope.peticion.push(foto);
                    });
                });
                
                //$scope.peticion = $scope.respuesta;
                //console.log($scope.peticion);
            });


    });

    // AREA DE TESTING!!!
    app.controller('TestCtrl', function($scope, TestService) {
        TestService.getHola().then(function(f){ $scope.mensaje = f; });

        $scope.localQuery = function(query) {
        	TestService.getLocalQuery(query).then(function(f){ $scope.respuestaLocal = f; });	
        }
        
        $scope.remoteQuery = function(query) {
        	TestService.getRemoteQuery(query).then(function(f){ $scope.respuestaRemota = f; });
        }
    });
})();