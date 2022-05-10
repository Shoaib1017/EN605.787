(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserService'];
function SignUpController(MenuService, UserService) {
  var signUpCtrl = this;
  signUpCtrl.firstName = "";
  signUpCtrl.lastName = "";
  signUpCtrl.email = "";
  signUpCtrl.phoneNumber = "";
  signUpCtrl.favoriteItem = "";
  signUpCtrl.completed = false;
  signUpCtrl.invalidShortName = false;
 

  signUpCtrl.submit = function(){
    // create a new user object to be saved
    if(signUpCtrl.invalidShortName === false) {
     const newUserData = {
        firstName: signUpCtrl.firstName,
        lastName: signUpCtrl.lastName,
        email: signUpCtrl.email,
        phone: signUpCtrl.phoneNumber,
        favoriteDish: signUpCtrl.favoriteItem
      };

      UserService.saveUser(newUserData);
      signUpCtrl.completed = true;
    } else {
      console.log("Failed");
    }
  }

  signUpCtrl.fetchMenuItemShortName = function () {
        var result = MenuService.getSingleItemName(signUpCtrl.favoriteItem);
        result.then( function () {
            signUpCtrl.invalidShortName = false;
        }, function () {
            signUpCtrl.invalidShortName = true;
        });
    };
}

})();