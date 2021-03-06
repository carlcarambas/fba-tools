'use strict';
function projTable(){
  return {
    restrict: 'A',
    scope: {
      rows: '=data'
    },
    templateUrl: require('./proj-table.html'),
    link: function(scope, element, attrs, controller, transcludeFn){
      var unwatch = scope.$watch('rows', (nv, ov) => {
        if ( !!nv ) {
          unwatch();
          launch();
        }
      })
      function launch() {
        scope.headers = scope.rows.shift();
        console.log(scope.headers, scope.rows)
      }
    }
  }
}

angular.module('proj')
  .directive('projTable', projTable)

module.exports = {
  name: 'projTable',
  directive: projTable
}

