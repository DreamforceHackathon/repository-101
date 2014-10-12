angular.module('callforce').controller('DetailCtrl',
    [
        '$scope',
        '$stateParams',
        'repService',
        '$state',
        'tabService',
        function ($scope, $stateParams, repService, $state, tabService) {

            $scope.rep = repService.getRep($stateParams.repId);

            $scope.rejectRep = function(repId){
                repService.rejectRep(repId);
                tabService.isActive = false;
                tabService.isPending = true;
                $state.go('base.pending');
                // set the location.hash to the id of
                // the element you wish to scroll to.
                $location.hash('top');

                // call $anchorScroll()
                $anchorScroll();
            };

            $scope.acceptRep = function(repId){
                repService.acceptRep(repId);
                tabService.isActive = true;
                tabService.isPending = false;
                $state.go('base.active');

                // set the location.hash to the id of
                // the element you wish to scroll to.
                $location.hash('top');

                // call $anchorScroll()
                $anchorScroll();
            };

        }]);