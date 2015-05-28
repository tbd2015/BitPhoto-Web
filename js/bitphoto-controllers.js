(function(){
	var app = angular.module('bitphoto-controllers',[]);

	var JsonServer = "http://localhost:4000";

	app.controller('SessionCtrl', function($scope, $location) {
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
	});

	app.controller('HomeCtrl', function($scope) {
	    $scope.variable = "";
	});

	app.controller('UploadCtrl', function($scope) {
		$scope.variable = "";
	});
})();
