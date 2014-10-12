angular.module('callforce').controller('PendingCtrl',
    [
        '$scope',
        'repService',
        '$state',
        'reps',
        '$location',
        '$anchorScroll',
        '$timeout',
        function ($scope, repService, $state, reps, $location, $anchorScroll, $timeout) {

            var myDiv = document.getElementById('page-content');
            myDiv.scrollTop = 0;

            $scope.reps = repService.getPendingReps();

            $scope.showDetail = function(repId){
                $state.go('base.detail',
                    {
                        repId: repId
                    });
            };

        }]);