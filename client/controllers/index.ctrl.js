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
        var buildChartData = function(counter) {
            var series = [];
            for (var key in counter) {
                if (counter.hasOwnProperty(key)) {
                    series.push({y: counter[key], x: key});
                }
            }
            return series;
        };

        $scope.eventTypeCounter = {};
        $scope.typeSelection = {};
        $scope.filterByType = function(row) {
            return $scope.typeSelection[row.type];
        };

        $scope.table = new DataTable(
            columns,
            rows,
            'date',
            true,
            $scope.filterByType,
            function(row) {
                $window.open(row.url, '_blank');
            }
        );

        $scope.piechart = {
            options: {
            chart: {
                type: 'pieChart',
                height: 450,
                donut: true,
                showLabels: true,
                duration: 500,
                legend: {
                    margin: {
                        top: 5,
                        right: 70,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        },
            data: []
        };

        events.query()
            .success(function(data) {
                $scope.table.rows = data.map(function(e) {
                    return {
                        type: e.type,
                        repo: e.repo.name,
                        user: e.actor.login,
                        date: e.created_at,
                        url: e.repo.url
                    };
                });
                $scope.eventTypeCounter = events.countTypes();
                $scope.eventTypes = Object.keys($scope.eventTypeCounter);
                for (var i=0; i<$scope.eventTypes.length; i++) {
                    $scope.typeSelection[$scope.eventTypes[i]] = true;
                }
                $scope.piechart.data = buildChartData($scope.eventTypeCounter);
            })
            .error(function(data, status, headers, config) {
                $window.alert(data, status, headers);
            });
    }]
);