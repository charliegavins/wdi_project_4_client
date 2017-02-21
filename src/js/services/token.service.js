angular
  .module('tipJar')
  .service('TokenService', TokenService);

TokenService.$inject = ['$window', 'jwtHelper'];
function TokenService($window, jwtHelper) {
  const self = this;

  self.setToken = (token) => {
    return $window.localStorage.setItem('auth-token', token);
  };

  self.getToken = () => {
    return $window.localStorage.getItem('auth-token');
  };

  self.decodeToken = () => {
    //this gets the token
    const token = self.getToken();
    //if the token exists then use jwtHelper decode token, otherwise null (don't do anything really)
    return token ? jwtHelper.decodeToken(token) : null;
  };
}
