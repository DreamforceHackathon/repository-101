callforce = angular.module('callforce',
    [
        'ui.router', // Routing
        'ui.bootstrap' // Bootstrap angular directives
    ]);

callforce.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/pending');

    // Define states
    $stateProvider
        .state('base', { // Foundation for all routes
            abstract: true
        })
        .state('base.pending', {
            url: '/pending',
            views: {
                'container@': {
                    controller: 'PendingCtrl',
                    templateUrl: '../src/callforce/rep/pending/pending.html'
                }
            }
        })
        .state('base.active', {
            url: '/active',
            views: {
                'container@': {
                    controller: 'ActiveCtrl',
                    templateUrl: '../src/callforce/rep/active/active.html'
                }
            }
        })
        .state('base.detail', {
            url: '/rep/:repId',
            views: {
                'container@': {
                    controller: 'DetailCtrl',
                    templateUrl: '../src/callforce/rep/detail/detail.html'
                }
            }
        })
    ;

});