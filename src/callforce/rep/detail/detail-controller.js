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


            var myDiv = document.getElementById('page-content');
            myDiv.scrollTop = 0;

            $scope.rep = repService.getRep($stateParams.repId);

            $scope.rejectRep = function(repId){
                repService.rejectRep(repId);

                if (repId+1 > repService.getMaxPendingRepId()){
                    $state.go('base.pending');
                } else {
                    $state.go('base.detail',
                        {
                            repId: repId+1
                        });
                }

            };

            $scope.acceptRep = function(repId){
                repService.acceptRep(repId);


                if (repId+1 > repService.getMaxPendingRepId()){
                    $state.go('base.pending');
                } else {
                    $state.go('base.detail',
                        {
                            repId: repId+1
                        });
                }

            };

        }]);