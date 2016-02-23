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
         * Builds an array containing all event types, their frequency and status.
         * @function
         * @param {object} counter - e.g. {someStuff: 3, someOtherStuff: 6}
         */
        $scope.buildEventController = function(counter) {
            var series = [];
            for (var key in counter) {
                if (counter.hasOwnProperty(key)) {
                    series.push(
                        {count: counter[key], type: key, status: true}
                    );
                }
            }
            return series.sort(function(a, b){return b.count - a.count;});
        };

        $scope.buildTableRows = function(eventData) {
            return eventData.map(function(e) {
                return {
                    type: e.type,
                    repo: e.repo.name,
                    user: e.actor.login,
                    date: e.created_at,
                    url: e.repo.url
                };
            });
        };

        $scope.eventTypeController = [];

        $scope.table = new DataTable(
            columns,
            rows,
            'date',
            true,
            function(row) {
                return $scope.eventTypeController.find(function(e){return row.type === e.type;}).status;
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
                    x: function(d) {return d.type;},
                    y: function(d) {return d.status ? d.count : null;},
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
            data: $scope.eventTypeController,
        };

        $scope.fetchEvents = function() {
            events.query()
                .success(function(data) {
                    $scope.table.rows = $scope.buildTableRows(data);
                    $scope.eventTypeController = $scope.buildEventController(events.countTypes());
                    $scope.piechart.data = $scope.eventTypeController;
                })
                .error(function(data, status, headers, config) {
                    $window.alert(data, status, headers);
                });
        };

        $scope.fetchEvents();
    }]
);