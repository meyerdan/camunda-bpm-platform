
angular
.module('app', [])
.controller('RootCtrl', [
  '$scope',
  '$location',
  'BreakpointService',
  'DebugSession',
function(
  $scope,
  $location,
  BreakpointService,
  DebugSession
) {

  var procDefIdMatcher = /\/([^\/]+).*/;

  var selectedElementIds;

  $scope.$on('bpmn.element.selected', function(e, selection) {
    selectedElementIds = selection;
  });

  $scope.toggleBreakPoint = function() {
    if(!!selectedElementIds) {
      angular.forEach(selectedElementIds, function(elId) {
        BreakpointService.toggleBreakpointBefore(elId, $scope.processDefinitionId);
      });
    }
  };

  $scope.startProcess = function() {
    var id = $scope.processDefinitionId;
    if(!!id) {
      DebugSession.startProcess({
        processDefinitionId: id
      });
    }
  };

  $scope.canStartProcess = function() {
    return !!$scope.processDefinitionId;
  };

  /**
   * Listens to the 'process-deployed' event and whenever a process is deployed,
   * sets the location path
   */
  DebugSession.registerEventListener("process-deployed", function(data) {
    $location.path("/"+data);
  });

  /**
   * will watch the $location.path() and parse the process definition id from the url.
   */
  $scope.$watch(function() {return $location.path();}, function(path) {
    result = procDefIdMatcher.exec(path);
    if(!!result && result.length == 2) {
      $scope.processDefinitionId = result[1];
    } else {
      $scope.processDefinitionId = null;
    }
  });
  
}]);
