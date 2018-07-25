angular.module('app.routes', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('guest', {
            url: '/',
            templateUrl: 'login/login.html',
            controller: 'Guest.LoginController as $ctrl'
        })
        .state('admin', {
          url: '/dashboard',
          templateUrl: 'dashboard/dashboard.html',
          controller: 'Admin.DashboardController as $ctrl'
        })
    $urlRouterProvider.otherwise("/");
}])