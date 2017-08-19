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
 * @param {boolean} includeCosmos: include or not the cosmos fixtures file
 * @param {boolean} includeTests: include or not the test file
 * @param {boolean} includeLocale: include or not the locale file
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
        includeTests = params.includeTests,
        includeLocale = params.includeLocale;

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

  if (includeLocale) {
    _fsExtra2.default.outputFile(`${destination}/locale/zh-TW_${name}.js`, (0, _templates.generateLocaleTemplate)(name));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy5qcyJdLCJuYW1lcyI6WyJuYW1lIiwicGF0aCIsInRlbXBsYXRlc1BhdGgiLCJmaWxlcyIsInJlYWRkaXJTeW5jIiwibWFwIiwidGVtcGxhdGVGaWxlTmFtZSIsImNvbnRlbnQiLCJyZWFkRmlsZSIsInJlcGxhY2VkIiwicmVwbGFjZSIsIm5ld0ZpbGVOYW1lIiwiZ2VuZXJhdGVGaWxlTmFtZSIsIm91dHB1dEZpbGUiLCJlIiwiY29uc29sZSIsImxvZyIsImdlbmVyYXRlRmlsZXNGcm9tQ3VzdG9tIiwiZ2V0RXh0ZW5zaW9uIiwiZmlsZU5hbWUiLCJzcGxpdHRlZEZpbGVuYW1lIiwic3BsaXQiLCJsZW5ndGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVyciIsIm5ld0ZpbGVQYXRoIiwiaW5kZXhPZiIsImV4aXN0c1N5bmMiLCJpbmNsdWRlcyIsImdldEZpbGVOYW1lcyIsImZpbGVOYW1lcyIsImNvbXBvbmVudE5hbWUiLCJkZWZhdWx0RmlsZU5hbWVzIiwidGVzdEZpbGVOYW1lIiwidGVzdEZpbGVNYXRjaCIsImNvbXBvbmVudEZpbGVOYW1lIiwic3R5bGVGaWxlTmFtZSIsImdlbmVyYXRlRmlsZXMiLCJwYXJhbXMiLCJ0eXBlIiwiaW5kZXhGaWxlIiwiY3NzRXh0ZW5zaW9uIiwiY29tcG9uZW50TWV0aG9kcyIsImpzRXh0ZW5zaW9uIiwiY29ubmVjdGVkIiwiaW5jbHVkZVN0b3JpZXMiLCJpbmNsdWRlQ29zbW9zIiwiaW5jbHVkZVRlc3RzIiwiaW5jbHVkZUxvY2FsZSIsImRlc3RpbmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFvRUE7Ozs7Ozs7OytCQU9BLFdBQXVDLEVBQUVBLElBQUYsRUFBUUMsSUFBUixFQUFjQyxhQUFkLEVBQXZDLEVBQXNFO0FBQ3BFLFFBQUk7QUFDRixZQUFNQyxRQUFRLGtCQUFHQyxXQUFILENBQWVGLGFBQWYsQ0FBZDs7QUFFQUMsWUFBTUUsR0FBTjtBQUFBLHNDQUFVLFdBQU9D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QUFKLEVBQW9CO0FBQ2xCLHNCQUFHbEMsVUFBSCxDQUNHLEdBQUVzQyxXQUFZLGNBQWFuRCxJQUFLLFlBQVc2QyxXQUFZLEVBRDFELEVBRUUsMENBQTBCN0MsSUFBMUIsQ0FGRjtBQUlEOztBQUVELE1BQUlnRCxhQUFKLEVBQW1CO0FBQ2pCLHNCQUFHbkMsVUFBSCxDQUNHLEdBQUVzQyxXQUFZLG9DQURqQixFQUVFLHVDQUF1Qm5ELElBQXZCLENBRkY7QUFJRDs7QUFFRCxNQUFHa0QsYUFBSCxFQUFpQjtBQUNmLHNCQUFHckMsVUFBSCxDQUNHLEdBQUVzQyxXQUFZLGlCQUFnQm5ELElBQUssS0FEdEMsRUFFRSx1Q0FBdUJBLElBQXZCLENBRkY7QUFJRDs7QUFFRCxNQUFJaUQsWUFBSixFQUFrQjtBQUNoQixzQkFBR3BDLFVBQUgsQ0FDRyxHQUFFc0MsV0FBWSxjQUFhZixhQUFjLElBQUdELFlBQWEsSUFBR1UsV0FBWSxFQUQzRSxFQUVFLHFDQUFxQjdDLElBQXJCLENBRkY7QUFJRDs7QUFFRDtBQUNBLG9CQUFHYSxVQUFILENBQ0csR0FBRXNDLFdBQVksSUFBR2QsaUJBQWtCLElBQUdRLFdBQVksRUFEckQsRUFFRSwwQ0FBMEJKLElBQTFCLEVBQWdDSixpQkFBaEMsRUFBbUQ7QUFDakRNLGdCQURpRDtBQUVqREMsb0JBRmlEO0FBR2pETjtBQUhpRCxHQUFuRCxDQUZGOztBQVNBO0FBQ0EsTUFBSUssWUFBSixFQUFrQjtBQUNoQixzQkFBRzlCLFVBQUgsQ0FDRyxHQUFFc0MsV0FBWSxJQUFHYixhQUFjLElBQUdLLFlBQWEsRUFEbEQsRUFFRSxrQ0FBa0JMLGFBQWxCLENBRkY7QUFJRDtBQUNGOztRQUVRQyxhLEdBQUFBLGE7UUFBZXRCLHVCLEdBQUFBLHVCIiwiZmlsZSI6ImZpbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJ1xuaW1wb3J0IHtcbiAgZ2VuZXJhdGVDb21wb25lbnRUZW1wbGF0ZSxcbiAgZ2VuZXJhdGVTdHlsZUZpbGUsXG4gIGdlbmVyYXRlSW5kZXhGaWxlLFxuICBnZW5lcmF0ZVRlc3RUZW1wbGF0ZSxcbiAgZ2VuZXJhdGVTdG9yeWJvb2tUZW1wbGF0ZSxcbiAgZ2VuZXJhdGVDb3Ntb3NUZW1wbGF0ZSxcbiAgZ2VuZXJhdGVMb2NhbGVUZW1wbGF0ZSxcbn0gZnJvbSAnLi90ZW1wbGF0ZXMnXG5pbXBvcnQgZGVmYXVsdE9wdGlvbnMgZnJvbSAnLi9jb25maWcuanNvbidcblxuLyoqXG4gKiBHZXQgdGhlIGV4dGVuc2lvbiBmcm9tIHRoZSBmaWxlbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lXG4gKi9cbmZ1bmN0aW9uIGdldEV4dGVuc2lvbihmaWxlTmFtZSkge1xuICBjb25zdCBzcGxpdHRlZEZpbGVuYW1lID0gZmlsZU5hbWUuc3BsaXQoJy4nKVxuICBjb25zdCBsZW5ndGggPSBzcGxpdHRlZEZpbGVuYW1lLmxlbmd0aFxuXG4gIGlmIChzcGxpdHRlZEZpbGVuYW1lWzFdID09PSAndGVzdHMnKSB7XG4gICAgcmV0dXJuIGAke3NwbGl0dGVkRmlsZW5hbWVbbGVuZ3RoIC0gMl19LiR7c3BsaXR0ZWRGaWxlbmFtZVtsZW5ndGggLSAxXX1gXG4gIH1cblxuICByZXR1cm4gc3BsaXR0ZWRGaWxlbmFtZVtsZW5ndGggLSAxXVxufVxuXG4vKipcbiAqIHJlYWRGaWxlIGZzIHByb21pc2Ugd3JhcHBlZFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlTmFtZVxuICovXG5mdW5jdGlvbiByZWFkRmlsZShwYXRoLCBmaWxlTmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGZzLnJlYWRGaWxlKGAke3BhdGh9LyR7ZmlsZU5hbWV9YCwgJ3V0ZjgnLCAoZXJyLCBjb250ZW50KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzb2x2ZShjb250ZW50KVxuICAgIH0pXG4gIH0pXG59XG5cbi8qKlxuICogY2hlY2sgaWYgYWxyZWFkeSBleGlzdCBpbiB0aGUgZm9sZGVyIHRoZSBzYW1lIGZpbGUgbmFtZVxuICogSWYgYWxyZWFkeSBleGlzdCwgdXNlIHRoZSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gbmV3RmlsZVBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBuZXdGaWxlTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHRlbXBsYXRlRmlsZU5hbWVcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVGaWxlTmFtZShuZXdGaWxlUGF0aCwgbmV3RmlsZU5hbWUsIHRlbXBsYXRlRmlsZU5hbWUpIHtcbiAgLy8gU3VwcG9zZSB0aGF0IHRoZSBpbmRleCBmaWxlIGRvbid0IGJlIHJlbmFtZWRcbiAgaWYgKHRlbXBsYXRlRmlsZU5hbWUuaW5kZXhPZignaW5kZXgnKSAhPT0gLTEpIHtcbiAgICByZXR1cm4gdGVtcGxhdGVGaWxlTmFtZVxuICB9XG5cbiAgaWYgKGZzLmV4aXN0c1N5bmMobmV3RmlsZVBhdGgpKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlRmlsZU5hbWVcbiAgfVxuXG4gIGlmICh0ZW1wbGF0ZUZpbGVOYW1lLmluY2x1ZGVzKCdDT01QT05FTlRfTkFNRScpKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlRmlsZU5hbWUucmVwbGFjZSgvQ09NUE9ORU5UX05BTUUvZywgbmV3RmlsZU5hbWUpXG4gIH1cblxuICByZXR1cm4gYCR7bmV3RmlsZU5hbWV9LiR7Z2V0RXh0ZW5zaW9uKHRlbXBsYXRlRmlsZU5hbWUpfWBcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBjb21wb25lbnQgZmlsZXMgZnJvbSBjdXN0b20gdGVtcGxhdGVzIGZvbGRlclxuICogR2V0IGV2ZXJ5IHNpbmdsZSBmaWxlIGluIHRoZVxuICogQHBhcmFtIHtzdHJpbmd9IHRoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgdXNlZCB0byBjcmVhdGUgZm9sZGVyIGFuZCBmaWxlXG4gKiBAcGFyYW0ge3N0cmluZ30gd2hlcmUgdGhlIGNvbXBvbmVudCBmb2xkZXIgaXMgY3JlYXRlZFxuICogQHBhcmFtIHtzdHJpbmd9IHdoZXJlIHRoZSBjdXN0b20gdGVtcGxhdGVzIGFyZVxuICovXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUZpbGVzRnJvbUN1c3RvbSh7IG5hbWUsIHBhdGgsIHRlbXBsYXRlc1BhdGggfSkge1xuICB0cnkge1xuICAgIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmModGVtcGxhdGVzUGF0aClcblxuICAgIGZpbGVzLm1hcChhc3luYyAodGVtcGxhdGVGaWxlTmFtZSkgPT4ge1xuICAgICAgLy8gR2V0IHRoZSB0ZW1wbGF0ZSBjb250ZW50XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgcmVhZEZpbGUodGVtcGxhdGVzUGF0aCwgdGVtcGxhdGVGaWxlTmFtZSlcbiAgICAgIGNvbnN0IHJlcGxhY2VkID0gY29udGVudC5yZXBsYWNlKC9DT01QT05FTlRfTkFNRS9nLCBuYW1lKVxuICAgICAgLy8gRXhpc3QgP1xuICAgICAgY29uc3QgbmV3RmlsZU5hbWUgPSBnZW5lcmF0ZUZpbGVOYW1lKFxuICAgICAgICBgJHtwYXRofS8ke25hbWV9L2AsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHRlbXBsYXRlRmlsZU5hbWVcbiAgICAgIClcbiAgICAgIC8vIFdyaXRlIHRoZSBuZXcgZmlsZSB3aXRoIHRoZSBuZXcgY29udGVudFxuICAgICAgZnMub3V0cHV0RmlsZShgJHtwYXRofS8ke25hbWV9LyR7bmV3RmlsZU5hbWV9YCwgcmVwbGFjZWQpXG4gICAgfSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpXG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGRlZmF1bHQgbmFtZXMgcmVwbGFjZSBmcm9tIHVzZXIgZmlsZW5hbWVzXG4gKiBAcGFyYW0ge29iamVjdH0gZmlsZU5hbWVzIG9iamVjdCB3aXRoIHRoZSB1c2VyIHNlbGVjdGVkIGZpbGVuYW1lc1xuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWVcbiAqIEByZXR1cm4ge29iamVjdH0gd2l0aCB0aGUgY29ycmVjdCBmaWxlbmFtZXNcbiAqL1xuZnVuY3Rpb24gZ2V0RmlsZU5hbWVzKGZpbGVOYW1lcywgY29tcG9uZW50TmFtZSkge1xuICBjb25zdCBkZWZhdWx0RmlsZU5hbWVzID0ge1xuICAgIHRlc3RGaWxlTmFtZTogZGVmYXVsdE9wdGlvbnMudGVzdEZpbGVOYW1lLFxuICAgIHRlc3RGaWxlTWF0Y2g6IGNvbXBvbmVudE5hbWUsXG4gICAgY29tcG9uZW50RmlsZU5hbWU6IGNvbXBvbmVudE5hbWUsXG4gICAgc3R5bGVGaWxlTmFtZTogY29tcG9uZW50TmFtZSxcbiAgfVxuXG4gIHJldHVybiB7IC4uLmRlZmF1bHRGaWxlTmFtZXMsIC4uLmZpbGVOYW1lcyB9XG59XG5cbi8qKlxuICogR2VuZXJhdGUgY29tcG9uZW50IGZpbGVzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcyBvYmplY3Qgd2l0aDpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlOiB0aGUgdHlwZSBvZiBjb21wb25lbnQgdGVtcGxhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lOiB0aGUgbmFtZSBvZiB0aGUgY29tcG9uZW50IHVzZWQgdG8gY3JlYXRlIGZvbGRlciBhbmQgZmlsZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGg6IHdoZXJlIHRoZSBjb21wb25lbnQgZm9sZGVyIGlzIGNyZWF0ZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBjc3NFeHRlbnNpb246IHRoZSBleHRlbnNpb24gb2YgdGhlIGNzcyBmaWxlXG4gKiBAcGFyYW0ge3N0cmluZ30ganNFeHRlbnNpb246IHRoZSBleHRlbnNpb24gb2YgdGhlIGNvbXBvbmVudCBmaWxlXG4gKiBAcGFyYW0ge2FycmF5fSBjb21wb25lbnRNZXRob2RzOiBBcnJheSBvZiBzdHJpbmdzIG9mIG1ldGhvZHMgdG8gaW5jbHVkZSBpbiBhIGNsYXNzIGNvbXBvbmVudFxuICogQHBhcmFtIHtib29sZWFufSBpbmRleEZpbGU6IGluY2x1ZGUgb3Igbm90IGFuIGluZGV4IGZpbGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gY29ubmVjdGVkOiBpbmNsdWRlIG9yIG5vdCB0aGUgY29ubmVjdCBmdW5jdGlvbiBvZiByZWR1eFxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlU3RvcmllczogaW5jbHVkZSBvciBub3QgdGhlIHN0b3J5Ym9vayBmaWxlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVDb3Ntb3M6IGluY2x1ZGUgb3Igbm90IHRoZSBjb3Ntb3MgZml4dHVyZXMgZmlsZVxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlVGVzdHM6IGluY2x1ZGUgb3Igbm90IHRoZSB0ZXN0IGZpbGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZUxvY2FsZTogaW5jbHVkZSBvciBub3QgdGhlIGxvY2FsZSBmaWxlXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlRmlsZXMocGFyYW1zKSB7XG4gIGNvbnN0IHtcbiAgICB0eXBlLFxuICAgIG5hbWUsXG4gICAgZmlsZU5hbWVzLFxuICAgIHBhdGgsXG4gICAgaW5kZXhGaWxlLFxuICAgIGNzc0V4dGVuc2lvbixcbiAgICBjb21wb25lbnRNZXRob2RzLFxuICAgIGpzRXh0ZW5zaW9uLFxuICAgIGNvbm5lY3RlZCxcbiAgICBpbmNsdWRlU3RvcmllcyxcbiAgICBpbmNsdWRlQ29zbW9zLFxuICAgIGluY2x1ZGVUZXN0cyxcbiAgICBpbmNsdWRlTG9jYWxlLFxuICB9ID0gcGFyYW1zXG4gIGNvbnN0IGRlc3RpbmF0aW9uID0gYCR7cGF0aH0vJHtuYW1lfWBcblxuICBjb25zdCB7XG4gICAgdGVzdEZpbGVOYW1lLFxuICAgIHRlc3RGaWxlTWF0Y2gsXG4gICAgY29tcG9uZW50RmlsZU5hbWUsXG4gICAgc3R5bGVGaWxlTmFtZSxcbiAgfSA9IGdldEZpbGVOYW1lcyhmaWxlTmFtZXMsIG5hbWUpXG5cbiAgaWYgKGluZGV4RmlsZSB8fCBjb25uZWN0ZWQpIHtcbiAgICBmcy5vdXRwdXRGaWxlKFxuICAgICAgYCR7ZGVzdGluYXRpb259L2luZGV4LmpzYCxcbiAgICAgIGdlbmVyYXRlSW5kZXhGaWxlKGNvbXBvbmVudEZpbGVOYW1lLCBjb25uZWN0ZWQpXG4gICAgKVxuICB9XG5cbiAgaWYgKGluY2x1ZGVTdG9yaWVzKSB7XG4gICAgZnMub3V0cHV0RmlsZShcbiAgICAgIGAke2Rlc3RpbmF0aW9ufS9fX3Rlc3RzX18vJHtuYW1lfS5zdG9yaWVzLiR7anNFeHRlbnNpb259YCxcbiAgICAgIGdlbmVyYXRlU3Rvcnlib29rVGVtcGxhdGUobmFtZSlcbiAgICApXG4gIH1cblxuICBpZiAoaW5jbHVkZUNvc21vcykge1xuICAgIGZzLm91dHB1dEZpbGUoXG4gICAgICBgJHtkZXN0aW5hdGlvbn0vX190ZXN0c19fL19fZml4dHVyZXNfXy9kZWZhdWx0LmpzYCxcbiAgICAgIGdlbmVyYXRlQ29zbW9zVGVtcGxhdGUobmFtZSlcbiAgICApXG4gIH1cblxuICBpZihpbmNsdWRlTG9jYWxlKXtcbiAgICBmcy5vdXRwdXRGaWxlKFxuICAgICAgYCR7ZGVzdGluYXRpb259L2xvY2FsZS96aC1UV18ke25hbWV9LmpzYCxcbiAgICAgIGdlbmVyYXRlTG9jYWxlVGVtcGxhdGUobmFtZSlcbiAgICApXG4gIH1cbiAgXG4gIGlmIChpbmNsdWRlVGVzdHMpIHtcbiAgICBmcy5vdXRwdXRGaWxlKFxuICAgICAgYCR7ZGVzdGluYXRpb259L19fdGVzdHNfXy8ke3Rlc3RGaWxlTWF0Y2h9LiR7dGVzdEZpbGVOYW1lfS4ke2pzRXh0ZW5zaW9ufWAsXG4gICAgICBnZW5lcmF0ZVRlc3RUZW1wbGF0ZShuYW1lKVxuICAgIClcbiAgfVxuXG4gIC8vIENyZWF0ZSBqcyBmaWxlXG4gIGZzLm91dHB1dEZpbGUoXG4gICAgYCR7ZGVzdGluYXRpb259LyR7Y29tcG9uZW50RmlsZU5hbWV9LiR7anNFeHRlbnNpb259YCxcbiAgICBnZW5lcmF0ZUNvbXBvbmVudFRlbXBsYXRlKHR5cGUsIGNvbXBvbmVudEZpbGVOYW1lLCB7XG4gICAgICBjc3NFeHRlbnNpb24sXG4gICAgICBjb21wb25lbnRNZXRob2RzLFxuICAgICAgc3R5bGVGaWxlTmFtZSxcbiAgICB9KVxuICApXG5cbiAgLy8gQ3JlYXRlIGNzcyBmaWxlXG4gIGlmIChjc3NFeHRlbnNpb24pIHtcbiAgICBmcy5vdXRwdXRGaWxlKFxuICAgICAgYCR7ZGVzdGluYXRpb259LyR7c3R5bGVGaWxlTmFtZX0uJHtjc3NFeHRlbnNpb259YCxcbiAgICAgIGdlbmVyYXRlU3R5bGVGaWxlKHN0eWxlRmlsZU5hbWUpXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCB7IGdlbmVyYXRlRmlsZXMsIGdlbmVyYXRlRmlsZXNGcm9tQ3VzdG9tIH1cbiJdfQ==