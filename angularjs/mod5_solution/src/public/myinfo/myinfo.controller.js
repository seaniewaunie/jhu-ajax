(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['user', 'MenuService'];
function MyInfoController(user, MenuService) {
  var $ctrl = this;
  $ctrl.user = user;
  if(user){
    var promise = MenuService.getFavorite(user.favorite);

    promise.then(function (response) {
      $ctrl.favoriteItem = response;
    });
  }
}


})();
