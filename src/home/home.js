'use strict';
var angular = require('angular');
require('../css/home.css')

angular.module('proj')
  .controller('homeCtrl', homeCtrl)
  .config(['$stateProvider', routeConfig])

var stateConfig = {
  name: 'home',
  url: '/home',
  templateUrl: require('./home.html'),
  controller: 'homeCtrl',
  controllerAs: '$ctrl'
};

function routeConfig($stateProvider) {
  $stateProvider.state(stateConfig)
}

homeCtrl.$inject = [
  '$scope',
  '$sessionStorage',
  '$state', '$filter',
  'LoginSvc', 'app.merchant-list.dataservice'
]

function homeCtrl(
  $scope,
  $sessionStorage,
  $state, $filter,
  LoginSvc, merchantListDataService
) {

  $scope.title = 'proj';
  $scope.navBar = require('../includes/navbar.html')
  $scope.links = $state.get()
    .filter(x => x.name.startsWith('home.'))
    .map(x => {
      return {
        title: x.url.slice(1),
        link: $state.href(x.name)
      }
    });



  $scope.signout = signout;

  var vm = this;
  vm.data = {};
  vm.merchantData = [];
  vm.orderField = 'itemName';
  vm.searchFilter = '';
  vm.$onInit = activate;
  return;


  function activate() {

    merchantListDataService.getMerchantList()
      .then(function (results) {
        vm.merchantData = results.data;
      });

  }

  function signout() {
    LoginSvc.logout()
    $state.go('login')
  }

}

module.exports = stateConfig;
