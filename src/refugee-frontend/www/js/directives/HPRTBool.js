angular.module("PatientQuestionsModule")
.directive("hprtBoolType", function() {

        function link(scope, element, attr) {

                var selected = 3;
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
                        "value": "N/A",
                        "score": 0,
                        "selected": false
                }];

                function init() {
                        
                        // check to see if anything is selected from before
                        var foundOne = false;
                        for (var i = 0; i < buttons.length; i++) {
                                if (buttons[i].value == scope.question.value) {
                                        select(i);
                                        foundOne = true;
                                        break;
                                }
                        }

                        if (foundOne == false) {
                                select(buttons.length - 1);
                        }

                }

                // TODO: make sure this works
                // I don't think it does
                //function clearDropdown() {
                //        for (var i = 0; i < scope.question.dropdown.length; i++) {
                //                switch (scope.question.dropdown[i].type) {
                //                        case "numerical":
                //                                scope.question.dropdown[i].value = 0;
                //                                break;
                //                        case "time":
                //                                scope.question.dropdown[i].value = {
                //                                        "hours": 0,
                //                                        "minutes": 0
                //                                };
                //                                break;
                //                        case "bool":
                //                                scope.question.dropdown[i].value = "N/A";
                //                                break;
                //                }
                //        }
                //}

                function select(index) {

                        buttons[selected].selected = false;
                        buttons[index].selected = true;
                        selected = index;
                        scope.question.value = buttons[selected].value;
                        scope.question.score = buttons[selected].score;

                }

                function shouldShowDropdown() {
                        return (scope.question.dropdown && buttons[0].selected);
                }

                scope.select = select;
                scope.buttons = buttons;
                scope.shouldShowDropdown = shouldShowDropdown;

                init();

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
