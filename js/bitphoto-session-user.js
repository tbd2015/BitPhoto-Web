(function () {
    'use strict';
 
    angular
        .module('bitphoto-app')
        .factory('UserService', UserService);
 
    UserService.$inject = ['$http', 'md5', 'parms'];
    function UserService($http, md5, parms) {
        var service = {};
         
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.GetByEmail = GetByEmail;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
 
        return service;
 
        function GetAll() {
            return $http.get(parms.serverPath + '/usuarios').then(handleSuccess, handleError('Error getting all users'));
        }
 
        function GetById(id) {
            return $http.get(parms.serverPath + '/usuarios/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByEmail(email) {
            return $http.get(parms.serverPath + '/usuarios', { params: { email: email } } ).then(handleSuccess, handleError('Error getting user by email'));
            //return $http.get(serverUrl + '/usuarios/' + email).then(handleSuccess, handleError('Error getting user by email'));
        }
 
        function GetByUsername(username) {
            return $http.get(parms.serverPath + '/usuarios', { params: { username: username } }).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            var u = user;
            u.contrasena = md5.createHash(user.contrasena);
            console.log(u);
            return $http.post(parms.serverPath + '/register', u).then(handleSuccess, handleError('Error creating user'));
        }
 
        function Update(user) {
            return $http.put(serverUrl + '/usuarios/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }
 
        function Delete(id) {
            return $http.delete(serverUrl + '/usuarios/' + user.id).then(handleSuccess, handleError('Error deleting user'));
        }
 
        // private functions
 
        function handleSuccess(data) {
            return data.data;
        }
 
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
 
})();