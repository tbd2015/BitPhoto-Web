(function(){
	var app = angular.module('bitphoto-app', ['ngRoute', 'ngCookies', 'bitphoto-controllers', 'bitphoto-services']);

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

		    /*
	        when('/demo', {templateUrl: 'demo.html',   controller: 'DemoCtrl'}).
	        when('/demo1', {templateUrl: 'demo1.html',   controller: 'MapaCtrl'}).
	        when('/demo2', {templateUrl: 'demo2.html',   controller: 'FormCtrl'}).
	        when('/demo2a/:marca', {templateUrl: 'demo2a.html',   controller: 'JsonCtrl'}).
	        when('/demo2b/:marca', {templateUrl: 'demo2b.html',   controller: 'JsonCtrl'}).
			*/
			
	        otherwise({redirectTo: '/inicio'});
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
            var restrictedPage = $.inArray($location.path(), ['/', '/registro']) === -1;
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
    }});
})();
