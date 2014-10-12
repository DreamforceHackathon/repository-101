angular.module('callforce').controller('ActiveCtrl',
    [
        '$scope',
        'repService',
        '$state',
        function ($scope, repService, $state) {

            $scope.reps = repService.getActiveReps();

            $scope.showDetail = function(repId){
                $state.go('base.detail',
                    {
                        repId: repId
                    });
            };

        }]);