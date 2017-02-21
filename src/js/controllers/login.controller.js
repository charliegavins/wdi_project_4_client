angular
  .module('tipJar')
  .controller('UserLoginCtrl', UserLoginCtrl);

UserLoginCtrl.$inject = ['$http', '$state','TokenService', 'API', '$rootScope','User'];
function UserLoginCtrl($http, $state, TokenService, API, $rootScope, User) {
  const vm =this;
  vm.login = () => {
      User
        .login(vm.user).$promise
        .then(data => {
          console.log(data);
          $rootScope.$broadcast('loggedIn');
                $state.go('home');
        }, err => {
          console.log(err);
        });
    };
}
