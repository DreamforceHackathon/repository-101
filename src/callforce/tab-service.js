angular.module('callforce').service('tabService', ['$http',
    function ($http) {

        this.isActive = false;
        this.isPending = true;

    }]);