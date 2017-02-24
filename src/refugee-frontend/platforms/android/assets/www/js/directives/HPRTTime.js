angular.module("PatientQuestionsModule")
.directive("hprtTimeType", function() {

        function link(scope, element, attr) {

                // view doesn't know about these
                var hours = 0;
                var minutes = 0;

                // private methods
                function init() {

                        // check if we have set values previously
                        if (scope.question.time) {
                                if (scope.question.time.hours) {
                                        scope.hours = scope.question.time.hours;
                                }
                                if (scope.question.time.minutes) {
                                        scope.minutes = scope.question.time.minutes;
                                }
                        }

                }

                function reformatString() {

                        if (!hours) {
                                hours = 0;
                        }

                        if (!minutes) {
                                minutes = 0;
                        }

                        scope.question.value = hours + " hours and " + minutes + " minutes";

                        // secretly place these values into object
                        // only this directive cares about this
                        // TODO: is there a better way?
                        scope.question.time = {
                                "hours": hours,
                                "minutes": minutes
                        };

                }

                // public methods
                scope.updateHours = function(h) {
                        hours = h;
                        reformatString();
                }

                scope.updateMinutes = function(m) {
                        minutes = m;
                        reformatString();
                }

                init();

        }

        return {
                restrict: "E",
                scope: {
                        question: "=question"
                },
                link: link,
                templateUrl: "templates/directive_templates/hprt_time.html"
        };

});
