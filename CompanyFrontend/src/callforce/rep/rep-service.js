angular.module('callforce').service('repService', ['$http',
    function ($http) {

        this.getPendingReps = function(){
          return [
              {
                  id: 1,
                  name: 'John Smith',
                  closing_ratio: .56,
                  average_deal_size: 2000,
                  pending_since: '1 day ago'

              },
              {
                  id: 2,
                  name: 'Scott Mescudi',
                  closing_ratio: .56,
                  average_deal_size: 2000,
                  number_of_closes: 134,
                  pending_since: '1 day ago'


              },
              {
                  id: 3,
                  name: 'Curtis Jackson',
                  closing_ratio: .56,
                  average_deal_size: 2000,
                  number_of_closes: 134,
                  pending_since: '1 day ago'


              },
              {
                  id: 4,
                  name: 'Barack Obama',
                  closing_ratio: .56,
                  average_deal_size: 2000,
                  number_of_closes: 134,
                    pending_since: '1 day ago'
              }
          ];
        };

        this.getRep = function(repId){
            return {
                id: 4,
                name: 'Barack Obama',
                closing_ratio: .56,
                average_deal_size: 2000,
                number_of_closes: 134,
                pending_since: '1 day ago'
            }
        }

    }]);