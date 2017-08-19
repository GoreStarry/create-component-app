'use strict';

var _class = require('../class.template');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = {
  cssExtension: '',
  styleFileName: 'Foo'
};

describe('Class Template', () => {
  it('should a string', () => {
    expect(typeof (0, _class2.default)('Foo', 'stateless', options)).toBe('string');
  });

  it('should have class with component name', () => {
    expect((0, _class2.default)('Foo', 'class', options)).toContain('class Foo extends Component');
  });

  it('should extend component with propTypes', () => {
    expect((0, _class2.default)('Foo', 'class', options)).toContain('Foo.propTypes');
  });

  it('should extend component with defaultProps', () => {
    expect((0, _class2.default)('Foo', 'class', options)).toContain('Foo.defaultProps');
  });

  it('should export component', () => {
    expect((0, _class2.default)('Foo', 'class', options)).toContain('export default Foo');
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZW1wbGF0ZXMvanMvX190ZXN0c19fL2NsYXNzLnRlbXBsYXRlLnRlc3QuanMiXSwibmFtZXMiOlsib3B0aW9ucyIsImNzc0V4dGVuc2lvbiIsInN0eWxlRmlsZU5hbWUiLCJkZXNjcmliZSIsIml0IiwiZXhwZWN0IiwidG9CZSIsInRvQ29udGFpbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0FBRUEsTUFBTUEsVUFBVTtBQUNkQyxnQkFBYyxFQURBO0FBRWRDLGlCQUFlO0FBRkQsQ0FBaEI7O0FBS0FDLFNBQVMsZ0JBQVQsRUFBMkIsTUFBTTtBQUMvQkMsS0FBRyxpQkFBSCxFQUFzQixNQUFNO0FBQzFCQyxXQUFPLE9BQU8scUJBQVMsS0FBVCxFQUFnQixXQUFoQixFQUE2QkwsT0FBN0IsQ0FBZCxFQUFxRE0sSUFBckQsQ0FBMEQsUUFBMUQ7QUFDRCxHQUZEOztBQUlBRixLQUFHLHVDQUFILEVBQTRDLE1BQU07QUFDaERDLFdBQU8scUJBQVMsS0FBVCxFQUFnQixPQUFoQixFQUF5QkwsT0FBekIsQ0FBUCxFQUEwQ08sU0FBMUMsQ0FDRSw2QkFERjtBQUdELEdBSkQ7O0FBTUFILEtBQUcsd0NBQUgsRUFBNkMsTUFBTTtBQUNqREMsV0FBTyxxQkFBUyxLQUFULEVBQWdCLE9BQWhCLEVBQXlCTCxPQUF6QixDQUFQLEVBQTBDTyxTQUExQyxDQUFvRCxlQUFwRDtBQUNELEdBRkQ7O0FBSUFILEtBQUcsMkNBQUgsRUFBZ0QsTUFBTTtBQUNwREMsV0FBTyxxQkFBUyxLQUFULEVBQWdCLE9BQWhCLEVBQXlCTCxPQUF6QixDQUFQLEVBQTBDTyxTQUExQyxDQUFvRCxrQkFBcEQ7QUFDRCxHQUZEOztBQUlBSCxLQUFHLHlCQUFILEVBQThCLE1BQU07QUFDbENDLFdBQU8scUJBQVMsS0FBVCxFQUFnQixPQUFoQixFQUF5QkwsT0FBekIsQ0FBUCxFQUEwQ08sU0FBMUMsQ0FBb0Qsb0JBQXBEO0FBQ0QsR0FGRDtBQUdELENBdEJEIiwiZmlsZSI6ImNsYXNzLnRlbXBsYXRlLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vY2xhc3MudGVtcGxhdGUnXG5cbmNvbnN0IG9wdGlvbnMgPSB7XG4gIGNzc0V4dGVuc2lvbjogJycsXG4gIHN0eWxlRmlsZU5hbWU6ICdGb28nLFxufVxuXG5kZXNjcmliZSgnQ2xhc3MgVGVtcGxhdGUnLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgYSBzdHJpbmcnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHR5cGVvZiB0ZW1wbGF0ZSgnRm9vJywgJ3N0YXRlbGVzcycsIG9wdGlvbnMpKS50b0JlKCdzdHJpbmcnKVxuICB9KVxuXG4gIGl0KCdzaG91bGQgaGF2ZSBjbGFzcyB3aXRoIGNvbXBvbmVudCBuYW1lJywgKCkgPT4ge1xuICAgIGV4cGVjdCh0ZW1wbGF0ZSgnRm9vJywgJ2NsYXNzJywgb3B0aW9ucykpLnRvQ29udGFpbihcbiAgICAgICdjbGFzcyBGb28gZXh0ZW5kcyBDb21wb25lbnQnXG4gICAgKVxuICB9KVxuXG4gIGl0KCdzaG91bGQgZXh0ZW5kIGNvbXBvbmVudCB3aXRoIHByb3BUeXBlcycsICgpID0+IHtcbiAgICBleHBlY3QodGVtcGxhdGUoJ0ZvbycsICdjbGFzcycsIG9wdGlvbnMpKS50b0NvbnRhaW4oJ0Zvby5wcm9wVHlwZXMnKVxuICB9KVxuXG4gIGl0KCdzaG91bGQgZXh0ZW5kIGNvbXBvbmVudCB3aXRoIGRlZmF1bHRQcm9wcycsICgpID0+IHtcbiAgICBleHBlY3QodGVtcGxhdGUoJ0ZvbycsICdjbGFzcycsIG9wdGlvbnMpKS50b0NvbnRhaW4oJ0Zvby5kZWZhdWx0UHJvcHMnKVxuICB9KVxuXG4gIGl0KCdzaG91bGQgZXhwb3J0IGNvbXBvbmVudCcsICgpID0+IHtcbiAgICBleHBlY3QodGVtcGxhdGUoJ0ZvbycsICdjbGFzcycsIG9wdGlvbnMpKS50b0NvbnRhaW4oJ2V4cG9ydCBkZWZhdWx0IEZvbycpXG4gIH0pXG59KVxuIl19