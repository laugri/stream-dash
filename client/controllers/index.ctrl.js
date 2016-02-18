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

        $scope.table = table;
        $scope.table.primaryAction = function(row) {
            $window.open(row.url, '_blank');
        };

        events.query().$promise.then(function(_events) {
            rows = _events.map(function(e) {
                return {
                    type: e.type,
                    repo: e.repo.name,
                    user: e.actor.login,
                    date: e.created_at,
                    url: e.repo.url
                };
            });
            $scope.table.rows = rows;
            events.countTypes(_events);
        });
    }]
);