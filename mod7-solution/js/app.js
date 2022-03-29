(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('Dollar', DollarFilter);

 
  // Controller for To Buy
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var items = this;
    items.list = ShoppingListCheckOffService.getToBuyList();
    items.buyItem = function (itemIndex, itemName, itemQuantity, itemPricePerItem) {
      ShoppingListCheckOffService.buyItem(itemIndex, itemName, itemQuantity, itemPricePerItem);
    }
  }

  // Controller for AlreadyBought list
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'DollarFilter'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var items = this;
    items.list = ShoppingListCheckOffService.getBoughtList();
  }

  // Service for Shopping list
  function ShoppingListCheckOffService() {
    var shoppingService = this;

    // List of items to buy
    var toBuyList =  [
        {name: "Sodas", quantity: 1, pricePerItem: 1.50},
        {name: "Gatorades", quantity: 1, pricePerItem: 3.00},
        {name: "Wines", quantity: 2, pricePerItem: 8.00},
        {name: "Protein Shakes", quantity: 3, pricePerItem: 12.50},
        {name: "Coffee", quantity: 1, pricePerItem: 2.00},
        {name: "Slurpies", quantity: 2, pricePerItem: 3.50}
      ];
    // List of bought items
    var boughtList = [];

    // Function to buy the item of the list 
    shoppingService.buyItem = function (itemIndex) {
      var itemBoughtbyUser = toBuyList.splice(itemIndex, 1);
      boughtList.push({'name': itemBoughtbyUser[0].name,'quantity':  itemBoughtbyUser[0].quantity,'pricePerItem':  itemBoughtbyUser[0].pricePerItem});
    }

    shoppingService.getToBuyList = function () {
      return toBuyList;
    }

    shoppingService.getBoughtList = function () {
      return boughtList;
    }
  }

  function DollarFilter() {
    return function (input) {
      input = input || 0.00;
      return "$$$" + input.toFixed(2);
    }
  }
})();