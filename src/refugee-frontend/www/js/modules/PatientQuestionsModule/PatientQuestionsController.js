angular.module('PatientQuestionsModule')
.controller('PatientQuestionsCtrl', function($scope, $state, $timeout, $ionicScrollDelegate,
                                        Questions, Forms, ResponseData, HPRTScoring) {

        // private properties

        // public properties
        $scope.selected;
        $scope.forms;
        $scope.categories;

        // private methods
        function init() {

                // scroll to top of page
                // Note: because ionic caches views, without this
                //       next time page opens it'll be scrolled to 
                //       wherever it left off
                $timeout(function() {
                        $ionicScrollDelegate.scrollTop();
                });

                // reset public properties
                $scope.selected   = 0;
                $scope.forms      = [];
                $scope.categories = [];

                // get all questions
                Questions.new_patient_questions().then(function (data) {

                        // initialize a form for each category
                        for (var i = 0; i < data.categories.length; i++) {
                                var name = data.categories[i];
                                var formData = data.forms[i];
                                var obj = Forms.formObject(i, name, formData);
                                $scope.forms.push(obj);
                        }

                        $scope.categories = data.categories;
                        $scope.loadForm(0);

                }, function(e) {
                        console.log("ERROR GETTING DATA", e);
                });

        }

        // public methods
        function loadForm(id) {
                $scope.selected = id;
        }

        function submitForms() {

                // compute scores
                var scores = HPRTScoring.getAllScores($scope.forms);

                // set response data object
                ResponseData.set_response_data($scope.forms);

                // navigate to report page
                $state.go("visit-confirmation", scores).then(function() {
                        // reinitialize once this is done
                        init();
                });

        }

        // attach public methods to scope
        $scope.loadForm = loadForm;
        $scope.submitForms = submitForms;

        init();

});
