angular.module('callforce').controller('ActiveCtrl',
    [
        '$scope',
        'repService',
        '$state',
        '$location',
        '$anchorScroll',
        function ($scope, repService, $state, $location, $anchorScroll) {

            var myDiv = document.getElementById('page-content');
            myDiv.scrollTop = 0;

            $scope.reps = repService.getActiveReps();

            $scope.showDetail = function(repId){
                $state.go('base.detail',
                    {
                        repId: repId
                    });
            };

        }]);