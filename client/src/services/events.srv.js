app.factory('Events', ['$http',
    function($http) {

        var Events = function() {
            this.collection = [];
            this.url = 'https://api.github.com/events';
        };

        Events.prototype.query = function() {
            var that = this;
            return $http.get(this.url)
                .success(function(data) {
                    that.collection = data;
                    return data;
                })
                .error(function(data, status, headers, config) {
                    return err;
                });
        };

        Events.prototype.countTypes = function() {
            var typeCounter = {};
            var type;
            for (var i = 0; i < this.collection.length; i++) {
                type = this.collection[i].type;
                typeCounter[type] = typeCounter[type] ? typeCounter[type]+1 : 1;
            }
            return typeCounter;
        };

        return Events;
    }
]);