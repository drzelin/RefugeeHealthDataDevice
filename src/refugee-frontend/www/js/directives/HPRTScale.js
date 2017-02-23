angular.module("PatientQuestionsModule")
.directive("hprtScaleType", function() {

        function link(scope, element, attr) {

                var selected = 0;
                var buttons = [
                {
                        "color": "button-light",
                        "body": "N/A",
                        "value": "N/A",
                        "score": 0,
                        "selected": false
                },
                {
                        "color": "button-balanced",
                        "body": "Not at All",
                        "value": "Not at All",
                        "score": 1,
                        "selected": false
                },
                {
                        "color": "button-calm",
                        "body": "A little",
                        "value": "A little",
                        "score": 2,
                        "selected": false
                },
                {
                        "color": "button-positive",
                        "body": "Quite a bit",
                        "value": "Quite a bit",
                        "score": 3,
                        "selected": false
                },
                {
                        "color": "button-assertive",
                        "body": "Extremely",
                        "value": "Extremely",
                        "score": 4,
                        "selected": false
                }];

                function init() {
                        
                        // check to see if anything is selected from before
                        for (var i = 0; i < buttons.length; i++) {
                                if (buttons[i].value == scope.question.value) {
                                        select(i);
                                        break;
                                }
                        }

                }

                function select(index) {

                        buttons[selected].selected = false;
                        buttons[index].selected = true;
                        selected = index;
                        scope.question.value = buttons[selected].value;
                        scope.question.score = buttons[selected].score;

                }

                scope.select = select;
                scope.buttons = buttons;

                init();

        }

        return {
                restrict: "E",
                scope: {
                        question: "=question"
                },
                link: link,
                templateUrl: "templates/directive_templates/hprt_scale.html"
        };

});
