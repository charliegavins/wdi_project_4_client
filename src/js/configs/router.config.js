angular
.module('tipJar')
.config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function Router($stateProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html',
    controller: 'HomeCtrl',
    controllerAs: 'home'
  });
  $stateProvider
  .state('transactionsCreate', {
    url: '/transactions/new',
    templateUrl: '/js/views/transactions/new.html',
    controller: 'TransactionsCreateCtrl',
    controllerAs: 'transactionsCreate'
  });
  $stateProvider
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'UserRegisterCtrl',
    controllerAs: 'register'
  });
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'UserLoginCtrl',
    controllerAs: 'login'
  });
    $urlRouterProvider.otherwise('/');
}
