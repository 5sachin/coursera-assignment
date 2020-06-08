(function () {
'use strict';
var boughtitems = [];
var items = [{
    name : "milk",
    quantity: "2"
  },
  {
    name: "Chocolates",
    quantity: "4"
  },
  {
    name: "Tea Packets",
    quantity: "3"
  },
  {
    name: "SALT",
    quantity: "1"
  },
  {
    name: "CHIPS",
    quantity: "3"
  }
  ];

angular.module('ShoppingListApp', [])
.controller('ShoppingListAddController', ShoppingListAddController)
.controller('ShoppingListShowController', ShoppingListShowController)
.provider('ShoppingList', ShoppingListProvider)
.config(Config);

Config.$inject = ['ShoppingListProvider'];
function Config(ShoppingListProvider) {
  ShoppingListProvider.defaults.maxItems = 4;
}

ShoppingListAddController.$inject = ['ShoppingList'];
function ShoppingListAddController(ShoppingList) {
  var tobuy = this;

  tobuy.items = ShoppingList.getItems();
 

    tobuy.removeItem = function (itemIndex) {
    tobuy.Name = tobuy.items[itemIndex].name;
    tobuy.Quantity = tobuy.items[itemIndex].quantity;
    ShoppingList.removeItem(itemIndex);
    try
    {
      
        ShoppingList.addItem(tobuy.Name, tobuy.Quantity);

    }
    catch(error)
    {
      tobuy.errorMessage = error.message;

    }
    
  };
   
}


ShoppingListShowController.$inject = ['ShoppingList'];
function ShoppingListShowController(ShoppingList) {
    
    var bought = this;
    bought.items = ShoppingList.getBought();
}


// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;
  
  // List of shopping items
  

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (boughtitems.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      boughtitems.push(item);
      
    }
    else {
      throw new Error("EVERY THING IS BOUGHT");      
    }

  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
  service.getBought = function(){
    return boughtitems;
  };
}


function ShoppingListProvider() {
  var provider = this;
  provider.defaults = {
    maxItems: 100
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);
    return shoppingList;
  };
}

})();