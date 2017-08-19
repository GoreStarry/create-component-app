'use strict';

var _test = require('../test.template');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Test Template', () => {
  it('should a string', () => {
    expect(typeof (0, _test2.default)()).toBe('string');
  });

  it('should import component for story book', () => {
    expect((0, _test2.default)('Foo')).toContain("import Foo from './Foo'");
  });

  it('should crate describe block with component name', () => {
    expect((0, _test2.default)('Foo')).toContain("describe('Foo', () =>");
  });

  it('should render component for test in beforeEach block', () => {
    expect((0, _test2.default)('Foo')).toContain('shallow(<Foo {...props} />)');
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZW1wbGF0ZXMvanMvX190ZXN0c19fL3Rlc3QudGVtcGxhdGUudGVzdC5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIml0IiwiZXhwZWN0IiwidG9CZSIsInRvQ29udGFpbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0FBRUFBLFNBQVMsZUFBVCxFQUEwQixNQUFNO0FBQzlCQyxLQUFHLGlCQUFILEVBQXNCLE1BQU07QUFDMUJDLFdBQU8sT0FBTyxxQkFBZCxFQUEwQkMsSUFBMUIsQ0FBK0IsUUFBL0I7QUFDRCxHQUZEOztBQUlBRixLQUFHLHdDQUFILEVBQTZDLE1BQU07QUFDakRDLFdBQU8sb0JBQVMsS0FBVCxDQUFQLEVBQXdCRSxTQUF4QixDQUFrQyx5QkFBbEM7QUFDRCxHQUZEOztBQUlBSCxLQUFHLGlEQUFILEVBQXNELE1BQU07QUFDMURDLFdBQU8sb0JBQVMsS0FBVCxDQUFQLEVBQXdCRSxTQUF4QixDQUFrQyx1QkFBbEM7QUFDRCxHQUZEOztBQUlBSCxLQUFHLHNEQUFILEVBQTJELE1BQU07QUFDL0RDLFdBQU8sb0JBQVMsS0FBVCxDQUFQLEVBQXdCRSxTQUF4QixDQUFrQyw2QkFBbEM7QUFDRCxHQUZEO0FBR0QsQ0FoQkQiLCJmaWxlIjoidGVzdC50ZW1wbGF0ZS50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uL3Rlc3QudGVtcGxhdGUnXG5cbmRlc2NyaWJlKCdUZXN0IFRlbXBsYXRlJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIGEgc3RyaW5nJywgKCkgPT4ge1xuICAgIGV4cGVjdCh0eXBlb2YgdGVtcGxhdGUoKSkudG9CZSgnc3RyaW5nJylcbiAgfSlcblxuICBpdCgnc2hvdWxkIGltcG9ydCBjb21wb25lbnQgZm9yIHN0b3J5IGJvb2snLCAoKSA9PiB7XG4gICAgZXhwZWN0KHRlbXBsYXRlKCdGb28nKSkudG9Db250YWluKFwiaW1wb3J0IEZvbyBmcm9tICcuL0ZvbydcIilcbiAgfSlcblxuICBpdCgnc2hvdWxkIGNyYXRlIGRlc2NyaWJlIGJsb2NrIHdpdGggY29tcG9uZW50IG5hbWUnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHRlbXBsYXRlKCdGb28nKSkudG9Db250YWluKFwiZGVzY3JpYmUoJ0ZvbycsICgpID0+XCIpXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCByZW5kZXIgY29tcG9uZW50IGZvciB0ZXN0IGluIGJlZm9yZUVhY2ggYmxvY2snLCAoKSA9PiB7XG4gICAgZXhwZWN0KHRlbXBsYXRlKCdGb28nKSkudG9Db250YWluKCdzaGFsbG93KDxGb28gey4uLnByb3BzfSAvPiknKVxuICB9KVxufSlcbiJdfQ==