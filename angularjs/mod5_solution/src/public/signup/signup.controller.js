(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);


SignupController.$inject = ['MenuService', '$scope', 'UserService'];
function SignupController(MenuService, $scope, UserService) {
  var $ctrl = this;

  $ctrl.submit = function () {
    $ctrl.completed = true;
    UserService.saveUser($ctrl.user);
  };

  $ctrl.verifyFavorite = function () {
    var promise = MenuService.verifyFavorite($ctrl.user.favorite);

    promise.then(function (response) {
      if(response === true) {
        console.log("setting ng-valid to true");
        $ctrl.favoriteIsValid = true;
        $scope.regForm.favorite.$setValidity("ng-valid", true);
      }
      else{
        $scope.regForm.favorite.$setValidity("ng-valid", false);
      }
    });

  }
}

})();
