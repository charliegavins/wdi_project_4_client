angular
  .module('tipJar')
  .run(['ActionCableConfig', function (ActionCableConfig){
    // ActionCableConfig.wsUri= "wss://example.com/cable";
    ActionCableConfig.debug = true;
  }]);

// ActionCable.$inject = ['ActionCableConfig'];
//
// angular
//   .module('tipJar')
//   .factory('User', userFactory);
//
// userFactory.$inject = ['API', '$resource'];
// function userFactory(API, $resource){
