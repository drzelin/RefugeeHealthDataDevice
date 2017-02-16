angular.module('starter.controllers', [])

.controller('VisitConfirmationCtrl', function($scope, $state, $sce, $stateParams, Questions, ResponseData) {

        $scope.emailPrompt = false;
        $scope.sendEmail = function(email) {
                ResponseData.generatePDF(ResponseData.get_response_data(), email.address).then(function(data) {
                        console.log(data);
                });
        }

        $scope.submit = function() {
                $state.transitionTo('tab.disclaimer');
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