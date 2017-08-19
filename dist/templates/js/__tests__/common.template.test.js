'use strict';

var _common = require('../common.template');

const options = {
  cssExtension: '',
  styleFileName: 'Foo'
};

describe('Common Template', () => {
  it('should a string', () => {
    expect(typeof (0, _common.generateImports)('Foo', 'stateless', options)).toBe('string');
  });

  it('should import proptypes', () => {
    expect((0, _common.generateImports)('Foo', 'stateless', options)).toContain("import PropTypes from 'prop-types'");
  });

  it('should import react when stateless', () => {
    expect((0, _common.generateImports)('Foo', 'stateless', options)).toContain("import React from 'react'");
  });

  it('should import react when class', () => {
    expect((0, _common.generateImports)('Foo', 'class', options)).toContain("import React, { Component } from 'react'");
  });

  it('should import react when pure', () => {
    expect((0, _common.generateImports)('Foo', 'pure', options)).toContain("import React, { PureComponent } from 'react'");
  });

  it('should import component methods', () => {
    const componentMethods = ['shouldComponentUpdate'];
    expect((0, _common.generateClassComponent)('Foo', 'pure', { componentMethods })).toContain('shouldComponentUpdate(){}');
  });

  it('should add styles import with styleFileName and cssExtension', () => {
    const cssExtension = 'css';
    const styleFileName = 'styles';
    expect((0, _common.generateImports)('Foo', 'stateless', { cssExtension, styleFileName })).toContain(`import styles from './${styleFileName}.${cssExtension}`);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZW1wbGF0ZXMvanMvX190ZXN0c19fL2NvbW1vbi50ZW1wbGF0ZS50ZXN0LmpzIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJjc3NFeHRlbnNpb24iLCJzdHlsZUZpbGVOYW1lIiwiZGVzY3JpYmUiLCJpdCIsImV4cGVjdCIsInRvQmUiLCJ0b0NvbnRhaW4iLCJjb21wb25lbnRNZXRob2RzIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLE1BQU1BLFVBQVU7QUFDZEMsZ0JBQWMsRUFEQTtBQUVkQyxpQkFBZTtBQUZELENBQWhCOztBQUtBQyxTQUFTLGlCQUFULEVBQTRCLE1BQU07QUFDaENDLEtBQUcsaUJBQUgsRUFBc0IsTUFBTTtBQUMxQkMsV0FBTyxPQUFPLDZCQUFnQixLQUFoQixFQUF1QixXQUF2QixFQUFvQ0wsT0FBcEMsQ0FBZCxFQUE0RE0sSUFBNUQsQ0FBaUUsUUFBakU7QUFDRCxHQUZEOztBQUlBRixLQUFHLHlCQUFILEVBQThCLE1BQU07QUFDbENDLFdBQU8sNkJBQWdCLEtBQWhCLEVBQXVCLFdBQXZCLEVBQW9DTCxPQUFwQyxDQUFQLEVBQXFETyxTQUFyRCxDQUNFLG9DQURGO0FBR0QsR0FKRDs7QUFNQUgsS0FBRyxvQ0FBSCxFQUF5QyxNQUFNO0FBQzdDQyxXQUFPLDZCQUFnQixLQUFoQixFQUF1QixXQUF2QixFQUFvQ0wsT0FBcEMsQ0FBUCxFQUFxRE8sU0FBckQsQ0FDRSwyQkFERjtBQUdELEdBSkQ7O0FBTUFILEtBQUcsZ0NBQUgsRUFBcUMsTUFBTTtBQUN6Q0MsV0FBTyw2QkFBZ0IsS0FBaEIsRUFBdUIsT0FBdkIsRUFBZ0NMLE9BQWhDLENBQVAsRUFBaURPLFNBQWpELENBQ0UsMENBREY7QUFHRCxHQUpEOztBQU1BSCxLQUFHLCtCQUFILEVBQW9DLE1BQU07QUFDeENDLFdBQU8sNkJBQWdCLEtBQWhCLEVBQXVCLE1BQXZCLEVBQStCTCxPQUEvQixDQUFQLEVBQWdETyxTQUFoRCxDQUNFLDhDQURGO0FBR0QsR0FKRDs7QUFNQUgsS0FBRyxpQ0FBSCxFQUFzQyxNQUFNO0FBQzFDLFVBQU1JLG1CQUFtQixDQUFDLHVCQUFELENBQXpCO0FBQ0FILFdBQ0Usb0NBQXVCLEtBQXZCLEVBQThCLE1BQTlCLEVBQXNDLEVBQUVHLGdCQUFGLEVBQXRDLENBREYsRUFFRUQsU0FGRixDQUVZLDJCQUZaO0FBR0QsR0FMRDs7QUFPQUgsS0FBRyw4REFBSCxFQUFtRSxNQUFNO0FBQ3ZFLFVBQU1ILGVBQWUsS0FBckI7QUFDQSxVQUFNQyxnQkFBZ0IsUUFBdEI7QUFDQUcsV0FDRSw2QkFBZ0IsS0FBaEIsRUFBdUIsV0FBdkIsRUFBb0MsRUFBRUosWUFBRixFQUFnQkMsYUFBaEIsRUFBcEMsQ0FERixFQUVFSyxTQUZGLENBRWEseUJBQXdCTCxhQUFjLElBQUdELFlBQWEsRUFGbkU7QUFHRCxHQU5EO0FBT0QsQ0EzQ0QiLCJmaWxlIjoiY29tbW9uLnRlbXBsYXRlLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZW5lcmF0ZUltcG9ydHMsIGdlbmVyYXRlQ2xhc3NDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24udGVtcGxhdGUnXG5cbmNvbnN0IG9wdGlvbnMgPSB7XG4gIGNzc0V4dGVuc2lvbjogJycsXG4gIHN0eWxlRmlsZU5hbWU6ICdGb28nLFxufVxuXG5kZXNjcmliZSgnQ29tbW9uIFRlbXBsYXRlJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIGEgc3RyaW5nJywgKCkgPT4ge1xuICAgIGV4cGVjdCh0eXBlb2YgZ2VuZXJhdGVJbXBvcnRzKCdGb28nLCAnc3RhdGVsZXNzJywgb3B0aW9ucykpLnRvQmUoJ3N0cmluZycpXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCBpbXBvcnQgcHJvcHR5cGVzJywgKCkgPT4ge1xuICAgIGV4cGVjdChnZW5lcmF0ZUltcG9ydHMoJ0ZvbycsICdzdGF0ZWxlc3MnLCBvcHRpb25zKSkudG9Db250YWluKFxuICAgICAgXCJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXCJcbiAgICApXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCBpbXBvcnQgcmVhY3Qgd2hlbiBzdGF0ZWxlc3MnLCAoKSA9PiB7XG4gICAgZXhwZWN0KGdlbmVyYXRlSW1wb3J0cygnRm9vJywgJ3N0YXRlbGVzcycsIG9wdGlvbnMpKS50b0NvbnRhaW4oXG4gICAgICBcImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcIlxuICAgIClcbiAgfSlcblxuICBpdCgnc2hvdWxkIGltcG9ydCByZWFjdCB3aGVuIGNsYXNzJywgKCkgPT4ge1xuICAgIGV4cGVjdChnZW5lcmF0ZUltcG9ydHMoJ0ZvbycsICdjbGFzcycsIG9wdGlvbnMpKS50b0NvbnRhaW4oXG4gICAgICBcImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcIlxuICAgIClcbiAgfSlcblxuICBpdCgnc2hvdWxkIGltcG9ydCByZWFjdCB3aGVuIHB1cmUnLCAoKSA9PiB7XG4gICAgZXhwZWN0KGdlbmVyYXRlSW1wb3J0cygnRm9vJywgJ3B1cmUnLCBvcHRpb25zKSkudG9Db250YWluKFxuICAgICAgXCJpbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1wiXG4gICAgKVxuICB9KVxuXG4gIGl0KCdzaG91bGQgaW1wb3J0IGNvbXBvbmVudCBtZXRob2RzJywgKCkgPT4ge1xuICAgIGNvbnN0IGNvbXBvbmVudE1ldGhvZHMgPSBbJ3Nob3VsZENvbXBvbmVudFVwZGF0ZSddXG4gICAgZXhwZWN0KFxuICAgICAgZ2VuZXJhdGVDbGFzc0NvbXBvbmVudCgnRm9vJywgJ3B1cmUnLCB7IGNvbXBvbmVudE1ldGhvZHMgfSlcbiAgICApLnRvQ29udGFpbignc2hvdWxkQ29tcG9uZW50VXBkYXRlKCl7fScpXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCBhZGQgc3R5bGVzIGltcG9ydCB3aXRoIHN0eWxlRmlsZU5hbWUgYW5kIGNzc0V4dGVuc2lvbicsICgpID0+IHtcbiAgICBjb25zdCBjc3NFeHRlbnNpb24gPSAnY3NzJ1xuICAgIGNvbnN0IHN0eWxlRmlsZU5hbWUgPSAnc3R5bGVzJ1xuICAgIGV4cGVjdChcbiAgICAgIGdlbmVyYXRlSW1wb3J0cygnRm9vJywgJ3N0YXRlbGVzcycsIHsgY3NzRXh0ZW5zaW9uLCBzdHlsZUZpbGVOYW1lIH0pXG4gICAgKS50b0NvbnRhaW4oYGltcG9ydCBzdHlsZXMgZnJvbSAnLi8ke3N0eWxlRmlsZU5hbWV9LiR7Y3NzRXh0ZW5zaW9ufWApXG4gIH0pXG59KVxuIl19