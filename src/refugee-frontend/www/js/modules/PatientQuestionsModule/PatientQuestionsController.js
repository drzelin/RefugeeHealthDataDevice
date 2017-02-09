angular.module('PatientQuestionsModule')

.controller('PatientQuestionsCtrl', function($scope, $state, Questions, ResponseData) {

    var questions = [];

    $scope.forms = {};

    Questions.new_patient_questions().then(function (data) {
        questions = data.questions;
        $scope.categories = data.categories;
        $scope.responses = [];
        for (var key in data.categories) { 
            $scope.responses[key] = {'category': data.categories[key]};
            $scope.forms[data.categories[key]] = {
                "paragraphText":[],
                "hours": [],
                "minutes" : [],
                "number": [],
                "additional_comments": ""
            };
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
        traumaSymptomsTotalScore = 0
        traumaSymptomsDSMIVScore = 0
        anxietyScore = 0
        depressionScore = 0

        for (var cat in $scope.responses) {
            for (var key in $scope.responses[cat]) {
                if (key != "category") {
                    if ($scope.responses[cat]["category"] == "Trauma Symptoms DSM-IV") {
                        traumaSymptomsDSMIVScore = traumaSymptomsDSMIVScore + $scope.responses[cat][key].body;
                    }
                    if ($scope.selected == "Trauma Symptoms General"){
                        traumaSymptomsTotalScore = traumaSymptomsTotalScore + $scope.responses[cat][key].body;
                    }
                    if ($scope.selected == "Hopkins Symptom Checklist Part1") {
                        anxietyScore = anxietyScore + $scope.responses[cat][key].body;
                    }
                    if ($scope.selected == "Hopkins Symptom Checklist Part2") {
                        depressionScore = depressionScore + $scope.responses[cat][key].body;
                    }
                }
            }
        }

        pdfPrepare();
        traumaSymptomsTotalScore = traumaSymptomsTotalScore + traumaSymptomsDSMIVScore;

        var score = {
                "total": ((depressionScore + anxietyScore)/25.00),
                "dsm": (traumaSymptomsDSMIVScore/16.00),
                "trauma": (traumaSymptomsTotalScore/40.00),
                "anxiety": (anxietyScore/10.00),
                "depression": (depressionScore/15.00)
        };

        ResponseData.set_response_data($scope.responses);
        $state.go('visit-confirmation', score, {
                reload: true
        });
    }

    $scope.questionAnswered = function(response, questionBody, dropdownBody) {
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
