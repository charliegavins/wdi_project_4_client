angular
  .module('tipJar')
  .controller('ApiCtrl', ApiCtrl);

  ApiCtrl.$inject = [];
  function ApiCtrl() {

    vm.api = (data) => {
      console.log(data);
    }

  }
