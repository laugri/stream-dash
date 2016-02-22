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

        /**
         * Represents the table and its parameters.
         * @function
         * @param {object} counter - e.g. {someStuff: 3, someOtherStuff: 6}
         * @param {object} selection - specifies a selection of the counter. All keys in the counter must also be in
         *      in the selection object. e.g. {someStuff: true, someOtherStuff: false}
         */
        var buildChartData = function(counter, selection) {
            var series = [];
            for (var key in counter) {
                if (counter.hasOwnProperty(key) && selection[key] === true) {
                    series.push({y: counter[key], x: key});
                }
            }
            return series.sort(function(a, b){return b.y - a.y;});
        };

        $scope.eventTypeCounter = {};
        $scope.typeSelection = {};

        $scope.table = new DataTable(
            columns,
            rows,
            'date',
            true,
            function(row) {
                return $scope.typeSelection[row.type];
            },
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
                    showLegend: false,
                    showLabels: true,
                    labelsOutside: true,
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
            data: [],
            update: function() {
                this.data = buildChartData($scope.eventTypeCounter, $scope.typeSelection);
            },
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
                $scope.piechart.update();
            })
            .error(function(data, status, headers, config) {
                $window.alert(data, status, headers);
            });
    }]
);