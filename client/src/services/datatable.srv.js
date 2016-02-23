app.factory('DataTable', [function() {

    /**
     * Represents the table and its parameters.
     * @key {Array{column}} columns - Array of column objects.
     *     {Object} column - Keys are:
     *          - name: displayed column name,
     *          - key: key to use in `row` object,
     *          - type: 'percentage', 'float', 'text', 'link', 'date'
     * @key {Array{row}} rows - Array of row objects.
     *     {Object} row - An object with keys corresponding to the column keys.
     * @key {String} orderByField - The key to order by.
     * @key {Bool} reverseSort - Sort ascending or descending. `true` is descending.
     * @key {String} search - A value used to filter rows.
     * @key {Function} primaryAction - A function triggered when a `row` is clicked.
     *     Takes a `row` as argument.
     */
    var DataTable = function(columns, rows, orderByField, reverseSort, searchInput, primaryAction) {
        this.columns = columns;
        this.rows = (rows && rows.length > 0) ? rows : [];
        this.orderByField = orderByField;
        this.reverseSort = reverseSort ? reverseSort : true;
        this.searchInput = searchInput;
        this.primaryAction = primaryAction ? primaryAction : function(row) {};
    };

    return DataTable;
}]);
