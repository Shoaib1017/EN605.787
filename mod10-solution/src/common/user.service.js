(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


  UserService.$inject = [];
function UserService() {
  var service = this;
  var savedUser;

 service.saveUser = function (user) {
    savedUser = user;
  };

 service.getUser = function () {
    return savedUser;
  }

}
})();