
angular
.module('app')
.controller('ConsoleCtrl', [
  '$scope',
  'DebugSession',
function(
  $scope,
  DebugSession
  ) {

  /** list of available script languages */
  var SCRIPT_LANGUAGES = [
    "Javascript",
    "Ruby",
    "Groovy",
    "Juel",
    "Python"    
  ];

  var nextId = 0;

  /**
   * the console input is bound to this field
   */
  $scope.script = null;

  /**
   * the id of the currently suspended execution
   */
  $scope.executionId = null;

  /**
   * the list of script evaluations already performed (history)
   */
  $scope.evaluationResults = [];

  /**
   * currently selected script language
   */
  $scope.scriptLanguage = null;

  $scope.scriptLanguages = SCRIPT_LANGUAGES;

  $scope.evaluate = function() {
    var cmdId = nextId++;

    var cmd = {
      "cmdId" : cmdId,
      "language": $scope.scriptLanguage,
      "executionId": $scope.executionId,
      "script": $scope.script,
    };

    $scope.evaluationResults.push(cmd);

    DebugSession.evaluateScript(cmd);
    
  };

  $scope.$on("executionSelected", function(e, execution) {
    if(!!execution) {
      $scope.executionId = execution.id;
    } else {
      $scope.executionId =null; 
    }
  });

  function addEvaluationResults(data, failed) {
    var cmdId = data.cmdId;
    for(var i = 0; i < $scope.evaluationResults.length; i++) {
      var result = $scope.evaluationResults[i];
      if(result.cmdId == cmdId) {
        result.result = data.result;
        result.evaluationFailed = failed;
      }
    }
  }

  $scope.selectLanguage = function(lang) {
    $scope.scriptLanguage = lang;
    $scope.scriptLanguages = [];
    for(var i=0; i<SCRIPT_LANGUAGES.length; i++) {
      if(SCRIPT_LANGUAGES[i] != lang) {
        $scope.scriptLanguages.push(SCRIPT_LANGUAGES[i]);
      }
    }
  };

  DebugSession.registerEventListener("script-evaluated", function(data) {
    addEvaluationResults(data, false);
  });

  DebugSession.registerEventListener("script-evaluation-failed", function(data) {
    addEvaluationResults(data, true);
  });
  
  // init
  $scope.selectLanguage("Javascript"); 
}]);
