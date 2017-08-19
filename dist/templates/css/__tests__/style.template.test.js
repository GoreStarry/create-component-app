'use strict';

var _style = require('../style.template');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Class Template', () => {
  it('should a string', () => {
    expect(typeof (0, _style2.default)()).toBe('string');
  });

  it('should have class with component name', () => {
    expect((0, _style2.default)('Foo')).toContain('.Foo{}');
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZW1wbGF0ZXMvY3NzL19fdGVzdHNfXy9zdHlsZS50ZW1wbGF0ZS50ZXN0LmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiaXQiLCJleHBlY3QiLCJ0b0JlIiwidG9Db250YWluIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFFQUEsU0FBUyxnQkFBVCxFQUEyQixNQUFNO0FBQy9CQyxLQUFHLGlCQUFILEVBQXNCLE1BQU07QUFDMUJDLFdBQU8sT0FBTyxzQkFBZCxFQUEwQkMsSUFBMUIsQ0FBK0IsUUFBL0I7QUFDRCxHQUZEOztBQUlBRixLQUFHLHVDQUFILEVBQTRDLE1BQU07QUFDaERDLFdBQU8scUJBQVMsS0FBVCxDQUFQLEVBQXdCRSxTQUF4QixDQUFrQyxRQUFsQztBQUNELEdBRkQ7QUFHRCxDQVJEIiwiZmlsZSI6InN0eWxlLnRlbXBsYXRlLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vc3R5bGUudGVtcGxhdGUnXG5cbmRlc2NyaWJlKCdDbGFzcyBUZW1wbGF0ZScsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCBhIHN0cmluZycsICgpID0+IHtcbiAgICBleHBlY3QodHlwZW9mIHRlbXBsYXRlKCkpLnRvQmUoJ3N0cmluZycpXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCBoYXZlIGNsYXNzIHdpdGggY29tcG9uZW50IG5hbWUnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHRlbXBsYXRlKCdGb28nKSkudG9Db250YWluKCcuRm9ve30nKVxuICB9KVxufSlcbiJdfQ==