(function (){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject= ["$scope", "ShoppingListCheckOffService"];
  function ToBuyController ($scope, ShoppingListCheckOffService) {
    var toBuyController = this;

    $scope.quantity = 0;

    toBuyController.getToBuyList = function(){
      return ShoppingListCheckOffService.getToBuyList();
    }
    toBuyController.isToBuyListEmpty = function(){
      return ShoppingListCheckOffService.isToBuyListEmpty();
    }
    toBuyController.buy = function(itemIndex, quantity){
      return ShoppingListCheckOffService.buy(itemIndex, quantity);
    }
  }

  AlreadyBoughtController.$inject= ["$scope", "$filter", "ShoppingListCheckOffService"];
  function AlreadyBoughtController ($scope, $filter, ShoppingListCheckOffService) {
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
      {name: "cookies", pricePerItem: 0.2},
      {name: "soda bottles", pricePerItem: 1},
      {name: "yum yums", pricePerItem: 10},
      {name: "scrumptious goodness", pricePerItem: 20},
      {name: "apples", pricePerItem: 5},
    ];

    var boughtList = [];

    service.buy = function(itemIndex, quantity) {
      toBuyList[itemIndex].quantity = quantity;
      var boughtItem = {
        ...toBuyList[itemIndex],
        totalPrice: toBuyList[itemIndex].quantity * toBuyList[itemIndex].pricePerItem
      };
      boughtList.push(boughtItem);
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
