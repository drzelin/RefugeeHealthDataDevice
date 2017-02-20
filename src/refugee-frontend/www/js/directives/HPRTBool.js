angular.module("PatientQuestionsModule")
.directive("hprtBoolType", function() {

        function link(scope, element, attr) {

                var selected = 0;
                var buttons = [
                {
                        "color": "button-balanced",
                        "hasIcon": true,
                        "body": "ion-checkmark-round",
                        "value": "Yes",
                        "score": 1,
                        "selected": false
                },
                {
                        "color": "button-dark",
                        "hasIcon": true,
                        "body": "ion-minus-round",
                        "value": "Neutral",
                        "score": 0,
                        "selected": false
                },
                {
                        "color": "button-assertive",
                        "hasIcon": true,
                        "body": "ion-close-round",
                        "value": "No",
                        "score": 0,
                        "selected": false
                },
                {
                        "color": "button-light",
                        "hasIcon": false,
                        "body": "N/A",
                        "value": "No Response",
                        "score": 0,
                        "selected": false
                }];

                function select(index) {

                        buttons[selected].selected = false;
                        buttons[index].selected = true;
                        selected = index;
                        scope.question.value = buttons[selected].value;
                        scope.question.score = buttons[selected].score;

                }

                function shouldShowDropdown() {
                        return scope.question.dropdown != undefined && buttons[0].selected;
                }

                scope.select = select;
                scope.buttons = buttons;
                scope.shouldShowDropdown = shouldShowDropdown;

        }

        return {
                restrict: "E",
                scope: {
                        question: "=question"
                },
                link: link,
                templateUrl: "templates/directive_templates/hprt_bool.html"
        };

});
