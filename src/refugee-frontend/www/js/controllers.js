angular.module('starter.controllers', [])

.controller('VisitConfirmationCtrl', function($scope, $state, $sce, $stateParams, $ionicPopup, Questions, ResponseData) {

        $scope.emailPrompt = false;
        $scope.sendEmail = function(email) {
                ResponseData.generatePDF(ResponseData.get_response_data(), email.address).then(function(data) {
                        console.log(data);
                });
                var myPopup = $ionicPopup.show({
                         title: 'Email confirmation for ' + email.address,
                         subTitle: 'Please select Cancel to stay on this page or Home to go back to the home screen ',
                         scope: $scope,
                         buttons: [
                            { text: 'Cancel' }, {
                               text: '<b>Home</b>',
                               type: 'button-positive',
                                    onTap: function(e) {
                                        $state.transitionTo('tab.disclaimer');
                                    }
                            }
                         ]
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
