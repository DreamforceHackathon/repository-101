angular.module('callforce').controller('TabCtrl',
    [
        '$scope',
        '$state',
        'tabService',
        function ($scope, $state, tabService) {

            $scope.isActive = function(){
                return tabService.isActive;
            };
            $scope.isPending = function(){
                return tabService.isPending;
            };

            $scope.clickActive = function(){
                tabService.isPending = false;
                tabService.isActive = true;
                $state.go('base.active');
            };

            $scope.clickPending = function(){
                tabService.isPending = true;
                tabService.isActive = false;
                $state.go('base.pending');
            };


        }]);