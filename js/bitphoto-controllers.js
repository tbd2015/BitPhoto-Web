(function(){
	var app = angular.module('bitphoto-controllers', []);

    // CONTROLADOR Manejador de Sesiones
    app.controller('SessionCtrl', function($scope, $location, AuthenticationService) {
        $scope.logout = function () {
            AuthenticationService.ClearCredentials();
            $location.path("/");
        }
    });

	// CONTROLADOR Muestra datos del usuario
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

    // CONTROLADOR Elemento vacío
	app.controller('IndexCtrl', function($scope) {
        $scope.variable = "";
	});

    // CONTROLADOR Muestra las fotos de portada
	app.controller('HomeCtrl', function($scope, parms, PhotoService) {
        PhotoService.getHomePhotos(parms.fotosPortada).then(function(f){
            $scope.respuesta = f.photos;
                
            angular.forEach($scope.respuesta.photo, function(nuevoUrl) {
                nuevoUrl.urlacceso = "#/foto/" + nuevoUrl.idfoto;
            });
            
            $scope.peticion = $scope.respuesta;
        });
	});

    // CONTROLADOR Manejador de Subida de Fotos
	app.controller('UploadCtrl', function($scope, $location, md5, GetterService, UploadService) {
        // Metodo 1
        $scope.uploader = {};
        $scope.objetoQuery = [];
        $scope.subidaExitosa = true;
        
        $scope.subida = function () {
            console.log("Subiendo fotografías!");

            angular.forEach($scope.uploader.flow.files, function(imagen) {
                var descripcion = "¡Foto nueva en la plataforma!";
                var titulo = imagen.name;
                var extension = titulo.substring(titulo.lastIndexOf('.')+1).toLowerCase();
                var fechaActual = new Date();
                //var nuevoId = GetterService.getTimeId() + GetterService.getRandomNumber(0,1000);
                //var nuevoId = md5.createHash(GetterService.getRandomNumber(0,1000)+"");
                var ruta = "/uploads/" + imagen.uniqueIdentifier + "." + extension;
                //var ruta = "/uploads/" + nuevoId + "." + extension;
                var objetoFoto = { "idFoto": imagen.uniqueIdentifier, "titulo": titulo, "fechaTomada": fechaActual, "fechaCargada": fechaActual, "url": ruta, "descripcion": descripcion, "formato": extension };
                //var objetoFoto = { "idFoto": nuevoId, "titulo": titulo, "fechaTomada": fechaActual, "fechaCargada": fechaActual, "url": ruta, "descripcion": descripcion, "formato": extension };
                //imagen.uniqueIdentifier = nuevoId;
                $scope.objetoQuery.push(objetoFoto);
            });

            $scope.uploader.flow.upload();
        };

        $scope.hacerPeticion = function (id) {
            var fotoTemp = $scope.obtenerElementoQuery($scope.objetoQuery, id);
            var envio = [];
            envio.push(fotoTemp);

            UploadService.doUpload(envio).then(function(f) {
                if (f.success===true) {
                    console.log("BP-LOG: Foto " + fotoTemp.name + " subida con éxito!");
                }
                else {
                    console.log("ERROR: No se pudo subir la foto " + fotoTemp.name);
                    if ($scope.subidaExitosa===true) { $scope.subidaExitosa = false; }
                }
            });
        };

        $scope.finalizar = function () {
            if ($scope.subidaExitosa===true) {
                console.log("BP-LOG: Todas las fotos subidas con éxito!");
                $location.path("/photostream");
            }
            else {
                console.log("ERROR: Hubo problemas en la subida");
            }
        };

        $scope.obtenerElementoQuery = function(objetoQuery, id) {
            for (var d = 0, len = objetoQuery.length; d < len; d++) {
                if (objetoQuery[d].uniqueIdentifier === id) {
                    return objetoQuery[d];
                }
            }
        };
	});

    // CONTROLADOR Muestra la vista de los datos de una fotografía
	app.controller('PhotoCtrl', function($scope, $route, $routeParams, PhotoService, TagService, FavoritesService, CommentService, GetterService, UserDataFactory, CameraDataFactory) {
            PhotoService.getPhoto($routeParams.idfoto).then(function(f) {
                $scope.tituloImagen = f.Titulo;
                $scope.descripcionImagen = f.Descripcion;
                $scope.urlUsuario = "#/fotos/" + f.IdUsuario;

                $scope.fechaTomadaImagen = f.fecha_toma;
                $scope.fechaSubidaImagen = f.fecha_carga;
                $scope.urlImagen = f.Url;

                $scope.visitasImagen = f.Vistas;
                $scope.favoritosImagen = f.Cantidad_favoritos;
                $scope.comentariosImagen = f.Cantidad_comentarios;
                $scope.alias = "";
                $scope.permisosImagen = "";

                UserDataFactory.id2username(f.IdUsuario).then(function(g) {
                    $scope.autorImagen = g;
                });
            });

            CommentService.getPhotoComments($routeParams.idfoto).then(function(f) {
                $scope.comentarios = f;

                angular.forEach($scope.comentarios, function(comm) {
                    UserDataFactory.id2user(comm.IdUsuario).then(function(g) {
                        comm.usuario = g.nombre + " " + g.apellido + " (" + g.alias + ")";
                        comm.avatar = g.urlfoto;
                        comm.urlUsuario = "#/fotos/" + comm.IdUsuario;
                    });                    
                });
            });

            TagService.getPhotoTags($routeParams.idfoto).then(function(f) {
                if (f.length <= 0) {
                    $scope.etiquetas = ""
                }
                else {
                    $scope.etiquetas = f;

                    angular.forEach($scope.etiquetas, function(tags) {
                        tags.UrlTag = "#/tags/" + tags.NombreTag;
                    });   
                }
            });

            CameraDataFactory.getPhotoCamera($routeParams.idfoto).then(function(f) {
                $scope.modeloCamara = f.Camara.nombre;
                $scope.resCamara = f.Camara.megapixeles;
                $scope.zoomCamara = f.Camara.zoom;
            });

            $scope.favoritear = function() {
                var correo = GetterService.getEmail();
                FavoritesService.setPhotoAsFavorite($routeParams.idfoto,correo).then(function(f) {
                    if (f.success===true) {
                        $scope.estado = "¡Foto agregada a Favoritos!";
                    }
                    else {
                        $scope.estado = "ERROR al agregar foto a favoritos";
                    }
                });
            };

            $scope.comentar = function() {
                var correo = GetterService.getEmail();
                CommentService.postPhotoComment($routeParams.idfoto,$scope.texto).then(function(f) {
                    if (f.success===true) {
                        $scope.estado = "¡Foto comentada!";
                        $route.reload();
                    }
                    else {
                        $scope.estado = "ERROR al comentar";
                    }
                });
            };
	});

    // CONTROLADOR Muestra los datos completos de un usuario
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
    
    // CONTROLADOR Muestra el Photostream del usuario
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
    
    // CONTROLADOR Muestra los álbumes del usuario
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
	});
    
    // CONTROLADOR Muestra las fotos favoritas de un usuario
    app.controller('FavoritesCtrl', function($scope, $routeParams, PhotoService, FavoritesService, UserDataFactory) {
            if ($routeParams.id) {
                $scope.idpeticion = $routeParams.id;    
            }
            else {
                $scope.idpeticion = "";
            }

            FavoritesService.getFavorites($routeParams.id).then(function(f) {
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
    
    // CONTROLADOR Muestra las fotos pertenencientes a un album
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

    // CONTROLADOR "Fotos de"
    app.controller('PhotosFromCtrl', function($scope, $routeParams, $location, PhotoService) {
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
            });

            $scope.recargar = function(cant) {
                $location.path("/fotos-de/" + cant);
            }
    });

    // CONTROLADOR "Fotos con"
    app.controller('PhotosOfCtrl', function($scope, $routeParams, $location, PhotoService) {
            if ($routeParams.cant) {
                $scope.cant = $routeParams.cant;
            }
            else {
                $scope.cant = 5;
            }

            PhotoService.getPhotosOf($scope.cant).then(function(f) {
                $scope.respuesta = f.usuarios;
                $scope.peticion = [];
                
                angular.forEach($scope.respuesta.usuariosfollows, function(user) {
                    angular.forEach(user.photos, function(foto) {
                        foto.urlacceso = "#/foto/" + foto.IdFoto;
                        $scope.peticion.push(foto);
                    });
                });
            });

            $scope.recargar = function(cant) {
                $location.path("/fotos-con/" + cant);
            }
    });

    /* AREA DE TESTING */

    // CONTROLADOR "Hola Mundo!"
    app.controller('HolaCtrl', function($scope, TestService) {
        TestService.getHola().then(function(f){ $scope.mensaje = f; });
    });

    // CONTROLADOR Testing de consultas GET
    app.controller('TestCtrl', function($scope, TestService) {
        $scope.localQuery = function(query) {
        	TestService.getLocalQuery(query).then(function(f){ $scope.respuestaLocal = f; });	
        }
        
        $scope.remoteQuery = function(query) {
        	TestService.getRemoteQuery(query).then(function(f){ $scope.respuestaRemota = f; });
        }
    });
})();
