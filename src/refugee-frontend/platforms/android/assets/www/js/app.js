// TODO: REMOVE THIS "STARTER" stuff
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 
                'DisclaimerModule', 'PatientQuestionsModule'])

.config(function($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');
})

.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                        cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                        // org.apache.cordova.statusbar required
                        StatusBar.styleDefault();
                }
        });

})

.config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        .state('visit-confirmation', {
                url: '/visit-confirmation/:total/:dsm/:trauma/:anxiety/:depression',
                templateUrl: 'templates/visit-confirmation.html',
                controller: 'VisitConfirmationCtrl'
        })
        // abstract state for the tabs directive
        .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
        })

        .state('tab.disclaimer', {
                url: '/disclaimer',
                views: {
                        'tab-disclaimer': {
                                templateUrl: 'templates/tab-disclaimer.html',
                                controller: 'DisclaimerCtrl'
                        }
                }
        })

        .state('tab.patient-questions', {
                url: '/patient-questions',
                views: {
                        'tab-patient-questions': {
                                templateUrl: 'templates/tab-patient-questions.html',
                                controller: 'PatientQuestionsCtrl'
                        }
                }
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/disclaimer');

});
