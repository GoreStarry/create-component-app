'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./common.template');

var _config = require('../../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateFunctionalComponent(COMPONENT_NAME, componentType, { cssExtension = _config2.default.defaultOptions } = _config2.default) {
  return `${(0, _common.generateImports)(COMPONENT_NAME, componentType, { cssExtension })}

const ${COMPONENT_NAME} = ({}) => (
  <div className="${COMPONENT_NAME}"></div>
);

${COMPONENT_NAME}.propTypes = {}

${COMPONENT_NAME}.defaultProps = {}

export default ${COMPONENT_NAME}
`;
}

exports.default = generateFunctionalComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZW1wbGF0ZXMvanMvZnVuY3Rpb25hbC50ZW1wbGF0ZS5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0ZUZ1bmN0aW9uYWxDb21wb25lbnQiLCJDT01QT05FTlRfTkFNRSIsImNvbXBvbmVudFR5cGUiLCJjc3NFeHRlbnNpb24iLCJkZWZhdWx0T3B0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLFNBQVNBLDJCQUFULENBQ0VDLGNBREYsRUFFRUMsYUFGRixFQUdFLEVBQUVDLGVBQWUsaUJBQWVDLGNBQWhDLHFCQUhGLEVBSUU7QUFDQSxTQUFRLEdBQUUsNkJBQWdCSCxjQUFoQixFQUFnQ0MsYUFBaEMsRUFBK0MsRUFBRUMsWUFBRixFQUEvQyxDQUFpRTs7UUFFckVGLGNBQWU7b0JBQ0hBLGNBQWU7OztFQUdqQ0EsY0FBZTs7RUFFZkEsY0FBZTs7aUJBRUFBLGNBQWU7Q0FWOUI7QUFZRDs7a0JBRWNELDJCIiwiZmlsZSI6ImZ1bmN0aW9uYWwudGVtcGxhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZW5lcmF0ZUltcG9ydHMgfSBmcm9tICcuL2NvbW1vbi50ZW1wbGF0ZSdcbmltcG9ydCBkZWZhdWx0T3B0aW9ucyBmcm9tICcuLi8uLi9jb25maWcuanNvbidcblxuZnVuY3Rpb24gZ2VuZXJhdGVGdW5jdGlvbmFsQ29tcG9uZW50KFxuICBDT01QT05FTlRfTkFNRSxcbiAgY29tcG9uZW50VHlwZSxcbiAgeyBjc3NFeHRlbnNpb24gPSBkZWZhdWx0T3B0aW9ucy5kZWZhdWx0T3B0aW9ucyB9ID0gZGVmYXVsdE9wdGlvbnNcbikge1xuICByZXR1cm4gYCR7Z2VuZXJhdGVJbXBvcnRzKENPTVBPTkVOVF9OQU1FLCBjb21wb25lbnRUeXBlLCB7IGNzc0V4dGVuc2lvbiB9KX1cblxuY29uc3QgJHtDT01QT05FTlRfTkFNRX0gPSAoe30pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCIke0NPTVBPTkVOVF9OQU1FfVwiPjwvZGl2PlxuKTtcblxuJHtDT01QT05FTlRfTkFNRX0ucHJvcFR5cGVzID0ge31cblxuJHtDT01QT05FTlRfTkFNRX0uZGVmYXVsdFByb3BzID0ge31cblxuZXhwb3J0IGRlZmF1bHQgJHtDT01QT05FTlRfTkFNRX1cbmBcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGVGdW5jdGlvbmFsQ29tcG9uZW50XG4iXX0=