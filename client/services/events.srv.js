app.factory('Events', ['$resource',
    function($resource) {

        var Events = function() {
            this._resource = $resource('https://api.github.com/events');
        };

        Events.prototype.query = function(args) {
            return this._resource.query.apply(this, arguments);
        };

        Events.prototype.countTypes = function(events) {
            var typeCounter = {};
            var type;
            for (var i = 0; i < events.length; i++) {
                type = events[i].type;
                typeCounter[type] = typeCounter[type] ? typeCounter[type]+1 : 1;
            }
            return typeCounter;
        };

        return Events;
    }
]);