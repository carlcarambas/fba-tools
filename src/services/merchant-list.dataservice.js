'use strict';
(function(){
    angular
    .module('proj')
    .factory('app.merchant-list.dataservice', Service);

    Service.$inject = ['$q', '$timeout', '$http'];

    function Service ($q, $timeout, $http) {

        var services = {

            getMerchantList : getMerchantList

        }

        return services;

        function getMerchantList() {
            return $http.get("http://localhost:3000/api/merchant")
            .then(function(response) {
                console.log(response.data);
                return response;
            });
        }

  }
})();
