app.directive('sdDataTable', ['DataTable', function(DataTable) {
    return {
        restrict: 'E',
        scope: {
            datatable: '=',
        },
        templateUrl: 'directives/templates/sd-data-table.html',
        link: function($scope) {
            $scope.$watch('datatable', function() {
                $scope.datatable = $scope.datatable;
            });
        }
    };
}]);
