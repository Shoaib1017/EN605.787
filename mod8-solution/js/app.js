(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

  // Controller to call the Service
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var self = this;

    self.found = [];
    self.nothingFound = false;

    self.narrow = function (itemToSearch) {
      if (itemToSearch) {
        MenuSearchService.getMatchedMenuItems(itemToSearch)
        .then(function (result) {
          if (result === undefined || result.length == 0) {
            self.nothingFound = true;
            self.found = [];
          } else {
            self.nothingFound = false;
            self.found = result;
          }
        })
        .catch(function (err) {
          console.log('Error Retreiving from Service', err);
        });
      } else {
        self.nothingFound = true;
        self.found = [];
      }
    };

    self.remove = function (index) {
      self.found.splice(index, 1);
    };
  }

  // Service Implementation to grab menu items
  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var self = this;

    self.getMatchedMenuItems = function (itemToSearch) {
      return $http({
        method: 'GET', 
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {
        return result.data.menu_items.filter(item => item.description.toLowerCase().includes(itemToSearch));
      });
    };
  }

  // Implementation of Directive
  function FoundItemsDirective() {
    var directive = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'controller',
      bindToController: true
    };
    return directive;
  }

  // Controller for the Directive
  function FoundItemsDirectiveController() {
    var self = this;
  }
})();