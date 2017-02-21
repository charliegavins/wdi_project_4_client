angular
  .module('tipJar')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state'];



function MainCtrl($rootScope, CurrentUserService, $state) {

  const vm = this;

  vm.logout = () => {
    CurrentUserService.removeUser();
  };
  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    $state.go('login');
  });
  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
  });
}
