angular.module('callforce').controller('DetailCtrl',
    [
        '$scope',
        '$stateParams',
        'repService',
        '$state',
        'tabService',
        '$location',
        '$anchorScroll',
        function ($scope, $stateParams, repService, $state, tabService, $location, $anchorScroll) {

            $scope.rep = repService.getRep($stateParams.repId);

            $scope.rejectRep = function(repId){
                repService.rejectRep(repId);
                tabService.isActive = false;
                tabService.isPending = true;
                $state.go('base.pending');

            };

            $scope.acceptRep = function(repId){
                repService.acceptRep(repId);
                tabService.isActive = true;
                tabService.isPending = false;
                $state.go('base.active');


            };

        }]);