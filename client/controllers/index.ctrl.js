app.controller(
    'IndexController',
    ['$scope', '$window', 'Events', 'DataTable', function($scope, $window, Events, DataTable) {
        var events = new Events();
        var columns = [
            {name: 'Date', key: 'date', type: 'date'},
            {name: 'User', key: 'user', type: 'text'},
            {name: 'Repository', key: 'repo', type: 'text'},
            {name: 'Event Type', key: 'type', type: 'text'},
        ];
        var rows = [];
        var table = new DataTable(
            columns,
            rows,
            'date'
        );

        $scope.eventTypeCounter = {};
        $scope.typeSelection = {};
        $scope.table = table;
        $scope.table.primaryAction = function(row) {
            $window.open(row.url, '_blank');
        };

        events.query().$promise.then(function(_events) {
            $scope.table.rows = _events.map(function(e) {
                return {
                    type: e.type,
                    repo: e.repo.name,
                    user: e.actor.login,
                    date: e.created_at,
                    url: e.repo.url
                };
            });
            $scope.eventTypeCounter = events.countTypes(_events);
            $scope.eventTypes = Object.keys($scope.eventTypeCounter);
            for (var i=0; i<$scope.eventTypes.length; i++) {
                $scope.typeSelection[$scope.eventTypes[i]] = true;
            }
        });
    }]
);