(function() {
    'use strict';

    var infoController = function(MenuService, ApiPath) {
        var vm = this;
        vm.apiPath = ApiPath;
        vm.signedUp = false;
        console.log(vm.user);
        vm.user = MenuService.getUser();
        console.log('User is', vm.user.firstName);
        if (angular.equals(vm.user, {})) {
            vm.signedUp = false;
        } else {
            vm.signedUp = true;
        }
        console.log(vm.signedUp);
    };

    infoController.$inject = ['MenuService', 'ApiPath'];
    angular.module('public').controller('InfoController', infoController);
})();