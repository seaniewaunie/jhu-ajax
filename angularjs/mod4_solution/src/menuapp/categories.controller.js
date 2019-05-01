(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['items'];
function CategoriesController(items) {
  var categories = this;
  console.log(items)
  categories.items = items.data;
}

})();
