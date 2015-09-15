(function () {
    'use strict';
 
    angular
        .module('bitphoto-app')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$scope', '$location', 'AuthenticationService', 'FlashService', 'md5'];
    function LoginController($scope, $location, AuthenticationService, FlashService, md5) {
        var vm = this;
 
        vm.login = login;
        
        vm.mensaje = "";
 
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
 
        function login() {
            vm.dataLoading = true;
            vm.hashedPassword = md5.createHash(vm.password);
            AuthenticationService.Login(vm.email, vm.hashedPassword, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.email, vm.password);
                    console.log("BP-LOG: Login exitoso!");
                    $scope.mensaje = "Login exitoso!";
                    $location.path('/portada');
                    vm.dataLoading = false;
                } else {
                    console.log("BP-LOG: Login inválido! " + response.message);
                    FlashService.Error(response.message);
                    $scope.mensaje = response.message;
                    vm.dataLoading = false;
                }
            });
        };
    }
 
})();