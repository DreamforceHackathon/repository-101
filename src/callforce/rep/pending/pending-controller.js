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

            $scope.anymorePendingReps = function(){
                for (var i = 0; i < repService.reps.length; i++){
                    if (repService.reps[i].pending && repService.reps[i].invisible == null){
                        console.log(true);
                        return true;
                    }
                }
                console.log(false);

                return false;
            };

            $scope.reps = repService.getPendingReps();

            $scope.showDetail = function(repId){
                $state.go('base.detail',
                    {
                        repId: repId
                    });
            };

        }]);