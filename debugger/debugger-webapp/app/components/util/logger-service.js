
angular
.module('app')
.provider('Logger', function LoggerProvider() {

  /**
   * The log handler function handles the actual logging.
   * This function can be set through the setLogHandler() method.
   */
  var logHandler = function(logEntry) {
    console.log("[" + logEntry.level + "] " + logEntry.message);
  };

  /**
   * Allows configuring the log handler function. A log handler function
   * is passed in a LogEntry and handles the actual logging.
   */
  this.setLogHandler = function(logHandler) {
    this.logHandler = logHandler;
  };

  var Logger = (function() {

    /**
     * @class
     * @classdesc The Logger
     *
     * @param {Function} logHandler the log handler function to be used by this logger.
     */
    function Logger(logHandler) {
      this.__logHandler = logHandler;
      this.DEBUG = "DEBUG";
      this.INFO = "INFO";
      this.SEVERE = "SEVERE";
    }

    /**
     * log a message at a given level
     *
     * @param {string} level the level at which to log the message
     * @param {string} message the message to log
     */
    Logger.prototype.log = function(level, message) {
      this.__logHandler({
        "level" : level,
        "message" : message
      });
    };

    /**
     * log a message at DEBUG level
     *
     * @param {string} message the message to log
     */
    Logger.prototype.debug = function(message) {
      this.log(this.DEBUG, message);
    };

    return Logger;

  })();

  this.$get = function() {
    // return a new logger for the configured logHandler
    return new Logger(logHandler);
  };


});

