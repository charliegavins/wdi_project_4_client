angular
  .module('tipJar')
  .controller('UserRegisterCtrl', UserRegisterCtrl);

UserRegisterCtrl.$inject = ['$state', '$http','User'];
function UserRegisterCtrl($state, $http, User) {
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
