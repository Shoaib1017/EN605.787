(function () {
"use strict";

angular.module('public').controller('InfoController', InfoController);

InfoController.$inject = ['UserService', 'ApiPath', 'MenuService'];
function InfoController(UserService, ApiPath, MenuService) {
  var infoCtrl = this;
  infoCtrl.basePath = ApiPath;
  infoCtrl.User = UserService.getUser();

  if (infoCtrl.User) {
    MenuService.getSingleItemName(infoCtrl.User.favoriteDish).then(function (result) {
      infoCtrl.menuItem = result;
    });
  }

}
})();