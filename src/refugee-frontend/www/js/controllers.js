angular.module('starter.controllers', [])

.controller('VisitConfirmationCtrl', function($scope, $state) {

    $scope.submit = function() {
        $state.transitionTo('tab.disclaimer');
    }

});
