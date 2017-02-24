angular.module("PatientQuestionsModule")
.directive("hprtNumericalType", function() {

        function link(scope, element, attr) {
        }

        return {
                restrict: "E",
                scope: {
                        question: "=question"
                },
                link: link,
                templateUrl: "templates/directive_templates/hprt_numerical.html"
        };

});
