angular.module('starter.controllers', [])

.controller('VisitConfirmationCtrl', function($scope, $state, $stateParams) {

    $scope.submit = function() {
        $state.transitionTo('tab.disclaimer');
    }
    
    // two decimal places
    for (key in $stateParams) {
            $stateParams[key] = Number($stateParams[key]).toFixed(2);
    }

    $scope.scores = $stateParams;
});
