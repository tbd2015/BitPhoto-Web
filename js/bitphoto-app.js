(function(){
	var app = angular.module('bitphoto-app', ['ngRoute', 'bitphoto-controllers']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
		    when('/inicio', {templateUrl: 'views/indexguest.html',   controller: 'HomeCtrl'}).
		    when('/registro', {templateUrl: 'views/register.html',   controller: 'HomeCtrl'}).
		    when('/portada', {templateUrl: 'views/home.html',   controller: 'HomeCtrl'}).

		    when('/photostream', {templateUrl: 'views/photostream.html',   controller: 'HomeCtrl'}).
		    when('/cameraroll', {templateUrl: 'views/cameraroll.html',   controller: 'HomeCtrl'}).
		    when('/albumes', {templateUrl: 'views/albums.html',   controller: 'HomeCtrl'}).
		    when('/mapa', {templateUrl: 'views/map.html',   controller: 'HomeCtrl'}).
		    when('/favoritas', {templateUrl: 'views/favorites.html',   controller: 'HomeCtrl'}).
		    when('/actividad', {templateUrl: 'views/recentactivity.html',   controller: 'HomeCtrl'}).

		    when('/fotos-de', {templateUrl: 'views/photos-from.html',   controller: 'HomeCtrl'}).
		    when('/fotos-con', {templateUrl: 'views/photos-of.html',   controller: 'HomeCtrl'}).

		    when('/recientes', {templateUrl: 'views/recentphotos.html',   controller: 'HomeCtrl'}).
		    when('/mapa-mundial', {templateUrl: 'views/worldmap.html',   controller: 'HomeCtrl'}).
		    when('/camaras', {templateUrl: 'views/camerafinder.html',   controller: 'HomeCtrl'}).

		    when('/subida', {templateUrl: 'views/upload.html',   controller: 'UploadCtrl'}).

		    /*
	        when('/demo', {templateUrl: 'demo.html',   controller: 'DemoCtrl'}).
	        when('/demo1', {templateUrl: 'demo1.html',   controller: 'MapaCtrl'}).
	        when('/demo2', {templateUrl: 'demo2.html',   controller: 'FormCtrl'}).
	        when('/demo2a/:marca', {templateUrl: 'demo2a.html',   controller: 'JsonCtrl'}).
	        when('/demo2b/:marca', {templateUrl: 'demo2b.html',   controller: 'JsonCtrl'}).
			*/
			
	        otherwise({redirectTo: '/inicio'});
	}]);
})();
