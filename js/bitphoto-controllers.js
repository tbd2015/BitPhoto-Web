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
            $scope.apodo = f.apodo;
            $scope.descripcion = f.descripcion;
            $scope.imgavatar = f.urlfoto;
            $scope.imgcover = f.urlperfil;

            if ($scope.imgcover || $scope.imgcover==="") {
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
                $scope.peticion = f;
                
                $scope.tituloImagen = f.Titulo;
                $scope.descripcionImagen = f.Descripcion;

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

                $scope.comentarios = {};
            });
	});
        
    app.controller('PhotostreamCtrl', function($scope, PhotoService) {
            PhotoService.getPhotostream().then(function(f){
                $scope.respuesta = f.photos;
                
                angular.forEach($scope.respuesta.photo, function(nuevoUrl) {
                    nuevoUrl.urlacceso = "#/foto/" + nuevoUrl.idfoto;
                });    
                
                $scope.peticion = $scope.respuesta;
            });
	});

	app.controller('AlbumCtrl', function($scope, AlbumService) {
            AlbumService.getAlbums().then(function(f){
                $scope.respuesta = f.albumes;
                
                angular.forEach($scope.respuesta.album, function(nuevoUrl) {
                    nuevoUrl.urlacceso = "#/album/" + nuevoUrl.idalbum;
                });            
                
                $scope.peticion = $scope.respuesta;
            });
	});

	app.controller('AlbumPhotosCtrl', function($scope, $routeParams, AlbumService) {
			$scope.iden = $routeParams.idalbum;
            AlbumService.getAlbumPhotos($routeParams.idalbum).then(function(f){
            	$scope.titulo = f.album.nombre_album;
            	$scope.descripcion = f.album.descripcion;
                $scope.respuesta = f.album;
                
                angular.forEach($scope.respuesta.fotos, function(nuevoUrl) {
                    nuevoUrl.urlacceso = "#/foto/" + nuevoUrl.idfoto;
                });            
                
                $scope.peticion = $scope.respuesta;
            });
	});
        
    app.controller('TestCtrl', function($scope, TestService) {
        TestService.getHola().then(function(f){ $scope.mensaje = f; });
        //TestService.getAlbum().then(function(f){ $scope.album = f; });
        //PhotoService.getTest().then(function(f){ $scope.albums = f; });

        $scope.localQuery = function(query) {
        	TestService.getLocalQuery(query).then(function(f){ $scope.respuestaLocal = f; });	
        }
        
        $scope.remoteQuery = function(query) {
        	TestService.getRemoteQuery(query).then(function(f){ $scope.respuestaRemota = f; });
        }
    });
})();