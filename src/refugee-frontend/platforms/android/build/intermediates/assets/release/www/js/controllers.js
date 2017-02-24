angular.module('starter.controllers', [])

.controller('VisitConfirmationCtrl', function($scope, $state, $sce, $stateParams, $ionicPopup, Questions, ResponseData) {

    $scope.emailPrompt = false;
    finalData = {
                    "category": "Overview",
                    "questions":[
                        {
                            "body":"Trauma Symptoms Total Score",
                            "value": $stateParams.trauma
                        },
                        {
                            "body":"Trauma Symptoms DSM-IV Score",
                            "value": $stateParams.dsm
                        },
                        {
                            "body":"Hopkins Total Score",
                            "value": $stateParams.total
                        },
                        {
                            "body":"Hopkins Anxiety Score",
                            "value": $stateParams.anxiety
                        },
                        {
                            "body":"Hopkins Depression Score",
                            "value": $stateParams.depression
                        }
                    ],
                    "additional_comments": "Hopkins and Trauma Scores"
                };

    $scope.sendEmail = function(email) {
        if (email && email.address != '') {
            ResponseData.get_response_data().unshift(finalData);
            pdfData = ResponseData.get_response_data();
            console.log(JSON.stringify(pdfData));
            ResponseData.generatePDF(pdfData, email.address);
            var myPopup = $ionicPopup.show({
                title: 'Email confirmation for ' + email.address,
                subTitle: 'Please select Cancel to stay on this page or Home to go back to the home screen',
                scope: $scope,
                buttons: [
                    { 
                        text: 'Cancel' 
                    }, 
                    {
                        text: '<b>Home</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            $state.transitionTo('tab.disclaimer');
                        }
                    }
                ]
            });
        } else {
            var myPopup = $ionicPopup.show({
                title: 'Please provide an email',
                subTitle: '',
                scope: $scope,
                buttons: [
                    { 
                        text: 'Cancel' 
                    }
                ]
            });

        }

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
