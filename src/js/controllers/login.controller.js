angular
  .module('tipJar')
  .controller('UserLoginCtrl', UserLoginCtrl);

UserLoginCtrl.$inject = ['$http', '$state'];
function UserLoginCtrl($http, $state) {
  const vm =this;

  vm.login = () => {
    return $http
    .post('http://localhost:4000/login', vm.user).then((response) => {
      console.log(response);
    });
  };
}
