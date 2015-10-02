var app = angular.module('app', ['ionic']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider.state('login', {
        url: "/login",
        templateUrl: "login.html",
        controller: "gotohome"
    })
        .state('home', {
            url: "/home",
            templateUrl: "home.html",
            controller: "contr"
        })
        .state('detail', {
            url: "/detail/:id",
            templateUrl: "detail.html",
            controller: "detailCtrl"
        });

});