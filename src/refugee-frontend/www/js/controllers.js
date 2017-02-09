angular.module('starter.controllers', [])

.controller('VisitConfirmationCtrl', function($scope, $state, $sce, $stateParams, Questions, ResponseData) {

    $scope.submit = function() {
        ResponseData.generatePDF(ResponseData.get_response_data()).then(function(data) {
                console.log(data.data);
                var file = new Blob([data.data], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(file);
                $scope.pdfcontent = $sce.trustAsResourceUrl(fileURL);
        });
        //$state.transitionTo('tab.disclaimer');
    }
    
    // two decimal places
    for (key in $stateParams) {
            $stateParams[key] = Number($stateParams[key]).toFixed(2);
    }

    $scope.scores = $stateParams;

});
