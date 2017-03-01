angular
  .module('tipJar')
  .controller('UserRegisterCtrl', UserRegisterCtrl);

UserRegisterCtrl.$inject = ['$rootScope','$state', '$http','User'];
function UserRegisterCtrl($rootScope, $state, $http, User) {
  const vm = this;

  vm.register = () => {
    User
  .register(vm.user).$promise
  .then(data => {
    $rootScope.$broadcast('loggedIn');
  }, err => {
    console.log(err);
  });
  };
}
