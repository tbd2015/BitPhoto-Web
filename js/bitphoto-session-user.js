(function () {
    'use strict';
 
    angular
        .module('bitphoto-app')
        .factory('UserService', UserService);
 
    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
        var serverUrl = "http://localhost:4000";
 
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.GetByEmail = GetByEmail;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
 
        return service;
 
        function GetAll() {
            return $http.get(serverUrl + '/usuarios').then(handleSuccess, handleError('Error getting all users'));
        }
 
        function GetById(id) {
            return $http.get(serverUrl + '/usuarios/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByEmail(email) {
            return $http.get(serverUrl + '/usuarios/' + email).then(handleSuccess, handleError('Error getting user by email'));
        }
 
        function GetByUsername(username) {
            return $http.get(serverUrl + '/usuarios/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post(serverUrl + '/usuarios', user).then(handleSuccess, handleError('Error creating user'));
        }
 
        function Update(user) {
            return $http.put(serverUrl + '/usuarios/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }
 
        function Delete(id) {
            return $http.delete(serverUrl + '/usuarios/' + user.id).then(handleSuccess, handleError('Error deleting user'));
        }
 
        // private functions
 
        function handleSuccess(data) {
            return data;
        }
 
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
 
})();