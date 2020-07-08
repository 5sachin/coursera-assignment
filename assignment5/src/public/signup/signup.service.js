(function() {
    'use strict'

    angular.module('public')
    .service('SignUpService', SignUpService);

    SignUpService.$inject = ['ApiPath', '$http'];
    function SignUpService(ApiPath, $http) {
        var service = this;

        // stores user data
        service.userData = {};

        // check if a shortname inserted exists in the database
        service.getShortNameItem = function(shortNameSearched) {
            let result = $http({
                method: 'GET',
                url: (ApiPath + '/menu_items/' + shortNameSearched + '.json')
            })
            .then(function success(response) {
                //console.log("service: searched shortname: " , response.data);
                response.myResult = "Dish found!";

                return response;
            }, 
            // if favoirite dish inserted not found
            function failure(response) {
                console.log(response);

                switch (response.data.status) {
                    case '500':
                        console.log("case 500");
                        // return response.data || 'This dish does not exist'
                        response.myResult = 'This dish does not exist'
                        return response;
                        break;

                    case '404':
                        console.log("case 404");
                        response.myResult = 'Error 404 while contacting server'
                        return response;
                        break;
                
                    default:
                        console.log("case default");
                        return response;
                        break;
                }
                
            })

            return result;
        };

        service.storeUserData = function(userPreferences) {
            console.log('userpref: ', userPreferences);
            service.userData = userPreferences;
        };

        service.getUserData = function() {
            return service.userData;
        }
    }
})();