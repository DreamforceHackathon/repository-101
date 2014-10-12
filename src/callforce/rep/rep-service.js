angular.module('callforce').service('repService', ['$http',
    function ($http) {

        var self = this;

        self.getReps = function(){
            return $http.get('/users').
            success(function(data, status, headers, config) {
                    console.log("setting reps to ", data);
                    self.reps = data;
            }).
                error(function(data, status, headers, config) {
                    console.log("were fucked");
                });
        };

        self.getPendingReps = function(){
            console.log(self.reps);
            var pendingReps = [];
            for (var i = 0; i < self.reps.length; i++){
                if (self.reps[i].pending) {
                    pendingReps.push(self.reps[i])
                }
            }
            return pendingReps;
        };

        self.getActiveReps = function(){
            var activeReps = [];
            for (var i = 0; i < self.reps.length; i++){
                if (self.reps[i].pending == null || !self.reps[i].pending) {
                    activeReps.push(self.reps[i])
                }
            }
            return activeReps;
        };

        self.acceptRep = function(repId) {
            for (var i = 0; i < self.reps.length; i++){
                if (self.reps[i].id == repId){
                    self.reps[i].pending = false;
                    self.reps[i].created_at = 'a minute ago';
                    self.reps[i].new = true;
                }
            }
        };

        self.rejectRep = function(repId){
            for (var i = 0; i < self.reps.length; i++){
                if (self.reps[i].id == repId){
                    self.reps[i].invisible = true;
                }
            }
        };

        self.getRep = function(repId){
            for (var i = 0; i < self.reps.length; i++){
                if (self.reps[i].id == repId){
                    return self.reps[i];
                }
            }
        }

        // TODO this should be just get next repId if null none exist
        self.getMaxPendingRepId = function(){
            var maxId = 0;
            for (var i = 0; i < self.reps.length; i++){
                if (self.reps[i].id > maxId && self.reps[i].pending){
                    maxId = self.reps[i].id;
                }
            }
            return maxId;
        }

    }]);