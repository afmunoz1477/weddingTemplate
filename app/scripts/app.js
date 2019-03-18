'use strict';

/**
 * Andrés Muñoz
 *
 * Main module of the application.
 */
 var app = angular.module('Babie&Charlie', ['ui.router']);

 app.config(function($stateProvider, $urlRouterProvider) {
     
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
        abstract: true,
        url: '/home',
        templateUrl: 'index.html',
        controller: 'homeCtrl'
    });


});
