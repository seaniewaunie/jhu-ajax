(function (){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject= ["$scope", "ShoppingListCheckOffService"];
  function ToBuyController ($scope, ShoppingListCheckOffService) {
    var toBuyController = this;

    toBuyController.getToBuyList = function(){
      return ShoppingListCheckOffService.getToBuyList();
    }
    toBuyController.isToBuyListEmpty = function(){
      return ShoppingListCheckOffService.isToBuyListEmpty();
    }
    toBuyController.buy = function(itemIndex){
      return ShoppingListCheckOffService.buy(itemIndex);
    }
  }

  AlreadyBoughtController.$inject= ["$scope", "ShoppingListCheckOffService"];
  function AlreadyBoughtController ($scope, ShoppingListCheckOffService) {
    var alreadyBoughtController = this;

    alreadyBoughtController.getBoughtList = function(){
      return ShoppingListCheckOffService.getBoughtList();
    }
    alreadyBoughtController.isBoughtListEmpty = function(){
      return ShoppingListCheckOffService.isBoughtListEmpty();
    }
  }

  function ShoppingListCheckOffService(){
    var service = this;

    var toBuyList = [
      {name: "cookies", quantity: 10},
      {name: "soda bottles", quantity: 10},
      {name: "yum yums", quantity: 100},
    ];

    var boughtList = [];

    service.buy = function(itemIndex) {
      boughtList.push(toBuyList[itemIndex]);
      toBuyList.splice(itemIndex, 1);
    }

    service.getBoughtList = function(){
      return boughtList;
    }
    service.getToBuyList = function(){
      return toBuyList;
    }
    service.isBoughtListEmpty = function(){
      return boughtList.length === 0;
    }
    service.isToBuyListEmpty = function(){
      return toBuyList.length === 0;
    }
  }

})();
