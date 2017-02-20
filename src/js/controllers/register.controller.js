angular
  .module('tipJar')
  .controller('UserRegisterCtrl', UserRegisterCtrl);

UserRegisterCtrl.$inject = ['$state', '$http'];
function UserRegisterCtrl($state, $http) {
  const vm = this;

  vm.register = () => {
    return $http
    .post('http://localhost:4000/register', vm.user).then((response) => {
      console.log(response);
    });
  };
}
