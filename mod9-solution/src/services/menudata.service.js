(function () {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('RetreiveAPIData', 'https://davids-restaurant.herokuapp.com');

    MenuDataService.$inject = ['$http', 'RetreiveAPIData'];
    function MenuDataService($http, RetreiveAPIData) {
        var menuService = this;

        menuService.getAllCategories = function () {
            var config = {
                method: "GET",
                url: (RetreiveAPIData + "/categories.json")
            };

            return $http(config).then(function (response) {
                return response.data;
            });
        };

        menuService.getItemsForCategory = function (categoryShortName) {
            var config = {
                method: "GET",
                url: (RetreiveAPIData + "/menu_items.json?category=" + categoryShortName)
            };

            return $http(config).then(function (response) {
                return response.data;
            });
        };
    }

})();