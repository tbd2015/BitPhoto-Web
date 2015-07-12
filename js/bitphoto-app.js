(function(){
    var app = angular.module('bitphoto-app', ['ngRoute', 'ngCookies', 'angular-md5', 'bitphoto-controllers', 'bitphoto-services']);
    
    app.value('parms', {
        serverPath: "http://localhost:8080/BitPhoto"
    });

    app.config(['$routeProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {templateUrl: 'views/indexguest.html',   controller: 'HomeCtrl'}).
            when('/registro', {templateUrl: 'views/register.html',   controller: 'HomeCtrl'}).
            when('/portada', {templateUrl: 'views/home.html',   controller: 'HomeCtrl'}).

            when('/photostream', {templateUrl: 'views/photostream.html',   controller: 'UserCtrl'}).
            when('/cameraroll', {templateUrl: 'views/cameraroll.html',   controller: 'UserCtrl'}).
            when('/albumes', {templateUrl: 'views/albums.html',   controller: 'UserCtrl'}).
            when('/mapa', {templateUrl: 'views/map.html',   controller: 'UserCtrl'}).
            when('/favoritas', {templateUrl: 'views/favorites.html',   controller: 'UserCtrl'}).
            when('/actividad', {templateUrl: 'views/recentactivity.html',   controller: 'UserCtrl'}).

            when('/fotos-de', {templateUrl: 'views/photos-from.html',   controller: 'HomeCtrl'}).
            when('/fotos-con', {templateUrl: 'views/photos-of.html',   controller: 'HomeCtrl'}).

            when('/recientes', {templateUrl: 'views/recentphotos.html',   controller: 'HomeCtrl'}).
            when('/mapa-mundial', {templateUrl: 'views/worldmap.html',   controller: 'HomeCtrl'}).
            when('/camaras', {templateUrl: 'views/camerafinder.html',   controller: 'HomeCtrl'}).

            when('/subida', {templateUrl: 'views/upload.html',   controller: 'UploadCtrl'}).

            when('/foto/:id', {templateUrl: 'views/view-photo.html',   controller: 'PhotoCtrl'}).
            when('/album/:id', {templateUrl: 'views/view-album.html',   controller: 'AlbumCtrl'}).
            
            when('/testhola', {templateUrl: 'views/holamundo.html',   controller: 'TestCtrl'}).
            when('/testalbum', {templateUrl: 'views/view-album.html',   controller: 'TestCtrl'}).

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
            var restrictedPage = $.inArray($location.path(), ['/', '/registro','/testhola','/testalbum']) === -1;
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
