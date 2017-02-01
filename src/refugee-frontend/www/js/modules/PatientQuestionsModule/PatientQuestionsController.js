angular.module('PatientQuestionsModule')

.controller('PatientQuestionsCtrl', function($scope, $state, Questions) {

    var questions = [];
    var traumaSymptomsScore = 0
    var anxietyScore = 0
    var depressionScore = 0
    $scope.responses = {};

    Questions.new_patient_questions().then(function (data) {
        questions = data.questions;
        $scope.categories = data.categories;
        $scope.update(data.categories[0]);
    });

    $scope.update = function(category) {
        $scope.selected = category;
        $scope.questions = questions[category];
        $scope.questionType = questions[category][0]["body"];
        $scope.dropdown = questions[category][0]["dropdown"];
    }

    $scope.submit = function() {
        for (var key in $scope.responses) {
            if ($scope.responses.hasOwnProperty(key)) {
                if ($scope.selected == "trauma_symptoms") {
                    traumaSymptomsScore = traumaSymptomsScore + 1;
                }
                if ($scope.selected == "hopkins_symptom_checklist_part1") {
                    anxietyScore = anxietyScore + 1;
                }
                if ($scope.selected == "hopkins_symptom_checklist_part2") {
                    depressionScore = depressionScore + 1;
                }
            }
        }
        alert("Trauma Symptoms Total Score = " + (traumaSymptomsScore/16))
        alert("Anxiety Score = " + (anxietyScore/10))
        alert("Depression Score = " + (depressionScore/15))
        alert("Total Score = " + ((depressionScore + anxietyScore)/25))
        $state.transitionTo('visit-confirmation');
    }

    $scope.questionAnswered = function(response, questionBody) {
        $scope.responses[questionBody] = response;
    }

    $scope.responseType = function(responses) {
        if (responses == $scope.questionType){
            return true; 
        } else {
            return false; 
        }

    }

    $scope.showDropdown = function(value) {
        if ((value == 5 || value >=8) && $scope.dropdown == "yes") {
            return true;
        } else {
            return false;
        }
    }

})
