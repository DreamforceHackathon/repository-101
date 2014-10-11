angular.module('callforce').controller('TabCtrl',
    [
        '$scope',
        '$state',
        function ($scope, $state) {

            $scope.isActive = false;
            $scope.isPending = true;

            $scope.clickActive = function(){
                $scope.isPending = false;
                $scope.isActive = true;
                $state.go('base.active');
            };

            $scope.clickPending = function(){
                $scope.isPending = true;
                $scope.isActive = false;
                $state.go('base.pending');
            };


        }]);