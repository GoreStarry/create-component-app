'use strict';

var _functional = require('../functional.template');

var _functional2 = _interopRequireDefault(_functional);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Functional Template', () => {
  it('should a string', () => {
    expect(typeof (0, _functional2.default)()).toBe('string');
  });

  it('should create const with component name', () => {
    expect((0, _functional2.default)('Foo')).toContain('const Foo = ({}) =>');
  });

  it('should extend component with propTypes', () => {
    expect((0, _functional2.default)('Foo')).toContain('Foo.propTypes');
  });

  it('should extend component with defaultProps', () => {
    expect((0, _functional2.default)('Foo')).toContain('Foo.defaultProps');
  });

  it('should export component', () => {
    expect((0, _functional2.default)('Foo')).toContain('export default Foo');
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZW1wbGF0ZXMvanMvX190ZXN0c19fL2Z1bmN0aW9uYWwudGVtcGxhdGUudGVzdC5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIml0IiwiZXhwZWN0IiwidG9CZSIsInRvQ29udGFpbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0FBRUFBLFNBQVMscUJBQVQsRUFBZ0MsTUFBTTtBQUNwQ0MsS0FBRyxpQkFBSCxFQUFzQixNQUFNO0FBQzFCQyxXQUFPLE9BQU8sMkJBQWQsRUFBMEJDLElBQTFCLENBQStCLFFBQS9CO0FBQ0QsR0FGRDs7QUFJQUYsS0FBRyx5Q0FBSCxFQUE4QyxNQUFNO0FBQ2xEQyxXQUFPLDBCQUFTLEtBQVQsQ0FBUCxFQUF3QkUsU0FBeEIsQ0FBa0MscUJBQWxDO0FBQ0QsR0FGRDs7QUFJQUgsS0FBRyx3Q0FBSCxFQUE2QyxNQUFNO0FBQ2pEQyxXQUFPLDBCQUFTLEtBQVQsQ0FBUCxFQUF3QkUsU0FBeEIsQ0FBa0MsZUFBbEM7QUFDRCxHQUZEOztBQUlBSCxLQUFHLDJDQUFILEVBQWdELE1BQU07QUFDcERDLFdBQU8sMEJBQVMsS0FBVCxDQUFQLEVBQXdCRSxTQUF4QixDQUFrQyxrQkFBbEM7QUFDRCxHQUZEOztBQUlBSCxLQUFHLHlCQUFILEVBQThCLE1BQU07QUFDbENDLFdBQU8sMEJBQVMsS0FBVCxDQUFQLEVBQXdCRSxTQUF4QixDQUFrQyxvQkFBbEM7QUFDRCxHQUZEO0FBR0QsQ0FwQkQiLCJmaWxlIjoiZnVuY3Rpb25hbC50ZW1wbGF0ZS50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uL2Z1bmN0aW9uYWwudGVtcGxhdGUnXG5cbmRlc2NyaWJlKCdGdW5jdGlvbmFsIFRlbXBsYXRlJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIGEgc3RyaW5nJywgKCkgPT4ge1xuICAgIGV4cGVjdCh0eXBlb2YgdGVtcGxhdGUoKSkudG9CZSgnc3RyaW5nJylcbiAgfSlcblxuICBpdCgnc2hvdWxkIGNyZWF0ZSBjb25zdCB3aXRoIGNvbXBvbmVudCBuYW1lJywgKCkgPT4ge1xuICAgIGV4cGVjdCh0ZW1wbGF0ZSgnRm9vJykpLnRvQ29udGFpbignY29uc3QgRm9vID0gKHt9KSA9PicpXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCBleHRlbmQgY29tcG9uZW50IHdpdGggcHJvcFR5cGVzJywgKCkgPT4ge1xuICAgIGV4cGVjdCh0ZW1wbGF0ZSgnRm9vJykpLnRvQ29udGFpbignRm9vLnByb3BUeXBlcycpXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCBleHRlbmQgY29tcG9uZW50IHdpdGggZGVmYXVsdFByb3BzJywgKCkgPT4ge1xuICAgIGV4cGVjdCh0ZW1wbGF0ZSgnRm9vJykpLnRvQ29udGFpbignRm9vLmRlZmF1bHRQcm9wcycpXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCBleHBvcnQgY29tcG9uZW50JywgKCkgPT4ge1xuICAgIGV4cGVjdCh0ZW1wbGF0ZSgnRm9vJykpLnRvQ29udGFpbignZXhwb3J0IGRlZmF1bHQgRm9vJylcbiAgfSlcbn0pXG4iXX0=