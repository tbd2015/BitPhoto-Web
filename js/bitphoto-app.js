(function(){
	var app = angular.module('bitphoto-app', ['ngRoute', 'bitphoto-controllers']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
		    when('/inicio', {templateUrl: 'views/indexguest.html',   controller: 'HomeCtrl'}).
		    when('/registro', {templateUrl: 'views/register.html',   controller: 'HomeCtrl'}).
		    when('/portada', {templateUrl: 'views/home.html',   controller: 'HomeCtrl'}).

		    when('/photostream', {templateUrl: 'views/photostream.html',   controller: 'HomeCtrl'}).
		    when('/cameraroll', {templateUrl: 'views/cameraroll.html',   controller: 'HomeCtrl'}).
		    when('/albums', {templateUrl: 'views/albums.html',   controller: 'HomeCtrl'}).
		    when('/map', {templateUrl: 'views/map.html',   controller: 'HomeCtrl'}).
		    when('/favorites', {templateUrl: 'views/favorites.html',   controller: 'HomeCtrl'}).
		    when('/recentactivity', {templateUrl: 'views/recentactivity.html',   controller: 'HomeCtrl'}).

	        when('/descripcion', {templateUrl: 'descripcion.html',   controller: 'HomeCtrl'}).
	        when('/porque', {templateUrl: 'porque.html',   controller: 'HomeCtrl'}).
	        when('/arquitectura', {templateUrl: 'arquitectura.html',   controller: 'HomeCtrl'}).
	        when('/introduccion', {templateUrl: 'introduccion.html',   controller: 'HomeCtrl'}).
	        when('/integrantes', {templateUrl: 'inicio.html',   controller: 'HomeCtrl'}).
	        when('/tabla-contenido', {templateUrl: 'tabla.html',   controller: 'HomeCtrl'}).
	        when('/ventajas', {templateUrl: 'ventaja.html',   controller: 'HomeCtrl'}).
	        when('/desventajas', {templateUrl: 'desventajas.html',   controller: 'HomeCtrl'}).
	        when('/material', {templateUrl: 'material.html',   controller: 'HomeCtrl'}).
	        when('/comparacion', {templateUrl: 'comparacion.html',   controller: 'HomeCtrl'}).
	        when('/referencias', {templateUrl: 'referencias.html',   controller: 'HomeCtrl'}).
	        when('/demo', {templateUrl: 'demo.html',   controller: 'DemoCtrl'}).
	        when('/demo1', {templateUrl: 'demo1.html',   controller: 'MapaCtrl'}).
	        when('/demo2', {templateUrl: 'demo2.html',   controller: 'FormCtrl'}).
	        when('/demo2a/:marca', {templateUrl: 'demo2a.html',   controller: 'JsonCtrl'}).
	        when('/demo2b/:marca', {templateUrl: 'demo2b.html',   controller: 'JsonCtrl'}).

	        otherwise({redirectTo: '/inicio'});
	}]);
})();
