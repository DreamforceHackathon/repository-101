angular.module('callforce').controller('PendingCtrl',
    [
        '$scope',
        'repService',
        '$state',
        'reps',
        function ($scope, repService, $state, reps) {

            $scope.reps = repService.getPendingReps();

            $scope.showDetail = function(repId){
                $state.go('base.detail',
                    {
                        repId: repId
                    });
            };

        }]);