"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function generateTestTemplate(COMPONENT_NAME) {
  return `import React from 'react'
import { shallow } from 'enzyme'

import ${COMPONENT_NAME} from '../${COMPONENT_NAME}'

describe('${COMPONENT_NAME}', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<${COMPONENT_NAME} {...props} />,{
      // disableLifecycleMethods: true,
    })
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})`;
}

exports.default = generateTestTemplate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZW1wbGF0ZXMvanMvdGVzdC50ZW1wbGF0ZS5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0ZVRlc3RUZW1wbGF0ZSIsIkNPTVBPTkVOVF9OQU1FIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFNBQVNBLG9CQUFULENBQThCQyxjQUE5QixFQUE4QztBQUM1QyxTQUFROzs7U0FHREEsY0FBZSxhQUFZQSxjQUFlOztZQUV2Q0EsY0FBZTs7Ozs7MkJBS0FBLGNBQWU7Ozs7Ozs7O0dBVnhDO0FBbUJEOztrQkFFY0Qsb0IiLCJmaWxlIjoidGVzdC50ZW1wbGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdlbmVyYXRlVGVzdFRlbXBsYXRlKENPTVBPTkVOVF9OQU1FKSB7XG4gIHJldHVybiBgaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgc2hhbGxvdyB9IGZyb20gJ2VuenltZSdcblxuaW1wb3J0ICR7Q09NUE9ORU5UX05BTUV9IGZyb20gJy4uLyR7Q09NUE9ORU5UX05BTUV9J1xuXG5kZXNjcmliZSgnJHtDT01QT05FTlRfTkFNRX0nLCAoKSA9PiB7XG4gIGxldCBjb21wb25lbnQsIHByb3BzXG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgcHJvcHMgPSB7fVxuICAgIGNvbXBvbmVudCA9IHNoYWxsb3coPCR7Q09NUE9ORU5UX05BTUV9IHsuLi5wcm9wc30gLz4se1xuICAgICAgLy8gZGlzYWJsZUxpZmVjeWNsZU1ldGhvZHM6IHRydWUsXG4gICAgfSlcbiAgfSlcblxuICBpdCgnc2hvdWxkJywgKCkgPT4ge1xuICAgIGV4cGVjdChjb21wb25lbnQpLnRvTWF0Y2hTbmFwc2hvdCgpXG4gIH0pXG59KWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlVGVzdFRlbXBsYXRlO1xuIl19