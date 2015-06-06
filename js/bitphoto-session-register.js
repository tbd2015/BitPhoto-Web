(function () {
    'use strict';
 
    angular
        .module('bitphoto-app')
        .controller('RegisterController', RegisterController);
 
    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService', 'md5'];
    function RegisterController(UserService, $location, $rootScope, FlashService, md5) {
        var vm = this;
 
        vm.register = register;
 
        function register() {
            vm.dataLoading = true;
            vm.user.password = md5.createHash(vm.user.password);
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }
 
})();