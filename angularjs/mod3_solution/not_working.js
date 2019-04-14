(function (){
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
        remove: '@'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;


  }


  NarrowItDownController.$inject = ["$scope", "MenuSearchService"]
  function NarrowItDownController($scope, MenuSearchService) {
    var ctrl = this;

    $scope.query="";

    ctrl.found = MenuSearchService.getMatchedMenuItems($scope.query);

    ctrl.narrowList = function (query) {
      console.log(query);
      var promise = MenuSearchService.getMatchedMenuItems(query);

      promise.then(function (found) {
        ctrl.found = found;
        console.log(ctrl.found);
      });
    }

  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath']
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(query) {
      var foundItems = $http({
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
      return foundItems;
    };
  }

})();
