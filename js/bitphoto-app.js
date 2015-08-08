(function(){
    var app = angular.module('bitphoto-app', ['ngRoute', 'ngCookies', 'angular-md5', 'bitphoto-controllers', 'bitphoto-services']);
    
    app.value('parms', {
        localServerPath: "http://localhost:8080/BitPhoto",
        remoteServerPath: "http://bitphoto-tbd2015.rhcloud.com/bitphoto",
        serverPath: "http://localhost:8080/BitPhoto",
        fotosPortada: 15
    });

    app.config(['$routeProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {templateUrl: 'views/indexguest.html',   controller: 'IndexCtrl'}).
            when('/registro', {templateUrl: 'views/register.html',   controller: 'IndexCtrl'}).
            when('/portada', {templateUrl: 'views/home.html',   controller: 'HomeCtrl'}).

            when('/photostream', {templateUrl: 'views/photostream.html',   controller: 'PhotostreamCtrl'}).
            when('/cameraroll', {templateUrl: 'views/cameraroll.html',   controller: 'CameraRollCtrl'}).
            //when('/albumes', {templateUrl: 'views/albums.html',   controller: 'AlbumCtrl'}).
            when('/mapa', {templateUrl: 'views/map.html',   controller: 'MapCtrl'}).
            //when('/favoritas', {templateUrl: 'views/favorites.html',   controller: 'FavoritesCtrl'}).
            when('/actividad', {templateUrl: 'views/recentactivity.html',   controller: 'RecentCtrl'}).

            when('/fotos-de', {templateUrl: 'views/photos-from.html',   controller: 'HomeCtrl'}).
            when('/fotos-con', {templateUrl: 'views/photos-of.html',   controller: 'HomeCtrl'}).

            when('/recientes', {templateUrl: 'views/recentphotos.html',   controller: 'HomeCtrl'}).
            when('/mapa-mundial', {templateUrl: 'views/worldmap.html',   controller: 'HomeCtrl'}).
            when('/camaras', {templateUrl: 'views/camerafinder.html',   controller: 'HomeCtrl'}).

            when('/subida', {templateUrl: 'views/upload.html',   controller: 'UploadCtrl'}).

            when('/foto/:idfoto', {templateUrl: 'views/view-photo.html',   controller: 'PhotoCtrl'}).
            when('/album/:idalbum', {templateUrl: 'views/view-album.html',   controller: 'AlbumPhotosCtrl'}).

            when('/perfil/:id?', {templateUrl: 'views/profile.html',   controller: 'ProfileCtrl'}).
            when('/fotos/:id?', {templateUrl: 'views/photostream.html',   controller: 'PhotostreamCtrl'}).
            when('/albumes/:id?', {templateUrl: 'views/albums.html',   controller: 'AlbumCtrl'}).
            when('/favoritas/:id?', {templateUrl: 'views/favorites.html',   controller: 'FavoritesCtrl'}).
            
            when('/testhola', {templateUrl: 'views/holamundo.html',   controller: 'TestCtrl'}).
            when('/testalbum', {templateUrl: 'views/view-album.html',   controller: 'TestCtrl'}).
            when('/query', {templateUrl: 'views/query.html',   controller: 'TestCtrl'}).

            /*
            when('/demo', {templateUrl: 'demo.html',   controller: 'DemoCtrl'}).
            when('/demo1', {templateUrl: 'demo1.html',   controller: 'MapaCtrl'}).
            when('/demo2', {templateUrl: 'demo2.html',   controller: 'FormCtrl'}).
            when('/demo2a/:marca', {templateUrl: 'demo2a.html',   controller: 'JsonCtrl'}).
            when('/demo2b/:marca', {templateUrl: 'demo2b.html',   controller: 'JsonCtrl'}).
            */
			
            otherwise({redirectTo: '/'});
    }]);

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

    app.directive('loadComponent', function() {
        return {
            templateUrl: function(elem, attr){
                return attr.route;
            }
        }
    });
})();
