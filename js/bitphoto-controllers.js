(function(){
	var app = angular.module('bitphoto-controllers',[]);

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
	    UserDataFactory.nombre().then(function(f){ $scope.nombre = f });
	    UserDataFactory.apellido().then(function(f){ $scope.apellido = f });
	    UserDataFactory.apodo().then(function(f){ $scope.apodo = f });
	    UserDataFactory.descripcion().then(function(f){ $scope.descripcion = f });
	});

	app.controller('HomeCtrl', function($scope) {
	    $scope.variable = "";
	});

	app.controller('UploadCtrl', function($scope) {
		$scope.variable = "";
	});
})();