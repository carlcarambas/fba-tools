'use strict';

function LoginSvc($http, $sessionStorage, projConstants){

  function login(username, password) {
    let auth = btoa(`${username}:${password}`)
    return $http.get(projConstants.loginUrl, {
      headers: {
        'Authorization': 'Basic ' + auth
      }
    })
      .then(res => {
        let ret = res.data || {};
        if ( res.status == 200 ) {
          ret = res.data;
          $sessionStorage.user = ret.user;
          ret.message = 'Login successful'
        } else {
          ret = {
            authenticated: false,
            message: `${res.status} ${res.statusText}`
          }
        }
        return ret;
      })
      .catch(err => {
        return {
          authenticated: false,
          message: `${err.status} ${err.statusText}`
        }
      })
  }

  function logout() {
    $sessionStorage.user = null;
  }

  return {
    login: login,
    logout: logout
  }

}

const serviceConfig = [
  '$http',
  '$sessionStorage',
  'projConstants',
  LoginSvc
]

angular.module('proj')
  .factory('LoginSvc', serviceConfig)

module.exports = {
  name: 'LoginSvc',
  factory: serviceConfig
}
