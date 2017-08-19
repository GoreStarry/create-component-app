#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Start the process to generate component folder and files:
 * Filter question by config file
 * Get from the user the requirements to create the component folder and files
 * Generate files
 */
let start = (() => {
  var _ref = _asyncToGenerator(function* () {
    try {
      const filteredQuestions = generateQuestions();
      const requirements = yield _inquirer2.default.prompt(filteredQuestions);

      const results = _extends({}, config, requirements);

      if (results.type === 'custom') {
        (0, _files.generateFilesFromCustom)(results);
      } else {
        (0, _files.generateFiles)(results);
      }

      console.log('Your component is created!');
    } catch (e) {
      console.log(e);
    }
  });

  return function start() {
    return _ref.apply(this, arguments);
  };
})();

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _files = require('./files');

var _questions = require('./questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Dynamically import the config file if exist
let config = null;
const argsConfigPath = _yargs2.default.argv.config;
const directoryConfig = `${process.cwd()}/.ccarc`;

// Check if exist the default directory of configuration
if (_fsExtra2.default.existsSync(directoryConfig)) {
  config = JSON.parse(_fsExtra2.default.readFileSync(directoryConfig, 'utf8'));
}

// Override the config object from the directory if exist --config
if (argsConfigPath) {
  config = require(`${process.cwd()}/${argsConfigPath}`);
}

/**
 * If the user want to use custom templates, return filtered questions
 * for only custom configuration
 */
function generateQuestionsCustom() {
  const mandatoryQuestions = [_questions2.default.name, _questions2.default.path];

  return mandatoryQuestions.filter(question => {
    if (config[question.name]) {
      return false;
    }
    return true;
  });
}

/**
 * Generate questions filtered by the config file if exist
 */
function generateQuestions() {
  const questionKeys = Object.keys(_questions2.default);

  if (!config) {
    return questionKeys.map(question => _questions2.default[question]);
  }

  // If type is custom, filter question mandatory to work
  if (config.type === 'custom') {
    return generateQuestionsCustom();
  }

  // filter questions from config object
  const filteredQuestions = [];
  questionKeys.forEach(question => {
    if (!config.hasOwnProperty(question)) {
      filteredQuestions.push(_questions2.default[question]);
    }
  });

  return filteredQuestions;
}

start();

exports.default = { generateFiles: _files.generateFiles, generateFilesFromCustom: _files.generateFilesFromCustom };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJmaWx0ZXJlZFF1ZXN0aW9ucyIsImdlbmVyYXRlUXVlc3Rpb25zIiwicmVxdWlyZW1lbnRzIiwicHJvbXB0IiwicmVzdWx0cyIsImNvbmZpZyIsInR5cGUiLCJjb25zb2xlIiwibG9nIiwiZSIsInN0YXJ0IiwiYXJnc0NvbmZpZ1BhdGgiLCJhcmd2IiwiZGlyZWN0b3J5Q29uZmlnIiwicHJvY2VzcyIsImN3ZCIsImV4aXN0c1N5bmMiLCJKU09OIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJyZXF1aXJlIiwiZ2VuZXJhdGVRdWVzdGlvbnNDdXN0b20iLCJtYW5kYXRvcnlRdWVzdGlvbnMiLCJuYW1lIiwicGF0aCIsImZpbHRlciIsInF1ZXN0aW9uIiwicXVlc3Rpb25LZXlzIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImZvckVhY2giLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCJnZW5lcmF0ZUZpbGVzIiwiZ2VuZXJhdGVGaWxlc0Zyb21DdXN0b20iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBZ0VBOzs7Ozs7OytCQU1BLGFBQXVCO0FBQ3JCLFFBQUk7QUFDRixZQUFNQSxvQkFBb0JDLG1CQUExQjtBQUNBLFlBQU1DLGVBQWUsTUFBTSxtQkFBU0MsTUFBVCxDQUFnQkgsaUJBQWhCLENBQTNCOztBQUVBLFlBQU1JLHVCQUNEQyxNQURDLEVBRURILFlBRkMsQ0FBTjs7QUFLQSxVQUFJRSxRQUFRRSxJQUFSLEtBQWlCLFFBQXJCLEVBQStCO0FBQzdCLDRDQUF3QkYsT0FBeEI7QUFDRCxPQUZELE1BRU87QUFDTCxrQ0FBY0EsT0FBZDtBQUNEOztBQUVERyxjQUFRQyxHQUFSLENBQVksNEJBQVo7QUFDRCxLQWhCRCxDQWdCRSxPQUFPQyxDQUFQLEVBQVU7QUFDVkYsY0FBUUMsR0FBUixDQUFZQyxDQUFaO0FBQ0Q7QUFDRixHOztrQkFwQmNDLEs7Ozs7O0FBcEVmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7OztBQUVBO0FBQ0EsSUFBSUwsU0FBUyxJQUFiO0FBQ0EsTUFBTU0saUJBQWlCLGdCQUFNQyxJQUFOLENBQVdQLE1BQWxDO0FBQ0EsTUFBTVEsa0JBQW1CLEdBQUVDLFFBQVFDLEdBQVIsRUFBYyxTQUF6Qzs7QUFFQTtBQUNBLElBQUksa0JBQUdDLFVBQUgsQ0FBY0gsZUFBZCxDQUFKLEVBQW9DO0FBQ2xDUixXQUFTWSxLQUFLQyxLQUFMLENBQVcsa0JBQUdDLFlBQUgsQ0FBZ0JOLGVBQWhCLEVBQWlDLE1BQWpDLENBQVgsQ0FBVDtBQUNEOztBQUVEO0FBQ0EsSUFBSUYsY0FBSixFQUFvQjtBQUNsQk4sV0FBU2UsUUFBUyxHQUFFTixRQUFRQyxHQUFSLEVBQWMsSUFBR0osY0FBZSxFQUEzQyxDQUFUO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxTQUFTVSx1QkFBVCxHQUFtQztBQUNqQyxRQUFNQyxxQkFBcUIsQ0FBQyxvQkFBVUMsSUFBWCxFQUFpQixvQkFBVUMsSUFBM0IsQ0FBM0I7O0FBRUEsU0FBT0YsbUJBQW1CRyxNQUFuQixDQUEyQkMsUUFBRCxJQUFjO0FBQzdDLFFBQUlyQixPQUFPcUIsU0FBU0gsSUFBaEIsQ0FBSixFQUEyQjtBQUN6QixhQUFPLEtBQVA7QUFDRDtBQUNELFdBQU8sSUFBUDtBQUNELEdBTE0sQ0FBUDtBQU1EOztBQUVEOzs7QUFHQSxTQUFTdEIsaUJBQVQsR0FBNkI7QUFDM0IsUUFBTTBCLGVBQWVDLE9BQU9DLElBQVAscUJBQXJCOztBQUVBLE1BQUksQ0FBQ3hCLE1BQUwsRUFBYTtBQUNYLFdBQU9zQixhQUFhRyxHQUFiLENBQWlCSixZQUFZLG9CQUFVQSxRQUFWLENBQTdCLENBQVA7QUFDRDs7QUFFRDtBQUNBLE1BQUlyQixPQUFPQyxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCLFdBQU9lLHlCQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNckIsb0JBQW9CLEVBQTFCO0FBQ0EyQixlQUFhSSxPQUFiLENBQXNCTCxRQUFELElBQWM7QUFDakMsUUFBSSxDQUFDckIsT0FBTzJCLGNBQVAsQ0FBc0JOLFFBQXRCLENBQUwsRUFBc0M7QUFDcEMxQix3QkFBa0JpQyxJQUFsQixDQUF1QixvQkFBVVAsUUFBVixDQUF2QjtBQUNEO0FBQ0YsR0FKRDs7QUFNQSxTQUFPMUIsaUJBQVA7QUFDRDs7QUE4QkRVOztrQkFFZSxFQUFFd0IsbUNBQUYsRUFBaUJDLHVEQUFqQixFIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBpbnF1aXJlciBmcm9tICdpbnF1aXJlcidcbmltcG9ydCB5YXJncyBmcm9tICd5YXJncydcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSdcbmltcG9ydCB7IGdlbmVyYXRlRmlsZXMsIGdlbmVyYXRlRmlsZXNGcm9tQ3VzdG9tIH0gZnJvbSAnLi9maWxlcydcbmltcG9ydCBxdWVzdGlvbnMgZnJvbSAnLi9xdWVzdGlvbnMnXG5cbi8vIER5bmFtaWNhbGx5IGltcG9ydCB0aGUgY29uZmlnIGZpbGUgaWYgZXhpc3RcbmxldCBjb25maWcgPSBudWxsXG5jb25zdCBhcmdzQ29uZmlnUGF0aCA9IHlhcmdzLmFyZ3YuY29uZmlnXG5jb25zdCBkaXJlY3RvcnlDb25maWcgPSBgJHtwcm9jZXNzLmN3ZCgpfS8uY2NhcmNgXG5cbi8vIENoZWNrIGlmIGV4aXN0IHRoZSBkZWZhdWx0IGRpcmVjdG9yeSBvZiBjb25maWd1cmF0aW9uXG5pZiAoZnMuZXhpc3RzU3luYyhkaXJlY3RvcnlDb25maWcpKSB7XG4gIGNvbmZpZyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGRpcmVjdG9yeUNvbmZpZywgJ3V0ZjgnKSlcbn1cblxuLy8gT3ZlcnJpZGUgdGhlIGNvbmZpZyBvYmplY3QgZnJvbSB0aGUgZGlyZWN0b3J5IGlmIGV4aXN0IC0tY29uZmlnXG5pZiAoYXJnc0NvbmZpZ1BhdGgpIHtcbiAgY29uZmlnID0gcmVxdWlyZShgJHtwcm9jZXNzLmN3ZCgpfS8ke2FyZ3NDb25maWdQYXRofWApXG59XG5cbi8qKlxuICogSWYgdGhlIHVzZXIgd2FudCB0byB1c2UgY3VzdG9tIHRlbXBsYXRlcywgcmV0dXJuIGZpbHRlcmVkIHF1ZXN0aW9uc1xuICogZm9yIG9ubHkgY3VzdG9tIGNvbmZpZ3VyYXRpb25cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVRdWVzdGlvbnNDdXN0b20oKSB7XG4gIGNvbnN0IG1hbmRhdG9yeVF1ZXN0aW9ucyA9IFtxdWVzdGlvbnMubmFtZSwgcXVlc3Rpb25zLnBhdGhdXG5cbiAgcmV0dXJuIG1hbmRhdG9yeVF1ZXN0aW9ucy5maWx0ZXIoKHF1ZXN0aW9uKSA9PiB7XG4gICAgaWYgKGNvbmZpZ1txdWVzdGlvbi5uYW1lXSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH0pXG59XG5cbi8qKlxuICogR2VuZXJhdGUgcXVlc3Rpb25zIGZpbHRlcmVkIGJ5IHRoZSBjb25maWcgZmlsZSBpZiBleGlzdFxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVF1ZXN0aW9ucygpIHtcbiAgY29uc3QgcXVlc3Rpb25LZXlzID0gT2JqZWN0LmtleXMocXVlc3Rpb25zKVxuXG4gIGlmICghY29uZmlnKSB7XG4gICAgcmV0dXJuIHF1ZXN0aW9uS2V5cy5tYXAocXVlc3Rpb24gPT4gcXVlc3Rpb25zW3F1ZXN0aW9uXSlcbiAgfVxuXG4gIC8vIElmIHR5cGUgaXMgY3VzdG9tLCBmaWx0ZXIgcXVlc3Rpb24gbWFuZGF0b3J5IHRvIHdvcmtcbiAgaWYgKGNvbmZpZy50eXBlID09PSAnY3VzdG9tJykge1xuICAgIHJldHVybiBnZW5lcmF0ZVF1ZXN0aW9uc0N1c3RvbSgpXG4gIH1cblxuICAvLyBmaWx0ZXIgcXVlc3Rpb25zIGZyb20gY29uZmlnIG9iamVjdFxuICBjb25zdCBmaWx0ZXJlZFF1ZXN0aW9ucyA9IFtdXG4gIHF1ZXN0aW9uS2V5cy5mb3JFYWNoKChxdWVzdGlvbikgPT4ge1xuICAgIGlmICghY29uZmlnLmhhc093blByb3BlcnR5KHF1ZXN0aW9uKSkge1xuICAgICAgZmlsdGVyZWRRdWVzdGlvbnMucHVzaChxdWVzdGlvbnNbcXVlc3Rpb25dKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gZmlsdGVyZWRRdWVzdGlvbnNcbn1cblxuLyoqXG4gKiBTdGFydCB0aGUgcHJvY2VzcyB0byBnZW5lcmF0ZSBjb21wb25lbnQgZm9sZGVyIGFuZCBmaWxlczpcbiAqIEZpbHRlciBxdWVzdGlvbiBieSBjb25maWcgZmlsZVxuICogR2V0IGZyb20gdGhlIHVzZXIgdGhlIHJlcXVpcmVtZW50cyB0byBjcmVhdGUgdGhlIGNvbXBvbmVudCBmb2xkZXIgYW5kIGZpbGVzXG4gKiBHZW5lcmF0ZSBmaWxlc1xuICovXG5hc3luYyBmdW5jdGlvbiBzdGFydCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBmaWx0ZXJlZFF1ZXN0aW9ucyA9IGdlbmVyYXRlUXVlc3Rpb25zKClcbiAgICBjb25zdCByZXF1aXJlbWVudHMgPSBhd2FpdCBpbnF1aXJlci5wcm9tcHQoZmlsdGVyZWRRdWVzdGlvbnMpXG5cbiAgICBjb25zdCByZXN1bHRzID0ge1xuICAgICAgLi4uY29uZmlnLFxuICAgICAgLi4ucmVxdWlyZW1lbnRzLFxuICAgIH1cblxuICAgIGlmIChyZXN1bHRzLnR5cGUgPT09ICdjdXN0b20nKSB7XG4gICAgICBnZW5lcmF0ZUZpbGVzRnJvbUN1c3RvbShyZXN1bHRzKVxuICAgIH0gZWxzZSB7XG4gICAgICBnZW5lcmF0ZUZpbGVzKHJlc3VsdHMpXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ1lvdXIgY29tcG9uZW50IGlzIGNyZWF0ZWQhJylcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpXG4gIH1cbn1cblxuc3RhcnQoKVxuXG5leHBvcnQgZGVmYXVsdCB7IGdlbmVyYXRlRmlsZXMsIGdlbmVyYXRlRmlsZXNGcm9tQ3VzdG9tIH1cbiJdfQ==