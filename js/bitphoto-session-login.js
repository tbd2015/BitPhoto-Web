(function () {
    'use strict';
 
    angular
        .module('bitphoto-app')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'md5'];
    function LoginController($location, AuthenticationService, FlashService, md5) {
        var vm = this;
 
        vm.login = login;
 
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
                    $location.path('/portada');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }
 
})();