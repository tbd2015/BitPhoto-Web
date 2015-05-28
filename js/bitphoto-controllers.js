(function(){
	var app = angular.module('bitphoto-controllers',[]);

	app.controller('LoginCtrl', function($scope) {
	    $scope.formData = {};
	    
		$scope.submitLogin = function (formData) {
			loginData = JSON.stringify(formData);
			console.log("Se procede a Iniciar Sesión con" + loginData);
			// TODO ruta logeado			
		};
	});

	app.controller('RegisterCtrl', function($scope) {
	    $scope.formData = {};
	    
		$scope.submitRegister = function (formData) {
			if ($scope.registerForm.$valid && formData.password1===formData.password2) {
				registerData = JSON.stringify(formData);
				console.log("Se procede a hacer Registro con" + registerData);
				// TODO ruta registrado
			}
			else {
				console.log("Formulario Inválido!")
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
