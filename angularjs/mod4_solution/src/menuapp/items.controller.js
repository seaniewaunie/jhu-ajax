(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// Version with resolving to 1 item based on $stateParams in route config
ItemsController.$inject = ['categoryItems'];
function ItemsController(categoryItems) {
  var items = this;
  items.items = categoryItems.data.menu_items;
  items.category = categoryItems.data.category;

  console.log(categoryItems);
  console.log(items.items)
  console.log(items.category)
}

})();
