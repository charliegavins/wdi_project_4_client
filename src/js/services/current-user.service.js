angular
  .module('tipJar')
  .service('CurrentUserService', CurrentUserService);
//rootscope allows us to send out a signal that can be listened to across the module.
CurrentUserService.$inject = ['TokenService'];
function CurrentUserService(TokenService) {
  const self = this;

  self.getUser = () => {
    const decoded = TokenService.decodeToken();
  };
}
