(function (){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject= ["$scope", "$filter"];

  function LunchCheckController ($scope, $filter) {
    $scope.message = "Please enter data first!";
    $scope.dishes = "";
    $scope.messageStyle = {color: "red", border: "2px solid red"};

    $scope.checkLunch = function () {
      var lunchArray = $scope.dishes.split(",").filter((str)=>{return str.match(/\S/)} );
      if(lunchArray.length <= 3 && lunchArray.length > 0){
        $scope.message = "Enjoy!";
        $scope.messageStyle = {color: "green", border: "2px solid green"};
      }
      else if(lunchArray.length > 3){
        $scope.message = "Too much!";
        $scope.messageStyle = {color: "green", border: "2px solid green"};
      }
      else {
        $scope.message = "Please enter data first!";
        $scope.messageStyle = {color: "red"};
      }
    };
  }

})();
