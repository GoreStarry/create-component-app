"use strict";

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


var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _templates = require("./templates");

var _config = require("./config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Get the extension from the filename
 * @param {string} fileName
 */
function getExtension(fileName) {
  const splittedFilename = fileName.split(".");
  const length = splittedFilename.length;

  if (splittedFilename[1] === "tests") {
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
    _fsExtra2.default.readFile(`${path}/${fileName}`, "utf8", (err, content) => {
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
  if (templateFileName.indexOf("index") !== -1) {
    return templateFileName;
  }

  if (_fsExtra2.default.existsSync(newFilePath)) {
    return templateFileName;
  }

  if (templateFileName.includes("COMPONENT_NAME")) {
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
        cssModule = params.cssModule,
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
    cssModule,
    componentMethods,
    styleFileName
  }));

  // Create css file
  if (cssExtension) {
    _fsExtra2.default.outputFile(`${destination}/${styleFileName}.${cssExtension}`, (0, _templates.generateStyleFile)(styleFileName));
    _fsExtra2.default.outputFile(`${destination}/styles/_handheld${styleFileName}.${cssExtension}`, (0, _templates.generateStyleFile)(styleFileName));
  }
}

exports.generateFiles = generateFiles;
exports.generateFilesFromCustom = generateFilesFromCustom;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy5qcyJdLCJuYW1lcyI6WyJuYW1lIiwicGF0aCIsInRlbXBsYXRlc1BhdGgiLCJmaWxlcyIsInJlYWRkaXJTeW5jIiwibWFwIiwidGVtcGxhdGVGaWxlTmFtZSIsImNvbnRlbnQiLCJyZWFkRmlsZSIsInJlcGxhY2VkIiwicmVwbGFjZSIsIm5ld0ZpbGVOYW1lIiwiZ2VuZXJhdGVGaWxlTmFtZSIsIm91dHB1dEZpbGUiLCJlIiwiY29uc29sZSIsImxvZyIsImdlbmVyYXRlRmlsZXNGcm9tQ3VzdG9tIiwiZ2V0RXh0ZW5zaW9uIiwiZmlsZU5hbWUiLCJzcGxpdHRlZEZpbGVuYW1lIiwic3BsaXQiLCJsZW5ndGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVyciIsIm5ld0ZpbGVQYXRoIiwiaW5kZXhPZiIsImV4aXN0c1N5bmMiLCJpbmNsdWRlcyIsImdldEZpbGVOYW1lcyIsImZpbGVOYW1lcyIsImNvbXBvbmVudE5hbWUiLCJkZWZhdWx0RmlsZU5hbWVzIiwidGVzdEZpbGVOYW1lIiwidGVzdEZpbGVNYXRjaCIsImNvbXBvbmVudEZpbGVOYW1lIiwic3R5bGVGaWxlTmFtZSIsImdlbmVyYXRlRmlsZXMiLCJwYXJhbXMiLCJ0eXBlIiwiaW5kZXhGaWxlIiwiY3NzRXh0ZW5zaW9uIiwiY3NzTW9kdWxlIiwiY29tcG9uZW50TWV0aG9kcyIsImpzRXh0ZW5zaW9uIiwiY29ubmVjdGVkIiwiaW5jbHVkZVN0b3JpZXMiLCJpbmNsdWRlQ29zbW9zIiwiaW5jbHVkZVRlc3RzIiwiaW5jbHVkZUxvY2FsZSIsImRlc3RpbmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFvRUE7Ozs7Ozs7OytCQU9BLFdBQXVDLEVBQUVBLElBQUYsRUFBUUMsSUFBUixFQUFjQyxhQUFkLEVBQXZDLEVBQXNFO0FBQ3BFLFFBQUk7QUFDRixZQUFNQyxRQUFRLGtCQUFHQyxXQUFILENBQWVGLGFBQWYsQ0FBZDs7QUFFQUMsWUFBTUUsR0FBTjtBQUFB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Q0FGRjtBQUlEO0FBQ0Y7O1FBRVFDLGEsR0FBQUEsYTtRQUFldEIsdUIsR0FBQUEsdUIiLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSBcImZzLWV4dHJhXCI7XG5pbXBvcnQge1xuICBnZW5lcmF0ZUNvbXBvbmVudFRlbXBsYXRlLFxuICBnZW5lcmF0ZVN0eWxlRmlsZSxcbiAgZ2VuZXJhdGVJbmRleEZpbGUsXG4gIGdlbmVyYXRlVGVzdFRlbXBsYXRlLFxuICBnZW5lcmF0ZVN0b3J5Ym9va1RlbXBsYXRlLFxuICBnZW5lcmF0ZUNvc21vc1RlbXBsYXRlLFxuICBnZW5lcmF0ZUxvY2FsZVRlbXBsYXRlLFxufSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcbmltcG9ydCBkZWZhdWx0T3B0aW9ucyBmcm9tIFwiLi9jb25maWcuanNvblwiO1xuXG4vKipcbiAqIEdldCB0aGUgZXh0ZW5zaW9uIGZyb20gdGhlIGZpbGVuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZU5hbWVcbiAqL1xuZnVuY3Rpb24gZ2V0RXh0ZW5zaW9uKGZpbGVOYW1lKSB7XG4gIGNvbnN0IHNwbGl0dGVkRmlsZW5hbWUgPSBmaWxlTmFtZS5zcGxpdChcIi5cIik7XG4gIGNvbnN0IGxlbmd0aCA9IHNwbGl0dGVkRmlsZW5hbWUubGVuZ3RoO1xuXG4gIGlmIChzcGxpdHRlZEZpbGVuYW1lWzFdID09PSBcInRlc3RzXCIpIHtcbiAgICByZXR1cm4gYCR7c3BsaXR0ZWRGaWxlbmFtZVtsZW5ndGggLSAyXX0uJHtzcGxpdHRlZEZpbGVuYW1lW2xlbmd0aCAtIDFdfWA7XG4gIH1cblxuICByZXR1cm4gc3BsaXR0ZWRGaWxlbmFtZVtsZW5ndGggLSAxXTtcbn1cblxuLyoqXG4gKiByZWFkRmlsZSBmcyBwcm9taXNlIHdyYXBwZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZU5hbWVcbiAqL1xuZnVuY3Rpb24gcmVhZEZpbGUocGF0aCwgZmlsZU5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBmcy5yZWFkRmlsZShgJHtwYXRofS8ke2ZpbGVOYW1lfWAsIFwidXRmOFwiLCAoZXJyLCBjb250ZW50KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc29sdmUoY29udGVudCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIGNoZWNrIGlmIGFscmVhZHkgZXhpc3QgaW4gdGhlIGZvbGRlciB0aGUgc2FtZSBmaWxlIG5hbWVcbiAqIElmIGFscmVhZHkgZXhpc3QsIHVzZSB0aGUgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IG5ld0ZpbGVQYXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gbmV3RmlsZU5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZW1wbGF0ZUZpbGVOYW1lXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlRmlsZU5hbWUobmV3RmlsZVBhdGgsIG5ld0ZpbGVOYW1lLCB0ZW1wbGF0ZUZpbGVOYW1lKSB7XG4gIC8vIFN1cHBvc2UgdGhhdCB0aGUgaW5kZXggZmlsZSBkb24ndCBiZSByZW5hbWVkXG4gIGlmICh0ZW1wbGF0ZUZpbGVOYW1lLmluZGV4T2YoXCJpbmRleFwiKSAhPT0gLTEpIHtcbiAgICByZXR1cm4gdGVtcGxhdGVGaWxlTmFtZTtcbiAgfVxuXG4gIGlmIChmcy5leGlzdHNTeW5jKG5ld0ZpbGVQYXRoKSkge1xuICAgIHJldHVybiB0ZW1wbGF0ZUZpbGVOYW1lO1xuICB9XG5cbiAgaWYgKHRlbXBsYXRlRmlsZU5hbWUuaW5jbHVkZXMoXCJDT01QT05FTlRfTkFNRVwiKSkge1xuICAgIHJldHVybiB0ZW1wbGF0ZUZpbGVOYW1lLnJlcGxhY2UoL0NPTVBPTkVOVF9OQU1FL2csIG5ld0ZpbGVOYW1lKTtcbiAgfVxuXG4gIHJldHVybiBgJHtuZXdGaWxlTmFtZX0uJHtnZXRFeHRlbnNpb24odGVtcGxhdGVGaWxlTmFtZSl9YDtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBjb21wb25lbnQgZmlsZXMgZnJvbSBjdXN0b20gdGVtcGxhdGVzIGZvbGRlclxuICogR2V0IGV2ZXJ5IHNpbmdsZSBmaWxlIGluIHRoZVxuICogQHBhcmFtIHtzdHJpbmd9IHRoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgdXNlZCB0byBjcmVhdGUgZm9sZGVyIGFuZCBmaWxlXG4gKiBAcGFyYW0ge3N0cmluZ30gd2hlcmUgdGhlIGNvbXBvbmVudCBmb2xkZXIgaXMgY3JlYXRlZFxuICogQHBhcmFtIHtzdHJpbmd9IHdoZXJlIHRoZSBjdXN0b20gdGVtcGxhdGVzIGFyZVxuICovXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUZpbGVzRnJvbUN1c3RvbSh7IG5hbWUsIHBhdGgsIHRlbXBsYXRlc1BhdGggfSkge1xuICB0cnkge1xuICAgIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmModGVtcGxhdGVzUGF0aCk7XG5cbiAgICBmaWxlcy5tYXAoYXN5bmMgdGVtcGxhdGVGaWxlTmFtZSA9PiB7XG4gICAgICAvLyBHZXQgdGhlIHRlbXBsYXRlIGNvbnRlbnRcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCByZWFkRmlsZSh0ZW1wbGF0ZXNQYXRoLCB0ZW1wbGF0ZUZpbGVOYW1lKTtcbiAgICAgIGNvbnN0IHJlcGxhY2VkID0gY29udGVudC5yZXBsYWNlKC9DT01QT05FTlRfTkFNRS9nLCBuYW1lKTtcbiAgICAgIC8vIEV4aXN0ID9cbiAgICAgIGNvbnN0IG5ld0ZpbGVOYW1lID0gZ2VuZXJhdGVGaWxlTmFtZShcbiAgICAgICAgYCR7cGF0aH0vJHtuYW1lfS9gLFxuICAgICAgICBuYW1lLFxuICAgICAgICB0ZW1wbGF0ZUZpbGVOYW1lXG4gICAgICApO1xuICAgICAgLy8gV3JpdGUgdGhlIG5ldyBmaWxlIHdpdGggdGhlIG5ldyBjb250ZW50XG4gICAgICBmcy5vdXRwdXRGaWxlKGAke3BhdGh9LyR7bmFtZX0vJHtuZXdGaWxlTmFtZX1gLCByZXBsYWNlZCk7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybiB0aGUgZGVmYXVsdCBuYW1lcyByZXBsYWNlIGZyb20gdXNlciBmaWxlbmFtZXNcbiAqIEBwYXJhbSB7b2JqZWN0fSBmaWxlTmFtZXMgb2JqZWN0IHdpdGggdGhlIHVzZXIgc2VsZWN0ZWQgZmlsZW5hbWVzXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZVxuICogQHJldHVybiB7b2JqZWN0fSB3aXRoIHRoZSBjb3JyZWN0IGZpbGVuYW1lc1xuICovXG5mdW5jdGlvbiBnZXRGaWxlTmFtZXMoZmlsZU5hbWVzLCBjb21wb25lbnROYW1lKSB7XG4gIGNvbnN0IGRlZmF1bHRGaWxlTmFtZXMgPSB7XG4gICAgdGVzdEZpbGVOYW1lOiBkZWZhdWx0T3B0aW9ucy50ZXN0RmlsZU5hbWUsXG4gICAgdGVzdEZpbGVNYXRjaDogY29tcG9uZW50TmFtZSxcbiAgICBjb21wb25lbnRGaWxlTmFtZTogY29tcG9uZW50TmFtZSxcbiAgICBzdHlsZUZpbGVOYW1lOiBjb21wb25lbnROYW1lLFxuICB9O1xuXG4gIHJldHVybiB7IC4uLmRlZmF1bHRGaWxlTmFtZXMsIC4uLmZpbGVOYW1lcyB9O1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGNvbXBvbmVudCBmaWxlc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgb2JqZWN0IHdpdGg6XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZTogdGhlIHR5cGUgb2YgY29tcG9uZW50IHRlbXBsYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZTogdGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCB1c2VkIHRvIGNyZWF0ZSBmb2xkZXIgYW5kIGZpbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoOiB3aGVyZSB0aGUgY29tcG9uZW50IGZvbGRlciBpcyBjcmVhdGVkXG4gKiBAcGFyYW0ge3N0cmluZ30gY3NzRXh0ZW5zaW9uOiB0aGUgZXh0ZW5zaW9uIG9mIHRoZSBjc3MgZmlsZVxuICogQHBhcmFtIHtzdHJpbmd9IGpzRXh0ZW5zaW9uOiB0aGUgZXh0ZW5zaW9uIG9mIHRoZSBjb21wb25lbnQgZmlsZVxuICogQHBhcmFtIHthcnJheX0gY29tcG9uZW50TWV0aG9kczogQXJyYXkgb2Ygc3RyaW5ncyBvZiBtZXRob2RzIHRvIGluY2x1ZGUgaW4gYSBjbGFzcyBjb21wb25lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5kZXhGaWxlOiBpbmNsdWRlIG9yIG5vdCBhbiBpbmRleCBmaWxlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGNvbm5lY3RlZDogaW5jbHVkZSBvciBub3QgdGhlIGNvbm5lY3QgZnVuY3Rpb24gb2YgcmVkdXhcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVN0b3JpZXM6IGluY2x1ZGUgb3Igbm90IHRoZSBzdG9yeWJvb2sgZmlsZVxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQ29zbW9zOiBpbmNsdWRlIG9yIG5vdCB0aGUgY29zbW9zIGZpeHR1cmVzIGZpbGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZVRlc3RzOiBpbmNsdWRlIG9yIG5vdCB0aGUgdGVzdCBmaWxlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVMb2NhbGU6IGluY2x1ZGUgb3Igbm90IHRoZSBsb2NhbGUgZmlsZVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZUZpbGVzKHBhcmFtcykge1xuICBjb25zdCB7XG4gICAgdHlwZSxcbiAgICBuYW1lLFxuICAgIGZpbGVOYW1lcyxcbiAgICBwYXRoLFxuICAgIGluZGV4RmlsZSxcbiAgICBjc3NFeHRlbnNpb24sXG4gICAgY3NzTW9kdWxlLFxuICAgIGNvbXBvbmVudE1ldGhvZHMsXG4gICAganNFeHRlbnNpb24sXG4gICAgY29ubmVjdGVkLFxuICAgIGluY2x1ZGVTdG9yaWVzLFxuICAgIGluY2x1ZGVDb3Ntb3MsXG4gICAgaW5jbHVkZVRlc3RzLFxuICAgIGluY2x1ZGVMb2NhbGUsXG4gIH0gPSBwYXJhbXM7XG4gIGNvbnN0IGRlc3RpbmF0aW9uID0gYCR7cGF0aH0vJHtuYW1lfWA7XG5cbiAgY29uc3Qge1xuICAgIHRlc3RGaWxlTmFtZSxcbiAgICB0ZXN0RmlsZU1hdGNoLFxuICAgIGNvbXBvbmVudEZpbGVOYW1lLFxuICAgIHN0eWxlRmlsZU5hbWUsXG4gIH0gPSBnZXRGaWxlTmFtZXMoZmlsZU5hbWVzLCBuYW1lKTtcblxuICBpZiAoaW5kZXhGaWxlIHx8IGNvbm5lY3RlZCkge1xuICAgIGZzLm91dHB1dEZpbGUoXG4gICAgICBgJHtkZXN0aW5hdGlvbn0vaW5kZXguanNgLFxuICAgICAgZ2VuZXJhdGVJbmRleEZpbGUoY29tcG9uZW50RmlsZU5hbWUsIGNvbm5lY3RlZClcbiAgICApO1xuICB9XG5cbiAgaWYgKGluY2x1ZGVTdG9yaWVzKSB7XG4gICAgZnMub3V0cHV0RmlsZShcbiAgICAgIGAke2Rlc3RpbmF0aW9ufS9fX3Rlc3RzX18vJHtuYW1lfS5zdG9yaWVzLiR7anNFeHRlbnNpb259YCxcbiAgICAgIGdlbmVyYXRlU3Rvcnlib29rVGVtcGxhdGUobmFtZSlcbiAgICApO1xuICB9XG5cbiAgaWYgKGluY2x1ZGVDb3Ntb3MpIHtcbiAgICBmcy5vdXRwdXRGaWxlKFxuICAgICAgYCR7ZGVzdGluYXRpb259L19fdGVzdHNfXy9fX2ZpeHR1cmVzX18vZGVmYXVsdC5qc2AsXG4gICAgICBnZW5lcmF0ZUNvc21vc1RlbXBsYXRlKG5hbWUpXG4gICAgKTtcbiAgfVxuXG4gIGlmIChpbmNsdWRlTG9jYWxlKSB7XG4gICAgZnMub3V0cHV0RmlsZShcbiAgICAgIGAke2Rlc3RpbmF0aW9ufS9sb2NhbGUvemgtVFdfJHtuYW1lfS5qc2AsXG4gICAgICBnZW5lcmF0ZUxvY2FsZVRlbXBsYXRlKG5hbWUpXG4gICAgKTtcbiAgfVxuXG4gIGlmIChpbmNsdWRlVGVzdHMpIHtcbiAgICBmcy5vdXRwdXRGaWxlKFxuICAgICAgYCR7ZGVzdGluYXRpb259L19fdGVzdHNfXy8ke3Rlc3RGaWxlTWF0Y2h9LiR7dGVzdEZpbGVOYW1lfS4ke2pzRXh0ZW5zaW9ufWAsXG4gICAgICBnZW5lcmF0ZVRlc3RUZW1wbGF0ZShuYW1lKVxuICAgICk7XG4gIH1cblxuICAvLyBDcmVhdGUganMgZmlsZVxuICBmcy5vdXRwdXRGaWxlKFxuICAgIGAke2Rlc3RpbmF0aW9ufS8ke2NvbXBvbmVudEZpbGVOYW1lfS4ke2pzRXh0ZW5zaW9ufWAsXG4gICAgZ2VuZXJhdGVDb21wb25lbnRUZW1wbGF0ZSh0eXBlLCBjb21wb25lbnRGaWxlTmFtZSwge1xuICAgICAgY3NzRXh0ZW5zaW9uLFxuICAgICAgY3NzTW9kdWxlLFxuICAgICAgY29tcG9uZW50TWV0aG9kcyxcbiAgICAgIHN0eWxlRmlsZU5hbWUsXG4gICAgfSlcbiAgKTtcblxuICAvLyBDcmVhdGUgY3NzIGZpbGVcbiAgaWYgKGNzc0V4dGVuc2lvbikge1xuICAgIGZzLm91dHB1dEZpbGUoXG4gICAgICBgJHtkZXN0aW5hdGlvbn0vJHtzdHlsZUZpbGVOYW1lfS4ke2Nzc0V4dGVuc2lvbn1gLFxuICAgICAgZ2VuZXJhdGVTdHlsZUZpbGUoc3R5bGVGaWxlTmFtZSlcbiAgICApO1xuICAgIGZzLm91dHB1dEZpbGUoXG4gICAgICBgJHtkZXN0aW5hdGlvbn0vc3R5bGVzL19oYW5kaGVsZCR7c3R5bGVGaWxlTmFtZX0uJHtjc3NFeHRlbnNpb259YCxcbiAgICAgIGdlbmVyYXRlU3R5bGVGaWxlKHN0eWxlRmlsZU5hbWUpXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgeyBnZW5lcmF0ZUZpbGVzLCBnZW5lcmF0ZUZpbGVzRnJvbUN1c3RvbSB9O1xuIl19