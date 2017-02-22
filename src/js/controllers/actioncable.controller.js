angular
.module('tipJar')
.service('ActionCableCtrl', ActionCableCtrl)


ActionCableCtrl.$inject = ['$rootScope','$scope', 'ActionCableChannel', '$scopeProvider'
];
 function ActionCableCtrl($scope, $rootScope, ActionCableChannel){
      const vm = this;
      vm.inputText = "";
      vm.myData = [];


      // connect to ActionCable
      vm.user = new ActionCableChannel("ApiController", {key: 'empty objara'});

      vm.callback = function(message){ $scope.myData.push(message); };

      vm.user.subscribe(callback)
      .then(function(){
        $scope.sendToMyChannel = function(message){ user.send(message, 'send_a_message'); };
        $scope.$on("$destroy", function(){
          user.unsubscribe().then(function(){ $scope.sendToMyChannel = undefined;
          });
        });
      });
    }
