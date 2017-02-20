angular.module("PatientQuestionsModule")
.directive("hprtAdditionalComments", function() {

        function link(scope, element, attr) {
        }

        return {
                restrict: "E",
                scope: {
                        value: "=value"
                },
                link: link,
                templateUrl: "templates/directive_templates/hprt_additional_comments.html"
        };

});
