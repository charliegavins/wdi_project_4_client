angular
  .module('tipJar')
  .run(function (ActionCableConfig){
    // ActionCableConfig.wsUri= "wss://example.com/cable";
    ActionCableConfig.debug = true;
  });
