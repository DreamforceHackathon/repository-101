angular.module('callforce').service('repService', ['$http',
    function ($http) {

        this.reps = [
            {
                id: 1,
                name: 'John Smith',
                summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                work_experience: 'did stuff',
                education: 'Berkeley',
                number_of_closes: 14,
                number_of_calls: 100,
                total_sales: 12543,
                total_earnings: 1200,
                created_at: '1 day ago',
                photo_url: 'http://placehold.it/42x42',
                age: 44,
                email: 'boss@teleamericorp.com',
                phone: '(725) 345-1254',
                pending: true,
                visible: true
            }
        ];

        this.getPendingReps = function(){
            var pendingReps = [];
            for (var i = 0; i < this.reps.length; i++){
                if (this.reps[i].pending) {
                    pendingReps.push(this.reps[i])
                }
            }
            return pendingReps;
        };

        this.getActiveReps = function(){
            var activeReps = [];
            for (var i = 0; i < this.reps.length; i++){
                if (this.reps[i].pending == null || !this.reps[i].pending) {
                    activeReps.push(this.reps[i])
                }
            }
            return activeReps;
        };

        this.acceptRep = function(repId) {
            for (var i = 0; i < this.reps.length; i++){
                if (this.reps[i].id == repId){
                    this.reps[i].pending = false;
                }
            }
        };

        this.rejectRep = function(repId){
            for (var i = 0; i < this.reps.length; i++){
                if (this.reps[i].id == repId){
                    this.reps[i].visible = false;
                }
            }
        };

        this.getRep = function(repId){
            for (var i = 0; i < this.reps.length; i++){
                if (this.reps[i].id == repId){
                    return this.reps[i];
                }
            }
        }

    }]);