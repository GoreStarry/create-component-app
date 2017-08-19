'use strict';

var _storybook = require('../storybook.template');

var _storybook2 = _interopRequireDefault(_storybook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Storybook Template', () => {
  it('should a string', () => {
    expect(typeof (0, _storybook2.default)()).toBe('string');
  });

  it('should import component for story book', () => {
    expect((0, _storybook2.default)('Foo')).toContain("import Foo from './Foo'");
  });

  it('should crate story with component name', () => {
    expect((0, _storybook2.default)('Foo')).toContain("storiesOf('Foo', module)");
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZW1wbGF0ZXMvanMvX190ZXN0c19fL3N0b3J5Ym9vay50ZW1wbGF0ZS50ZXN0LmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiaXQiLCJleHBlY3QiLCJ0b0JlIiwidG9Db250YWluIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFFQUEsU0FBUyxvQkFBVCxFQUErQixNQUFNO0FBQ25DQyxLQUFHLGlCQUFILEVBQXNCLE1BQU07QUFDMUJDLFdBQU8sT0FBTywwQkFBZCxFQUEwQkMsSUFBMUIsQ0FBK0IsUUFBL0I7QUFDRCxHQUZEOztBQUlBRixLQUFHLHdDQUFILEVBQTZDLE1BQU07QUFDakRDLFdBQU8seUJBQVMsS0FBVCxDQUFQLEVBQXdCRSxTQUF4QixDQUFrQyx5QkFBbEM7QUFDRCxHQUZEOztBQUlBSCxLQUFHLHdDQUFILEVBQTZDLE1BQU07QUFDakRDLFdBQU8seUJBQVMsS0FBVCxDQUFQLEVBQXdCRSxTQUF4QixDQUFrQywwQkFBbEM7QUFDRCxHQUZEO0FBR0QsQ0FaRCIsImZpbGUiOiJzdG9yeWJvb2sudGVtcGxhdGUudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi9zdG9yeWJvb2sudGVtcGxhdGUnXG5cbmRlc2NyaWJlKCdTdG9yeWJvb2sgVGVtcGxhdGUnLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgYSBzdHJpbmcnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHR5cGVvZiB0ZW1wbGF0ZSgpKS50b0JlKCdzdHJpbmcnKVxuICB9KVxuXG4gIGl0KCdzaG91bGQgaW1wb3J0IGNvbXBvbmVudCBmb3Igc3RvcnkgYm9vaycsICgpID0+IHtcbiAgICBleHBlY3QodGVtcGxhdGUoJ0ZvbycpKS50b0NvbnRhaW4oXCJpbXBvcnQgRm9vIGZyb20gJy4vRm9vJ1wiKVxuICB9KVxuXG4gIGl0KCdzaG91bGQgY3JhdGUgc3Rvcnkgd2l0aCBjb21wb25lbnQgbmFtZScsICgpID0+IHtcbiAgICBleHBlY3QodGVtcGxhdGUoJ0ZvbycpKS50b0NvbnRhaW4oXCJzdG9yaWVzT2YoJ0ZvbycsIG1vZHVsZSlcIilcbiAgfSlcbn0pXG4iXX0=