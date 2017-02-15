angular.module('starter.controllers', [])

.controller('VisitConfirmationCtrl', function($scope, $state, $sce, $stateParams, Questions, ResponseData) {

        $scope.emailPrompt = false;
        $scope.submit = function(email) {
                console.log(email);
                ResponseData.generatePDF(ResponseData.get_response_data(), email.address).then(function(data) {
                        console.log(data);
                        console.log('this is what you want ' + email.address)
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
