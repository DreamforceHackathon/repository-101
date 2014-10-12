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
                photo_url: '',
                age: 44,
                email: 'boss@teleamericorp.com',
                phone: '(725) 345-1254'
            }
        ];

        this.getPendingReps = function(){
            return this.reps;
        };

        this.getRep = function(repId){
            for (var i = 0; i < this.reps.length; i++){
                if (this.reps[i].id == repId){
                    return this.reps[i];
                }
            }
        }

    }]);