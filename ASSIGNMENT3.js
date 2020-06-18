(function () {
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){

    var menu = this;
    menu.name ="";
    var item1;

    menu.find = function(name){
      menu.founds = new Array();
      menu.lost = 0;
      var promise = MenuSearchService.getMatchedMenuItems(menu.name);
      promise.then(function (menuItems){

        menu.items = menuItems.data;
        item1 = menu.items;
        var j=0;
        if (menu.name.length !=0) {

          for (var i = 0; i<item1.menu_items.length; i++) {
            var h = item1.menu_items[i].description.toLowerCase();
            if (h.includes(menu.name.toLowerCase())){
                      menu.founds[j]=item1.menu_items[i];
                      j++;
                    }
                }
                if (menu.founds.length==0)
              {
                 menu.lost=1;
                }

        }

        else{
              menu.lost=1;
              }
      })
      .catch(function (error){
        console.log(error);
      })

      menu.RemoveItem = function(itemindex){
          var itemRemoved = menu.founds.splice(itemindex,1);
      }

    };
  }


  MenuSearchService.$inject = ['$http','ApiBasePath'];
  function MenuSearchService($http, ApiBasePath){

    var service = this;
    var menuItems;
      var foundItems=[];

      service.getMatchedMenuItems = function(name){

        menuItems = $http({
              method: "GET",
              url: (ApiBasePath + "/menu_items.json"),
          params: {
            menu_items: name
            }
        });

        return menuItems;

      };


  }
})();