angular.module('callforce').controller('PendingCtrl',
    [
        '$scope',
        'repService',
        '$state',
        function ($scope, repService, $state) {

            $scope.reps = repService.getPendingReps();

            $scope.showDetail = function(repId){
                $state.go('base.detail',
                    {
                        repId: repId
                    });
            };

        }]);