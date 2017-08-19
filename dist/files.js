'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateFilesFromCustom = exports.generateFiles = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Generate component files from custom templates folder
 * Get every single file in the
 * @param {string} the name of the component used to create folder and file
 * @param {string} where the component folder is created
 * @param {string} where the custom templates are
 */
let generateFilesFromCustom = (() => {
  var _ref = _asyncToGenerator(function* ({ name, path, templatesPath }) {
    try {
      const files = _fsExtra2.default.readdirSync(templatesPath);

      files.map((() => {
        var _ref2 = _asyncToGenerator(function* (templateFileName) {
          // Get the template content
          const content = yield readFile(templatesPath, templateFileName);
          const replaced = content.replace(/COMPONENT_NAME/g, name);
          // Exist ?
          const newFileName = generateFileName(`${path}/${name}/`, name, templateFileName);
          // Write the new file with the new content
          _fsExtra2.default.outputFile(`${path}/${name}/${newFileName}`, replaced);
        });

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      })());
    } catch (e) {
      console.log(e);
    }
  });

  return function generateFilesFromCustom(_x) {
    return _ref.apply(this, arguments);
  };
})();

/**
 * Return the default names replace from user filenames
 * @param {object} fileNames object with the user selected filenames
 * @param {string} componentName
 * @return {object} with the correct filenames
 */


var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _templates = require('./templates');

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Get the extension from the filename
 * @param {string} fileName
 */
function getExtension(fileName) {
  const splittedFilename = fileName.split('.');
  const length = splittedFilename.length;

  if (splittedFilename[1] === 'tests') {
    return `${splittedFilename[length - 2]}.${splittedFilename[length - 1]}`;
  }

  return splittedFilename[length - 1];
}

/**
 * readFile fs promise wrapped
 * @param {string} path
 * @param {string} fileName
 */
function readFile(path, fileName) {
  return new Promise((resolve, reject) => {
    _fsExtra2.default.readFile(`${path}/${fileName}`, 'utf8', (err, content) => {
      if (err) {
        return reject(err);
      }

      return resolve(content);
    });
  });
}

/**
 * check if already exist in the folder the same file name
 * If already exist, use the name
 * @param {string} newFilePath
 * @param {string} newFileName
 * @param {string} templateFileName
 */
function generateFileName(newFilePath, newFileName, templateFileName) {
  // Suppose that the index file don't be renamed
  if (templateFileName.indexOf('index') !== -1) {
    return templateFileName;
  }

  if (_fsExtra2.default.existsSync(newFilePath)) {
    return templateFileName;
  }

  if (templateFileName.includes('COMPONENT_NAME')) {
    return templateFileName.replace(/COMPONENT_NAME/g, newFileName);
  }

  return `${newFileName}.${getExtension(templateFileName)}`;
}function getFileNames(fileNames, componentName) {
  const defaultFileNames = {
    testFileName: _config2.default.testFileName,
    testFileMatch: componentName,
    componentFileName: componentName,
    styleFileName: componentName
  };

  return _extends({}, defaultFileNames, fileNames);
}

/**
 * Generate component files
 *
 * @param {object} params object with:
 * @param {string} type: the type of component template
 * @param {string} name: the name of the component used to create folder and file
 * @param {string} path: where the component folder is created
 * @param {string} cssExtension: the extension of the css file
 * @param {string} jsExtension: the extension of the component file
 * @param {array} componentMethods: Array of strings of methods to include in a class component
 * @param {boolean} indexFile: include or not an index file
 * @param {boolean} connected: include or not the connect function of redux
 * @param {boolean} includeStories: include or not the storybook file
 * @param {boolean} includeTests: include or not the test file
 */
function generateFiles(params) {
  const type = params.type,
        name = params.name,
        fileNames = params.fileNames,
        path = params.path,
        indexFile = params.indexFile,
        cssExtension = params.cssExtension,
        componentMethods = params.componentMethods,
        jsExtension = params.jsExtension,
        connected = params.connected,
        includeStories = params.includeStories,
        includeCosmos = params.includeCosmos,
        includeTests = params.includeTests;

  const destination = `${path}/${name}`;

  var _getFileNames = getFileNames(fileNames, name);

  const testFileName = _getFileNames.testFileName,
        testFileMatch = _getFileNames.testFileMatch,
        componentFileName = _getFileNames.componentFileName,
        styleFileName = _getFileNames.styleFileName;


  if (indexFile || connected) {
    _fsExtra2.default.outputFile(`${destination}/index.js`, (0, _templates.generateIndexFile)(componentFileName, connected));
  }

  if (includeStories) {
    _fsExtra2.default.outputFile(`${destination}/__tests__/${name}.stories.${jsExtension}`, (0, _templates.generateStorybookTemplate)(name));
  }

  if (includeCosmos) {
    _fsExtra2.default.outputFile(`${destination}/__tests__/__fixtures__/default.js`, (0, _templates.generateCosmosTemplate)(name));
  }

  if (includeTests) {
    _fsExtra2.default.outputFile(`${destination}/__tests__/${testFileMatch}.${testFileName}.${jsExtension}`, (0, _templates.generateTestTemplate)(name));
  }

  // Create js file
  _fsExtra2.default.outputFile(`${destination}/${componentFileName}.${jsExtension}`, (0, _templates.generateComponentTemplate)(type, componentFileName, {
    cssExtension,
    componentMethods,
    styleFileName
  }));

  // Create css file
  if (cssExtension) {
    _fsExtra2.default.outputFile(`${destination}/${styleFileName}.${cssExtension}`, (0, _templates.generateStyleFile)(styleFileName));
  }
}

exports.generateFiles = generateFiles;
exports.generateFilesFromCustom = generateFilesFromCustom;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy5qcyJdLCJuYW1lcyI6WyJuYW1lIiwicGF0aCIsInRlbXBsYXRlc1BhdGgiLCJmaWxlcyIsInJlYWRkaXJTeW5jIiwibWFwIiwidGVtcGxhdGVGaWxlTmFtZSIsImNvbnRlbnQiLCJyZWFkRmlsZSIsInJlcGxhY2VkIiwicmVwbGFjZSIsIm5ld0ZpbGVOYW1lIiwiZ2VuZXJhdGVGaWxlTmFtZSIsIm91dHB1dEZpbGUiLCJlIiwiY29uc29sZSIsImxvZyIsImdlbmVyYXRlRmlsZXNGcm9tQ3VzdG9tIiwiZ2V0RXh0ZW5zaW9uIiwiZmlsZU5hbWUiLCJzcGxpdHRlZEZpbGVuYW1lIiwic3BsaXQiLCJsZW5ndGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVyciIsIm5ld0ZpbGVQYXRoIiwiaW5kZXhPZiIsImV4aXN0c1N5bmMiLCJpbmNsdWRlcyIsImdldEZpbGVOYW1lcyIsImZpbGVOYW1lcyIsImNvbXBvbmVudE5hbWUiLCJkZWZhdWx0RmlsZU5hbWVzIiwidGVzdEZpbGVOYW1lIiwidGVzdEZpbGVNYXRjaCIsImNvbXBvbmVudEZpbGVOYW1lIiwic3R5bGVGaWxlTmFtZSIsImdlbmVyYXRlRmlsZXMiLCJwYXJhbXMiLCJ0eXBlIiwiaW5kZXhGaWxlIiwiY3NzRXh0ZW5zaW9uIiwiY29tcG9uZW50TWV0aG9kcyIsImpzRXh0ZW5zaW9uIiwiY29ubmVjdGVkIiwiaW5jbHVkZVN0b3JpZXMiLCJpbmNsdWRlQ29zbW9zIiwiaW5jbHVkZVRlc3RzIiwiZGVzdGluYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQW1FQTs7Ozs7Ozs7K0JBT0EsV0FBdUMsRUFBRUEsSUFBRixFQUFRQyxJQUFSLEVBQWNDLGFBQWQsRUFBdkMsRUFBc0U7QUFDcEUsUUFBSTtBQUNGLFlBQU1DLFFBQVEsa0JBQUdDLFdBQUgsQ0FBZUYsYUFBZixDQUFkOztBQUVBQyxZQUFNRSxHQUFOO0FBQUEsc0NBQVUsV0FBT0MsZ0JBQVAsRUFBNEI7QUFD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V0FBWSxFQUQxRCxFQUVFLDBDQUEwQjdDLElBQTFCLENBRkY7QUFJRDs7QUFFRCxNQUFJZ0QsYUFBSixFQUFtQjtBQUNqQixzQkFBR25DLFVBQUgsQ0FDRyxHQUFFcUMsV0FBWSxvQ0FEakIsRUFFRSx1Q0FBdUJsRCxJQUF2QixDQUZGO0FBSUQ7O0FBRUQsTUFBSWlELFlBQUosRUFBa0I7QUFDaEIsc0JBQUdwQyxVQUFILENBQ0csR0FBRXFDLFdBQVksY0FBYWQsYUFBYyxJQUFHRCxZQUFhLElBQUdVLFdBQVksRUFEM0UsRUFFRSxxQ0FBcUI3QyxJQUFyQixDQUZGO0FBSUQ7O0FBRUQ7QUFDQSxvQkFBR2EsVUFBSCxDQUNHLEdBQUVxQyxXQUFZLElBQUdiLGlCQUFrQixJQUFHUSxXQUFZLEVBRHJELEVBRUUsMENBQTBCSixJQUExQixFQUFnQ0osaUJBQWhDLEVBQW1EO0FBQ2pETSxnQkFEaUQ7QUFFakRDLG9CQUZpRDtBQUdqRE47QUFIaUQsR0FBbkQsQ0FGRjs7QUFTQTtBQUNBLE1BQUlLLFlBQUosRUFBa0I7QUFDaEIsc0JBQUc5QixVQUFILENBQ0csR0FBRXFDLFdBQVksSUFBR1osYUFBYyxJQUFHSyxZQUFhLEVBRGxELEVBRUUsa0NBQWtCTCxhQUFsQixDQUZGO0FBSUQ7QUFDRjs7UUFFUUMsYSxHQUFBQSxhO1FBQWV0Qix1QixHQUFBQSx1QiIsImZpbGUiOiJmaWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcy1leHRyYSdcbmltcG9ydCB7XG4gIGdlbmVyYXRlQ29tcG9uZW50VGVtcGxhdGUsXG4gIGdlbmVyYXRlU3R5bGVGaWxlLFxuICBnZW5lcmF0ZUluZGV4RmlsZSxcbiAgZ2VuZXJhdGVUZXN0VGVtcGxhdGUsXG4gIGdlbmVyYXRlU3Rvcnlib29rVGVtcGxhdGUsXG4gIGdlbmVyYXRlQ29zbW9zVGVtcGxhdGUsXG59IGZyb20gJy4vdGVtcGxhdGVzJ1xuaW1wb3J0IGRlZmF1bHRPcHRpb25zIGZyb20gJy4vY29uZmlnLmpzb24nXG5cbi8qKlxuICogR2V0IHRoZSBleHRlbnNpb24gZnJvbSB0aGUgZmlsZW5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlTmFtZVxuICovXG5mdW5jdGlvbiBnZXRFeHRlbnNpb24oZmlsZU5hbWUpIHtcbiAgY29uc3Qgc3BsaXR0ZWRGaWxlbmFtZSA9IGZpbGVOYW1lLnNwbGl0KCcuJylcbiAgY29uc3QgbGVuZ3RoID0gc3BsaXR0ZWRGaWxlbmFtZS5sZW5ndGhcblxuICBpZiAoc3BsaXR0ZWRGaWxlbmFtZVsxXSA9PT0gJ3Rlc3RzJykge1xuICAgIHJldHVybiBgJHtzcGxpdHRlZEZpbGVuYW1lW2xlbmd0aCAtIDJdfS4ke3NwbGl0dGVkRmlsZW5hbWVbbGVuZ3RoIC0gMV19YFxuICB9XG5cbiAgcmV0dXJuIHNwbGl0dGVkRmlsZW5hbWVbbGVuZ3RoIC0gMV1cbn1cblxuLyoqXG4gKiByZWFkRmlsZSBmcyBwcm9taXNlIHdyYXBwZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZU5hbWVcbiAqL1xuZnVuY3Rpb24gcmVhZEZpbGUocGF0aCwgZmlsZU5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBmcy5yZWFkRmlsZShgJHtwYXRofS8ke2ZpbGVOYW1lfWAsICd1dGY4JywgKGVyciwgY29udGVudCkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gcmVqZWN0KGVycilcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc29sdmUoY29udGVudClcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIGNoZWNrIGlmIGFscmVhZHkgZXhpc3QgaW4gdGhlIGZvbGRlciB0aGUgc2FtZSBmaWxlIG5hbWVcbiAqIElmIGFscmVhZHkgZXhpc3QsIHVzZSB0aGUgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IG5ld0ZpbGVQYXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gbmV3RmlsZU5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZW1wbGF0ZUZpbGVOYW1lXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlRmlsZU5hbWUobmV3RmlsZVBhdGgsIG5ld0ZpbGVOYW1lLCB0ZW1wbGF0ZUZpbGVOYW1lKSB7XG4gIC8vIFN1cHBvc2UgdGhhdCB0aGUgaW5kZXggZmlsZSBkb24ndCBiZSByZW5hbWVkXG4gIGlmICh0ZW1wbGF0ZUZpbGVOYW1lLmluZGV4T2YoJ2luZGV4JykgIT09IC0xKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlRmlsZU5hbWVcbiAgfVxuXG4gIGlmIChmcy5leGlzdHNTeW5jKG5ld0ZpbGVQYXRoKSkge1xuICAgIHJldHVybiB0ZW1wbGF0ZUZpbGVOYW1lXG4gIH1cblxuICBpZiAodGVtcGxhdGVGaWxlTmFtZS5pbmNsdWRlcygnQ09NUE9ORU5UX05BTUUnKSkge1xuICAgIHJldHVybiB0ZW1wbGF0ZUZpbGVOYW1lLnJlcGxhY2UoL0NPTVBPTkVOVF9OQU1FL2csIG5ld0ZpbGVOYW1lKVxuICB9XG5cbiAgcmV0dXJuIGAke25ld0ZpbGVOYW1lfS4ke2dldEV4dGVuc2lvbih0ZW1wbGF0ZUZpbGVOYW1lKX1gXG59XG5cbi8qKlxuICogR2VuZXJhdGUgY29tcG9uZW50IGZpbGVzIGZyb20gY3VzdG9tIHRlbXBsYXRlcyBmb2xkZXJcbiAqIEdldCBldmVyeSBzaW5nbGUgZmlsZSBpbiB0aGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGUgbmFtZSBvZiB0aGUgY29tcG9uZW50IHVzZWQgdG8gY3JlYXRlIGZvbGRlciBhbmQgZmlsZVxuICogQHBhcmFtIHtzdHJpbmd9IHdoZXJlIHRoZSBjb21wb25lbnQgZm9sZGVyIGlzIGNyZWF0ZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSB3aGVyZSB0aGUgY3VzdG9tIHRlbXBsYXRlcyBhcmVcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVGaWxlc0Zyb21DdXN0b20oeyBuYW1lLCBwYXRoLCB0ZW1wbGF0ZXNQYXRoIH0pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKHRlbXBsYXRlc1BhdGgpXG5cbiAgICBmaWxlcy5tYXAoYXN5bmMgKHRlbXBsYXRlRmlsZU5hbWUpID0+IHtcbiAgICAgIC8vIEdldCB0aGUgdGVtcGxhdGUgY29udGVudFxuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHJlYWRGaWxlKHRlbXBsYXRlc1BhdGgsIHRlbXBsYXRlRmlsZU5hbWUpXG4gICAgICBjb25zdCByZXBsYWNlZCA9IGNvbnRlbnQucmVwbGFjZSgvQ09NUE9ORU5UX05BTUUvZywgbmFtZSlcbiAgICAgIC8vIEV4aXN0ID9cbiAgICAgIGNvbnN0IG5ld0ZpbGVOYW1lID0gZ2VuZXJhdGVGaWxlTmFtZShcbiAgICAgICAgYCR7cGF0aH0vJHtuYW1lfS9gLFxuICAgICAgICBuYW1lLFxuICAgICAgICB0ZW1wbGF0ZUZpbGVOYW1lXG4gICAgICApXG4gICAgICAvLyBXcml0ZSB0aGUgbmV3IGZpbGUgd2l0aCB0aGUgbmV3IGNvbnRlbnRcbiAgICAgIGZzLm91dHB1dEZpbGUoYCR7cGF0aH0vJHtuYW1lfS8ke25ld0ZpbGVOYW1lfWAsIHJlcGxhY2VkKVxuICAgIH0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBkZWZhdWx0IG5hbWVzIHJlcGxhY2UgZnJvbSB1c2VyIGZpbGVuYW1lc1xuICogQHBhcmFtIHtvYmplY3R9IGZpbGVOYW1lcyBvYmplY3Qgd2l0aCB0aGUgdXNlciBzZWxlY3RlZCBmaWxlbmFtZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lXG4gKiBAcmV0dXJuIHtvYmplY3R9IHdpdGggdGhlIGNvcnJlY3QgZmlsZW5hbWVzXG4gKi9cbmZ1bmN0aW9uIGdldEZpbGVOYW1lcyhmaWxlTmFtZXMsIGNvbXBvbmVudE5hbWUpIHtcbiAgY29uc3QgZGVmYXVsdEZpbGVOYW1lcyA9IHtcbiAgICB0ZXN0RmlsZU5hbWU6IGRlZmF1bHRPcHRpb25zLnRlc3RGaWxlTmFtZSxcbiAgICB0ZXN0RmlsZU1hdGNoOiBjb21wb25lbnROYW1lLFxuICAgIGNvbXBvbmVudEZpbGVOYW1lOiBjb21wb25lbnROYW1lLFxuICAgIHN0eWxlRmlsZU5hbWU6IGNvbXBvbmVudE5hbWUsXG4gIH1cblxuICByZXR1cm4geyAuLi5kZWZhdWx0RmlsZU5hbWVzLCAuLi5maWxlTmFtZXMgfVxufVxuXG4vKipcbiAqIEdlbmVyYXRlIGNvbXBvbmVudCBmaWxlc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgb2JqZWN0IHdpdGg6XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZTogdGhlIHR5cGUgb2YgY29tcG9uZW50IHRlbXBsYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZTogdGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCB1c2VkIHRvIGNyZWF0ZSBmb2xkZXIgYW5kIGZpbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoOiB3aGVyZSB0aGUgY29tcG9uZW50IGZvbGRlciBpcyBjcmVhdGVkXG4gKiBAcGFyYW0ge3N0cmluZ30gY3NzRXh0ZW5zaW9uOiB0aGUgZXh0ZW5zaW9uIG9mIHRoZSBjc3MgZmlsZVxuICogQHBhcmFtIHtzdHJpbmd9IGpzRXh0ZW5zaW9uOiB0aGUgZXh0ZW5zaW9uIG9mIHRoZSBjb21wb25lbnQgZmlsZVxuICogQHBhcmFtIHthcnJheX0gY29tcG9uZW50TWV0aG9kczogQXJyYXkgb2Ygc3RyaW5ncyBvZiBtZXRob2RzIHRvIGluY2x1ZGUgaW4gYSBjbGFzcyBjb21wb25lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5kZXhGaWxlOiBpbmNsdWRlIG9yIG5vdCBhbiBpbmRleCBmaWxlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGNvbm5lY3RlZDogaW5jbHVkZSBvciBub3QgdGhlIGNvbm5lY3QgZnVuY3Rpb24gb2YgcmVkdXhcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVN0b3JpZXM6IGluY2x1ZGUgb3Igbm90IHRoZSBzdG9yeWJvb2sgZmlsZVxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlVGVzdHM6IGluY2x1ZGUgb3Igbm90IHRoZSB0ZXN0IGZpbGVcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVGaWxlcyhwYXJhbXMpIHtcbiAgY29uc3Qge1xuICAgIHR5cGUsXG4gICAgbmFtZSxcbiAgICBmaWxlTmFtZXMsXG4gICAgcGF0aCxcbiAgICBpbmRleEZpbGUsXG4gICAgY3NzRXh0ZW5zaW9uLFxuICAgIGNvbXBvbmVudE1ldGhvZHMsXG4gICAganNFeHRlbnNpb24sXG4gICAgY29ubmVjdGVkLFxuICAgIGluY2x1ZGVTdG9yaWVzLFxuICAgIGluY2x1ZGVDb3Ntb3MsXG4gICAgaW5jbHVkZVRlc3RzLFxuICB9ID0gcGFyYW1zXG4gIGNvbnN0IGRlc3RpbmF0aW9uID0gYCR7cGF0aH0vJHtuYW1lfWBcblxuICBjb25zdCB7XG4gICAgdGVzdEZpbGVOYW1lLFxuICAgIHRlc3RGaWxlTWF0Y2gsXG4gICAgY29tcG9uZW50RmlsZU5hbWUsXG4gICAgc3R5bGVGaWxlTmFtZSxcbiAgfSA9IGdldEZpbGVOYW1lcyhmaWxlTmFtZXMsIG5hbWUpXG5cbiAgaWYgKGluZGV4RmlsZSB8fCBjb25uZWN0ZWQpIHtcbiAgICBmcy5vdXRwdXRGaWxlKFxuICAgICAgYCR7ZGVzdGluYXRpb259L2luZGV4LmpzYCxcbiAgICAgIGdlbmVyYXRlSW5kZXhGaWxlKGNvbXBvbmVudEZpbGVOYW1lLCBjb25uZWN0ZWQpXG4gICAgKVxuICB9XG5cbiAgaWYgKGluY2x1ZGVTdG9yaWVzKSB7XG4gICAgZnMub3V0cHV0RmlsZShcbiAgICAgIGAke2Rlc3RpbmF0aW9ufS9fX3Rlc3RzX18vJHtuYW1lfS5zdG9yaWVzLiR7anNFeHRlbnNpb259YCxcbiAgICAgIGdlbmVyYXRlU3Rvcnlib29rVGVtcGxhdGUobmFtZSlcbiAgICApXG4gIH1cblxuICBpZiAoaW5jbHVkZUNvc21vcykge1xuICAgIGZzLm91dHB1dEZpbGUoXG4gICAgICBgJHtkZXN0aW5hdGlvbn0vX190ZXN0c19fL19fZml4dHVyZXNfXy9kZWZhdWx0LmpzYCxcbiAgICAgIGdlbmVyYXRlQ29zbW9zVGVtcGxhdGUobmFtZSlcbiAgICApXG4gIH1cbiAgXG4gIGlmIChpbmNsdWRlVGVzdHMpIHtcbiAgICBmcy5vdXRwdXRGaWxlKFxuICAgICAgYCR7ZGVzdGluYXRpb259L19fdGVzdHNfXy8ke3Rlc3RGaWxlTWF0Y2h9LiR7dGVzdEZpbGVOYW1lfS4ke2pzRXh0ZW5zaW9ufWAsXG4gICAgICBnZW5lcmF0ZVRlc3RUZW1wbGF0ZShuYW1lKVxuICAgIClcbiAgfVxuXG4gIC8vIENyZWF0ZSBqcyBmaWxlXG4gIGZzLm91dHB1dEZpbGUoXG4gICAgYCR7ZGVzdGluYXRpb259LyR7Y29tcG9uZW50RmlsZU5hbWV9LiR7anNFeHRlbnNpb259YCxcbiAgICBnZW5lcmF0ZUNvbXBvbmVudFRlbXBsYXRlKHR5cGUsIGNvbXBvbmVudEZpbGVOYW1lLCB7XG4gICAgICBjc3NFeHRlbnNpb24sXG4gICAgICBjb21wb25lbnRNZXRob2RzLFxuICAgICAgc3R5bGVGaWxlTmFtZSxcbiAgICB9KVxuICApXG5cbiAgLy8gQ3JlYXRlIGNzcyBmaWxlXG4gIGlmIChjc3NFeHRlbnNpb24pIHtcbiAgICBmcy5vdXRwdXRGaWxlKFxuICAgICAgYCR7ZGVzdGluYXRpb259LyR7c3R5bGVGaWxlTmFtZX0uJHtjc3NFeHRlbnNpb259YCxcbiAgICAgIGdlbmVyYXRlU3R5bGVGaWxlKHN0eWxlRmlsZU5hbWUpXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCB7IGdlbmVyYXRlRmlsZXMsIGdlbmVyYXRlRmlsZXNGcm9tQ3VzdG9tIH1cbiJdfQ==