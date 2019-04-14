(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true,
    link: FoundItemsDirectiveLink
  };

  return ddo;
}


function FoundItemsDirectiveLink(scope, element, attrs, controller) {

}


function FoundItemsDirectiveController() {
  var list = this;

}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var viewList = this;

  viewList.query = ""

  viewList.narrowList = function (query) {
    var promise = MenuSearchService.getMatchedMenuItems(query);

    promise.then(function (found) {
      viewList.found = found;
    });
  }

  viewList.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(viewList.found, itemIndex);
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(query) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    })
    .then(function(response) {

      var matchedItems = [];

      for(var item in response.data){
        //console.log(response.data);
        var name = response.data[item].name;
        if (name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
          matchedItems.push(response.data[item]);
        }
      }
      return matchedItems;
    });
  };

  service.removeItem = function (list, itemIndex){
    list.splice(itemIndex, 1);
    return list;
  }
}


})();
