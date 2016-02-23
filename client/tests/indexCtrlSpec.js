describe('IndexController', function() {
  beforeEach(module('StreamDash'));

  var $controller;

  beforeAll(function(){
    fixture.setBase('tests/mocks');
  });

  beforeEach(function(){
    this.mockEvents = fixture.load('github_events.json');
    this.mockRows = fixture.load('event_table.json');
  });

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.eventTypeController', function() {
    it('correctly generates an array containing data about each type.', function() {
      var $scope = {};
      var controller = $controller('IndexController', { $scope: $scope });
      var counter = {a: -10, b: 0, c:10};
      var expectedValue = [
        {count: 10, status: true, type: 'c'},
        {count: 0, status: true, type: 'b'},
        {count: -10, status: true, type: 'a'},
      ];
      expect($scope.buildEventController(counter)).toEqual(expectedValue);
    });


    it('correctly generates rows from github event api data', function() {
      var $scope = {};
      var controller = $controller('IndexController', { $scope: $scope });
      var mockAPIData = this.mockEvents;
      var expectedValue = this.mockRows;
      expect($scope.buildTableRows(mockAPIData)).toEqual(expectedValue);
    });
  });
});