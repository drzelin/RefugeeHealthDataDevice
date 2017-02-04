angular.module('PatientQuestionsModule')

.controller('PatientQuestionsCtrl', function($scope, $state, Questions) {

    var questions = [];
    var traumaSymptomsTotalScore = 0
        var traumaSymptomsDSMIVScore = 0
        var anxietyScore = 0
        var depressionScore = 0
        $scope.responses={};

        $scope.form = {
            "paragraphText":[],
            "hours":[],
            "minutes" :[],
            "number":[]
        };
        
        Questions.new_patient_questions().then(function (data) {
            questions = data.questions;
            $scope.categories = data.categories;
            $scope.responses = [];
            for (var key in data.categories) { 
                $scope.responses[key] = {'category': data.categories[key]};
            }
            $scope.update(data.categories[0]);
        });

    $scope.update = function(category) {
        $scope.selected = category;
        $scope.questions = questions[category];
        $scope.questionType = questions[category][0]["body"];
        $scope.dropdown = questions[category][0]["dropdown"];
    }

    pdfPrepare = function() {
        temp = [];
        for (var catIndex in $scope.responses) {
            temp[catIndex] = {}
            temp[catIndex]['category'] = $scope.responses[catIndex]['category'];
            temp[catIndex]['questions'] = [];
            questionCounter = 0;
            temp[catIndex]['questions'][questionCounter] = {};
            for (var key in $scope.responses[catIndex]) {
                if (key != 'category') {
                    for (var attribute in $scope.responses[catIndex][key]){
                        if (attribute == 'dropdown') {
                            temp[catIndex]['questions'][questionCounter]['dropdown'] = [];
                            dropdownCounter = 0;
                            for (var dropQ in $scope.responses[catIndex][key][attribute]) {
                                temp[catIndex]['questions'][questionCounter]['dropdown'][dropdownCounter] = {};
                                temp[catIndex]['questions'][questionCounter]['dropdown'][dropdownCounter] = {'question': dropQ, 'answer': $scope.responses[catIndex][key][attribute][dropQ]};
                                dropdownCounter = dropdownCounter + 1;
                            }
                        } else {
                            temp[catIndex]['questions'][questionCounter] = {};
                            temp[catIndex]['questions'][questionCounter]['question'] = {};
                            temp[catIndex]['questions'][questionCounter]['question'] = key;
                            temp[catIndex]['questions'][questionCounter]['answer'] = {};
                            temp[catIndex]['questions'][questionCounter]['answer'] = $scope.responses[catIndex][key][attribute];
                        }
                    }
                    questionCounter = questionCounter + 1
                }
            }
        }
    }

    $scope.submit = function(paragraph) {
        console.log(paragraph);
        for (var cat in $scope.responses) {
            for (var key in $scope.responses[cat]) {
                if ($scope.responses[cat].hasOwnProperty(key)) {
                    if ($scope.selected == "trauma_symptoms_DSM-IV") {
                        traumaSymptomsDSMIVScore = traumaSymptomsDSMIVScore + $scope.responses[cat][key].body;
                    }
                    if ($scope.selected == "trauma_symptoms_general"){
                        traumaSymptomsTotalScore = traumaSymptomsTotalScore + $scope.responses[cat][key].body;
                    }
                    if ($scope.selected == "hopkins_symptom_checklist_part1") {
                        anxietyScore = anxietyScore + $scope.responses[cat][key].body;
                    }
                    if ($scope.selected == "hopkins_symptom_checklist_part2") {
                        depressionScore = depressionScore + $scope.responses[cat][key].body;
                    }
                }
            }
        }
        // TODO: remove this
        var total = ((depressionScore + anxietyScore)/25);
        /*alert("Trauma Symptoms DSM-IV Score = " + (traumaSymptomsDSMIVScore/16));
            alert("Trauma Symptoms Total Score = " + ((traumaSymptomsDSMIVScore + traumaSymptomsTotalScore)/40));
            alert("Anxiety Score = " + (anxietyScore/10));
            alert("Depression Score = " + (depressionScore/15));
            alert("Total Score = " + ((depressionScore + anxietyScore)/25));*/

            pdfPrepare();
        $state.transitionTo('visit-confirmation', {"score":total});
    }

    $scope.questionAnswered = function(response, questionBody, dropdownBody) {
        console.log("response: " + response);
        console.log("question: " + questionBody);
        console.log("dropdown: " + dropdownBody);
        for (var index in $scope.responses) {
            if ($scope.responses[index]['category'] == $scope.selected) {
                if (dropdownBody) {
                    $scope.responses[index][questionBody]['dropdown'] = {};
                    $scope.responses[index][questionBody]['dropdown'][dropdownBody] = response;
                } else {
                    $scope.responses[index][questionBody] = {'body': response};
                }
                break;
            }
        }
    }

    $scope.responseType = function(responses) {
        if (responses == $scope.questionType){
            return true; 
        } else {
            return false; 
        }

    }

    $scope.showDropdown = function(value) {
        if (value == 5 && $scope.dropdown == "yes") {
            return true;
        } else {
            return false;
        }
    }

})
