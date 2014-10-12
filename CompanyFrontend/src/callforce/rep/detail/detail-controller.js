angular.module('callforce').controller('DetailCtrl',
    [
        '$scope',
        '$stateParams',
        'repService',
        function ($scope, $stateParams, repService) {

            $scope.rep = repService.getRep($stateParams.repId);

        }]);