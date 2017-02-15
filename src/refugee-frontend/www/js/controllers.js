angular.module('starter.controllers', [])

.controller('VisitConfirmationCtrl', function($scope, $state, $sce, $stateParams, Questions, ResponseData) {

        $scope.emailPrompt = false;
        $scope.submit = function(email) {
                console.log(email);
                ResponseData.generatePDF(ResponseData.get_response_data(), email).then(function(data) {
                        console.log(data);
                });
                //$state.transitionTo('tab.disclaimer');
        }

        $scope.exportPDF = function() {
                $scope.emailPrompt = true;
        }

        // two decimal places
        for (key in $stateParams) {
                $stateParams[key] = Number($stateParams[key]).toFixed(2);
        }

        $scope.scores = $stateParams;

});
