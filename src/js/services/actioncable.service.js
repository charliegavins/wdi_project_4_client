angular
.module('tipJar')
.factory('ActionCable', ActionCable);


ActionCable.$inject = ['$scope', 'ActionCableChannel'
];
function ActionCable($scope, ActionCableChannel){
  const vm = this;
  vm.inputText = '';
  vm.myData = [];


      // connect to ActionCable
  vm.user = new ActionCableChannel('ApiController', {key: 'empty objara'});

  vm.callback = function(message){
    $scope.myData.push(message); 
  };

  vm.user.subscribe(callback)
      .then(function(){
        $scope.sendToMyChannel = function(message){
          user.send(message, 'send_a_message'); 
        };
        $scope.$on('$destroy', function(){
          user.unsubscribe().then(function(){
            $scope.sendToMyChannel = undefined;
          });
        });
      });
}
