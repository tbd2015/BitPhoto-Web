(function(){
    var app = angular.module('bitphoto-app', ['ngRoute', 'ngCookies', 'angular-md5', 'bitphoto-controllers', 'bitphoto-services']);
    
    // Parámetros globales del sistema
    app.value('parms', {
        localServerPath: "http://localhost:8080/BitPhoto",
        remoteServerPath: "http://bitphoto-tbd2015.rhcloud.com/bitphoto",
        serverPath: "http://localhost:8080/BitPhoto",
        fotosPortada: 15
    });

    // Configuración de rutas de AngularJS y sus respectivos Controladores
    app.config(['$routeProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {templateUrl: 'views/indexguest.html',   controller: 'IndexCtrl'}).
            when('/registro', {templateUrl: 'views/register.html',   controller: 'IndexCtrl'}).
            when('/portada', {templateUrl: 'views/home.html',   controller: 'HomeCtrl'}).

            when('/photostream', {templateUrl: 'views/photostream.html',   controller: 'PhotostreamCtrl'}).
            when('/cameraroll', {templateUrl: 'views/cameraroll.html',   controller: 'CameraRollCtrl'}).
            when('/mapa', {templateUrl: 'views/map.html',   controller: 'MapCtrl'}).
            when('/actividad', {templateUrl: 'views/recentactivity.html',   controller: 'RecentCtrl'}).

            when('/fotos-de/:cant?', {templateUrl: 'views/photos-from.html',   controller: 'PhotosFromCtrl'}).
            when('/fotos-con/:cant?', {templateUrl: 'views/photos-of.html',   controller: 'PhotosOfCtrl'}).

            when('/recientes', {templateUrl: 'views/recentphotos.html',   controller: 'HomeCtrl'}).
            when('/mapa-mundial', {templateUrl: 'views/worldmap.html',   controller: 'HomeCtrl'}).
            when('/camaras', {templateUrl: 'views/camerafinder.html',   controller: 'HomeCtrl'}).

            when('/subida', {templateUrl: 'views/upload.html',   controller: 'UploadCtrl'}).

            when('/foto/:idfoto', {templateUrl: 'views/view-photo.html',   controller: 'PhotoCtrl'}).
            when('/album/:idalbum', {templateUrl: 'views/view-album.html',   controller: 'AlbumPhotosCtrl'}).
            when('/tag/:etiqueta?', {templateUrl: 'views/view-tags.html',   controller: 'TagCtrl'}).

            when('/perfil/:id?', {templateUrl: 'views/profile.html',   controller: 'ProfileCtrl'}).
            when('/fotos/:id?', {templateUrl: 'views/photostream.html',   controller: 'PhotostreamCtrl'}).
            when('/albumes/:id?', {templateUrl: 'views/albums.html',   controller: 'AlbumCtrl'}).
            when('/favoritas/:id?', {templateUrl: 'views/favorites.html',   controller: 'FavoritesCtrl'}).

            when('/testhola', {templateUrl: 'views/holamundo.html',   controller: 'HolaCtrl'}).
            when('/testalbum', {templateUrl: 'views/view-album.html',   controller: 'TestCtrl'}).
            when('/query', {templateUrl: 'views/query.html',   controller: 'TestCtrl'}).

            otherwise({redirectTo: '/'});
    }]);
    
    // Código de autentificación de login y cookies
    app.run(['$rootScope', '$location', '$cookieStore', '$http', function($rootScope, $location, $cookieStore, $http) {
       	// keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            //console.log($rootScope.globals.currentUser);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/','/registro','/testhola','/testalbum','/query']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/');
            }
        });
    }]);

    // DIRECTIVA Permite redirigir al usuario a las vistas indicadas por las rutas
    app.directive('loadComponent', function() {
        return {
            templateUrl: function(elem, attr){
                return attr.route;
            }
        }
    });
})();
